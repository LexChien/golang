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
	router.Static("/assets", "assets")
	router.Static("/src", "src")

	// router.GET("/", getHome)
	router.GET("/", getGame)

	router.Run(addr + ":" + strconv.Itoa(port)) // listen and serve on 0.0.0.0:8080 (for windows "localhost:8080")
}

func getHome(ctx *gin.Context) {
	ctx.Writer.Header().Set("Access-Control-Allow-Origin", "*")
	ctx.Writer.Header().Set("Access-Control-Allow-Credentials", "true")
	ctx.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization, accept, origin, Cache-Control, X-Requested-With")
	ctx.HTML(http.StatusOK, "index.html", nil)
}
func getGame(ctx *gin.Context) {
	ctx.Writer.Header().Set("Access-Control-Allow-Origin", "*")
	ctx.Writer.Header().Set("Access-Control-Allow-Credentials", "true")
	ctx.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization, accept, origin, Cache-Control, X-Requested-With")
	ctx.HTML(http.StatusOK, "phaserGC.html", nil)
}
