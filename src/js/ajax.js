function sendAjax(obj){
    // 判断dataType是否传入
    if(!obj.dataType){
        obj.dataType = 'json'
    }
    // 判断类型
    if(obj.dataType.toLowerCase() !== 'xml' && obj.dataType!=='json' && obj.dataType!=='string'){
        throw new Error('dataType必须是xml或string或json')
    }
    // 判断请求方式是否传入
    if(!obj.method){
        obj.method = 'get'
    }
    // 判断是否非get和post
    if(obj.method.toLowerCase()!=='get' && obj.method.toLowerCase()!=='post'){
        throw new Error('请求方式必须是get或post')
    }
    // 判断是否传入url
    if(!obj.url){
        throw new Error('地址必填')
    }
    // 地址是否在字符串
    if(typeof obj.url !== 'string'){
        throw new Error('请传入正确的地址')
    }
    // 判断是否传入async
    if(obj.async === undefined){
        obj.async = true
    }
    // 判断是否异步的参数必须是布尔值
    if(typeof obj.async !== 'boolean'){
        // 抛出自定义错误
        throw new Error("async参数必须是布尔值")
    }
    // 定义最终数据变量
    var str = '';
    if(obj.data){
        // 判断传入的数据是字符串还是object
        if(typeof obj.data === 'object'){
            // 判断是否传入data
            if(obj.data){
                // 将data这个对象转为字符串
                var f = '';
                for(var attr in obj.data){
                    str += f + attr + '=' + obj.data[attr]
                    f = '&'
                }
            }
        }else if(typeof obj.data === 'string'){
            str = obj.data
        }else{
            throw new Error('数据必须是对象或字符串')
        }
        // 判断请求方式是否是get
        if(obj.method.toLowerCase() === 'get'){
            obj.url += '?'+str
        }
    }
    // 判断函数是否传入
    if(!obj.success){
        obj.success = function(){}
    }
    if(!obj.error){
        obj.error = function(){}
    }
    // 判断传入的fn类型是否是函数
    if(typeof obj.success !== 'function'){
        throw new Error("success必须是函数")
    }
    if(typeof obj.error !== 'function'){
        throw new Error("error必须是函数")
    }
    var xhr = new XMLHttpRequest()
    xhr.onreadystatechange = function(){
        if(xhr.readyState === 4){
            if(/^2\d{2}$/.test(xhr.status)){
                var res = '';
                switch(obj.dataType.toLowerCase()){
                    case 'string':
                        res = xhr.responseText;
                    break;
                    case 'json':
                        res = xhr.responseText;
                        res = JSON.parse(res)
                    break;
                    case "xml":
                        res = xhr.responseXML;
                    break;
                }
                obj.success(res)
            }else{
                // 处理失败
                obj.error()
            }
        }
    }
    xhr.open(obj.method,obj.url,obj.async)
    // 判断数据是否存在，再判断是否是post请求才能设置请求头
    if(obj.data){
        if(obj.method.toLowerCase() === 'post'){
            // 设置请求头
            xhr.setRequestHeader('content-type','application/x-www-form-urlencoded')
            xhr.send(str)
            return false;
        }
    }
    xhr.send()
}


function promiseAjax(obj){
    return new Promise(function(resolve,reject){
        // 发送ajax
        // 判断dataType是否传入
        if(!obj.dataType){
            obj.dataType = 'json'
        }
        // 判断类型
        if(obj.dataType.toLowerCase() !== 'xml' && obj.dataType!=='json' && obj.dataType!=='string'){
            throw new Error('dataType必须是xml或string或json')
        }
        // 判断请求方式是否传入
        if(!obj.method){
            obj.method = 'get'
        }
        // 判断是否非get和post
        if(obj.method.toLowerCase()!=='get' && obj.method.toLowerCase()!=='post'){
            throw new Error('请求方式必须是get或post')
        }
        // 判断是否传入url
        if(!obj.url){
            throw new Error('地址必填')
        }
        // 地址是否在字符串
        if(typeof obj.url !== 'string'){
            throw new Error('请传入正确的地址')
        }
        // 判断是否传入async
        if(obj.async === undefined){
            obj.async = true
        }
        // 判断是否异步的参数必须是布尔值
        if(typeof obj.async !== 'boolean'){
            // 抛出自定义错误
            throw new Error("async参数必须是布尔值")
        }
        // 定义最终数据变量
        var str = '';
        if(obj.data){
            // 判断传入的数据是字符串还是object
            if(typeof obj.data === 'object'){
                // 判断是否传入data
                if(obj.data){
                    // 将data这个对象转为字符串
                    var f = '';
                    for(var attr in obj.data){
                        str += f + attr + '=' + obj.data[attr]
                        f = '&'
                    }
                }
            }else if(typeof obj.data === 'string'){
                str = obj.data
            }else{
                throw new Error('数据必须是对象或字符串')
            }
            // 判断请求方式是否是get
            if(obj.method.toLowerCase() === 'get'){
                obj.url += '?'+str
            }
        }
        var xhr = new XMLHttpRequest()
        xhr.onreadystatechange = function(){
            if(xhr.readyState === 4){
                if(/^2\d{2}$/.test(xhr.status)){
                    var res = '';
                    switch(obj.dataType.toLowerCase()){
                        case 'string':
                            res = xhr.responseText;
                        break;
                        case 'json':
                            res = xhr.responseText;
                            res = JSON.parse(res)
                        break;
                        case "xml":
                            res = xhr.responseXML;
                        break;
                    }
                    resolve(res)
                }else{
                    // 处理失败
                    reject()
                }
            }
        }
        xhr.open(obj.method,obj.url,obj.async)
        // 判断数据是否存在，再判断是否是post请求才能设置请求头
        if(obj.data){
            if(obj.method.toLowerCase() === 'post'){
                // 设置请求头
                xhr.setRequestHeader('content-type','application/x-www-form-urlencoded')
                xhr.send(str)
                return false;
            }
        }
        xhr.send()
    })
}