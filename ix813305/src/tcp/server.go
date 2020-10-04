package tcp

import (
	"encoding/hex"
	"fmt"
	"net"
	"os"
	"time"
)

func Startserver() {
	netListen, err := net.Listen("tcp", ":5000")
	CheckError(err)

	defer netListen.Close()

	Log("Waiting for clients")
	for {
		conn, err := netListen.Accept()
		if err != nil {
			continue
		}
		Log(conn.RemoteAddr().String(), " tcp connect success")
		go handleConnection(conn)

	}
}
func handleConnection(conn net.Conn) {
	remoteAddr := conn.RemoteAddr().String()
	Log("Client connected from: " + remoteAddr)
	buffer := make([]byte, 2048)
	for {
		// Read the incoming connection into the buffer.
		reqLen, err := conn.Read(buffer)
		if err != nil {

			if err.Error() == "EOF" {
				Log("Disconned from ", remoteAddr)
				break
			} else {
				Log("Error reading:", err.Error())
				break
			}
		}
		// Send a response back to person contacting us.

		Data := (buffer[:reqLen])
		messnager := make(chan byte)

		Log("receive data length:", reqLen)
		encodedStr := hex.EncodeToString(Data)
		Log(remoteAddr, "receive data string:\n", encodedStr)
		for i, r := range Data {
			Log(i, r, string(r))
		}
		i := 0
		res := 0
		//判斷數據是否錯誤
		for i <= 14 {
			// fmt.Println(i)
			res = res + int(Data[i]^Data[i+1])
			i++
		}
		Log("res : ", res)
		p := byte(res / 256)
		j := byte(res % 256)
		Log(p, Data[15], j, Data[16])
		if p == Data[15] && j == Data[16] {
			conn.Write([]byte("data ok.\n"))
		} else {
			conn.Write([]byte("data error.\n"))
		}

		//心跳計時
		go HeartBeating(conn, messnager, 300)
		//檢測每次Client是否有數據傳來
		go GravelChannel(Data, messnager)
	}

}

//心跳計時，依據GravelChannel推斷Client是否在設定時間內發來信息
func HeartBeating(conn net.Conn, readerChannel chan byte, timeout int) {
	select {
	case fk := <-readerChannel:
		Log(conn.RemoteAddr().String(), "receive data string:", string(fk))
		conn.SetDeadline(time.Now().Add(time.Duration(timeout) * time.Second))
		//conn.SetReadDeadline(time.Now().Add(time.Duration(5) * time.Second))
		break
	case <-time.After(time.Second * 5):
		Log("It‘s really weird to get Nothing!!!")
		conn.Close()
	}

}

func GravelChannel(n []byte, mess chan byte) {
	for _, v := range n {
		mess <- v
	}
	close(mess)
}

func Log(v ...interface{}) {
	fmt.Println(v...)
}

func CheckError(err error) {
	if err != nil {
		fmt.Fprintf(os.Stderr, "Fatal error: %s", err.Error())
		os.Exit(1)
	}
}
