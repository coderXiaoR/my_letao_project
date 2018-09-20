$(function () {
  var productId = tools.getParam('productId');
  //console.log(productId);  
  $.ajax({
    url: '/product/queryProductDetail',
    data: {
      id: productId
    },
    success: function (data) {
      //处理尺码数据
      var size = data.size.split('-');
      var sizeArr = [];
      for (var i = +size[0]; i <= size[1]; i++) {
        sizeArr.push(i);
      }
      data['pro_size'] = sizeArr;
      //console.log(data);
      $('.mui-scroll').html(template('product_tpl', data));
      mui('.mui-slider').slider({
        interval: 1000
      });

      //单击尺码添加now类名
      $('.lt_size span').on('click', function () {
        $(this).addClass('now').siblings().removeClass('now');
      })
      //初始化数字盒子
      mui('.mui-numbox').numbox();
    }
  });

  $('.add_cart').on('click', function () {
    var num = $('.mui-numbox-input').val();
    var size = $('span.now').html();
    if (!size) {
      mui.toast('请选择尺码');
      return false;
    }
    $.ajax({
      type: "post",
      url: "/cart/addCart",
      data: {
        productId: productId,
        num: num,
        size: size
      },
      success: function (data) {
        tools.checkLogin(data);
        if (data.success) {
          //添加购物车成功
          mui.confirm('继续购物吗?', '添加到购物车成功!', ['去购物车', '继续浏览'], function (e) {
            if (e.index == 0) {
              location.href = 'cart.html';
            }
          })
        }
      }
    });
  })

});