package main

import (
	"bufio"
	"encoding/hex"
	"fmt"
	"io"
	"log"
	"net"
	"os"
	"strconv"
	"strings"
)

const (
	addr = ""
	port = 5000
)

var baseValue = []byte{
	0x34, 0xdc, 0x86, 0xa3, 0x65, 0xda, 0x5d, 0x79, 0xc1, 0xf3, 0x9e, 0x1f, 0x45, 0x78, 0x99, 0x60, 0x89,
}

func handleConn(c net.Conn) {
	defer c.Close()

	buf := make([]byte, 2048)
	for {
		recvlen, err := c.Read(buf)

		if err != nil {
			fmt.Println(err)
			break
		}
		// fmt.Println("Get : ", buf[:recvlen])
		Data := buf[:recvlen]

		// 校驗
		decodeData := make([]byte, len(Data))
		for de, n := range Data {
			decodeData[de] = n //^ baseValue[de]
			de++
		}

		decEes := 0
		hexst := ""
		for i, ctn := range Data {
			if i < 15 {
				decEes = decEes + int(decodeData[i]^decodeData[i+1])
			}
			if hexst != "" {
				hexst = hexst + " " + strings.ToUpper(hex.EncodeToString([]byte{ctn}))
			} else {
				hexst = strings.ToUpper(hex.EncodeToString([]byte{ctn}))
			}
			i++
		}

		p := byte(decEes / 256)
		j := byte(decEes % 256)

		fmt.Println("get : ", hexst, " test : ", hex.EncodeToString([]byte{p}), hex.EncodeToString([]byte{j}))
		// Send a response back to person contacting us.
		retrunData := "FAILED\n"
		if p == Data[15] && j == Data[16] {
			insertFile(hexst)
			retrunData = "OK\n"
		}
		_, werr := c.Write([]byte(retrunData))
		if werr != nil {
			fmt.Println(werr)
			break
		}
	}
	fmt.Println("連線中斷.")
}

func main() {
	src := addr + ":" + strconv.Itoa(port)
	l, err := net.Listen("tcp", src)
	if err != nil {
		fmt.Println("listen error:", err)
		return
	}
	fmt.Println("tcp listen " + src)

	for {
		c, err := l.Accept()
		if err != nil {
			fmt.Println("accept error:", err)
			break
		}

		fmt.Println("連線成功.")
		// start a new goroutine to handle
		// the new connection.
		go handleConn(c)
	}
}

func insertFile(str string) {
	if str != "" {
		file, err := os.OpenFile("./getLog.txt", os.O_RDWR, 0600)
		if err != nil {
			log.Println(err)

			file, err = os.OpenFile("./getLog.txt", os.O_CREATE, 0600)
			if err != nil {
				log.Println(err)
			}
		}
		// make a read buffer
		r := bufio.NewReader(file)

		defer func() {
			if err := file.Close(); err != nil {
				log.Println(err)
			}
		}()

		ifFst := true
		// make a buffer to keep chunks that are read
		for {
			// read a chunk
			ctn, _, err := r.ReadLine()
			if err != nil && err != io.EOF {
				log.Println(err)
			}
			if err == io.EOF {
				break
			}

			if len(ctn) > 0 {
				ifFst = false
			}
		}

		// make a write buffer
		w := bufio.NewWriter(file)
		writeCtn := []byte(str)
		if !ifFst {
			writeCtn = append([]byte("\n"), writeCtn...)
		}
		w.Write(writeCtn)

		if err = w.Flush(); err != nil {
			log.Println(err)
		}
	}
}
