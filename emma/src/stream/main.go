package main

import (
	"fmt"
	"io/ioutil"
	"net/http"

	"github.com/gin-gonic/gin"
)

func main() {
	router := gin.Default()
	router.LoadHTMLGlob("web/*")
	router.Static("/js", "js")
	router.Static("/video", "./video")
	router.GET("/video", ShowVideo)
	router.GET("/videos", ShowVideos)
	router.POST("/getvideo", PutVideo)
	router.Run(":8000")
}

func ShowVideo(context *gin.Context) {
	context.HTML(http.StatusOK, "index.html", nil)
}

func ShowVideos(context *gin.Context) {
	fmt.Println("ShowVideos")
	fileName := FindVideos()
	fmt.Println(fileName)
	context.HTML(http.StatusOK, "videos.html", gin.H{
		"files": fileName,
	})
}
func FindVideos() []string {
	var fileName []string
	files, _ := ioutil.ReadDir("./video")
	for _, f := range files {
		fileName = append(fileName, f.Name())
	}
	return fileName
}

func PutVideo(context *gin.Context) {
	file := context.Request.FormValue("v")
	fmt.Println("收到資料 選擇", file)
	context.HTML(http.StatusOK, "getvideo.html", gin.H{
		"filename": file,
	})
	// video, err := os.Open("./video/movie_0.mp4")
	// if err != nil {
	//     log.Fatal(err)
	// }
	// defer video.Close()

	// http.ServeContent(w, r, "movie_0.mp4", time.Now(), video)
}
