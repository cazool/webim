;(function ($) {
  var _deepin_im = {};
  _deepin_im.version = '0.1';
  _deepin_im.is_init = false;
  _deepin_im.msg_max_length = 200;

  function createMsgBox() {
    return '<div id="message"> <div class="msg-box-user"> <div><iframe name="deepin-msg-box-receiver-user" frameborder="1"></iframe></div> <div><iframe name="deepin-msg-box-sender-user" frameborder="1"></iframe></div> </div> </div>';
  }

  function initEvent() {
    _deepin_im['deepin-chat-model'] = avalon.define('deepin-chat', function(vm){
      vm.chat = {
        left_word: _deepin_im.msg_max_length,
        myself: "deepin",
        current_user: "test1"
      };
      vm.message = "";
      vm.message_list = [
          {
              "who": "test1",
              "from": "test1",
              "to": "deepin",
              "text": "你好，deepin",
              "time": new Date("2014-07-11T02:02:19.584Z")
          },
          {
              "who": "test1",
              "from": "deepin",
              "to": "test1",
              "text": "你好，test1",
              "time": new Date("2014-07-11T02:05:19.584Z")
          },
          {
              "who": "test2",
              "from": "test2",
              "to": "deepin",
              "text": "你好，deepin",
              "time": new Date("2014-07-11T02:02:19.584Z")
          },
          {
              "who": "test2",
              "from": "deepin",
              "to": "test2",
              "text": "你好，test2",
              "time": new Date("2014-07-11T02:05:19.584Z")
          }
      ];
      vm.send = function() {
        var msgContent = vm.message.trim();
        if (msgContent && msgContent.length <= _deepin_im.msg_max_length){
          //ajax request process
          var data = {
            who: vm.chat.current_user,
            from: vm.chat.myself,
            to: vm.chat.current_user,
            text: msgContent,
            time: new Date()
          };
          _deepin_im['deepin-socket'].send(data);
          vm.message_list.push(data);
          vm.message = '';
          vm.chat.left_word = _deepin_im.msg_max_length;
        }
      };
    });
    avalon.scan();

    $("textarea.deepin-message-sendbox").keypress(function(event){
      console.log(event);
      if (event.keyCode === 13) {
        $('input.deepin-message-send-bt').click();
        return false;
      }
    });

    $("textarea.deepin-message-sendbox").keyup(function(event){
      _deepin_im['deepin-chat-model'].chat.left_word = _deepin_im.msg_max_length - event.target.value.length;
    });
  }
  function initMessageBox(opts) {
    //var msgBox = $(createMsgBox());
    //$('body').append(msgBox);
    $.ajax({      // 为了测试方便先用ajax获取标签内容
      url: "static/widget.html",
      success: function(data, textStatus, jqXHR){
        var ele = jqXHR.responseText;
        $('body').append(ele);
        initEvent();
      },
    });
  }

  $.extend({
    DeepinIM: function(opts) {
      opts = opts || {};
      if (_deepin_im.is_init) {
        return;
      }
      _deepin_im.is_init = true;
      initMessageBox(opts);
    }
  });

  // socket连接
  var DeepinSocket = function() {
      this.connection = null;
      this.connect();
  };

  DeepinSocket.prototype.connect = function() { //TODO
    if (!window.WebSocket) {
      alert('你的浏览器不支持WebSocket!');
      return null;
    }
    this.connection = new WebSocket('ws://' + window.location.host + '/im/join?uname=test1');
    this.connection.onopen = function () {
      console.log("open success!");
    };

    this.connection.onerror = function (error) {
      console.log("error", error);
    };
  };

  DeepinSocket.prototype.send = function(msg) { //TODO
    console.log(msg);

    if (!this.connection) {
      return;
    }
    this.connection.send(JSON.stringify(msg));
  };

  _deepin_im['deepin-socket'] = new DeepinSocket();

  window.changeUser = function(u) {  // 仅用于测试
    _deepin_im['deepin-chat-model'].chat.current_user = u;
  };
})(jQuery);
