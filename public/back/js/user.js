$(function () {
    var currentPage = 1;
    var pageSize = 5;

    function render() {
        $.ajax({
            url: '/user/queryUser',
            data: {
                page: currentPage,
                pageSize: pageSize
            },
            success: function (data) {
                // console.log(data);
                var html = template('user_tpl', data);
                $('tbody').html(html);
                $('#paginator').bootstrapPaginator({
                    bootstrapMajorVersion: 3,
                    currentPage: currentPage,
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
    //点击按钮启用禁用状态
    $('tbody').on('click', '.btn-sm', function () {
        $('#userModal').modal('show');
        var userid = $(this).data('userid');
        var isDelete = $(this).hasClass('btn-danger') ? 0 : 1;
        $('.btn_user_status').off().on('click', function () {
            $.ajax({
                url: '/user/updateUser',
                type: 'post',
                data: {
                    id: userid,
                    isDelete: isDelete
                },
                success: function () {
                    $('#userModal').modal('hide');
                    render();
                }
            })
        })
    })

});