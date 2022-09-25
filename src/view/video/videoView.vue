<template>
  <div class="container">
    <button @click="dd">拍照</button>
    <button @click="camera">调用摄像头</button>
    <video id="video"></video>
    <canvas id="canvas"></canvas>
    <div class="divbox"></div>
  </div>
</template>
<script lang='ts' setup>
let video, canvas, context

const dd = () => {
  context.drawImage(video, 0, 0, 100, 100);
}

const camera = () => {
  function getUserMedia(constraints, success, error) {
    if (navigator.mediaDevices.getUserMedia) {
      console.log(1);
      navigator.mediaDevices.getUserMedia(constraints).then(success).catch(error);
    } else if (navigator.webkitGetUserMedia) {
      console.log(2);
      navigator.webkitGetUserMedia(constraints, success, error);
    } else if (navigator.mozGetUserMedia) {
      console.log(3);
      navigator.mozGetUserMedia(constraints, success, error);
    } else if (navigator.getUserMedia) {
      console.log(4);
      navigator.getUserMedia(constraints, success, error)
    }
  }

  video = document.getElementById('video');
  canvas = document.getElementById('canvas');
  context = canvas.getContext('2d');
  //成功回调
  function success(stream) {
    video.srcObject = stream;
    video.play();
  }
  //失败回调
  function error(error) {
    console.log("访问用户媒体失败");
  }
  //开启摄像头
  if (navigator.mediaDevices.getUserMedia || navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia) {
    getUserMedia({ video: { width: 500, height: 500 } }, success, error)
  } else {
    alert("不支持");
  }
  //实现拍照的功能

  var type = 'jpg';
  var _fixType = function (type) {
    type = type.toLowerCase().replace(/jpg/i, 'jpeg');
    var r = type.match(/png|jpeg|bmp|gif/)[0];
    return 'image/' + r;
  };

  var saveFile = function (filename) {
    //获取canvas标签里的图片内容
    var imgData = document.getElementById('canvas').toDataURL(type);
    imgData = imgData.replace(_fixType(type), 'image/octet-stream');

    var save_link = document.createElementNS('http://www.w3.org/1999/xhtml', 'a');
    save_link.href = imgData; //base64码
    save_link.download = filename;//图片名称

    var divbox = document.getElementById("box");
    divbox.innerText = imgData;

    var event = document.createEvent('MouseEvents');
    event.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
    save_link.dispatchEvent(event);

  };
}


</script>
<style scoped lang='less'>
.container {
  padding-top: 46px;

  .video-js {
    width: 100%;
  }
}
</style>