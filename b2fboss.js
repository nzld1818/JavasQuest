(function () {
  'use strict';
/*
 *** 地下2階ボス戦用jsファイル
*/
  // 変数定数定義部
  var randomNumber = 0;               // タイプする文字列を選ぶ時の乱数の格納用
  var dispTypeText = null;            // タイプするテキストの見本を表示する時用
  var bossEnergy = 120;               // ボスの体力（初期値は最大体力）
  var playerEnergy = 100;             // プレイヤーの体力（初期値は最大体力）
  var dispBossEnergy = "";            // ボスの残り体力（画面表示用）
  var dispPlayerEnergy = "";          // プレイヤーの残り体力（画面表示用）
  var typedCount = 0;                 // 入力済みテキスト文字数のカウント用
  var sampleDivided = [               // HTMLのdiv領域（タイプする文字列表示エリア）
    document.getElementById('sample-area1'),
    document.getElementById('sample-area2'),
    document.getElementById('sample-area3'),
    document.getElementById('sample-area4')
  ];
  var upstairButton = document.createElement( "BUTTON" );        // ゲームクリア後のボタン表示用
  var bossBattleButton = document.createElement( "BUTTON" );     // ゲームオーバー後のボタン表示用
  var flgTypeEnd = 0;               // タイピングを終えたかどうかの判定フラグ
  var gameEndFlg = 0;               // ボス戦が終わったか判断するフラグ（0:継続、1:終了）
  var startTime = null;             // タイマーのスタート時間
  var points = 0;                   // タイピングによって得た点数を格納
  const typingTextCharNumber = 4;   // typingTexts各要素の文字数
  const typingTexts = [             // 表示用タイピング文字列
    'away',
    'boat',
    'cost',
    'does',
    'easy',
    'find',
    'gold',
    'hope',
    'item',
    'jump',
    'know',
    'luck',
    'menu',
    'node',
    'over',
    'park',
    'quiz',
    'rain',
    'snow',
    'text',
    'upon',
    'view',
    'wind',
    'xmas',
    'year',
    'zone'
  ];
  const typingTextElementNumber = 26;                   // typingTextsの要素数
  const resultText = document.createElement('h2');      // HTMLのdiv領域
  const statusText = document.createElement('h2');
  const remarksText = document.createElement('h2');
  const resultDivided = document.getElementById('result-area');
  const statusDivided = document.getElementById('status-area');
  const remarksDivided = document.getElementById('remarks-area');
  
  // 実行部
  displayGoalGraphic();
  displayBossGraphic()
  displayStartText();
  setTimeout(() => {
    displayTypingText();
  }, 3000);

  // 関数定義部
  /**
  * 指定した要素の子どもを全て除去する関数
  * @param {HTMLElement} element HTMLの要素
  */
  function removeAllChildren(element) {
    while (element.firstChild) {          // 子どもの要素があるかぎり除去
      element.removeChild(element.firstChild);
    }
  }

  /**
  * プレーヤーがタイピングするべき文字列を画面に表示する関数
  */
  function displayTypingText() {
    // 乱数の取得（texts配列から任意の要素を1つ取り出すために使う）
    randomNumber = Math.floor( Math.random() * typingTextElementNumber );
    dispTypeText = typingTexts[randomNumber];
    for (var i=0; i<typingTextCharNumber; i++) {
      const header = document.createElement('h1');
        header.innerText = dispTypeText.slice(i,i+1);
        sampleDivided[i].appendChild(header);
    }
  }

  /**
  * ゲームスタート時にテキストの画面表示を行う関数
  */
  function displayStartText() {
    removeAllChildren(resultDivided);
    resultText.innerText = '画面の上の文字をタイピングしてボスを倒そう！';
    resultDivided.style.color = "#ff0000";
    resultDivided.appendChild(resultText);  
    setTimeout(() => {
      removeAllChildren(statusDivided);
      statusDivided.style.color = "#ff0000";
      for(var j=0; j<(bossEnergy/10); j++) {      // ボスの現時点の体力を再表示
        dispBossEnergy = dispBossEnergy + '■';
      }
      statusText.innerText = "ENEMY  : " + dispBossEnergy;
      statusDivided.appendChild(statusText);            // ボス体力の表示
      removeAllChildren(remarksDivided);
      remarksDivided.style.color = "#0000ff";
      for(var k=0; k<(playerEnergy/10); k++) {          // プレイヤーの現時点の体力を再表示
        dispPlayerEnergy = dispPlayerEnergy + '■';
      }
      remarksText.innerText = "PLAYER: " + dispPlayerEnergy;
      remarksDivided.appendChild(remarksText);
      removeAllChildren(resultDivided);
    }, 3000);
  }

  /**
  * ダンジョン（階段あり）画面を描画する関数
  */  
  function displayGoalGraphic() {
    var graphicDivided = document.getElementById('canvas');
    var ctx = graphicDivided.getContext('2d');
    // パスの開始
    ctx.beginPath();
    // 外側の左線
    ctx.moveTo(10, 10);     // 起点
    ctx.lineTo(10, 490);    // 終点
    // 外側の右線
    ctx.moveTo(490, 10);    // 起点
    ctx.lineTo(490, 490);   // 終点
    // 左上からの斜め線
    ctx.moveTo(10, 10);     // 起点
    ctx.lineTo(170, 170);   // 終点
    // 左下からの斜め線
    ctx.moveTo(10, 490);    // 起点
    ctx.lineTo(170, 330);   // 終点
    // 右上からの斜め線
    ctx.moveTo(490, 10);    // 起点
    ctx.lineTo(330, 170);   // 終点
    // 右下からの斜め線
    ctx.moveTo(490, 490);   // 起点
    ctx.lineTo(330, 330);   // 終点
    // 内側の左線
    ctx.moveTo(170, 170);   // 起点
    ctx.lineTo(170, 330);   // 終点
    // 内側の右線
    ctx.moveTo(330, 170);   // 起点
    ctx.lineTo(330, 330);   // 終点
    // 内側の上線
    ctx.moveTo(170, 170);   // 起点
    ctx.lineTo(330, 170);   // 終点
    // 内側の下線
    ctx.moveTo(170, 330);   // 起点
    ctx.lineTo(330, 330);   // 終点
    ctx.clearRect(200, 10, 5, 480);

    ctx.fillStyle = "#000066";      // 背景色の指定
    ctx.strokeStyle = "#ffffff";    // 線色の指定
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.stroke();   // 描画

    // 階段の描画
    ctx.fillStyle = "#ffffff";      // 背景色の指定
    ctx.fillRect(200, 10, 5, 330);  // 階段左側の縦線
    ctx.fillRect(295, 10, 5, 330);  // 階段右側の縦線
    ctx.fillRect(200, 20, 95, 5);   // 階段の足場（横線、以下同じ）
    ctx.fillRect(200, 70, 95, 5); 
    ctx.fillRect(200, 120, 95, 5); 
    ctx.fillRect(200, 170, 95, 5); 
    ctx.fillRect(200, 220, 95, 5); 
    ctx.fillRect(200, 270, 95, 5); 
    ctx.stroke();   // 描画

    // 上階の光部分の描画
    ctx.beginPath();
		ctx.moveTo(120,10); // 最初の点の場所
		ctx.lineTo(200,10); // 2番目の点の場所
		ctx.lineTo(200,40); // 3番目の点の場所
    ctx.closePath();
    ctx.stroke();       // 描画
    ctx.fillStyle = "#ffffff";      // 背景色の指定
    ctx.fill();

    ctx.beginPath();
		ctx.moveTo(380,10); // 最初の点の場所
		ctx.lineTo(300,10); // 2番目の点の場所
		ctx.lineTo(300,40); // 3番目の点の場所
    ctx.closePath();
    ctx.stroke();       // 描画
    ctx.fillStyle = "#ffffff";      // 背景色の指定
    ctx.fill();
    ctx.fillRect(200, 10, 100, 30);   // 四角形の描画 
  }

  /**
  * ボスのグラフィックを描画する関数
  */ 
  function displayBossGraphic() {
    var graphicDivided = document.getElementById('canvas');
    var cboss = graphicDivided.getContext('2d');
    var img = new Image();
    img.src = 'wiz.png';
    img.onload = function() {
      cboss.imageSmoothingEnabled = false;        // 画像がぼやけないようにする
      cboss.drawImage(img, 150, 200, 200, 250);
    }
  }

  /**
  * 上の階へ遷移するボタンを表示する関数
  */ 
  function upstairButtonCreateElement() {
    upstairButton.textContent = "ハシゴを登る！";
    document.getElementById( "button-area" ).appendChild( upstairButton );
  }

  /**
  * 上の階へ遷移するボタンクリック時の処理を行う関数
  */ 
  upstairButton.onclick = () => {
    document.location.href = "./b1f.html";
  }

  /**
  * ボス戦へ遷移するボタンを表示する関数
  */ 
  function bossBattleButtonCreateElement() {
    bossBattleButton.textContent = "もう一度戦う！";
    document.getElementById( "button-area" ).appendChild( bossBattleButton );
  }

  /**
  * ボス戦へ遷移するボタンクリック時の処理を行う関数
  */ 
  bossBattleButton.onclick = () => {
    document.location.href = "./b2fboss.html";
  }

  /**
  * キー押下時（タイピング時）に呼び出される関数
  */
  document.onkeydown = () => {
    const maxPoints = 30;           // ノーミス時の点数（ボーナス点は含まない）
    const bonusPointSeconds = 3;    // ボーナスポイント対象となる秒数

    if (typedCount === 0) {
      startTime = Date.now();    // 1文字目のタイピング開始時にタイム取得を始める
    }

    if (flgTypeEnd === 0) {      // flg=1の時（=タイピングを終えた時）は入力文字の正誤判断をしない
      if (event.keyCode + 32 === typingTexts[randomNumber].charCodeAt(typedCount))  // 入力した文字が正しいとき
      {
        sampleDivided[typedCount].style.color = '#0000ff';
        points = points + 10;
      } else {    // 入力した文字が誤っているとき
        sampleDivided[typedCount].style.color = '#ff0000';
        points = points - 10;
      }
      typedCount++;
      // 画面に表示された文字数分をタイプした後の処理
      if (dispTypeText.length === typedCount) {
        flgTypeEnd = 1;
        var currentTime = Date.now();         // タイマーを止める
        var seconds = (currentTime - startTime) / 1000;  // タイピングに要した秒数を計算
        // 一定時間以内にタイプできて、かつ誤りが無ければボーナスポイント加算
        if (seconds <= bonusPointSeconds && points === maxPoints) {
          points = points + 10;
        } 
        removeAllChildren(resultDivided);
        resultDivided.style.color = "#ffffff";
        // 結果メッセージの表示
        if (points === 0) {                       // ポイントが0の時
          resultText.innerText = 'ダメージを与えられない！';
        } else if (points < 0) {                  // ポイントが0未満の時
          resultText.innerText = (points * -1) + 'ポイントのダメージを受けた！';   
          playerEnergy = playerEnergy + points;   // プレイヤーの体力を減らす  
        } else {                // ポイントが0より大きい時
          resultText.innerText = points + 'ポイントのダメージを与えた！';  
          bossEnergy = bossEnergy - points;       // ボスの体力を減らす
        }

        if (bossEnergy < 0) {     // ボスの体力がマイナスになったら0に戻す
          bossEnergy = 0;
        }
        if (playerEnergy < 0) {    // プレイヤーの体力がマイナスになったら0に戻す
          playerEnergy = 0;
        }

        if (bossEnergy === 0) {   // ボスの残り体力がゼロになった時
          gameEndFlg = 1;         // ゲーム終了フラグをON
          displayGoalGraphic();   // ボス画像を削除
          removeAllChildren(statusDivided);
          removeAllChildren(remarksDivided);
          statusDivided.style.color = "#ffffff";
          statusText.innerText = 'やったね！ボスを倒しました！';
          statusDivided.appendChild(statusText);
          setTimeout(() => {

            remarksDivided.style.color = "#ffffff";
            remarksText.innerText = '上へのハシゴが見える。登りますか？'; 
            remarksDivided.appendChild(remarksText);
            upstairButtonCreateElement(); 
          }, 2500);
        } else if (playerEnergy === 0) {   // プレイヤーの残り体力がゼロになった時
          gameEndFlg = 1;     // ゲーム終了フラグをON
          removeAllChildren(statusDivided);
          removeAllChildren(remarksDivided);
          statusDivided.style.color = "#ffffff";
          statusText.innerText = 'あなたはやられてしまった！';
          statusDivided.appendChild(statusText);
          setTimeout(() => {
            remarksDivided.style.color = "#ffffff";
            remarksText.innerText = 'もう一度ボスと戦いますか？';
            remarksDivided.appendChild(remarksText);
            bossBattleButtonCreateElement();
          }, 2500);
 
        } else {        // 両者の体力が残っている時
          dispBossEnergy = "";
          for(var j=0; j<(bossEnergy/10); j++) {      // ボスの現時点の体力を再表示
            dispBossEnergy = dispBossEnergy + '■';
          }
          removeAllChildren(statusDivided);
          statusText.innerText = "ENEMY  : " + dispBossEnergy;
          statusDivided.appendChild(statusText);
          dispPlayerEnergy = "";
          for(var k=0; k<(playerEnergy/10); k++) {          // プレイヤーの現時点の体力を再表示
            dispPlayerEnergy = dispPlayerEnergy + '■';
          }
          removeAllChildren(remarksDivided);
          remarksText.innerText = "PLAYER: " + dispPlayerEnergy;
          remarksDivided.appendChild(remarksText);
        }
        resultDivided.appendChild(resultText);
        // サンプル文字列の消去
        setTimeout(() => {
          for (var l=0; l<typingTextCharNumber; l++) {
            removeAllChildren(sampleDivided[l]);
            sampleDivided[l].style.color = "#ffffff";
          }
        }, 1000);  
        // 変数を初期化
        points = 0;
        typedCount = 0;
        // 次のサンプル文字列を表示
        if (gameEndFlg === 0) {
          setTimeout(() => {
            displayTypingText();
            flgTypeEnd = 0;
          }, 2000);
        }  
      }
    }
  }
})();
