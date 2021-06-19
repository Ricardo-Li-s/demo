// 判断用户是否登录--判断cookie中会否存在username的值
$(function(){
  var username = getCookie('username');
  var login = document.querySelector('.login');
  if(username){
    var str = `<li><a>欢迎尊贵的<span>${username}</span></a></li>
    <li>|</li>
    <li><a href="javascript:;" class="logout">退出</a></li>
    
    <li>|</li>
    <li><a href="#">会员中心</a></li>
    <li>|</li>
    <li id="carte">        
        客户服务<i class="ci-t"></i>
          <ul class="knfw clearfix" id="uLi">
              <li class="item"><a href="#">新手入门</a></li>
              <li class="item"><a href="#">帮助中心</a></li>
              <li class="item"><a href="#">售后服务</a></li>
              <li class="item"><a href="#">商家服务</a></li>
              <li class="item"><a href="#">关于我们</a></li>
          </ul>
       
  </li>
    `;
    login.innerHTML = str;
    // 退出功能
    var logout = document.querySelector('.logout');
    logout.onclick = function(){
      layer.confirm('你确定要退出吗？',
      {
        btn:['确定','取消']
      },
      function(){
        // 删除cookie
        delCookie('username');
        login.innerHTML = `<ul class=" pull-right login" >
        <li><a href="#">你好，</a></li>
        <li><a href="./login.html">请登录</a></li>
        <li><a href="./register.html">免费注册</a></li>
        <li>|</li>
        <li><a href="#">会员中心</a></li>
        <li>|</li>
        <li id="carte">        
            客户服务<i class="ci-t"></i>
              <ul class="knfw clearfix" id="uLi">
                  <li class="item"><a href="#">新手入门</a></li>
                  <li class="item"><a href="#">帮助中心</a></li>
                  <li class="item"><a href="#">售后服务</a></li>
                  <li class="item"><a href="#">商家服务</a></li>
                  <li class="item"><a href="#">关于我们</a></li>
              </ul>
           
      </li>
         
    </ul>`;
        layer.msg('退出成功',{icon:1,time:500})
      },
      function(){
        layer.msg('已取消',{icon:1,time:500})
        return false;
      }
      )
    }
  }
})