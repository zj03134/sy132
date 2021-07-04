$(function () {
    // ---------------------表单验证-------------------
    $('.layui-form').on('submit', function (e) {
        // 阻止默认行为
        e.preventDefault()
        //使用serialize要检查name的属性
        let data = $(this).serialize()

        $.ajax({
            type: 'post',
            url: '/api/login',
            data: data,
            success: function (res) {
                if (res.status === 0) {
                    layer.msg(res.message)
                    location.href = 'index.html '
                }
            }
        })
    })
})