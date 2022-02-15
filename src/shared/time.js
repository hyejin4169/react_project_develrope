export const dateView=(date)=>{
    let _date = new Date(date);

    let time_confirm = new Date().getTime() - _date.getTime();

    // 작성한 지 24시간이 지났을 때
    if(time_confirm >= 86400000){
        let date_d = date.split(' ')[0].split('-')

        return(`${date_d[0]}년 ${date_d[1]}월 ${date_d[2]}일`);
    } else {
        // 작성한 지 1분 내일 때
        if(time_confirm < 60000 ){

            return('방금 전')
        // 작성한 지 1시간 내일 때
        } else if(time_confirm >= 60000 && time_confirm < 3600000 ){
            let time = time_confirm/(1000*60)

            return(`${Math.floor(time)}분 전`)
        } else if(time_confirm >= 3600000 && time_confirm < 86400000){
            let time = time_confirm/(1000*60*60)

            return(`${Math.floor(time)}시간 전`)
        }
    }
}