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
});