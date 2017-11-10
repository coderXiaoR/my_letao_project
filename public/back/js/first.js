$(function () {
    // 初始化参数
    var currentPage = 1;
    var pageSize = 5;
    var $form = $('#form');

    function render() {
        $.ajax({
            url: '/category/queryTopCategoryPaging',
            data: {
                page: currentPage,
                pageSize: pageSize
            },
            success: function (data) {
                //console.log(data);
                var html = template('category_tpl', data);
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
    }
    render();
    $('.btn_add').on('click', function () {
        $('#addModal').modal('show');
    });
    $form.bootstrapValidator({
        //小图标
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        //校验规则
        fields: {
            categoryName: {
                validators: {
                    //非空
                    notEmpty: {
                        message: "请输入一级分类"
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
            url: '/category/addTopCategory',
            type: 'post',
            data: $form.serialize(),
            success: function (data) {
                if (data.success) {
                    //console.log(data);
                    $('#addModal').modal('hide');
                    currentPage = 1;
                    $form[0].reset();
                    $form.data("bootstrapValidator").resetForm();
                    render();
                }
            }
        })
    })
});