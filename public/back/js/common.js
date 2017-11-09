$(function () {
  // 公共的js代码
  //1.发送ajax请求时有进度条显示
  //去掉右上角进度圈
  NProgress.configure({ showSpinner: false });
  $(document).ajaxStart(function () {
    NProgress.start()
  })
  $(document).ajaxStop(function () {
    setTimeout(() => {
      NProgress.done(500)
    }, 800);
  })

  // 验证登录状态的接口
  //非登录页都要验证
  if (location.href.indexOf('login.html') < 0) {
    //为非登录页
    $.ajax({
      url:'/employee/checkRootLogin',
      success:function (data) {  
        if (data.error === 400) {
          //登陆失败
          location.href = 'login.html';
        }
      }
    })
  }

  //退出登录按钮
  $('.btn_confirm').on('click',function () {  
    $.ajax({
      url:'/employee/employeeLogout',
      success:function (data) {  
        if (data.success) {
          location.href = 'login.html'
        }
      }
    })
  })

  //左上菜单按钮
  $('.btn_menu').on('click',function () {
    console.log(11111);  
    $('#lt_aside').toggleClass('hidden_self');
    $('#lt_main').toggleClass('full_width');
  })
  //点击切换二级菜单
  $('.side_nav li:eq(1)>a').on('click',function () {  
    $('.child').slideToggle();
  })
});