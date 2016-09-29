/**
 * 参考http://www.html-js.com/article/Mobile-terminal-H5-mobile-terminal-HD-multi-screen-adaptation-scheme%203041
 * 采用此种方式，为了还原设计稿，除了1px线以外，其他布局都要采用rem方式
 */

(function(win, doc) {
  // var resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize';
  // win.devicePixelRatio = 1;
  var explude = ['ucbrowser'];
  var userAgent = win.navigator.userAgent.toLowerCase();
  var isExplude = false;
  for (var i = 0, len = explude.length; i < len; i++) {
    if (userAgent.indexOf(explude[i]) !== -1) {
      isExplude =  true;
      break;
    }
  }

  var recalc = function(devicePixelRatio) {
    var dpr, rem, scale;
    var docEl = doc.documentElement;
    var metaEl = doc.querySelector('meta[name="viewport"]');
    var clientWidth = docEl.clientWidth;
    if (clientWidth > 640) {
      clientWidth = 640;
    }

    dpr = Math.floor( devicePixelRatio || 1);  //为了方便css hack，取整数，防止小数hack失败
    rem = clientWidth * dpr / 10;
    scale = 1 / dpr;

    if (dpr > 1) {
      // 设置viewport，进行缩放，达到高清效果
      metaEl.setAttribute('content', 'width=' + dpr * clientWidth + ',initial-scale=' + scale + ',maximum-scale=' + scale + ', minimum-scale=' + scale + ',user-scalable=no,target-densitydpi=device-dpi');
    }
    // 设置data-dpr属性，留作的css hack之用
    docEl.setAttribute('data-dpr', dpr);
    docEl.setAttribute('style', 'font-size:' + rem + 'px');

    // 给js调用的，某一dpr下rem和px之间的转换函数
    win.rem2px = function(v) {
      v = parseFloat(v);
      return v * rem;
    };
    win.px2rem = function(v) {
      v = parseFloat(v);
      return v / rem;
    };

    win.dpr = dpr;
    win.rem = rem;
  }

  if (isExplude) {
    recalc(1);
  } else {
    recalc(win.devicePixelRatio);
  }

}(window, document))

//基准是750设计稿
// .px2rem(@name, @px){
//     @{name}: @px / 75 * 1rem;
// }


//任何手机屏幕上字体大小都要统一
// .px2px(@name, @px){
//     @{name}: round(@px / 2) * 1px;
//     [data-dpr="2"] & {
//         @{name}: @px * 1px;
//     }
//     // for mx3
//     [data-dpr="2.5"] & {
//         @{name}: round(@px * 2.5 / 2) * 1px;
//     }
//     // for 小米note
//     [data-dpr="2.75"] & {
//         @{name}: round(@px * 2.75 / 2) * 1px;
//     }
//     [data-dpr="3"] & {
//         @{name}: round(@px / 2 * 3) * 1px
//     }
//     // for 三星note4
//     [data-dpr="4"] & {
//         @{name}: @px * 2px;
//     }
// }
