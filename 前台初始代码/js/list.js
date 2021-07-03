//文章渲染
$(function () {
    // 列表页面
    // 列表总数
    let total = 10
    // 分页参数
    let params = {
        // 分页参数：页码
        pagenum: 1,
        // 分页参数：每页显示的条数
        pagesize: 5
    }
    // 列表内容
    let arr = [` <div class="kr_news_date">
                        16 <span>08月</span>
                    </div>`]

    // 封装成函数有来加载数据
    function loading() {
        //判断： 如果列表页面数据为不等于0或列表内容>=列表总数
        if (total != 0 && arr.length >= total) {
            return layer.msg('没有更多的数据啦！');
        }
        $.ajax({
            type: 'GET',
            url: 'http://localhost:8888/api/articles',
            data: params,
            // 成功后追加到arr中
            success: function (res) {
                if (res.status === 0) {
                    // 把获取的列表总数重新赋值给total
                    total = res.total
                    res.data.forEach(item => {
                        arr.push(`<div class="item">
                        <h4>
                            <a href="./detail.html?id=${item.id}">${item.title}</a>
                        </h4>
                        <p class="meta">
                            <span>15分钟前 分享至</span>
                            <a href="javascript:;" class="wechat"></a>
                            <a href="javascript:;" class="weibo"></a>
                        </p>
                        <p class="brief">${item.content}</p>
                    </div>`)
                    })
                    $('.kr_news_list').append(arr.join(''))
                }
            }
        })
    }
    loading()
    // 加载更多数据
    $('kr_more').click(function () {
        params.pagenum += 1
        loading()
    })
    // 友情链接
    function loadLink() {
        $.ajax({
            type: 'GET',
            url: 'http://localhost:8888/api/links',
            success: function (res) {
                if (res.status === 0) {
                    let arr = [`<dt>合作伙伴</dt>`]
                    res.data.forEach(item => {
                        arr.push(
                            ` <dd>
                        <a href="${item.linkurl}">
                            <img src="${'http://localhost:8888/uploads/'+item.linkicon}" alt="${item.linkdesc}">
                        </a>
                    </dd>`
                        )
                    })
                    $('.kr_collaborator').html(arr.join(''))
                }
            }
        })
    }
    loadLink()
})