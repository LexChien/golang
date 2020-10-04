package router

import (
	"net/http"

	userdata "../API"
	"github.com/gin-gonic/gin"
)

func SetRouter() *gin.Engine {

	router := gin.Default()
	router.GET("/", func(c *gin.Context) {
		c.Data(http.StatusOK, "text/plain", []byte("Hello Vgame"))
	})

	router.POST("/UserAdd", userdata.UserInsert)
	router.GET("/UserSearch", userdata.UserGet)
	router.POST("/UserUpdate", userdata.UserUpdate)
	router.DELETE("/UserDelete", userdata.UserDelete)

	return router
}
