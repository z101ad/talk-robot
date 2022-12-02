(function(){
    let inps = [...$$(".txt")]
    let submit = $(".submit")
    //验证账号
    inps[0].addEventListener("input",Validate.validateLoginUser)
    //验证密码
    inps[1].addEventListener("input",Validate.validateLoginPass)
    //登录提交表单
    submit.addEventListener("click",postLoginForm)
    //提交表单
    async function postLoginForm(){
        // 验证表单
        if(Validate.validateLoginForm()) {
            let loginForm = {
                loginId:inps[0].value,
                loginPwd:inps[1].value
            }
            let data = await API.login(loginForm)
            console.log(data);
            if(data.code === 0){
                for(let item of inps){
                    item.value = ""
                }
                location.href = "index.html"
            }
            else {
                alert("登录失败，"+data.msg)
            }
        }
    }
})()