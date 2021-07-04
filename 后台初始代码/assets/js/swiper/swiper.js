function xuanran() {
    var form = layui.form
    $.ajax({
        type: 'GET',
        url: '/admin/swipers',
        success: function (res) {
            if (res.status === 0) {
                let str = ''
                let status = ''
                let statuselse = ''
                res.data.forEach(item => {
                    status = item.swiperstatus === 1 ? 'block' : 'none'
                    statuselse = item.swiperstatus === 1 ? 'none' : 'block'

                    str += `
                    <tr>
                        <td>${item.id}</td>
                        <td><img src="http://localhost:8888/uploads/${item.swiperimg}"></td>
                        <td>${item.swiperimg}</td>
                        <td>
                        <span data-id=${item.id} data-status=2 style="display: ${status};" class="layui-badge">√</span>
                        <span data-id=${item.id} data-status=1 style="display: ${statuselse}" class="layui-badge layui-bg-green">×</span>
                        </td>
                        <td>
                            <button data-id=${item.id} type="button" class="layui-btn layui-btn-primary layui-border-blue"
                                style="float: right;">删除</button>
                        </td>
                    </tr>
                    `
                });

                $('#app').html(str)

            }
        }
    })
}



xuanran()

$('.layui-table #app').on('click', '.layui-badge', function (e) {

    let status = $(e.target).data('status')
    // status = status == 1 ? 2 : 1
    let id = $(this).data('id')
    $.ajax({
        type: 'put',
        url: '/admin/swipers/' + id,
        data: {
            status: status
        },
        success: function (res) {
            if (res.status === 0) {
                // 切换成功
                console.log(res);
                layer.msg(res.message)
                xuanran()
            }
        }
    })
})

$('.layui-table #app').on('click', '.layui-btn', function (e) {
    let id = $(this).data('id')
    layer.confirm('你确定要删除吗', function (index) {
        $.ajax({
            type: 'delete',
            url: '/admin/swipers/' + id,
            success: function (res) {
                if (res.status === 0) {
                    layer.msg(res.message)
                    xuanran()
                    layer.close(index)
                }
            }
        })
    })

})


// 点击上传

$('button:contains("上传图片")').on('click', function () {
    $('.aaa').trigger('click')
})


$('body').on('change', '.aaa', function (e) {
    console.log(111);
    let files = e.target.files
    var fd = new FormData()
    for (let i = 0; i < files.length; i++) {
        fd.append('swipers', files[i])
    }
    $.ajax({
        type: 'post',
        url: '/admin/swipers',
        data: fd,
        processData: false,
        contentType: false,
        success: function (res) {
            if (res.status === 0) {
                layer.msg(res.message)
                xuanran()
            }
        }
    })
})