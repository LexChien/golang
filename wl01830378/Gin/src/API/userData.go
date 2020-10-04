package userdata

import (
	"bufio"
	"encoding/json"
	"io"
	"log"
	"net/http"
	"os"

	"github.com/gin-gonic/gin"
)

type User struct {
	Name string `json:"name,omitempty"`
	BD   string `json:"bd,omitempty"`
}

func UserInsert(c *gin.Context) {
	var UserData User
	c.BindJSON(&UserData)

	if UserData.Name != "" && UserData.BD != "" {
		file, err := os.OpenFile("Json/UserData.txt", os.O_RDWR, 0600)
		if err != nil {
			log.Println(err)

			file, err = os.OpenFile("Json/UserData.txt", os.O_CREATE, 0600)
			if err != nil {
				panic(err)
			}
		}
		// make a read buffer
		r := bufio.NewReader(file)

		defer func() {
			if err := file.Close(); err != nil {
				panic(err)
			}
		}()

		ifFst := true
		// make a buffer to keep chunks that are read
		for {
			// read a chunk
			ctn, _, err := r.ReadLine()
			if err != nil && err != io.EOF {
				panic(err)
			}
			if err == io.EOF {
				break
			}

			if ifFst {
				ifFst = false
			}
			var userList User
			err = json.Unmarshal(ctn, &userList)
			if userList.Name == UserData.Name {
				c.JSON(http.StatusOK, gin.H{
					"status":  "FAILED",
					"message": "User is exist",
				})
				return
			}
		}

		// make a write buffer
		w := bufio.NewWriter(file)
		userListJSON := []byte("")
		if !ifFst {
			userListJSON = []byte("\n")
		}
		addJSON, _ := json.Marshal(User{Name: UserData.Name, BD: UserData.BD})
		userListJSON = append(userListJSON, addJSON...)
		// fmt.Println(string(userListJSON))
		w.Write(userListJSON)

		if err = w.Flush(); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{
				"status":  "FAILED",
				"message": "Add failed",
			})
			panic(err)
		}

		c.JSON(http.StatusOK, gin.H{
			"status": "SUCCESS",
			"Name":   UserData.Name,
			"BD":     UserData.BD,
		})
	} else {
		res := "Don't get data"
		if UserData.Name == "" {
			res = res + " name"
		}
		if UserData.BD == "" {
			res = res + " bd"
		}
		c.JSON(http.StatusBadRequest, gin.H{
			"status":  "FAILED",
			"message": res,
		})
	}
}

func UserGet(c *gin.Context) {
	userName := c.Query("name")

	file, err := os.OpenFile("Json/UserData.txt", os.O_RDONLY, 0600)
	if err != nil {
		if err != nil {
			panic(err)
		}
	}
	// make a read buffer
	r := bufio.NewReader(file)

	defer func() {
		if err := file.Close(); err != nil {
			panic(err)
		}
	}()

	bAll := false
	if userName == "" {
		bAll = true
	}

	var userList []User
	// make a buffer to keep chunks that are read
	for {
		// read a chunk
		ctn, _, err := r.ReadLine()
		if err != nil && err != io.EOF {
			panic(err)
		}
		if err == io.EOF {
			break
		}

		var userTemp User
		err = json.Unmarshal(ctn, &userTemp)
		if !bAll && userTemp.Name == userName {
			userList = append(userList, userTemp)
			resJSON, _ := json.Marshal(userList)
			c.JSON(http.StatusOK, gin.H{
				"status": "SUCCESS",
				"data":   string(resJSON),
			})
			return
		} else if bAll {
			userList = append(userList, userTemp)
		}
	}

	if len(userList) > 0 {
		resJSON, _ := json.Marshal(userList)
		c.JSON(http.StatusOK, gin.H{
			"status": "SUCCESS",
			"data":   string(resJSON),
		})
	} else {
		c.JSON(http.StatusOK, gin.H{
			"status": "SUCCESS",
			"data":   "No player",
		})
	}
}

func UserDelete(c *gin.Context) {
	var UserData User
	c.BindJSON(&UserData)

	userListJSON := []byte("")
	if UserData.Name != "" {
		file, err := os.OpenFile("Json/UserData.txt", os.O_RDWR, 0600)
		if err != nil {
			panic(err)
		}
		// make a read buffer
		r := bufio.NewReader(file)

		defer func() {
			if err := file.Close(); err != nil {
				panic(err)
			}
		}()

		ifFst := true
		// make a buffer to keep chunks that are read
		for {
			// read a chunk
			ctn, _, err := r.ReadLine()
			if err != nil && err != io.EOF {
				panic(err)
			}
			if err == io.EOF {
				break
			}

			var userList User
			err = json.Unmarshal(ctn, &userList)
			if userList.Name != UserData.Name {
				if !ifFst {
					userListJSON = append(userListJSON, []byte("\n")...)
				} else {
					ifFst = false
				}
				userListJSON = append(userListJSON, ctn...)
			}
		}
		file.Truncate(0)
		file.Seek(0, 0)
		// make a write buffer
		w := bufio.NewWriter(file)
		// fmt.Println(string(userListJSON))
		w.Write(userListJSON)

		if err = w.Flush(); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{
				"status":  "FAILED",
				"message": "Add failed",
			})
			panic(err)
		}

		c.JSON(http.StatusOK, gin.H{
			"status": "SUCCESS",
		})
	}
}

func UserUpdate(c *gin.Context) {
	var UserData User
	c.BindJSON(&UserData)

	userListJSON := []byte("")
	if UserData.Name != "" && UserData.BD != "" {
		file, err := os.OpenFile("Json/UserData.txt", os.O_RDWR, 0600)
		if err != nil {
			panic(err)
		}
		// make a read buffer
		r := bufio.NewReader(file)

		defer func() {
			if err := file.Close(); err != nil {
				panic(err)
			}
		}()

		ifFst := true
		// make a buffer to keep chunks that are read
		for {
			// read a chunk
			ctn, _, err := r.ReadLine()
			if err != nil && err != io.EOF {
				panic(err)
			}
			if err == io.EOF {
				break
			}

			var userList User
			err = json.Unmarshal(ctn, &userList)
			if userList.Name == UserData.Name {
				if !ifFst {
					userListJSON = append(userListJSON, []byte("\n")...)
				} else {
					ifFst = false
				}
				addJSON, _ := json.Marshal(User{Name: UserData.Name, BD: UserData.BD})
				userListJSON = append(userListJSON, addJSON...)
			} else {
				if !ifFst {
					userListJSON = append(userListJSON, []byte("\n")...)
				} else {
					ifFst = false
				}
				userListJSON = append(userListJSON, ctn...)
			}
		}
		file.Truncate(0)
		file.Seek(0, 0)
		// make a write buffer
		w := bufio.NewWriter(file)
		// fmt.Println(string(userListJSON))
		w.Write(userListJSON)

		if err = w.Flush(); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{
				"status":  "FAILED",
				"message": "Add failed",
			})
			panic(err)
		}

		c.JSON(http.StatusOK, gin.H{
			"status": "SUCCESS",
		})
	}
}
