
const videoTimeFormater = (time: number) => {
  let newTime: string = "00:00"

  if (time >= 60) {
    if (time < 60*60) {
      let min = Math.floor(time/60);
      let sec = Math.floor(time%60);
      newTime = `${min >= 10 ? min : '0' + min}:${sec >= 10 ? sec : '0' + sec}`
    } else {
      let hour = Math.floor(time/(60*60));
      let min = Math.floor((time%60*60)/60);
      let sec = Math.floor((time%60*60)%60);
      newTime = `${hour}:${min >= 10 ? min : '0' + min}:${sec >= 10 ? sec : '0' + sec}`
    }
  } else {
    newTime = `00:${time >= 10 ? time : '0' + time}`
  }

  return newTime;
}

export default videoTimeFormater