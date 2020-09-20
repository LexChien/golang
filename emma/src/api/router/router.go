package router

import (
	. "api/apis"
	"net/http"

	"github.com/gin-gonic/gin"
)

func InitRouter() *gin.Engine {
	router := gin.Default()
	router.LoadHTMLGlob("web/*")

	router.GET("/creat", Creat)
	router.GET("/users", Users)
	router.POST("/user", Store)
	router.POST("/up", Update)
	router.POST("/del", Destroy)

	router.GET("/", HelloWorldGet)
	router.POST("/", HelloWorldPost)

	return router
}

func HelloWorldGet(context *gin.Context) {
	context.HTML(http.StatusOK, "index.html", gin.H{
		"username": "",
	})
}

func HelloWorldPost(context *gin.Context) {
	username := context.PostForm("UserName")
	context.HTML(http.StatusOK, "index.html", gin.H{
		"username": username,
	})
}
