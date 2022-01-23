<?php
// The directory where this file resides is meant to contain a fixed number of webcam pics which get overwritten in rotating order, as new images are uploaded every hour.

// The intent of this file is to return a html page that shows all images in the current directory, along with photo-timestamps.


// Report all PHP errors
error_reporting(E_ALL);

define('IMG_PREFIX', 'Wassenphoto');
define('PREFIXLEN', strlen(IMG_PREFIX));
define ('DEFAULTRANGE', 172800); // how many days back from the latest pic should be shown? eg. one week aka 604800sec.

$directory = './current/';

// get directory contents
$listing = scandir($directory);
//var_dump($listing); die;

// exclude directories and non-cam-photo files
foreach($listing as $entry=>$name){
  if(is_dir($name) OR substr($name, 0, PREFIXLEN) !== IMG_PREFIX)
    unset($listing[$entry]);
}
//var_dump($listing);die;

// create array of photo filenames with timestamps from filename as index (to do easy sorting by unixtime timestamp)
$orderedFiles = array();
foreach($listing as $entry => $file_name){
  // sample filename to be parsed: Wassenphoto_2021-09-16_02-26-10.jpg
  [$img_prefix, $img_date, $img_time] = explode('_',$file_name);
  $img_time = substr($img_time, 0, 8);
  $img_datestr = $img_date . ' ' . str_replace('-', ':', $img_time);
  $img_dateobj = strtotime($img_datestr);

  $orderedFiles[$img_dateobj] = $directory . $file_name;
}
//var_dump($orderedFiles);die;

// sort by date descending
krsort($orderedFiles);
//var_dump($orderedFiles);

// get min/max available dates for datepicker
$newestFile_ts = array_key_first($orderedFiles);
$oldestFile_ts = array_key_last($orderedFiles);

$newestFile_date = date('Y-m-d\TH:i', $newestFile_ts);
$oldestFile_date = date('Y-m-d\TH:i', $oldestFile_ts);
//TODO: not sure if the html datepicker would accept more human-readable formats...
//does accept h instead of : but returning a h does not work with strtotime... maybe str_replace would do...

// get dates from url/datepicker or set defaults
// casting to date objects should prevent attacks i think...
if(isset($_GET['newest'])){
  $newestRequested_ts = strtotime($_GET['newest']);
}else{
  $newestRequested_ts = $newestFile_ts;
};
if(isset($_GET['oldest'])){
  $oldestRequested_ts = strtotime($_GET['oldest']);
}else{
  $oldestRequested_ts = $newestFile_ts - DEFAULTRANGE;
};
//TODO: would be nice to decode the doublecolon in the url for the viewer, see https://stackoverflow.com/a/40256517/1331544
//var_dump($oldest_ts);die;


// strip array down to requested files
foreach($orderedFiles as $date => $name){
  if($date < $oldestRequested_ts or $date > $newestRequested_ts){
    unset($orderedFiles[$date]);
  }
}


// format dates for HTML output
$newestRequested_date = date('Y-m-d\TH:i', $newestRequested_ts);
$oldestRequested_date = date('Y-m-d\TH:i', $oldestRequested_ts);




?>
<html>
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" /> 
    <title>Wassenphoto</title> 
    <style>
      img {
        max-height: 80vh;
        max-width: 100vw;
        display: block;

      }
      .webcam h2{
        margin-block-end: 0;
        position: relative;
        top: 55px;
        left: 7px;
        color: white;
        background-color: rgba(0, 0, 0, 0.3);
        display: inline-block;
        padding: 10px;
      }
      input[type="datetime-local"] {
        position: relative;
      }
      input[type="datetime-local"]::-webkit-calendar-picker-indicator {
        position: absolute;
        top: 0;
        right: 0;
        width: 100%;
        height: 100%;
        padding: 0;
        color: transparent;
        background: transparent;
      }
    </style>
  </head>
  <body>
    <h1>Waterlevel- Webcam Wassen</h1>
    <p> Location: Takeout of the <a href="https://rivermap.org/map/#sprache=de&styled=1&zoom=14&lat=46.69075&lng=8.60010&inf=113">Göschenen-Wassen</a> Section.</p>
    <p>This is quite a bare minimum way to present the images. <br>
