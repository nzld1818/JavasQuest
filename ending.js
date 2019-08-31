(function () {
  'use strict';
/*
 *** エンディング用jsファイル
*/

  /**
  * 宝箱（閉まっている）のグラフィックを描画する関数
  */ 
  function displayTrecloseGraphic() {
    var graphicDivided = document.getElementById('canvas');
    var cboss = graphicDivided.getContext('2d');
    var img = new Image();
    img.src = 'treclose.png';
    img.onload = function() {
      cboss.imageSmoothingEnabled = false;        // 画像がぼやけないようにする
      cboss.drawImage(img, 150, 200, 200, 250);
    }
  }

  /**
  * 宝箱（開いている）のグラフィックを描画する関数
  */ 
 function displayTreopenGraphic() {
  var graphicDivided = document.getElementById('canvas');
  var cboss = graphicDivided.getContext('2d');
  var img = new Image();
  cboss.clearRect(150, 200, 200, 250);
  img.src = 'treopen.png';
  img.onload = function() {
    cboss.imageSmoothingEnabled = false;        // 画像がぼやけないようにする
    cboss.drawImage(img, 150, 200, 200, 250);
  }
}
  displayTrecloseGraphic();
  setTimeout(() => {
    displayTreopenGraphic();
  }, 15000);
})();
