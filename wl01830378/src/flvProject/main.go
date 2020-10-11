package main

import (
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
)

const (
	addr = ""
	port = 3388
)

func main() {
	router := gin.Default()
	router.LoadHTMLGlob("templates/*")
	router.Static("/js", "js")
	router.GET("/", getHome)
	router.Run(addr + ":" + strconv.Itoa(port)) // listen and serve on 0.0.0.0:8080 (for windows "localhost:8080")
}

func getHome(ctx *gin.Context) {
	ctx.Writer.Header().Set("Access-Control-Allow-Origin", "*")
	ctx.Writer.Header().Set("Access-Control-Allow-Credentials", "true")
	ctx.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization, accept, origin, Cache-Control, X-Requested-With")
	ctx.HTML(http.StatusOK, "index.html", nil)
}
