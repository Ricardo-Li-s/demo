// 将用户名显示出来
var username = tool.getCookie('username');
if(username){
    var str = `
        <li>
            欢迎<span><a href="user.html">${username}</a></span>会员来到千锋就业办！
        </li>
        <li>
            <a class="logout" href="register.html">退出</a>
        </li>
    `
    $('.userinfo').html(str)
    $('.userinfo .logout').click(function(){
        layer.confirm('你确认要退出吗？', {
            btn: ['残忍离开','我再想想'] //按钮
        }, function(){
            layer.msg('退出成功', {
                icon: 1,
                time:1500
            },function(){
                tool.removeCookie('username');
                var str = `
                    <li>
                        <a href="login.html">登录</a>
                    </li>
                    <li>
                        <a href="register.html">注册</a>
                    </li>
                `
                $('.userinfo').html(str)
            });
        }, function(){
            layer.msg('取消退出', {
                time: 1500, //20s后自动关闭
            });
        });
        return false;
    })
}