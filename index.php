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
  $oldestRequested_ts = time() - DEFAULTRANGE;
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
    </style>
  </head>
  <body>
    <h1>Waterlevel- Webcam Wassen</h1>
    <p> Location: Takeout of the <a href="https://rivermap.org/map/#sprache=de&styled=1&zoom=14&lat=46.69075&lng=8.60010&inf=113">Göschenen-Wassen</a> Section.</p>
    <p>We are working on finding the best way how to present these pictures... This is just the bare minimum. A better(?) slideshow-style presentation is <a href="hs-index2.php">here</a>, but it might be broken, as it is work in progress.</p>
    <h2>Calibration</h2>
      <h3>Data missing, we need your help!</h3>
    <p>We need info about what pictures show <strong>low/med/high</strong>. So if you have an opinion about the flow you see in the Pictures, please <a href="mailto:toro@kanuschle.ch">tell us</a>.<br>
    Or, tell us when you paddled there and how you experienced that level. <br>
    Wishes, advice, contributions welcome too ;-) </p>
    <p>We think <a href="calibration_images/daymax-Wassenphoto_2021-07-12_20-24-51.jpg">this is somewhere in the medium range</a>. Do you agree? And what about low and high?</p>
    <h2>Date Range</h2>
    <form action="<?=$_SERVER['PHP_SELF']?>" method="get">
      <fieldset>
        <legend>Select</legend>
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
  </body>
</html>
