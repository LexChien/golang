package main

import (
	"encoding/hex"
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

var baseValue = []byte{
	0x34, 0xdc, 0x86, 0xa3, 0x65, 0xda, 0x5d, 0x79, 0xc1, 0xf3, 0x9e, 0x1f, 0x45, 0x78, 0x99, 0x60, 0x89,
}

func handle(conn net.Conn) {

	buf := make([]byte, 2048)

	for {
		n, err := conn.Read(buf)

		if err != nil {
			fmt.Println("收到錯誤：", err.Error())
			return
		}

		recv_data := buf[:n]
		for i, data := range recv_data {
			recv_data[i] = data ^ baseValue[i]
		}

		res := 0
		for i := 0; i < 14; i++ {
			da := recv_data[i] ^ recv_data[i+1]
			res += int(da)
		}
		p := byte(res / 256)
		j := byte(res % 256)

		retrunData := "NG"
		if p == recv_data[15] && j == recv_data[16] {
			retrunData = "OK"
		} else {
			fmt.Println("比較錯誤")
		}
		fmt.Println("收到資料：", buf[:n], "p=", hex.EncodeToString([]byte{p}), "j=", hex.EncodeToString([]byte{j}), retrunData)
		_, werr := conn.Write([]byte(retrunData))
		if werr != nil {
			fmt.Println(werr)
			break
		}
	}

}

func checkError(err error) {
	if err != nil {
		fmt.Println("連線失敗:", err.Error())
		os.Exit(1)
	}
}
