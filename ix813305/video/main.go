package main

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

func main() {
	router := gin.Default()
	router.LoadHTMLGlob("templates/*")
	router.Static("/js", "js")
	router.GET("/web", getIndex)
	router.Run(":3388")
}
func getIndex(ctx *gin.Context) {
	ctx.HTML(http.StatusOK, "index.html", nil)
}
