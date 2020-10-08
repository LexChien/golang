package tcp

import (
	"bytes"
	"encoding/hex"
	"fmt"
	"net"
	"os"
	"strconv"
	"strings"
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

var baseValue = []byte{
	0x34, 0xdc, 0x86, 0xa3, 0x65, 0xda, 0x5d, 0x79, 0xc1, 0xf3, 0x9e, 0x1f, 0x45, 0x78, 0x99, 0x60, 0x89,
}
var num int = 0

func handleConnection(conn net.Conn) {
	remoteAddr := conn.RemoteAddr().String()
	Log("Client connected from: " + remoteAddr)

	for {
		buffer := make([]byte, 2048)
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
		num++
		Data := (buffer[:reqLen])
		// messnager := make(chan byte)

		Log("receive data length:", reqLen)
		// encodedStr := hex.EncodeToString(Data)
		// Log(remoteAddr, "receive data string:\n", encodedStr)
		hexst := ""
		for i, ctn := range baseValue {
			if hexst != "" {
				hexst = hexst + " " + strings.ToUpper(hex.EncodeToString([]byte{ctn}))
			} else {
				hexst = strings.ToUpper(hex.EncodeToString([]byte{ctn}))
			}
			i++
		}
		// Log("baseValue :", hexst)
		hexst = ""
		for i, ctn := range Data {
			if hexst != "" {
				hexst = hexst + " " + strings.ToUpper(hex.EncodeToString([]byte{ctn}))
			} else {
				hexst = strings.ToUpper(hex.EncodeToString([]byte{ctn}))
			}
			i++
		}
		Log("Data :", hexst)
		decodeData := make([]byte, len(Data))
		i := 0
		hexst = ""
		//解密
		for i < 17 {
			// Log("baseValue:", i, baseValue[i], Data[i])
			decodeData[i] = Data[i] ^ baseValue[i]
			// Log("decodeData:", i, decodeData[i])
			hexst = hexst + " " + strings.ToUpper(hex.EncodeToString([]byte{decodeData[i]}))
			i++
		}
		Log("hexst :", hexst)
		i = 0
		res := 0
		//判斷數據是否錯誤
		for i < 14 {
			// fmt.Println(i)
			w := decodeData[i] ^ decodeData[i+1]
			res = res + int(w)
			// Log(i, res, decodeData[i])
			i++
		}
		p := byte(res / 256)
		j := byte(res % 256)
		Log("res : ", res, p, decodeData[15], j, decodeData[16])
		Log("count : ", num)
		if p == decodeData[15] && j == decodeData[16] {
			msg := bytes.NewBufferString("data ok - ")
			msg.WriteString(strconv.Itoa(num))
			conn.Write([]byte(msg.String()))
		} else {
			conn.Write([]byte("data error.\n"))
			conn.Close()
		}

		// //心跳計時
		// go HeartBeating(conn, messnager, 300)
		// //檢測每次Client是否有數據傳來
		// go GravelChannel(Data, messnager)
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
