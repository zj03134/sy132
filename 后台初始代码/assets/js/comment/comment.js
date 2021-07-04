(function () {
    function getComment() {
        $.ajax({
            type: 'GET',
            url: '/admin/comments',
            success: function (res) {
                if (res.status == 0) {
                    let str = '';
                    console.log(res.data);
                    res.data.forEach(function (item) {
                        str += `<tr>
                        <td>${item.id}</td>
                        <td>${item.uname}</td>
                        <td>${item.content}</td>
                        <td>${item.cdate.substring(0,10)}</td>
                        <td>
                            <button data-id="${item.id}" type="button" class="layui-btn layui-btn-xs layui-btn-danger delete">
                                删除
                            </button>
                        </td>
                    </tr>`
                    })
                    $('tbody').html(str)
                }
            }
        })
    }
    getComment();
    //删除
    $('tbody').on('click', '.delete', function () {
        let id = $(this).data('id');
        layer.confirm('确定删除?', {
            icon: 3,
            title: '删?'
        }, function (index) {
            $.ajax({
                type: 'DELETE',
                url: '/admin/comments/' + id,
                success: function (res) {
                    if (res.status == 0) {
                        getComment();
                        layer.close(index);
                    }
                }
            })
        });

    })
})();