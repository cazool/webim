
package main

import (
	"github.com/cazool/beego"
	"github.com/cazool/i18n"

	"github.com/cazool/webim/controllers"
)

const (
	APP_VER = "0.0.1"
)

func main() {
	beego.Info(beego.AppName, APP_VER)

	// Register routers.
	beego.Router("/", &controllers.AppController{})
	// Indicate AppController.Join method to handle POST requests.
	beego.Router("/join", &controllers.AppController{}, "post:Join")



	beego.Router("/im", &controllers.ImController{})
	beego.Router("/im/join", &controllers.ImController{},"get:Join")


	beego.Router("/register", &controllers.RegisterController{}, "post:Register")

	// Register template functions.
	beego.AddFuncMap("i18n", i18n.Tr)

	beego.Run()
}
