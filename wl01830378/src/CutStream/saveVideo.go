package main

import (
	"fmt"
	"os"
	"strconv"
	"time"

	"gocv.io/x/gocv"
)

func main() {
	// saveFile := "rtmp://localhost:1935/live/movie"
	saveFile := os.Args[1]
	videofps := float64(25)
	newFile := os.Args[2]
	cutTime, _ := strconv.Atoi(os.Args[3])

	getVideoCut(saveFile, videofps, newFile, cutTime)
}

// getVideoCut : cutTime is millionsecond
func getVideoCut(saveFile string, videofps float64, newFile string, cutTime int) {
	streamVideo, err := gocv.VideoCaptureFile(saveFile)
	if err != nil {
		fmt.Printf("Error opening video capture device: %v\n", saveFile)
		return
	}
	defer streamVideo.Close()

	img := gocv.NewMat()
	defer img.Close()

	if ok := streamVideo.Read(&img); !ok {
		fmt.Printf("Cannot read device %v\n", saveFile)
		return
	}

	//Video codecs .mp4 "MP4V" | .avi "MJPG" | .flv "FLV1"
	writer, err := gocv.VideoWriterFile("./live/"+newFile+".mp4", "MP4V", videofps, img.Cols(), img.Rows(), true)
	if err != nil {
		fmt.Printf("error opening video writer device: %v\n", saveFile)
		return
	}
	defer writer.Close()

	timeStart := time.Now()
	fmt.Println((cutTime / 1000 * int(videofps)))
	for i := 0; i < (cutTime / 1000 * int(videofps)); i++ {
		if ok := streamVideo.Read(&img); !ok {
			fmt.Printf("Device closed: %v\n", saveFile)
			return
		}
		if img.Empty() {
			continue
		}

		writer.Write(img)
		fmt.Println(time.Since(timeStart).Milliseconds())
	}
}
