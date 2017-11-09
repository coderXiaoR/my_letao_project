$(function () {
  $('form').bootstrapValidator({
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },
    fields: {
      username: {
        message: '用户名验证失败',
        validators: {
          notEmpty: {
            message: '用户名不能为空'
          },
          regexp: {
            regexp: /^[a-zA-Z0-9_]+$/,
            message: '用户名只能包含大写、小写、数字和下划线'
          },
          callback:{
            message:"用户名或密码错误"
          }
        }
      },
      password: {
        validators: {
          notEmpty: {
            message: '密码不能为空'
          },
          stringLength: {
            min: 6,
            max: 12,
            message: '密码长度必须在6到12位之间'
          },
          callback:{
            message: '用户名或密码错误'
          }
        }
      }
    }
  });
  $('form').on('success.form.bv',function (e) {
    //阻止submit按钮的默认行为
    e.preventDefault();
    $.ajax({
      type:'post',
      url:'/employee/employeeLogin',
      data:$('form').serialize(),
      success:function (data) {  
        if(data.success) {
          location.href = 'index.html'
        }
        if(data.error === 1000 || data.error === 1001){
          //alert("用户名不存在")
          //使用updateStatus方法，主动把username这个字段变成校验失败
          //第一个参数：字段名  表单中的name属性
          //第二个参数：INVALID :校验失败
          //第三个参数：配置提示消息
          $('form').data("bootstrapValidator").updateStatus("username", "INVALID", "callback");
          $('form').data("bootstrapValidator").updateStatus("password", "INVALID","callback");
        }
      }
    })
  })
  //表单重置功能
  $("[type='reset']").on("click", function () {
    
        //获取到validator对象，调用resetForm方法
        $('form').data("bootstrapValidator").resetForm();
      });
});