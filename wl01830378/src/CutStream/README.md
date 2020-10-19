
# Setup environment

Install gocv follow https://gocv.io/getting-started/


## Start:Windows
1. To install GoCV,run the following command
```
go get -u -d gocv.io/x/gocv
```


2. Install MinGW
	* download http://mingw-w64.org/doku.php/download
	* install and set bin to system path


3. Install CMake
	* download https://cmake.org/download/
	* install and set bin to system path


4. Install OpenCV 4.4.0 (use windows cmd)
    * run the following command
    * after install, add <code>C:\opencv\build\install\x64\mingw\bin</code> to system path
```
chdir %GOPATH%\src\gocv.io\x\gocv
win_build_opencv.cmd
``` 

----

### Run programme
1. go run saveVideo.go <code>[stream] [new file name] [duration(ms)]</code>
2. go build saveVideo.go
```  
e.g.  
go run saveVideo.go rtmp://localhost:1935/live/movie ttt 2000
```

----
### Video Codecs
https://www.fourcc.org/codecs.php