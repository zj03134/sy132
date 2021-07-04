// 数据回填

let id = location.search.substring(4)
$.ajax({
    url: '/admin/users/' + id,
    success: res => {
        if (res.status != 0) return
        // 数据回填
        let form = layui.form
        form.val('editform', res.data)
    }
})

$('#editform').on('submit', function (e) {
    e.preventDefault()
    let data = $(this).serialize()
    $.ajax({
        type: 'put',
        data: data,
        url: '/admin/users',
        success: res => {
            if (res.status != 0) return
            layer.msg(res.message, {
                time: 1000
            }, function () {
                // 跳转页面
                location.href = './user.html'
            })
        }
    })
})