function Tip(){
    // 创建遮罩
    this.mask = document.createElement('div')
    // 设置样式
    this.setStyle(this.mask,{
        width:"100%",
        height:"100%",
        backgroundColor:'rgba(11,11,11,.7)',
        position:"absolute",
        left:0,
        top:0
    })
}
// 设置样式的方法
Tip.prototype.setStyle = function(ele,styleObj){
    for(var attr in styleObj){
        ele.style[attr] = styleObj[attr]
    }
}
// 显示一个跟alert一样的弹窗
Tip.prototype.alert = function(message){
    // 创建div
    this.content = document.createElement('div')
    this.setStyle(this.content,{
        width:"300px",
        height:"200px",
        border:"1px solid #000",
        backgroundColor:"#fff",
        position:"absolute",
        left:"50%",
        top:"50%",
        transform:"translate(-50%,-50%)"
    })
    // 把content放到遮罩中
    this.mask.appendChild(this.content)
    // 放入标题
    var h1 = document.createElement('h1')
    h1.innerText = '提示弹窗';
    this.content.appendChild(h1)
    this.setStyle(h1,{
        fontSize:"20px",
        textAlign:"center",
    })
    this.p = document.createElement('p')
    this.p.innerText = message;
    this.content.appendChild(this.p)
    this.setStyle(this.p,{
        margin:"0 20px",
        lineHeight:"24px"
    })
    // 创建确定按钮
    var btn = document.createElement('button')
    btn.innerText = '确定'
    this.content.appendChild(btn)
    this.setStyle(btn,{
        position:"absolute",
        right:"20px",
        bottom:"15px",
        outline:'none',
        border:"none",
        backgroundColor:"skyblue"
    })
    btn.onclick = ()=>{
        this.close()
    }
    // 关闭按钮
    var span = document.createElement('span')
    span.innerText = '×';
    this.setStyle(span,{
        position:"absolute",
        right:0,
        top:0,
        fontSize:"20px",
        marginRight:"10px",
        color:"#ccc"
    })
    span.onmouseover = function(){
        this.style.cursor = "pointer"
    }
    span.onclick = ()=>{
        this.close()
    }
    this.content.appendChild(span)
    // 显示遮罩
    document.body.appendChild(this.mask)
}
// 关闭弹窗
Tip.prototype.close = function(){
    document.body.removeChild(this.mask)
}

var tishikuang = new Tip()
console.log(456);