$(function () {

  //通过localStorage获取搜索的历史记录
  function getHistory() {
    var history = localStorage.getItem('lt_search_history') || '[]';
    var arr = JSON.parse(history);
    return arr;
  }
  // 渲染历史记录列表函数
  function render() {
    var arr = getHistory();
    var html = template('tpl_history', {
      arr: arr
    });
    $('.lt_history').html(html);
  }
  //初始化渲染搜索历史记录列表
  render();

  // 清空历史记录
  $('.lt_history').on('click', '.btn_empty', function () {
    mui.confirm("您确定要清空历史记录吗？", "温馨提示", ["取消", "确定"], function (e) {
      if (e.index == 1) {
        localStorage.setItem('lt_search_history', '[]');
        render();
      }
    })

  })
  //删除单个记录
  $('.lt_history').on('click', '.btn_delete', function () {
    var $this = $(this);
    mui.confirm("您确定要清空历史记录吗？", "温馨提示", ["取消", "确定"], function (e) {
      if (e.index == 1) {
        var index = $this.data('index');
        console.log(index);
        var arr = getHistory();
        arr.splice(index, 1);
        localStorage.setItem('lt_search_history', JSON.stringify(arr));
        render();
      }
    })
  })

  //增加操作
  $('.btn_search').on('click',function () {  
    var key = $('.lt_search input').val().trim();
    //清空原来的记录
    $(".lt_search input").val('');
    if (key === "") {
      mui.toast("请输入搜索内容");
      return false;
    }
    var arr = getHistory();
    var index = arr.indexOf(key);
    if(index != -1) {
      //搜索记录有key
      arr.splice(index,1);
    }
    if(arr.length >= 10) {
      arr = arr.slice(0,-1);
    }
    arr.unshift(key);
    //重新存储到lt_search_history
    localStorage.setItem("lt_search_history", JSON.stringify(arr));
    render();
    location.href = "searchList.html?key="+key;
  })
});