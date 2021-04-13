window.addEventListener('load', function() {
  var arrow_l = document.querySelector('.arrow-l');
  var arrow_r = document.querySelector('.arrow-r');
  var focus = document.querySelector('.bigbanner');
  var focusWidth = focus.offsetWidth;
  var n = 0;
  var circle = 0;
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
  // console.log(ul.children.length);
  for(var i = 0; i < ul.children.length; i++) {
    var li = document.createElement('li');
    li.setAttribute('index', i);
    ol.appendChild(li);
    li.addEventListener('click', function(){
      for(var j = 0; j < ol.children.length; j++) {
        ol.children[j].className = '';
      }
      this.className = 'current';
      var index = this.getAttribute('index');
      n = index;
      circle = index;
      animate(ul, -index * focusWidth);
    })
  }
  ol.children[0].className = 'current';
  var first = ul.children[0].cloneNode(true);
  ul.appendChild(first);
  var flag = true;
  arrow_r.addEventListener('click', function() {
    if(flag) {
      flag = false;
      if(n == ul.children.length - 1) {
        ul.style.left = 0;
        n = 0;
      }
      n++;
      animate(ul, -n * focusWidth, function() {
        flag = true;
      });
      circle++;
      if(circle == ol.children.length) {
        circle = 0;
      }
      circleChange();
    }    
  })
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
  var timer = setInterval(function(){
    arrow_r.click();
  }, 10000)
})