{/* <div class="chat-item me">
          <img class="chat-avatar" src="./asset/avatar.png" />
          <div class="chat-content">你几岁啦？</div>
          <div class="chat-date">2022-04-29 14:18:13</div>
        </div>
        <div class="chat-item">
          <img class="chat-avatar" src="./asset/robot-avatar.jpg" />
          <div class="chat-content">讨厌，不要随便问女生年龄知道不</div>
          <div class="chat-date">2022-04-29 14:18:16</div>
        </div> */}
(async function(){
    let doms = {
        container:$(".chat-container"),
        msg:$("#txtMsg"),
        btn:$("button"),
        loginId:$("#loginId"),
        nickname:$("#nickname"),
        close:$(".close")
    }
    window.onload = async function(){
        if(localStorage.getItem("token")) {
          let history = await API.getHistory()
        let content = ""
        history.data.forEach((item,index)=>{
            if(index %2 === 0){
                content += `<div class="chat-item me">
                <img class="chat-avatar" src="./asset/avatar.png" />
                <div class="chat-content">${item.content}</div>
                <div class="chat-date">${date.format(item.createdAt)}</div>
              </div>`
            }
            else {
                content += `<div class="chat-item">
                <img class="chat-avatar" src="./asset/robot-avatar.jpg" />
                <div class="chat-content">${item.content}</div>
                <div class="chat-date">${date.format(item.createdAt)}</div>
              </div>`
            }
        })
        doms.container.innerHTML = content
        doms.container.scrollTop = doms.container.scrollHeight
        let {data} = await API.proFile()
        doms.loginId.innerText = data.loginId
        doms.nickname.innerText = data.nickname
        window.onload = null
        }
        else {
          location.replace("login.html")
        }
        
    }
    //发送
    doms.btn.addEventListener("click",sendContent)
    //关闭窗口
    doms.close.addEventListener("click",layout)
    //发送消息
    async function sendContent(){
      if(!doms.meg.value.trim()){
        return
      }
        let obj = {content:doms.msg.value}
        let time = date.format(new Date().getTime())
        doms.container.innerHTML += `<div class="chat-item me">
        <img class="chat-avatar" src="./asset/avatar.png" />
        <div class="chat-content">${obj.content}</div>
        <div class="chat-date">${time}</div>
      </div>`
      doms.container.scrollTop = doms.container.scrollHeight
      doms.msg.value = ""
        let {data,code} = await API.send(obj)
        if(code === 0){
            doms.container.innerHTML += `<div class="chat-item">
            <img class="chat-avatar" src="./asset/robot-avatar.jpg" />
            <div class="chat-content">${data.content}</div>
            <div class="chat-date">${date.format(data.createdAt)}</div>
          </div>`
          doms.container.scrollTop = doms.container.scrollHeight
        }
    }
    //关闭窗口
    function layout(){
        localStorage.removeItem("token")
        location.replace("login.html")
    }
})()