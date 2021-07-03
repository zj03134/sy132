// 发送请求获取数据列表

let params = {
    pagenum: 1,
    pagesize: 2
}

render()

function render() {
    $.ajax({
        url: '/admin/users',
        data: params,
        success: res => {
            if (res.status != 0) return
            laypage(res.total)
            let str = ''
            res.data.forEach((item, index) => {
                str += `
                        <tr>
                        <td>
                            ${index + 1}
                        </td>
                        <td>${item.username}</td>
                        <td>${item.nickname}</td>
                        <td>${item.email}</td>
                        <td>
                        <button type="button" id="edit" class="layui-btn layui-btn-sm" data-id=${item.id}>编辑</button>
                        <button type="button" id="del" class="layui-btn layui-btn-danger layui-btn-sm" data-id=${item.id}>删除</button>
                        <button type="button" id="resetpwd" class="layui-btn layui-btn-normal layui-btn-sm" data-id=${item.id}>重置密码</button>
                        </td>
                        </tr>
                `
            })
            $('tbody').html(str)
        }
    })
}

// 分页区域
function laypage(total) {
    let laypage = layui.laypage;

    //执行一个laypage实例
    laypage.render({
        elem: 'page', //注意，这里的 test1 是 ID，不用加 # 号
        count: total, //数据总数，从服务端得到
        layout: ['count', 'limit', 'prev', 'page', 'next'],
        limit: params.pagesize,
        curr: params.pagenum,
        limits: [2, 5, 8, 10],
        jump: function (obj, first) {
            //obj包含了当前分页的所有参数
            params.pagenum = obj.curr
            params.pagesize = obj.limit
            //首次不执行
            if (!first) {
                render()
            }
        }
    });
}


// 点击修改
let index;
$('tbody').on('click', '#edit', function () {
    let id = $(this).data('id')
    location.href = './edit.html?id=' + id
})

// 点击删除
$('tbody').on('click', '#del', function () {
    let id = $(this).data('id')
    // 询问
    layer.confirm('确定要删除?', {
        icon: 2,
        title: '询问'
    }, function (index) {
        // 发送请求
        $.ajax({
            url: '/admin/users/' + id,
            type: 'delete',
            success: res => {
                if (res.status !== 0) return
                layer.msg(res.message)
                // 渲染页面
                params.pagenum = 1
                render()
            }
        })

        layer.close(index);
    });
})

// 点击重置密码 data-id=${item.id}
let id
let currentIndex
$('tbody').on('click', '#resetpwd', function () {
    id = $(this).data('id')
    currentIndex = layer.open({
        type: 1,
        title: '重置密码',
        content: $('#tem-resetpwd').html(),
        area: ['500px', '300px']
    });
})

// 重置密码
$('body').on('submit', '#resetform', function (e) {
    e.preventDefault()
    let password = $(this).serialize()
    $.ajax({
        url: '/admin/users/' + id,
        type: 'put',
        data: password,
        success: res => {
            if (res.status != 0) return
            layer.msg(res.message)
            // 关闭窗口
            layer.close(currentIndex)
        }
    })
})

// 重置密码的表单验证
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