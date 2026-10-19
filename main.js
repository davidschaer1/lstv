// Mobile-Menü
document.querySelectorAll('.menu-btn').forEach(function(btn){
  var menu=document.getElementById(btn.getAttribute('aria-controls'));
  btn.addEventListener('click',function(){
    var open=btn.getAttribute('aria-expanded')==='true';
    btn.setAttribute('aria-expanded',String(!open));
    btn.setAttribute('aria-label',open?'Menü öffnen':'Menü schliessen');
    menu.hidden=open;
  });
});
// News-Filter
var filters=document.querySelectorAll('[data-filter]');
filters.forEach(function(b){
  b.addEventListener('click',function(){
    var k=b.getAttribute('data-filter');
    filters.forEach(function(x){
      var on=x===b;
      x.setAttribute('aria-pressed',String(on));
      x.style.background=on?'#ff007f':'transparent';
      x.style.color=on?'#0b0006':'#ffffff';
      x.style.borderColor=on?'#ff007f':'rgba(255,255,255,.35)';
    });
    document.querySelectorAll('[data-cat]').forEach(function(c){
      c.style.display=(k==='Alle'||c.getAttribute('data-cat')===k)?'block':'none';
    });
  });
});
