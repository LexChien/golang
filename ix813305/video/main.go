package main

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

func main() {
	router := gin.Default()
	router.LoadHTMLGlob("templates/*")
	router.Static("/js", "js")
	// router.GET("/web", getIndex)
	router.GET("/video", getVideo)
	router.GET("/videoIos", getVideoIos)
	router.Run(":3388")
}

// func getIndex(ctx *gin.Context) {
// 	ctx.HTML(http.StatusOK, "index.html", nil)
// }
func getVideo(ctx *gin.Context) {
	//flv測試
	ctx.HTML(http.StatusOK, "video.html", nil)
}
func getVideoIos(ctx *gin.Context) {
	//ios測試
	ctx.HTML(http.StatusOK, "video2.html", nil)
}
