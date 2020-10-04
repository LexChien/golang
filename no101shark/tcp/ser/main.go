package main

import (
	"fmt"
	"net"
	"os"
)

func main() {

	L, err := net.Listen("tcp", "127.0.0.1:8000")
	//
	if err != nil {
		os.Exit(00)
	}
	defer L.Close()

	for {
		conn, err := L.Accept()
		if err != nil {
			continue
		}

		fmt.Println(conn.RemoteAddr().String(), "connected", "\n")

		go connect(conn)
	}
}

func connect(conn net.Conn) {

	tmp := make([]byte, 2048)

	for {

		n, err := conn.Read(tmp)

		if err != nil {
			return
		}

		fmt.Println(string(tmp[:n]))

	}

}
