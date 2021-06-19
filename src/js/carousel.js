class Carousel{
    constructor(classname){
        this.container = document.querySelector('.'+classname)
        this.ul = this.container.querySelector('ul')
        this.ol = this.container.querySelector('ol')
        this.leftBtn = this.container.querySelector('a.leftBtn')
        this.rightBtn = this.container.querySelector('a.rightBtn')
        this.firstLi = this.ul.children[0]
        this.index = 1;
        this.flag = true
        this.timerId = null
    }
    init(){
        // 处理ol
        this.handlerOl()
        // 处理ul
        this.handlerUl()
        this.rightClick()
        this.leftClick()
        this.dotClick()
        this.auto()
        this.container.onmouseover = ()=>clearInterval(this.timerId)
        this.container.onmouseout = ()=>this.auto()
    }
    auto(){
        this.timerId = setInterval(()=>{
            if(!this.flag){
                return false;
            }
            this.flag = false
            this.index++
            this.move()
        },1000)
    }
    dotClick(){
        for(let i=0;i<this.ol.children.length;i++){
            this.ol.children[i].onclick = ()=>{
                if(!this.flag){
                    return false;
                }
                this.flag = false
                this.index = i+1;
                this.move()
            }
        }
    }
    leftClick(){
        this.leftBtn.onclick = ()=>{
            if(!this.flag){
                return false;
            }
            this.flag = false
            this.index--
            this.move()
        }
    }
    rightClick(){
        this.rightBtn.onclick = ()=>{
            if(!this.flag){
                return false;
            }
            this.flag = false
            this.index++
            this.move()
        }
    }
    move(){
        tool.animate(this.ul,{
            left:-this.index * this.firstLi.offsetWidth
        },()=>{
            if(this.index === this.ul.children.length-1){
                this.index = 1
                this.ul.style.left = -this.index * this.firstLi.offsetWidth + "px"
            }
            if(this.index === 0){
                this.index = this.ul.children.length-2
                this.ul.style.left = -this.index * this.firstLi.offsetWidth + "px"
            }
            for(var i=0;i<this.ol.children.length;i++){
                this.ol.children[i].style.backgroundColor = '#000';
            }
            this.ol.children[this.index-1].style.backgroundColor = 'red';
            this.flag = true
        })
    }
    handlerUl(){
        // 前后各复制一个li
        var firstLi = this.firstLi.cloneNode(true);
        var lastLi = this.ul.lastElementChild.cloneNode(true);
        this.ul.appendChild(firstLi)
        this.ul.insertBefore(lastLi,this.firstLi)
        // 设置宽度和left
        this.ul.style.width = this.firstLi.offsetWidth * this.ul.children.length + "px";
        this.ul.style.left = -this.firstLi.offsetWidth + "px";
    }
    handlerOl(){
        // 给ol创建li
        for(var i=0;i<this.ul.children.length;i++){
            var li = document.createElement('li')
            this.ol.appendChild(li)
            if(i===0){
                li.style.backgroundColor = 'red';
            }
        }
    }
}