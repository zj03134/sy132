$(function () {

    $('#password').on('focus', function () {
        $('form').css('transform', 'translateY(-180px)')
    })
    $('#password').on('blur', function () {
        $('form').css('transform', 'translateY(-100px)')
        $('#btn').trigger('click')
    })

    $('html').on('mousemove', function (e) {
        let x = e.pageX / $(this)[0].offsetWidth * 15
        let y = e.pageY / $(this)[0].offsetHeight * 12
        $('.eye-ball').css('width', x + 'px')
        $('.eye-ball').css('height', y + 'px')
    })
    // 粒子线条背景
    $(document).ready(function () {
        $('.layui-container').particleground({
            dotColor: '#7ec7fd',
            lineColor: '#7ec7fd'
        })
    })
    // 登录操作
    var form = layui.form
    $('#login').submit(function (e) {
        e.preventDefault()
        var fd = $(this).serialize()
        $.ajax({
            type: 'post',
            url: 'api/login',
            data: fd,
            success: function (res) {
                // 登录成功后，跳转到主页面
                if (res.status === 0) {
                    // 把登录成功的标志位存储在客户端
                    localStorage.setItem('mytoken', res.token)
                    // 跳转到主页面
                    location.href = './index.html'
                } else {
                    // 登录失败
                    layer.msg(res.message)
                }
            }
        })
    })
})