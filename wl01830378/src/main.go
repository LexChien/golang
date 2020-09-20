package main

import (
	"./router"
)

func main() {
	r := router.SetRouter()
	r.Run() // listen and serve on 0.0.0.0:8080 (for windows "localhost:8080")
}
