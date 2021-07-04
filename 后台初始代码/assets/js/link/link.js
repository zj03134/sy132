//友情链接列表
(function () {
    function getLink() {
        $.ajax({
            url: '/admin/links',
            type: 'GET',
            success: function (res) {
                if (status == 0) {
                    let str = ''
                    res.data.forEach((item) => {
                        str += `<tr>
                        <td>${item.id}</td>
                        <td><div class="back"><img src="http://localhost:8888/uploads/${item.linkicon}" alt=""></div></td>
                        <td>${item.linkname}</td>
                        <td>${item.linkurl}</td>
                        <td>${item.linkdesc}</td>
                        <td>
                            <button class="layui-btn layui-btn layui-btn-xs edit" data-id="${item.id}">编辑</button>
                            <button class="layui-btn layui-btn layui-btn-xs layui-btn-danger delete" data-id="${item.id}">删除</button>
                        </td>
                    </tr> `;
                    })
                    $('tbody').html(str)
                }

            }
        })
    };
    getLink();
    //添加链接
    $('.addLink').on('click', function () {

        let index = layer.open({
            title: '添加',
            type: 1,
            content: $('#addLink').html(),
            area: ['500px', '320px']
        });
        $('#addImg').on('click', function () {
            $('#file').click();
        });
        $('#file').on('change', function () {
            if (this.files.length > 0) {
                let url = URL.createObjectURL(this.files[0])
                $('#Img').attr('src', url)
                if ($('#Img').attr('src')) $('#Img').show()
            };
        });
        $('#addForm').on('submit', function (e) {
            e.preventDefault();
            let fd = new FormData(this);

            $.ajax({
                type: 'POST',
                url: '/admin/links',
                data: fd,
                processData: false,
                contentType: false,
                success: function (res) {
                    if (res.status == 0) {
                        layer.msg(res.message)
                        layer.close(index);
                        getLink();
                    }
                }
            })
        })
    });

    //删除链接
    $('tbody').on('click', '.delete', function () {
        let id = $(this).data('id');
        console.log(id);
        layer.confirm('确实要删除吗?', function (index) {
            $.ajax({
                type: 'DELETE',
                url: '/admin/links/' + id,
                success: function (res) {
                    if (res.status == 0) {
                        getLink();
                        layer.close(index);
                        layer.msg('删除成功', {
                            icon: 6
                        })
                    }
                }
            })
        });

    });

    //编辑链接
    var form = layui.form
    $('tbody').on('click', '.edit', function () {
        let id = $(this).data('id')
        console.log(id);
        $.ajax({
            type: 'GET',
            url: '/admin/links/' + id,
            success: function (res) {
                let index = layer.open({
                    title: '添加',
                    type: 1,
                    content: $('#editLink').html(),
                    area: ['500px', '320px']
                });
                $('#Img').attr('src', 'http://localhost:8888/uploads/' + res.data.linkicon)
                if ($('#Img').attr('src')) $('#Img').show();
                delete res.data.linkicon
                form.val('editFrom', res.data);

                $('#addImg').on('click', function () {
                    $('#file').click();
                });
                //图片
                $('#file').on('change', function () {
                    if (this.files.length > 0) {
                        let url = URL.createObjectURL(this.files[0])
                        $('#Img').attr('src', url)
                    };
                });
                //编辑
                $('#editForm').on('submit', function (e) {
                    e.preventDefault();
                    let fd = new FormData(this)
                    $.ajax({
                        type: 'put',
                        url: '/admin/links/' + id,
                        data: fd,
                        processData: false,
                        contentType: false,
                        success: function (res) {
                            if (res.status == 0) {
                                console.log(123);
                                layer.close(index);
                                getLink();
                            }
                        }
                    })
                })
            }

        })
    })
})()