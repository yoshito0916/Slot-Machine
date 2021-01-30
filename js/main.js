'use script'

{
  class panel {
    constructor() {
      const section = document.createElement('section');
      section.classList.add('panel');

      this.img = document.createElement('img');
      this.img.src = this.getRandomImage();
      this.timeoutId = undefined; 

      this.stop = document.createElement('div');
      this.stop.textContent = 'STOP';
      this.stop.classList.add('stop', 'inactive');
      this.stop.addEventListener('click', () => {
        if (this.stop.classList.contains('inactive')) {
          return  
        }
        this.stop.classList.add('inactive');

        clearTimeout(this.timeoutId); 
        
        panelsLeft--; 

        if (panelsLeft === 0) {
          spin.classList.remove('inactive');
          panelsLeft = 3;
          checkResult();
        }
      });

      section.appendChild(this.img);
      section.appendChild(this.stop);

      const main = document.querySelector('main');
      main.appendChild(section);
    }

    getRandomImage() {
      const images = [
        'img/seven.png',
        'img/bell.png',
        'img/cherry.png',
      ];
      return images[Math.floor(Math.random() * images.length)];
    }

    spin() {
      this.img.src = this.getRandomImage();
      this.timeoutId = setTimeout(() => { 
        this.spin();
      }, 50);
    }

    isUnmatched(p1, p2) { 
      return this.img.src !== p1.img.src && this.img.src !== p2.img.src;
    }

    unmatch() {
      this.img.classList.add('unmatched');
    }

    activate() {
      this.img.classList.remove('unmatched');
      this.stop.classList.remove('inactive');
    }
  }

  function checkResult() {
    if (panels[0].isUnmatched(panels[1], panels[2])) {
      panels[0].unmatch();
    }
    if (panels[1].isUnmatched(panels[0], panels[2])) {
      panels[1].unmatch();
    }
    if (panels[2].isUnmatched(panels[0], panels[1])) {
      panels[2].unmatch();
    }
  }

  const panels = [
    new panel(),
    new panel(),
    new panel(),
  ];

  let panelsLeft = 3; 

  const spin = document.getElementById('spin');
  spin.addEventListener('click', () => {
    if (spin.classList.contains('inactive')) {
      return;
    }
    spin.classList.add('inactive');
    panels.forEach(panel => {
      panel.activate();
      panel.spin();
    });
  });
}

// {
//   class panel {
//     constructor() {
//       const section = document.createElement('section');
//       section.classList.add('panel');

//       this.img = document.createElement('img');
//       this.img.src = this.getRandomImage();

//       this.timeoutId = undefined; //※注１最初は値が定まっていないのでundefinedとしておく。

//       this.stop = document.createElement('div');
//       this.stop.textContent = 'STOP';
//       this.stop.classList.add('stop', 'inactive');
//       this.stop.addEventListener('click', () => {
//         if (this.stop.classList.contains('inactive')) {
//           return  //②inactiveクラスが付いたらそれ以降の処理をしないという設定
//         }
//         this.stop.classList.add('inactive');//①stopを押した時にinactiveクラスを付ける

//         clearTimeout(this.timeoutId); //※注１ setTimeout()を止めたいのでclearTimeout()とする。clearTimeout()に渡す、timeoutIdが必要。
        
//         panelsLeft--; //STOPボタンを押すたびに１減らす。その上でpanelsLeftが０になった時に結果判定の処理はcheckResult()という名前の関数にしておく。

//         if (panelsLeft === 0) {
//           spin.classList.remove('inactive');
//           panelsLeft = 3;
//           checkResult();
//         }
//       });

//       section.appendChild(this.img);
//       section.appendChild(this.stop);

//       const main = document.querySelector('main');
//       main.appendChild(section);
//     }

//     getRandomImage() {
//       const images = [
//         'img/seven.png',
//         'img/bell.png',
//         'img/cherry.png',
//       ];
//       return images[Math.floor(Math.random() * images.length)];
//     }

//     spin() {
//       this.img.src = this.getRandomImage();
//       this.timeoutId = setTimeout(() => { //※注１上のプロパティをsetTimeout()の返り値にする
//         this.spin();
//       }, 50);
//     }

//     //比較すべき二つのパネルはp1とp2で受け取ってあげる。このクラスのインスタンスのimgのsrcプロパティが、他のimgのsrcプロパティと異なっている場合にtrueを返してあげ、そうでなかったらfalseを返してあげればよい。
//     isUnmatched(p1, p2) { 
//       // if (this.img.src !== p1.img.src && this.img.src !== p2.img.src) {
//       //   return true;
//       // } else {
//       //   return false;
//       // }
//       return this.img.src !== p1.img.src && this.img.src !== p2.img.src;
//     }

//     unmatch() {
//       this.img.classList.add('unmatched');
//     }

//     activate() {
//       this.img.classList.remove('unmatched');
//       this.stop.classList.remove('inactive');
//     }
//   }

//   //checkResult()という結果判定の関数は、パネル同士を比較する処理なのでパネルクラスの外に書く。まずパネルを一つずつ調べて他のパネルとマッチしなかったら、色を薄くしてあげればいい。
//   function checkResult() {
//     if (panels[0].isUnmatched(panels[1], panels[2])) {
//       panels[0].unmatch();
//     }
//     if (panels[1].isUnmatched(panels[0], panels[2])) {
//       panels[1].unmatch();
//     }
//     if (panels[2].isUnmatched(panels[0], panels[1])) {
//       panels[2].unmatch();
//     }
//   }

//   const panels = [
//     new panel(),
//     new panel(),
//     new panel(),
//   ];

//   let panelsLeft = 3; //panelsLeftという変数名にして、パネルは３枚あるので初期値を３とする

//   const spin = document.getElementById('spin');
//   spin.addEventListener('click', () => {
//     if (spin.classList.contains('inactive')) {
//       return;
//     }
//     spin.classList.add('inactive');
//     panels.forEach(panel => {
//       panel.activate();
//       panel.spin();
//     });
//   });
// }