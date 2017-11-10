$(function () {
    // 初始化参数
    var currentPage = 1;
    var pageSize = 5;
    var $form = $('#form');

    function render() {
        $.ajax({
            url: '/category/querySecondCategoryPaging',
            data: {
                page: currentPage,
                pageSize: pageSize
            },
            success: function (data) {
                //console.log(data);
                var html = template('brand_tpl', data);
                $('tbody').html(html);
                $('#paginator').bootstrapPaginator({
                    bootstrapMajorVersion: 3,
                    currentPage: data.page,
                    totalPages: Math.ceil(data.total / data.size),
                    onPageClicked: function (a, b, c, page) {
                        //page指的是点击的页码,修改了当前页
                        currentPage = page;
                        //重新渲染
                        render();
                    }
                });
            }
        })
        $.ajax({
            url: '/category/queryTopCategoryPaging',
            data: {
                page: 1,
                pageSize: 100
            },
            success: function (data) {
                //console.log(data);
                var html1 = template('dropdown_tpl', data);
                $('.dropdown-menu').html(html1);
            }
        })
    }
    render();
    $('.btn_add').on('click', function () {
        $('#addModal').modal('show');
    });

    $form.bootstrapValidator({
        //设置不校验的内容，所有的都校验
        excluded: [],
        //小图标
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        //校验规则
        fields: {
            categoryId: {
                validators: {
                    //非空
                    notEmpty: {
                        message: "请选择一级分类"
                    }
                }
            },
            brandName: {
                validators: {
                    //非空
                    notEmpty: {
                        message: "请输入二级分类名称"
                    }
                }
            },
            brandLogo: {
                validators: {
                    //非空
                    notEmpty: {
                        message: "请上传二级分类logo图片"
                    }
                }
            }
        }
    });
    $form.on("success.form.bv", function (e) {
        //阻止默认提交
        e.preventDefault();
        //使用ajax进行提交
        $.ajax({
            url: '/category/addSecondCategory',
            type: 'post',
            data: $form.serialize(),
            success: function (data) {
                if (data.success) {
                    //console.log(data);
                    $('#addModal').modal('hide');
                    currentPage = 1;
                    $form[0].reset();
                    $form.data("bootstrapValidator").resetForm();
                    $('.dropdown_text').text('请选择一级分类');
                    $(".img_preview img").attr("src", "images/none.png");
                    $("#categoryId").val("");
                    $("#brandLogo").val("");
                    render();
                }
            }
        })
    })

    //给下拉菜单中每一个选项注册单击事件(委托事件)
    $('.dropdown-menu').on('click', '.brand_a_tag', function () {
        $('.dropdown_text').text($(this).text());
        $('#categoryId').val($(this).data('category-id'));
        $form.data("bootstrapValidator").updateStatus("categoryId", "VALID");
    })
    //初始化文件上传
    //初始化文件上传
    $("#fileupload").fileupload({
        dataType: "json",
        //文件上传完成时，会执行的回调函数，通过这个函数就能获取到图片的地址
        //第二个参数就有上传的结果 data.result
        done: function (e, data) {
            //console.log("图片上传完成拉");
            //console.log(data);
            //console.log(data.result.picAddr);
            $(".img_preview img").attr("src", data.result.picAddr);
            //把图片的地址放到隐藏域中
            $("#brandLogo").val(data.result.picAddr);
            //让brandLogo校验成功
            $form.data("bootstrapValidator").updateStatus("brandLogo", "VALID");
        }
    });
});