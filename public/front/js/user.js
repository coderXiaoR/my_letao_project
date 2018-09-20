$(function () {
  $.ajax({
    type: "get",
    url: "/user/queryUserMessage",
    success: function (data) {
      console.log(data);
      if (data.error === 400) {
        mui.toast('data.message');
        location.href = "login.html?retUrl=" + location.href;
      } else {
        var html = template('tpl', data);
        $('.userinfo').html(html);
      }
    }
  });

  //退出登录
  $('.lt_logout').on('click', function () {
    $.ajax({
      type: "get",
      url: "/user/logout",
      success: function (data) {
        if (data.success) {
          location.href = "login.html";
        }
      }
    });
  })
});