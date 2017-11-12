$(function () {
    // 初始化参数
    var currentPage = 1;
    var pageSize = 5;
    var $form = $('#form');

    // 渲染页面表格
    function render() {
        $.ajax({
            url: '/product/queryProductDetailList',
            data: {
                page: currentPage,
                pageSize: pageSize
            },
            success: function (data) {
                //console.log(data);
                var html = template('product_tpl', data);
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

    // 添加商品按钮单击事件
    $('.btn_add').on('click', function () {
        $('#addModal').modal('show');
        // 品牌名称下拉菜单数据请求
        $.ajax({
            url: '/category/querySecondCategoryPaging',
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
    });


    //表单校验
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
            brandId: {
                validators: {
                    //非空
                    notEmpty: {
                        message: "请选择二级级分类(品牌名称)"
                    }
                }
            },
            proName: {
                validators: {
                    //非空
                    notEmpty: {
                        message: "商品名称不能为空"
                    }
                }
            },
            proDesc: {
                validators: {
                    //非空
                    notEmpty: {
                        message: "商品描述不能为空"
                    }
                }
            },
            num: {
                validators: {
                    //非空
                    notEmpty: {
                        message: "商品库存不能为空"
                    },
                    regexp: {
                        regexp: /^[1-9]\d*$/,
                        message: '请输入正确的数字'
                    }
                }
            },
            size: {
                validators: {
                    notEmpty: {
                        message: "请输入商品尺码"
                    },
                    regexp: {
                        regexp: /^\d{2}-\d{2}$/,
                        message: "请输入正确的尺码（比如：30-50）"
                    }
                }
            },
            oldPrice: {
                validators: {
                    notEmpty: {
                        message: "请输入商品原价"
                    }
                }
            },
            price: {
                validators: {
                    notEmpty: {
                        message: "请输入商品价格"
                    }
                }
            },
            productLogo: {
                validators: {
                    notEmpty: {
                        message: "请上传三张图片"
                    }
                }
            }
        }
    });

    //校验成功确认按钮单击事件
    $form.on("success.form.bv", function (e) {
        //阻止默认提交
        e.preventDefault();
        var data = $form.serialize();
        var $img = $(".img_preview img");
        data += "&picName1=" + $img[0].dataset.name + "&picAddr1=" + $img[0].dataset.src;
        data += "&picName2=" + $img[1].dataset.name + "&picAddr2=" + $img[1].dataset.src;
        data += "&picName3=" + $img[2].dataset.name + "&picAddr3=" + $img[2].dataset.src;
        console.log(data);
        //使用ajax进行提交
        console.log(data);
        $.ajax({
            url: '/product/addProduct',
            type: 'post',
            data: data,
            success: function (data) {
                if (data.success) {
                    //console.log(data);
                    $('#addModal').modal('hide');
                    currentPage = 1;
                    $form[0].reset();
                    $form.data("bootstrapValidator").resetForm();
                    $('.dropdown_text').text('请选择品牌名称');
                    $(".img_preview img").remove();
                    $("#brandId").val("");
                    $("#productLogo").val("");
                    render();
                }
            }
        })
    })

    //给下拉菜单中每一个选项注册单击事件(委托事件)
    $('.dropdown-menu').on('click', '.brand_a_tag', function () {
        $('.dropdown_text').text($(this).text());
        $('#brandId').val($(this).data('brand-id'));
        $form.data("bootstrapValidator").updateStatus("categoryId", "VALID");
    })


    //初始化文件上传
    $("#fileupload").fileupload({
        dataType: "json",
        //文件上传完成时，会执行的回调函数，通过这个函数就能获取到图片的地址
        //第二个参数就有上传的结果 data.result
        done: function (e, data) {
            if ($('.img_preview img').length >= 3) {
                return false;
            }
            $('.img_preview').append('<img data-name="' + data.result.picName + '" data-src="' + data.result.picAddr + '" src="' + data.result.picAddr + '" width="100" height="100" alt="">');

            //图片校验，判断img_box中img的数量是否是3，如果是，就成功，否则失败
            if ($(".img_preview").find("img").length === 3) {
                $form.data("bootstrapValidator").updateStatus('productLogo', "VALID");
            } else {
                $form.data("bootstrapValidator").updateStatus('productLogo', "INVALID");
            }

            //图片单击删除
            $(".img_preview").find("img").off().on("dblclick", function () {
                //自杀
                $(this).remove();
                //图片校验，判断img_box中img的数量是否是3，如果是，就成功，否则失败
                if ($(".img_box").find("img").length === 3) {
                    $form.data("bootstrapValidator").updateStatus('productLogo', "VALID");
                } else {
                    $form.data("bootstrapValidator").updateStatus('productLogo', "INVALID");
                }
            });
        }
    });
});