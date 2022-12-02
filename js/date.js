let date = (function(){
    function format(time){
        let date = new Date(time)
        let year  = date.getFullYear()
        let month = date.getMonth()+1
        let day = date.getDate()
        let hour = date.getHours()
        let minute = date.getMinutes()
        let second = date.getSeconds()
        let timer = [year,month,day,hour,minute,second]
        for(let i =0;i<timer.length-1;i++){
            timer[i] = timer[i]<10?("0"+timer[i]):timer[i]
        }
        let timeFormat = `${timer[0]}-${timer[1]}-${timer[2]}   ${timer[3]}:${timer[4]}:${timer[5]}` 
        return timeFormat
    }
    return {format}
})()