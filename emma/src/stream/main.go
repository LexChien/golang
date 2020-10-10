package main

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

func main() {
	router := gin.Default()
	router.LoadHTMLGlob("web/*")
	router.Static("/js", "js")
	router.GET("/video", ShowVideo)
	router.Run(":8000")
}

func ShowVideo(context *gin.Context) {
	context.HTML(http.StatusOK, "index.html", nil)
}
