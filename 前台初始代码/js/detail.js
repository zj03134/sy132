$(function () {
    // 先获取id值 
    // URLSearchParams：是用来查询URL中的字符串的
    let id = new URLSearchParams(location.search).get('id')

    // 评论列表
    function comments() {
        $.ajax({
            type: 'GET',
            url: `http://localhost:8888/api/articles/${id}/comments`,
            success: function (res) {
                console.log(res)
                let arr = [`<h4><i class="sprites"></i>评论区</h4>`];
                res.data.forEach(item => {
                    arr.push(`<div class="kr_comment_card">
                    <div class="img-wrap">
                        <img src="./uploads/avatar_3.jpg" alt="">
                    </div>
                    <div class="info">
                        <p>${item.uname}<span>${item.cdate}</span></p>
                        <p>${item.content}</p>
                    </div>
                    <a href="javascript:;" class="like">${item.count}</a>
                </div>`)
                })
                $('.comments').html(arr.join(''))
            }
        })
    }
    comments()

    // 添加内容
    function addContent() {
        $('.comment-from').submit(function (e) {
            // 阻止默认行为
            e.preventDefault()
            let fd = $(this).serialize()
            $.ajax({
                type: 'POST',
                url: `http://localhost:8888/api/articles/${id}/comments`,
                data: fd,
                success: function (res) {
                    // console.log(res)
                    // 判断
                    if (res.status === 0) {
                        layer.msg('评论成功啦！！！')
                        $('.comment-from').get(0).reset()
                        comments()
                    }
                }
            })
        })
    }
    addContent()
    
})