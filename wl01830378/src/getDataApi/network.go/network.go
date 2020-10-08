package network

import (
	"encoding/hex"
	"fmt"
	"getdata/filectrl"
	"net"
	"strconv"
	"time"
)

// var clientConn map[string]*net.Conn

// var servConn []net.Conn

//Init : server初始化
func Init() {
	// clientConn = map[string]*net.Conn{}
	go createAPIServer()
}

func createAPIServer() {
	//建立api
	sevsrc := filectrl.Conf.Addr + ":" + strconv.Itoa(filectrl.Conf.Port)
	server, serr := net.Listen("tcp", sevsrc)
	if serr != nil {
		fmt.Println("listen error:", serr)
		return
	}
	fmt.Println("tcp listen " + sevsrc)

	for {
		var serr error
		servConn, serr := server.Accept()
		if serr != nil {
			fmt.Println("accept error:", serr)
			break
		}

		fmt.Println("client連線成功.")

		go handleConn(&servConn)
	}
}

func connectGameServer(sc *net.Conn, client chan *net.Conn) {
	//連線至game server
	csrc := filectrl.Conf.ServAddr + ":" + strconv.Itoa(filectrl.Conf.ServPort)

	cls, cerr := net.DialTimeout("tcp", csrc, time.Duration(filectrl.Conf.ConnTime)*time.Second)
	if cerr != nil {
		fmt.Println("GameServer 連線失敗.", cerr)
		client <- nil
		return
	}
	fmt.Println("GameServer 連線成功.", csrc, &cls)
	client <- &cls

	for {
		buf := make([]byte, 2048)
		recvlen, err := cls.Read(buf)
		if err == nil {
			_, serr := (*sc).Write(buf[:recvlen])
			fmt.Printf("GameServer %s return len: %d, recv: %s\n", cls.RemoteAddr(), recvlen, string(buf[:recvlen]))
			if serr != nil {
				fmt.Println("GameServer err ", err)
			}
		} else {
			fmt.Println("GameServer 斷線.", csrc, err)
			break
		}
	}
	cls.Close()
	defer func() { cls = nil }()
}

func handleConn(sc *net.Conn) {
	defer (*sc).Close()

	remoteAddr := (*sc).RemoteAddr().String()
	fmt.Println("Client connected from: " + remoteAddr)

	client := make(chan *net.Conn)
	var cs *net.Conn
	go connectGameServer(sc, client)
	cs = <-client
	close(client)

	isSleep := false
	for {
		// Make a buffer to hold incoming data.
		buf := make([]byte, 17)
		// Read the incoming connection into the buffer.
		reqLen, err := (*sc).Read(buf)
		// fmt.Println("handleConn reqLen ", reqLen)
		if err != nil {
			if err.Error() == "EOF" {
				if cs != nil && (*cs) != nil {
					(*cs).Close()
				}
				fmt.Println("Disconned from ", remoteAddr)
				break
			} else {
				fmt.Println("Error reading:", err.Error())
				break
			}
		}
		// count++
		// str := []byte("OK " + strconv.Itoa(count))
		// _, serr := (*sc).Write(str)
		// if serr != nil {
		// 	fmt.Println(serr)
		// 	break
		// }

		fmt.Printf("get len: %d, recv: %s\n", reqLen, hex.EncodeToString(buf))
		if cs != nil && (*cs) != nil && !isSleep {
			go sendPackage(cs, buf[:reqLen])
		} else {
			str := []byte("NG\n")
			_, serr := (*sc).Write(str)
			if serr != nil {
				fmt.Println(serr)
				*sc = nil
				break
			}
			if !isSleep {
				isSleep = true
				fmt.Println("connectGameServer cs dissconnect ", cs, isSleep)
				go reconnectGS(sc, &isSleep, &cs)
			}
		}
	}
}

func sendPackage(c *net.Conn, pack []byte) {
	_, cerr := (*c).Write(pack)
	if cerr != nil {
		fmt.Println(cerr)
	}
}

func reconnectGS(sc *net.Conn, sleep *bool, cs **net.Conn) {
	time.Sleep(time.Duration(filectrl.Conf.ReconnTime) * time.Second)

	if (*sc) != nil {
		client := make(chan *net.Conn)
		go connectGameServer(sc, client)
		fmt.Println("connectGameServer 1 !!!!!!!!!!!! ", cs)
		*cs = <-client
		close(client)
		fmt.Println("connectGameServer 2 !!!!!!!!!!!! ", cs)
		*sleep = false
	}
}
