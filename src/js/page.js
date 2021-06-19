function Page(classname,options={},show=function(){}){
    this.show = show || function(){}
    // 将参数options作为对象的属性
    this.options = options
    // 自定义一个参数 - 如果有传进来参数，就是用传进来的参数，如果没有传进来参数，就使用自己定义的
    this.default = {
        language:{
            first:"首页",
            prev:"上一页",
            list:'',
            next:"下一页",
            last:"尾页"
        },
        pageData:{
            total:100,
            pageSize:8
        }
    }
    // 处理参数：有传，就将传进来的参数代替default，如果没有传，就使用default
    this.setDefault()
    // 定义一个属性用来代表放页码的盒子
    this.list = null
    // 计算总页数
    this.totalPage = Math.ceil(this.default.pageData.total/this.default.pageData.pageSize)
    // 定义当前页
    this.currentPage = 1
    // 获取到准备放分页的盒子
    this.box = document.querySelector('.'+classname)
    // 创建了一个div，作为分页的容器
    this.container = document.createElement('div')
    // 添加鼠标移入事件，让光效变成手指状态
    this.container.onmouseenter = function(){
        this.style.cursor = 'pointer';
    }
    // 不允许选中容器的文字
    this.container.onselectstart = function(){
        return false;
    }
    // 给容器设置样式
    this.setStyle(this.container,{
        width:"800px",
        height:"50px",
        // border:"1px solid #000",
        margin:"0 auto",
        display:"flex",
        justifyContent:"center",
        alignItems:"center"
    })
    // 将容器添加到分页盒子中
    this.box.appendChild(this.container)
    // 创建div
    this.createDiv()
    // 点击动起来
    this.dong()
    // 添加文本框和按钮跳转
    this.go()
    // // 创建页码
    // this.createPage()
    // // 设置禁用项
    // this.setDisabled()
    // // 调用函数
    // this.show(this.currentPage)
}
// 添加文本框和按钮跳转
Page.prototype.go = function(){
    // 创建文本框和按钮添加到容器中
    var input = document.createElement('input')
    input.type = 'number';
    this.container.appendChild(input)
    this.setStyle(input,{
        width:"50px",
        border:"1px solid #000",
        height:"28px",
        margin:"5px",
        outline:"none",
        paddingLeft:"6px",
    })
    var btn = document.createElement('button')
    btn.innerText = 'GO';
    this.container.appendChild(btn)
    this.setStyle(btn,{
        width:"50px",
        border:"1px solid #000",
        height:"32px",
        margin:"5px",
        outline:"none",
        paddingLeft:"6px",
        backgroundColor:"yellowgreen"
    })
}
// 设置禁用项
Page.prototype.setDisabled = function(){
    // 判断当前页是否是1
    if(this.currentPage === 1){
        this.container.children[0].setAttribute('disabled','true')
        this.container.children[1].setAttribute('disabled','true')
        this.container.children[0].style.backgroundColor = '#ccc';
        this.container.children[1].style.backgroundColor = '#ccc';
    }else{
        this.container.children[0].setAttribute('disabled','false')
        this.container.children[1].setAttribute('disabled','false')
        this.container.children[0].style.backgroundColor = 'transparent';
        this.container.children[1].style.backgroundColor = 'transparent';
    }
    // 判断当前页是否是最后一页
    if(this.currentPage === this.totalPage){
        this.container.children[3].setAttribute('disabled','true')
        this.container.children[4].setAttribute('disabled','true')
        this.container.children[3].style.backgroundColor = '#ccc';
        this.container.children[4].style.backgroundColor = '#ccc';
    }else{
        this.container.children[3].setAttribute('disabled','false')
        this.container.children[4].setAttribute('disabled','false')
        this.container.children[3].style.backgroundColor = 'transparent';
        this.container.children[4].style.backgroundColor = 'transparent';
    }
}
// 点击动起来
Page.prototype.dong = function(){
    // 所有子元素都需要点击事件，利用事件委托，给容器绑定
    this.container.onclick = e=>{
        var e = e || window.event;
        var target = e.target || e.srcElement;
        // 通过类名判断点击的是哪个标签
        if(target.className === 'first' && target.getAttribute('disabled')!=='true'){
            this.currentPage = 1
            // this.createPage()
            // this.setDisabled()
            // this.show(this.currentPage)
            this.init()
        }else if(target.className === 'prev' && target.getAttribute('disabled')!=='true'){
            this.currentPage--
            if(this.currentPage <= 1){
                this.currentPage = 1
            }
            this.init()
        }else if(target.className === 'next' && target.getAttribute('disabled')!=='true'){
            this.currentPage++
            if(this.currentPage >= this.totalPage){
                this.currentPage = this.totalPage
            }
            this.init()
        }else if(target.className === 'last' && target.getAttribute('disabled')!=='true'){
            this.currentPage = this.totalPage
            this.init()
        }else if(target.nodeName === "P" && this.currentPage!==target.innerText-0){
            this.currentPage = target.innerText - 0
            this.init()
        }else if(target.nodeName === "BUTTON" && this.currentPage!==target.previousElementSibling.value-0){
            this.currentPage = target.previousElementSibling.value-0
            if(this.currentPage>=this.totalPage){
                this.currentPage = this.totalPage
                target.previousElementSibling.value = this.totalPage
            }
            if(this.currentPage <= 1){
                this.currentPage = 1
                target.previousElementSibling.value = 1
            }
            this.init()
        }
        
    }
}
// 创建页码
Page.prototype.createPage = function(){
    // 清空list
    this.list.innerHTML = '';
    // 根据总页数和当前页创建不同的页码
    // 1.总页数小于5  1~总页数
    if(this.totalPage<=5){
        this.createP(1,this.totalPage)
    }
    // 2.总页数大于5
       
    else{
        // 1.当前页<=3  1~5
        if(this.currentPage<=3){
            this.createP(1,5)
        }
        // 2.当前页>=总页数-1   最后5个页面  总页数-4~总页数
        else if(this.currentPage>=this.totalPage-2){
            this.createP(this.totalPage-4,this.totalPage)
        }
        // 3.当前页-2~当前页+2
        else{
            this.createP(this.currentPage-2,this.currentPage+2)
        }
    }
}
// 创建p标签的方法
Page.prototype.createP = function(start,end){
    for(var i=start;i<=end;i++){
        var p = document.createElement('p')
        p.innerText = i
        this.list.appendChild(p)
        this.setStyle(p,{
            padding:"5px",
            margin:"5px",
            border:"1px solid #000"
        })
        if(this.currentPage === i){
            p.style.backgroundColor = 'orange';
        }
    }
}
// 创建div
Page.prototype.createDiv = function(){
    // 遍历default的language来创建div
    for(var attr in this.default.language){
        // 创建div
        var div = document.createElement('div')
        // 放入内容
        div.innerText = this.default.language[attr]
        // 将div放到容器中
        this.container.appendChild(div)
        // 给div添加类名
        div.className = attr
        // 给div设置样式
        if(attr === 'list'){
            this.list = div
            this.setStyle(div,{
                display:"flex",
                justifyContent:"center",
                alignItems:"center"
            })
        }else{
            this.setStyle(div,{
                padding:"5px",
                margin:"5px",
                border:"1px solid #000"
            })
        }
        
    }
}
// 设置参数的方法
Page.prototype.setDefault = function(){
    // 将传进来的language中的值替换自己定义的default中的language
    for(var attr in this.options.language){
        this.default.language[attr] = this.options.language[attr]
    }
    for(var attr in this.options.pageData){
        this.default.pageData[attr] = this.options.pageData[attr]
    }
}
// 定义设置样式的方法
Page.prototype.setStyle = function(ele,styleObj){
    for(var attr in styleObj){
        ele.style[attr] = styleObj[attr]
    }
}
// 初始化方法
Page.prototype.init = function(){
    this.createPage()
    this.setDisabled()
    this.show(this.currentPage)
}