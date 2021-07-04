// 添加用户
$('#addform').on('submit', function (e) {
    e.preventDefault()
    let data = $(this).serialize()
    $.ajax({
        url: '/admin/users',
        type: 'post',
        data: data,
        success: res => {
            if (res.status == 0) {
                // 添加成功
                layer.msg(res.message, {
                    time: 2000
                }, function () {
                    // 跳转
                    location.href = './user.html'
                });
            } else {
                layer.msg(res.message);
            }
        }
    })
})


// 表单验证 盐城两次密码是否一致
let form = layui.form
form.verify({
    pass: [
        /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
    ],
    same: function (value, item) {
        let val = $(item).parents('form').find('#pwd').val()
        if (value !== val) {
            return '两次密码不一致!';
        }
    }
});