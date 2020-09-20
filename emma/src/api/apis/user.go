package apis

import (
	model "api/models"
	"fmt"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
)

func Creat(c *gin.Context) {
	var user model.User
	err := user.Creat()
	if err != nil {
		c.JSON(http.StatusOK, gin.H{
			"code":    -1,
			"message": "建表失敗",
			"err":     err,
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"code": 1,
		"data": "建表成功",
	})
}

//列表数据
func Users(c *gin.Context) {
	var user model.User
	user.Username = c.Request.FormValue("username")
	user.Password = c.Request.FormValue("password")
	result, err := user.Users()

	if err != nil {
		c.JSON(http.StatusOK, gin.H{
			"code":    -1,
			"message": "抱歉未找到相关信息",
		})
		return
	}

	c.HTML(http.StatusOK, "user.html", gin.H{
		"data": result,
	})

}

//添加数据
func Store(c *gin.Context) {
	fmt.Println(c.Request)
	var user model.User
	user.Username = c.Request.FormValue("UserName")
	user.Password = c.Request.FormValue("PassWord")
	id, err := user.Insert()
	result, err := user.Users()

	if err != nil {
		c.JSON(http.StatusOK, gin.H{
			"code":    -1,
			"message": "添加失败",
		})
		return
	}

	fmt.Println("添加成功 id=", id)
	c.HTML(http.StatusOK, "user.html", gin.H{
		"data":   result,
		"target": 1,
	})
}

//修改数据
func Update(c *gin.Context) {
	var user model.User
	id, err := strconv.ParseInt(c.Request.FormValue("id"), 10, 64)
	user.Username = c.Request.FormValue("UserName")
	user.Password = c.Request.FormValue("PassWord")
	result, err := user.Update(id)
	if err != nil || result.ID == 0 {
		c.JSON(http.StatusOK, gin.H{
			"code":    -1,
			"message": "修改失败",
		})
		return
	}
	fmt.Println("修改成功 id=", id)
	c.HTML(http.StatusOK, "user.html", gin.H{
		"data":   result,
		"target": 1,
	})
}

//删除数据
func Destroy(c *gin.Context) {
	var user model.User
	id, err := strconv.ParseInt(c.Request.FormValue("id"), 10, 64)
	result, err := user.Destroy(id)
	if err != nil || result.ID == 0 {
		c.JSON(http.StatusOK, gin.H{
			"code":    -1,
			"message": "删除失败",
		})
		return
	}
	fmt.Println("刪除成功 id=", id)
	c.HTML(http.StatusOK, "user.html", gin.H{
		"data":   result,
		"target": 1,
	})
}
