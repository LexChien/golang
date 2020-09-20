package database

import (
	"fmt"

	_ "github.com/go-sql-driver/mysql" //加载mysql
	"github.com/jinzhu/gorm"
)

var Eloquent *gorm.DB

func init() {
	var err error
	connArgs := fmt.Sprintf("%s:%s@(%s:%d)/%s?charset=utf8&parseTime=True&loc=Local", "MIKI", "mikilf22", "localhost", 3310, "world")
	Eloquent, err = gorm.Open("mysql", connArgs)

	if err != nil {
		fmt.Printf("mysql connect error %v", err)
	} else {
		fmt.Println("connection succedssed")
	}

	if Eloquent.Error != nil {
		fmt.Printf("database error %v", Eloquent.Error)
	}

}
