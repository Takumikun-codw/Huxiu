window.addEventListener('load', function() {
  var arrow_l = document.querySelector('.arrow-l');
  var arrow_r = document.querySelector('.arrow-r');
  var focus = document.querySelector('.bigbanner');
  var focusWidth = focus.offsetWidth;
  focus.addEventListener('mouseenter', function() {
    arrow_l.style.display = 'block';
    arrow_r.style.display = 'block';
  })
  focus.addEventListener('mouseleave', function() {
    arrow_l.style.display = 'none';
    arrow_r.style.display = 'none';
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
      animate(ul, -index * focusWidth);
    })
  }
  ol.children[0].className = 'current';
  var n = 0;
  arrow_r.addEventListener('click', function() {
    n++;
    animate(ul, -n * focusWidth);
  })
})