A better(?) slideshow-style presentation is <a href="hs-index2.php">here</a>, but it might be broken, as it is work in progress.<br>
A prototype for a better User Interface (with dummy content only) is <a href="app/build/">here</a>. All Code is on <a href="https://github.com/it4paddlers/river-photo-gauge">GitHub</a>.</p>
    <h2>Calibration</h2>
      <h3>Data missing, we need your help!</h3>
    <p>We need info about what pictures show <strong>low/med/high</strong>. So if you have an opinion about the flow you see in the Pictures, please <a href="mailto:toro@kanuschle.ch">tell us</a>.<br>
    Or, tell us when you paddled there and how you experienced that level. <br>
    Wishes, advice, contributions welcome too ;-) </p>
    <p>We think <a href="calibration_images/daymax-Wassenphoto_2021-07-12_20-24-51.jpg">this is somewhere in the medium range</a>. Do you agree? And what about low and high?<br>
<a href="index.php?oldest=2021-07-13T06%3A20&newest=2021-07-14T06%3A30">July 13<sup>th</sup> 2021</a> is a good reference of flood-stage ;-)</p>
    <h2>Date Range</h2>
    <p>Images Available from <strong><?=date("M. d. Y",$oldestFile_ts)?></strong> to <strong><?=date("M. d. Y",$newestFile_ts)?></strong></p>
    <form action="<?=$_SERVER['PHP_SELF']?>" method="get">
      <fieldset>
        <legend>Select Range</legend>
        <label for="oldest">Oldest</label>
          <input type="datetime-local" id="oldest" name="oldest" value="<?=$oldestRequested_date?>" min="<?=$oldestFile_date?>" max="<?=$newestFile_date?>">
        <label for="newest">Newest</label>
          <input type="datetime-local" id="newest" name="newest" value="<?=$newestRequested_date?>" min="<?=$oldestFile_date?>" max="<?=$newestFile_date?>">
        <input type="submit" value="Submit">
      </fieldset>
    </form>
    <form action="<?=$_SERVER['PHP_SELF']?>" method="post">
      <input type="submit" value="Reset">
    </form>

    <div class="webcam">
<?
    foreach($orderedFiles as $date => $name){
      echo("    <h2>".date('M. d. H:i:s', $date)."</h2>\n");
      echo("    <img src='".$name."' />\n\n");
    }
?>
    </div>
<a href="https://github.com/it4paddlers/river-photo-gauge" class="github-corner" aria-label="View source on GitHub"><svg width="80" height="80" viewBox="0 0 250 250" style="fill:#64CEAA; color:#fff; position: absolute; top: 0; border: 0; right: 0;" aria-hidden="true"><path d="M0,0 L115,115 L130,115 L142,142 L250,250 L250,0 Z"></path><path d="M128.3,109.0 C113.8,99.7 119.0,89.6 119.0,89.6 C122.0,82.7 120.5,78.6 120.5,78.6 C119.2,72.0 123.4,76.3 123.4,76.3 C127.3,80.9 125.5,87.3 125.5,87.3 C122.9,97.6 130.6,101.9 134.4,103.2" fill="currentColor" style="transform-origin: 130px 106px;" class="octo-arm"></path><path d="M115.0,115.0 C114.9,115.1 118.7,116.5 119.8,115.4 L133.7,101.6 C136.9,99.2 139.9,98.4 142.2,98.6 C133.8,88.0 127.5,74.4 143.8,58.0 C148.5,53.4 154.0,51.2 159.7,51.0 C160.3,49.4 163.2,43.6 171.4,40.1 C171.4,40.1 176.1,42.5 178.8,56.2 C183.1,58.6 187.2,61.8 190.9,65.4 C194.5,69.0 197.7,73.2 200.1,77.6 C213.8,80.2 216.3,84.9 216.3,84.9 C212.7,93.1 206.9,96.0 205.4,96.6 C205.1,102.4 203.0,107.8 198.3,112.5 C181.9,128.9 168.3,122.5 157.7,114.1 C157.9,116.9 156.7,120.9 152.7,124.9 L141.0,136.5 C139.8,137.7 141.6,141.9 141.8,141.8 Z" fill="currentColor" class="octo-body"></path></svg></a><style>.github-corner:hover .octo-arm{animation:octocat-wave 560ms ease-in-out}@keyframes octocat-wave{0%,100%{transform:rotate(0)}20%,60%{transform:rotate(-25deg)}40%,80%{transform:rotate(10deg)}}@media (max-width:500px){.github-corner:hover .octo-arm{animation:none}.github-corner .octo-arm{animation:octocat-wave 560ms ease-in-out}}</style>
  </body>
</html>
