package main

import (
	"net/http"

	db "./db"
	server "./tcp"
	"github.com/gin-gonic/gin"
)

type msgJson struct {
	Name    string `json:"name" form:"name"`
	Message string `json:"message" form:"message"`
}

func main() {
	server.Startserver()
	router := gin.Default()
	router.GET("/home", home)
	Group1 := router.Group("/getlist")
	{
		Group1.GET("/user/:msg", func(c *gin.Context) {
			message := c.Param("msg")
			c.String(http.StatusOK, message)
		})
		Group1.GET("/devbird/:user/:password", birdDB)
	}

	router.LoadHTMLGlob("web/*")
	Group2 := router.Group("/web")
	{
		Group2.GET("/test", getIndex)
	}

	Group3 := router.Group("/postlist")
	{
		Group3.POST("/json_post", jsonPost)
	}
	router.Run(":3388")
}

func home(context *gin.Context) {
	context.JSON(200, gin.H{
		"message": "Hello Vgame",
	})
}
func getIndex(ctx *gin.Context) {
	ctx.HTML(http.StatusOK, "index.html", nil)
}
func jsonPost(c *gin.Context) {
	var msg msgJson

	c.BindJSON(&msg)

	c.JSON(http.StatusOK, gin.H{
		"status":  "SUCCESS",
		"name":    msg.Name,
		"message": msg.Message,
	})
}
func birdDB(context *gin.Context) {
	user := context.Param("user")
	password := context.Param("password")
	context.String(http.StatusOK, "%s", db.SqlConnect(user, password))
}
