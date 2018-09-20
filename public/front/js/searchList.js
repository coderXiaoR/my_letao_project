$(function () {
  var page = 1;
  var pageSize = 100;

  //获取地址栏中的key参数的值
  var key = tools.getParam('key');
  $(".lt_search input").val(key);

  //封装一个函数，这个函数可以发送ajax请求，渲染页面
  function render() {
    var obj = {};
    obj.page = page;
    obj.pageSize = pageSize;
    obj.proName = key;
    if($('.sort_price').hasClass('now')){
      obj['price'] = $('.sort_price').find('i').hasClass('fa-angle-down')?2:1;
    }
    if($('.sort_num').hasClass('now')){
      obj['num'] = $('.sort_num').find('i').hasClass('fa-angle-down')?2:1;
    }   
    $.ajax({
      type:'get',
      url:'/product/queryProduct',
      data:obj,
      success: function (data) {  
        var html = template('tpl_product',data);
        $('.lt_product').html(html);
      }
    })
  }
  //初始化渲染
  render();

  //点击搜索按钮，需要获取到key，重新渲染
  $('.btn_search').on('click',function () {  
    key = $('.lt_search input').val().trim();
    if (key === '') {
      mui.toast('请输入关键字');
      return false;
    }
    $('.lt-sort span').removeClass('now').find('i').removeClass('fa-angle-up').addClass('fa-angle-down');
    render();
  })

  //点击排序栏切换样式
  $('.btn_sort').on('click',function () {
    if($(this).hasClass('now')){
      $(this).find('i').toggleClass('fa-angle-up').toggleClass('fa-angle-down');
    } else {
      //颜色 
      $('.lt_sort span').removeClass('now');
      $(this).addClass('now');
      //字体图标样式
      $(this).siblings().find('i').removeClass('fa-angle-up').addClass('fa-angle-down');
    }
    render();
  })
});