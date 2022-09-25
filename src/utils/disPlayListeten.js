const viewCheckFn = () => {
  let hiddenTime, visibleTime
  return () => {
    if (document.visibilityState == 'hidden') {
      //记录页面隐藏时间
      hiddenTime = new Date().getTime()
    } else {
      visibleTime = new Date().getTime();
      //页面再次可见的时间-隐藏时间>10S,重连	
      if ((visibleTime - hiddenTime) / 1000 > 10) {
        // 主动关闭连接
        // 1.5S后重连 因为断开需要时间，防止连接早已关闭了
        console.log('重启了');
        alert('可以实现')
      } else {
        console.log('还没有到断开的时间')
      }
    }
  }
}
export default document.addEventListener('visibilitychange', viewCheckFn())