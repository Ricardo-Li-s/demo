class Tab{
    constructor(classname){
        this.container = document.querySelector('.'+classname)
        this.ulis = this.container.querySelectorAll('ul li')
        this.olis = this.container.querySelectorAll('ol li')
    }
    init(){
        // 绑定事件
        for(var i=0;i<this.ulis.length;i++){
            this.ulis[i].onclick = this.click(i)
        }
    }
    click(j){
        return ()=>{
            for(var i=0;i<this.ulis.length;i++){
                this.ulis[i].className = this.olis[i].className = '';
            }
            this.ulis[j].className = this.olis[j].className = 'active';
        }
    }
}