(async function(){
    let doms = {
        user:$("#txtLoginId"),
        pass:$("#txtLoginPwd"),
        name:$("#txtNickname"),
        passCfm:$("#txtLoginPwdConfirm"),
        submit:$(".submit")
    }
    //验证账号
    doms.user.addEventListener("input",Validate.validateUser)
    //验证密码
    doms.pass.addEventListener("input",Validate.validatePass)
    //验证昵称
    doms.name.addEventListener("input",Validate.validateName)
    //再次验证密码
    doms.passCfm.addEventListener("input",Validate.validatePassCfm) 
    //提交表单
    doms.submit.addEventListener("click",postRegForm)
    //注册
    async function postRegForm(){
        // 验证表单
        if(Validate.validateForm()) {
            let regForm = {
                loginId:doms.user.value,
                loginPwd:doms.pass.value,
                nickname:doms.name.value
            }
            let data = await API.reg(regForm)
            if(data.code === 0){
                if(window.confirm("注册成功，要跳转到登录页吗？")){
                    location.href = "login.html";
                }
                doms.user.value = doms.pass.value= doms.passCfm.value = doms.name.value = ""
                
            }
            else {
                alert("注册失败，"+data.msg)
            }
        }
    }
})()