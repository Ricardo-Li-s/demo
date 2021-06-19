class Enlarge{
    constructor(classname){
        this.container = document.querySelector('.'+classname)
        this.middleBox = this.container.querySelector('.middle')
        this.bigBox = this.container.querySelector('.big')
        this.middleImg = this.container.querySelector('.middle>img')
        this.bigImg = this.container.querySelector('.big>img')
        this.smallImgs = this.container.querySelectorAll('.small img')
        this.mark = this.container.querySelector('.mark')
    }
    init(){
        for(let i=0;i<this.smallImgs.length;i++){
            this.smallImgs[i].onclick = ()=>{
                for(let j=0;j<this.smallImgs.length;j++){
                    this.smallImgs[j].className = '';
                }
                this.smallImgs[i].className = 'active';
                this.middleImg.src = this.bigImg.src = this.smallImgs[i].src;
            }
        }
        this.middleBox.onmouseout = ()=>this.mark.style.display = this.bigBox.style.display = 'none';
        this.middleBox.onmouseover = ()=>{
            this.mark.style.display = this.bigBox.style.display = 'block';
            this.middleBox.onmousemove = e=>{
                var e = e || window.event;
                var x = e.pageX;
                var y = e.pageY;
                var left = x - this.mark.offsetWidth/2 - this.container.offsetLeft
                var top = y - this.mark.offsetHeight/2 - this.container.offsetTop
                if(left<=0){
                    left = 0
                }
                if(top<=0){
                    top = 0
                }
                if(left>=this.middleBox.clientWidth - this.mark.offsetWidth){
                    left = this.middleBox.clientWidth - this.mark.offsetWidth
                }
                if(top>=this.middleBox.clientHeight - this.mark.offsetHeight){
                    top = this.middleBox.clientHeight - this.mark.offsetHeight
                }
                this.mark.style.left = left + "px"
                this.mark.style.top = top + "px"
                this.bigImg.style.left = -left/this.middleBox.clientWidth*this.bigImg.offsetWidth + "px"
                this.bigImg.style.top = -top/this.middleBox.clientHeight*this.bigImg.offsetHeight + "px"
            }
        }
    }
}