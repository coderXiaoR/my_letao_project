$(function () {
  var return_vcode = null;
  //点击按钮获取验证码
  $('.btn_getcode').on('click', function () {
    $this = $(this);
    // 定义倒计时变量
    var count = 60;
    var mobile = $('[name=usmobile]').val();
    //console.log($this);

    $(this).prop('disabled', true).addClass('disabled').val('正在发送中...');
    $.ajax({
      type: "get",
      url: "/user/vCode",
      success: function (data) {
        console.log(data);
        if (data.vCode) {
          //发送验证码成功
          return_vcode = data.vCode;
          var timer = setInterval(function () {
            $this.html(count + '秒后重新发送');
            count--;
            if (count < 0) {
              $this.html('获取验证码');
              clearInterval(timer);
              $this.prop('disabled', false).removeClass('disabled');
            }
          }, 1000)
        } else {
          //发送验证码失败
          $this.prop('disabled', false).removeClass('disabled');
        }
      }
    });
  })

  //给注册按钮注册单击事件
  $('.btn_register').on('click', function () {
    var username = $('[name=username]').val();
    var password = $('[name=password]').val();
    var repassword = $('[name=repassword]').val();
    var mobile = $('[name=mobile]').val();
    var vCode = $('[name=vCode]').val();
    var checked = $('.checkbox').prop('checked');
    if (!username) {
      mui.toast('用户名不能为空');
      return false;
    }
    if (username.length < 6) {
      mui.toast('用户名不的少于6位');
      return false;
    }
    if (!password) {
      mui.toast('密码不得为空');
      return false;
    }
    if (password.length < 6) {
      mui.toast('密码不的少于6位');
      return false;
    }
    if (repassword != password) {
      mui.toast('两次密码输入不一致');
      return false;
    }
    if (!/^1[34578]\d{9}$/.test(mobile)) {
      mui.toast('请输入正确的手机号');
      return false;
    }
    if (vCode != return_vcode) {
      mui.toast('验证码输入错误');
      return false;
    }
    if (!checked) {
      mui.toast('请同意会员协议');
      return false;
    }
    $.ajax({
      type: "post",
      url: "/user/register",
      data: {
        username: username,
        password: password,
        mobile: mobile,
        vCode: vCode
      },
      success: function (data) {
        if (data.success) {
          mui.toast("恭喜你，注册成功，1秒后跳转到登录页");
          setTimeout(function () {
            location.href = "login.html";
          }, 1000);
        } else {
          mui.toast(data.message);
        }
      }
    });
  })
});