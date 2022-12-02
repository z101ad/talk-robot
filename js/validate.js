let Validate =  ( function(){
    let inps = [...$$("input")]
    let ps = [...$$(".err")]
    //注册验证
    //用户名
    function validateUser(){
        let val = inps[0].value.trim()
        let reg = /^\w+$/
        let p_value =(function(value){
            if(!value){
                return "账号不能为空"
            }
            if(!reg.test(value)){
                return "请以英文和数字组合账号"
            }
            if(value.length>11 || value.length<3) {
                return "请输入3-11位字符"
            }
        })(val)
        ps[0].innerText = p_value || ""
        return !p_value
    }
    //密码验证
    function validatePass(){
        let val = inps[2].value.trim()
        let reg = /^[^/\\]+$/
        let p_value =(function(value){
            if(!value){
                return "密码不能为空"
            }
            if(!reg.test(value)){
                return "请以非特殊字符组合密码"
            }
            if(value.length>15 || value.length<6) {
                return "请输入6-15位字符"
            }
        })(val)
        ps[2].innerText = p_value || ""
        return !p_value
    }
    //验证昵称
    function validateName(){
        let val = inps[1].value.trim()
        let reg = /^[^/\\]+$/
        let p_value =(function(value){
            if(!value){
                return "昵称不能为空"
            }
            if(!reg.test(value)){
                return "请以非特殊字符组合昵称"
            }
            if(value.length>11 || value.length<2) {
                return "请输入2-11位字符"
            }
        })(val)
        ps[1].innerText = p_value || ""
        return !p_value
    }
    //验证二次密码
    function validatePassCfm(){
        let val = inps[3].value.trim()
        let pass_val = inps[2].value.trim()
        let p_value = (function(val,pass_val){
            if(!val) {
                return "密码不能为空"
            }
            if(val !== pass_val){
                return "密码与一次密码不一致"
            }
        })(val,pass_val)
        ps[3].innerText = p_value || ""
        return !p_value
    }
    //验证表单
    function validateForm(){
        let f1 = validateUser()
        let f2 = validatePass()
        let f3 = validateName()
        let f4 = validatePassCfm()
        let flag = f1 && f2 && f3 && f4
        return flag
    }

    //登录验证
    //用户名验证
    function validateLoginUser(){
        let val = inps[0].value.trim()
        let p_value =(function(value){
            if(!value){
                return "账号不能为空"
            }
            if(value.length>11 || value.length<3) {
                return "请输入3-11位字符"
            }
        })(val)
        ps[0].innerText = p_value || ""
        return !p_value
    }
    //密码验证
    function validateLoginPass(){
        let val = inps[1].value.trim()
        let p_value =(function(value){
            if(!value){
                return "密码不能为空"
            }
            if(value.length>15 || value.length<6) {
                return "请输入6-15位字符"
            }
        })(val)
        ps[1].innerText = p_value || ""
        return !p_value
    }
    //验证表单
    function validateLoginForm(){
        let f1 = validateLoginUser()
        let f2 = validateLoginPass()
        let flag = f1 && f2 
        return flag
    }
    return {validateUser,validatePass,validateName,validatePassCfm,validateForm,validateLoginUser,validateLoginPass,validateLoginForm}
})()

