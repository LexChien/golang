package filectrl

import (
	"bufio"
	"encoding/json"
	"fmt"
	"getdata/structs"
	"io"
	"os"
)

//Conf : IP設定
var Conf structs.Configs

//Init : 讀取設定
func Init() {
	file := getFile("./configs/config.json")

	defer func() {
		if err := file.Close(); err != nil {
			panic(err)
		}
	}()

	// make a read buffer
	r := bufio.NewReader(file)
	buf := make([]byte, 1024)
	var Data []byte
	// make a buffer to keep chunks that are read
	for {
		// read a chunk
		recvlen, err := r.Read(buf)
		Data = append(Data, buf[:recvlen]...)
		if err != nil && err != io.EOF {
			panic(err)
		}
		if err == io.EOF {
			break
		}
	}
	// fmt.Println(string(Data))
	json.Unmarshal(Data, &Conf)
}

func getFile(fileurl string) *os.File {
	file, err := os.OpenFile(fileurl, os.O_RDWR, 0600)
	if err != nil {
		file, err = os.OpenFile(fileurl, os.O_CREATE, 0600)
		if err != nil {
			file = nil
			fmt.Println(err)
		}
	}
	return file
}
