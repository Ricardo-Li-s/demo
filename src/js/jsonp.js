function jsonp(url,data,fnname,cb){
    // 将数据中的回调函数设置
    data.cb = fnname
    // 将回调函数传进来，放到window中，起了新名字叫cb
    window.cb = cb
    // 自定义创建script标签
    var script = document.createElement('script')
    // 处理数据和url
    var str = '?';
    var f = '';
    for(var attr in data){
        str += f + attr + '=' + data[attr]
        f = '&'
    }
    url += str
    // 设置src地址
    script.setAttribute('src',url)
    // 将script标签放到head中
    document.head.appendChild(script)
    // 将script标签删除
    document.head.removeChild(script)
}