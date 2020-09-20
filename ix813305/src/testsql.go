package main

import (
	"database/sql"
	"encoding/json"
	"fmt"

	_ "github.com/go-sql-driver/mysql"
)

const (
	host     = "fishdbdev.czhmjsoufoap.ap-southeast-1.rds.amazonaws.com"
	database = "vphx"
)

type userInfo struct {
	username string `json:"username"`
	id       string `json:"id"`
}

func checkError(err error) {
	if err != nil {
		panic(err)
	}
}

func sqlConnect(user string, password string) string {
	var connectionString = fmt.Sprintf("%s:%s@tcp(%s:3306)/%s?allowNativePasswords=true", user, password, host, database)

	// Initialize connection object.
	db, err := sql.Open("mysql", connectionString)
	// checkError(err)
	defer db.Close()
	if err != nil {
		return "connect failed"
	}
	str := ""
	err = db.Ping()
	// checkError(err)
	if err != nil {
		return "Ping failed"
		// return fmt.Sprintf("Query failed,err:%v\n", err)
	}
	fmt.Println("Successfully created connection to database.")
	rows, err := db.Query("SELECT username ,id from phx_player limit 10;")
	// checkError(err)
	defer rows.Close()
	if err != nil {
		// return fmt.Sprintf("Query failed,err:%v\n", err)
		return "data failed"
	}
	fmt.Println("Reading data:")
	for rows.Next() {
		u := new(userInfo)
		err := rows.Scan(&u.username, &u.id)
		checkError(err)
		b, err := json.Marshal(u)
		if err != nil {
			return fmt.Sprintf("Query failed,err:%v\n", err)
		}
		fmt.Println("scan successd1:", u)
		fmt.Println("scan successd2:", string(b))
		str += fmt.Sprintf("{username:%s,id:%s},", u.username, u.id)
		// users = append(users, user)
	}
	err = rows.Err()
	checkError(err)
	fmt.Println("Done.")
	return str
}
