let API = (function () {
  //默认域名
  const baseURL = "https://study.duyiedu.com";
  //默认数据格式
  const header = { "Content-Type": "application/json" };

  //post请求
  async function post(path, body) {
    if(body.token){
        header.Authorization = "Bearer " + body.token;
    }
    body = JSON.stringify(body);
    let resp = await fetch(baseURL + path, {
      method: "POST",
      headers: header,
      body: body,
    });
    return resp;
  }

  //get请求
  async function get(path, params) {
    let p = "?"
    if(!params.token){
        let arr = Object.keys(params)
        for(let item of arr){
            p += `${item}=${params[item]}&`
        }
        p = p.slice(0,p.length-1)
    }
    else if(params.token){
        p = ""
        header.Authorization = "Bearer "+params.token
    }
    let resp = await fetch(baseURL + path + p, {
      headers: header
    });
    return resp;
  }

  //登录功能
  /**
   *
   * @param {Object} loginForm
   * @returns {Function} Promise
   */
  async function login(loginForm) {
    //请求头
    let data = await post("/api/user/login", loginForm);
    //请求体
    let result = await data.json();
    if(result.code === 0){
        let token = data.headers.get('authorization')
        localStorage.setItem("token", token);
    }
    return result;
  }

  //注册功能
  /**
   *
   * @param {Object} regForm
   * @returns {Function} Promise
   */
  async function reg(regForm) {
    let data = await post("/api/user/reg",regForm)
    return await data.json()
  }

  //验证用户功能
  /**
   *
   * @param {Object} loginId
   * @returns {Function} Promise
   */
  async function exists(loginId) {
    let data = await get("/api/user/exists", loginId);
    return data.json();
  }

  //获取当前用户
  /**
   *
   * @param {Object} token
   * @returns {Function} Promise
   */
  async function proFile() {
    let token = localStorage.getItem('token')
    let data = await get("/api/user/profile",{token})
    return await data.json()
  }

  //发送消息
  /**
   *
   * @param {Object} sendForm
   * @returns {Function} Promise
   */
  async function send(sendForm) {
    sendForm.token = localStorage.getItem("token")
    let data = await post("/api/chat",sendForm)
    return await data.json()
  }

  //获取所有聊天记录
  /**
   *
   * @returns {Function} Promise
   */
  async function getHistory() {
    let params = {token:localStorage.getItem("token")}
    let data = await get("/api/chat/history",params)
    return data.json()
  }
  return { login,reg, exists ,proFile,send,getHistory};
})();
