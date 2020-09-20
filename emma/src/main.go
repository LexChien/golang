package main

import (
	_ "api/database"
	orm "api/database"
	"api/router"
)

func main() {
	defer orm.Eloquent.Close()
	router := router.InitRouter()
	router.Run(":8000")

}
