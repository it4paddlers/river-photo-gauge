<?php
// This file is the API endpoint for the river-photo-gauge React App 
// It returns a json list of images and timestamps or a thumbnail of the current image.


// Report all PHP errors
error_reporting(E_ALL);
// for testing, we want to access the json from anywhere:
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");

define('IMG_PREFIX', 'Wassenphoto');
define('PREFIXLEN', strlen(IMG_PREFIX));
define ('DEFAULTRANGE', 172800); // how many days back from the latest pic should be shown? eg. one week aka 604800sec.

$directory = './current/';
$calDir = './calibration_images/';

// create array of ref. images for json output...
$refImages = array(
  "min" => $calDir . "min.jpg",
  "med" => $calDir . "med.jpg",
  "max" => $calDir . "max.jpg"
);

// get directory contents
$listing = scandir($directory);
//var_dump($listing); die;

// exclude directories and non-cam-photo files
foreach($listing as $entry=>$name){
  if(is_dir($name) OR substr($name, 0, PREFIXLEN) !== IMG_PREFIX)
    unset($listing[$entry]);
}
//var_dump($listing);die;

// create array of photo filenames, with timestamps as index for easy sorting. Timestamps extracted from file names.
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


////////////
// API Calls
////////////


//
// GET = current
// jpg Thumbnail of latest image
//

//return latest image if requested
//rivermap uses this in the info-box...
if(isset($_GET['current'])){
  $latestImgPath = $orderedFiles[array_key_first($orderedFiles)];
  $imagick = new \Imagick(realpath($latestImgPath));
  $imagick->thumbnailImage(300,300,true,false);
  $draw = new ImagickDraw();
 
  //$fontList = \Imagick::queryFonts('*');
  //foreach ( $fontList as $fontName ) {
  //  echo $fontName . '<br>';
  //}die;

  $draw->setFillColor('black');
  $draw->setFont('Helvetica');
  $draw->setFontSize( 20 );
  $draw->setTextUnderColor('#FFFFFF88');
  $imagick->annotateImage($draw, 0, 20, 0, date('   H: i                   d.m. Y     ', array_key_first($orderedFiles)));
  header("Content-Type: image/jpg");
  header('Cache-Control:  public, no-cache, max-age=0, must-revalidate');
  echo $imagick->getImageBlob();
  die;
}

// find min/max available dates for datepicker
$newestFile_ts = array_key_first($orderedFiles);
$oldestFile_ts = array_key_last($orderedFiles);

// get dates from url or set defaults
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


// strip array down to requested files
foreach($orderedFiles as $date => $name){
  if($date < $oldestRequested_ts or $date > $newestRequested_ts){
    unset($orderedFiles[$date]);
  }
}


//
// GET = json
// List of requested images
//

if(isset($_GET['json'])){
  echo json_encode($orderedFiles)."\n";
  die;
}


//
// GET = json_cal
// List of calibration images
//

if(isset($_GET['json_cal'])){
  echo json_encode($refImages)."\n";
  die;
}

?>

