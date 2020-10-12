package main

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

const (
	addr  = "192.168.0.162"
	movie = "movie"
)

func main() {
	router := gin.Default()
	router.LoadHTMLGlob("templates/*")
	router.Static("/js", "js")
	// router.GET("/web", getIndex)
	router.GET("/video", getVideo)
	router.GET("/videoIos", getVideoIos)
	router.GET("/videoIos2", getVideoIos2)
	router.Run(":3388")
}

// func getIndex(ctx *gin.Context) {
// 	ctx.HTML(http.StatusOK, "index.html", nil)
// }
func getVideo(ctx *gin.Context) {
	//flv & IOS
	ctx.Writer.Header().Set("Access-Control-Allow-Origin", "*")
	ctx.Writer.Header().Set("Access-Control-Allow-Credentials", "true")
	ctx.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization, accept, origin, Cache-Control, X-Requested-With")
	ctx.HTML(http.StatusOK, "video.html", gin.H{
		"addr": addr, "movie": movie,
	})
}
func getVideoIos(ctx *gin.Context) {
	//ios測試
	ctx.HTML(http.StatusOK, "video2.html", nil)
}
func getVideoIos2(ctx *gin.Context) {
	//ios測試
	ctx.Writer.Header().Set("Access-Control-Allow-Origin", "*")
	ctx.Writer.Header().Set("Access-Control-Allow-Credentials", "true")
	ctx.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization, accept, origin, Cache-Control, X-Requested-With")
	ctx.HTML(http.StatusOK, "video3.html", nil)
}
