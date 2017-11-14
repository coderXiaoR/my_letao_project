$(function () {
    $('.btn_login').on('click', function () {
      var username = $('[name=username]').val();
      var password = $('[name=password]').val();
      if (!username) {
        mui.toast('请输入用户名');
        return false;
      }
      if (!password) {
        mui.toast('请输入用密码');
        return false;
      }
      $.ajax({
        type: "post",
        url: "/user/login",
        data: {
          username: username,
          password: password
        },
        success: function (data) {
          if (data.error) {
            mui.toast('用户名或密码错误!');
          } else if (data.success) {
            //console.log(data);
            //判断是否成功
            //获取retUrl参数，如果没有这个参数，说明直接跳转到会员中心，如果有，跳转到指定的页面
            var search = location.search; //获取参数

            if (search.indexOf("retUrl") == -1) {
              //没有，跳转到会员中心
              location.href = "user.html";
            } else {
              //有跳转到retUrl对应的地址中
              search = search.replace("?retUrl=", "");
              location.href = search;
            }
          }
        }
      })

    })
});