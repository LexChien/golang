package main

import (
	"encoding/hex"
	"fmt"
	"log"
	"net"
	"os"
)

func sender(conn net.Conn) {
	//words := "hello world!"

	// Hex BOF
	const words = "0x11 0x02 0x01 0x00 0x00 0x00 0x02 0x00 0x00 0x00 0x05 0x00 0x00 0x00 0x00"
	decoded, err := hex.DecodeString(words)
	if err != nil {
		log.Fatal(err)
	}

	fmt.Printf("%s\n", decoded)
	// Hex EOF

	conn.Write([]byte(words))
	fmt.Println("send over")

}

func main() {
	// server := "172.17.109.161:5000"
	server := "127.0.0.1:5000"
	tcpAddr, err := net.ResolveTCPAddr("tcp4", server)
	if err != nil {
		fmt.Fprintf(os.Stderr, "Fatal error: %s", err.Error())
		os.Exit(1)
	}

	conn, err := net.DialTCP("tcp", nil, tcpAddr)
	if err != nil {
		fmt.Fprintf(os.Stderr, "Fatal error: %s", err.Error())
		os.Exit(1)
	}

	fmt.Println("connect success")
	sender(conn)

}
