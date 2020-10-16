package main

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

func main() {
	r := gin.Default()
	r.LoadHTMLGlob("templates/*")
    r.GET("/", func(c *gin.Context) {
        c.HTML(http.StatusOK, "index.html", nil)
	})
	r.GET("/t", func(c *gin.Context) {
        c.HTML(http.StatusOK, "test4.html", nil)
    })
    r.Run() 
}