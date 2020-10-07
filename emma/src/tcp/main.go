package main

import (
	"fmt"
	"net"
	"os"
)

func main() {
	service := "127.0.0.1:5000"
	listener, err := net.Listen("tcp", service)
	checkError(err)

	fmt.Println("等待使用者加入")
	for {
		conn, err := listener.Accept()
		if err != nil {
			continue
		}

		fmt.Println("連線成功 ", conn.RemoteAddr().String())
		go handle(conn)
	}
}

func handle(conn net.Conn) {

	buf := make([]byte, 2048)

	for {
		n, err := conn.Read(buf)

		if err != nil {
			fmt.Println("收到錯誤：", err.Error())
			return
		}

		fmt.Println("收到資料：", buf[:n])
		conn.Write([]byte("OK"))
	}

}

func checkError(err error) {
	if err != nil {
		fmt.Println("連線失敗:", err.Error())
		os.Exit(1)
	}
}
