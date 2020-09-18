package main

import (
	"github.com/gin-gonic/gin"
	"net/http"
)

func main() {
	router := gin.Default()
	router.GET("/hello", func(c *gin.Context) {
		c.Data(200, "text/plain", []byte("Hello, Vgame!"))
	})

	router.GET("/hello2", func(c *gin.Context) {
		for i := 0; i < 100000; i++ {
			c.Data(200, "text/plain", []byte("Hello, It Home2!"))
		}
	})

	router.GET("/hello3/:name", func(c *gin.Context) {
		name := c.Param("name")
		for i := 0; i < 100000; i++ {
			c.String(http.StatusOK, "%s",name)
		
		}
	})
	
	router.Run()
}