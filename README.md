# river-photo-gauge
A User Interface (React App) that facilitates the usage of a Webcam as a "visual Waterlevel-Gauge".

The UI helps to compare a current- or archive- Image against reference Images.
Subtile level-differences are easily spotted by temporarily overlaying the main image.
The intended use is for Paddlers to judge a given Section of River for navigability.

![35980472-6efc-4c95-a382-81d4bb0729d8](https://user-images.githubusercontent.com/3509308/172705065-2ac8ab1a-6559-4194-8a4f-fe9acbdbad61.gif)

## Architecture
river-photo-gauge mainly focuses on the User Interface aspect of a Gauge-Webcam.
The React App gets the images via API Calls to a Backend. 
A sample backend is implemented in api.php. It assumes images are delivered to the local webserver for storage.
Capture and storage of images are not part of this project. The most simple solution for these steps is a Camera that supports timed capture and FTP-Upload (typical for Security Cameras).
## Example usage
This Project is in use here: 
 - [Webcam on the River Reuss](https://it4paddlers.org/webcams/wassen/) 
   A Security Camera with POE, using api.php and FTP upload
 - [Webcam Alb](https://it4paddlers.org/webcams/tiefenstein/)
   A custom [Open Source Camera](https://github.com/elktownlabs/murgcam) with Battery, GSM connectivity and it's own Storage and API Backend)
 - [Webcam Waltensburg](https://it4paddlers.org/webcams/waltensburg/dist/index.html) (Raspberry Pi Zero W, PiCam, Shell-script on WIFI, using api.php and FTP Upload)
## Status
The current State of this Project is a minimum viable product, see the [Issue Que](https://github.com/it4paddlers/river-photo-gauge/issues) for future Improvements.
Work on the React App was funded by [Swiss Canoe Federation](https://swisscanoe.ch/de/tourenwesen).

## Background
More on [Gauge Webcams](https://docs.google.com/document/d/1p398I5prpEqUVxoj-CzpbUMImztJaH_K8-nVY8LKkwc).
