package controllers

// WebSocketController handles WebSocket requests.
type RegisterController struct {
	baseController
}



// Get implemented Get() method for AppController.
func (this *AppController) Get() {
	this.TplNames = "register.html"
}

// Register method handles POST requests for AppController.
func (this *AppController) Register() {
	// Get form value.
	uname := this.GetString("uname")
	pwd := this.GetString("password")
	pwd1 := this.GetString("password1")
	email := this.GetString("email")

	// 检查用户输入数据是否合法
	if len(uname) == 0 {
		this.Redirect("/register", 302)
		return
	}

	success := false
	if (pwd == pwd1){
		success = true
	}

	if len(email) == 0 {
		this.Redirect("/register", 302)
		return
	}

	//将用户数据写入数据库



	switch success {
	case true:
		this.Redirect("/success", 302)
	default:
		this.Redirect("/register", 302)
	}
//this.TplNames = "chat.html"
	//转跳到注册成功页面 自动登入系统
	// Usually put return after redirect.
	return
}
