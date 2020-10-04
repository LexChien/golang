package main

import (
	"fmt"
	"net"
	"os"
)

func main() {
	server := "127.0.0.1:8000"
	addr, err := net.ResolveTCPAddr("tcp4", server)
	if err != nil {
		os.Exit(0)
	}

	conn, err := net.DialTCP("tcp", nil, addr)
	if err != nil {
		os.Exit(0)
	}

	fmt.Println("enter null string to exit")
	for {
		cli(conn)
	}

}

func cli(conn net.Conn) {

	// reader := bufio.NewReader(os.Stdin)
	// fmt.Print("Enter text: ")
	// text, _ := reader.ReadString('\n')
	var input string
	fmt.Scanln(&input)
	if input == "" {
		os.Exit(2)
	}
	str := []byte(input)

	conn.Write(str)
}
