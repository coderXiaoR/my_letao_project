$(function () {
  //下拉刷新
  mui.init({
    pullRefresh: {
      container: ".mui-scroll-wrapper", //下拉刷新容器标识
      //下拉刷新
      down: {
        auto: true,
        //下拉时，会触发这个function
        callback: function () {

          //发送ajax请求
          $.ajax({
            type: "get",
            url: "/cart/queryCart",
            success: function (data) {
              setTimeout(function () {
                tools.checkLogin(data);
                console.log(data);
                $(".mui-table-view").html(template("tpl", {
                  data: data
                }));

                $(".lt_total .total").html("00.00");

                //结束下拉刷新
                mui(".mui-scroll-wrapper").pullRefresh().endPulldownToRefresh();
              }, 1000);
            }
          });
        }
      }
    }
  });

  $('.mui-table-view').on('tap', '.btn_delete_cart', function () {
    var id = $(this).data('id');
    mui.confirm("您是否要删除这件商品?", "温馨提示", ["是", "否"], function (e) {
      if (e.index == 0) {
        $.ajax({
          type: "get",
          url: "/cart/deleteCart",
          data: {
            id: id
          },
          success: function (data) {
            if (data.success) {
              mui(".mui-scroll-wrapper").pullRefresh().pulldownLoading();
            }
          }
        });
      }
    })
  })

  //编辑功能
  $(".lt_content").on("tap", ".btn_edit_cart", function () {
    //获取到自定义属性对象
    var data = this.dataset;
    html = template('tpl2', data).replace(/\n/g, '');
    mui.confirm(html, '编辑商品', ['确定', '取消'], function (e) {
      if (e.index == 0) {
        var id = data.id;
        var size = $(".lt_edit_size span.now").html();
        var num = $(".lt_edit_num .mui-numbox-input").val();
        $.ajax({
          type: "post",
          url: "/cart/updateCart",
          data: {
            id: id,
            size: size,
            num: num
          },
          success: function (data) {
            if (data.success) {
              //手动下拉刷新
              mui(".mui-scroll-wrapper").pullRefresh().pulldownLoading();
            }
          }
        });
      }
    });
    //选择尺码，lt_edit_size下span注册
    $('.lt_edit_size span').on('tap', function () {
      console.log(11);
      $(this).addClass('now').siblings().removeClass('now');
    })
    //初始化数字框
    mui(".mui-numbox").numbox();
  })

  $('.lt_content').on('change','.ck',function () {  
    var arr = $('.ck:checked');
    var total = 0;
    arr.each(function (i,e) {  
      total += e.dataset.price * e.dataset.num;
    })
    console.log(total);
    // if(total != 0) {
    //   $('.total').html(total.toFixed(2));
    // } {
    //   $('.total').html('00.00');
    // }
    if(total != 0) {
    $('.total').html(total.toFixed(2));
    } else{
      $('.total').html('00.00');
    }
  })
});