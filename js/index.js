window.addEventListener('load', function() {
  var arrow_l = document.querySelector('.arrow-l');
  var arrow_r = document.querySelector('.arrow-r');
  var focus = document.querySelector('.bigbanner');
  var user = document.querySelector('.user');
  var popLayer = document.getElementById('popLayer');
  var popBlock = document.getElementById('popBlock');
  var close = document.querySelector('.close');
  var a = close.querySelector('a');
  var focusWidth = focus.offsetWidth;
  var n = 0;
  var circle = 0;
  user.addEventListener('click', function() {
    popLayer.style.display = 'block';
    popBlock.style.display = 'block';
  })
  a.addEventListener('click', function() {
    popLayer.style.display = 'none';
    popBlock.style.display = 'none';
  })
  focus.addEventListener('mouseenter', function() {
    arrow_l.style.display = 'block';
    arrow_r.style.display = 'block';
    clearInterval(timer);
    timer = null;
  })
  focus.addEventListener('mouseleave', function() {
    arrow_l.style.display = 'none';
    arrow_r.style.display = 'none';
    timer = setInterval(function(){
      arrow_r.click();
    }, 3000)
  })
  var ul = focus.querySelector('ul');
  var ol = focus.querySelector('.circle');
  // 动态生成小圆点
  for(var i = 0; i < ul.children.length; i++) {
    var li = document.createElement('li');
    li.setAttribute('index', i);
    ol.appendChild(li);
    li.addEventListener('click', function(){
      for(var j = 0; j < ol.children.length; j++) {
        ol.children[j].className = '';
      } // 清除其他
      this.className = 'current'; // 给自己加
      var index = this.getAttribute('index');
      n = index;
      circle = index;
      animate(ul, -index * focusWidth);
    })
  }
  ol.children[0].className = 'current';
  var first = ul.children[0].cloneNode(true); // 复制第一张图片
  ul.appendChild(first); // 接到父元素后
  var flag = true; //节流阀
  // 右箭头
  arrow_r.addEventListener('click', function() {
    if(flag) {
      flag = false; //先设置关阀
      if(n == ul.children.length - 1) {
        ul.style.left = 0;
        n = 0;
      }
      n++;
      animate(ul, -n * focusWidth, function() {
        flag = true; // 结束后开阀
      });
      circle++;
      if(circle == ol.children.length) {
        circle = 0;
      }
      circleChange();
    }    
  })
  // 左箭头
  arrow_l.addEventListener('click', function() {
    if(flag) {
      flag = false;
      if(n == 0) {
        ul.style.left = -(ul.children.length - 1) * focusWidth + 'px';
        n = ul.children.length - 1;
      }
      n--;
      animate(ul, -n * focusWidth, function() {
        flag = true;
      });
      circle--;
      if(circle < 0) {
        circle = ol.children.length - 1;
      }
      circleChange();
    }
  })
  function circleChange() {
    for(var i = 0; i < ol.children.length; i++) {
      ol.children[i].className = '';
    }
    ol.children[circle].className = 'current';
  }
  // 自动播放操作与向右按钮类似
  var timer = setInterval(function(){
    arrow_r.click();
  }, 3000)
})