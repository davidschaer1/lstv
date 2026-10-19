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
// Sticky Header (Startseite: erst beim Scrollen)
(function(){
  var head=document.querySelector('.site-head'); if(!head) return;
  var home=document.body.classList.contains('home');
  var menu=document.getElementById('mnav');
  function onScroll(){
    var y=window.scrollY;
    head.classList.toggle('scrolled',y>10);
    if(home){
      var show=y>240;
      head.classList.toggle('show',show);
      if(!show&&menu&&!menu.hidden){menu.hidden=true;var b=head.querySelector('.menu-btn');if(b){b.setAttribute('aria-expanded','false');b.setAttribute('aria-label','Menü öffnen');}}
    }
  }
  onScroll(); window.addEventListener('scroll',onScroll,{passive:true});
})();

// Animationen
(function(){
  var reduce=window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Laufband
  document.querySelectorAll('main div[aria-hidden="true"]').forEach(function(bar){
    var span=bar.querySelector('span'); if(!span||span.textContent.indexOf('✦')<0) return;
    var parts=span.textContent.split('✦').map(function(s){return s.trim()}).filter(Boolean);
    var seen={},uniq=[];parts.forEach(function(p){if(!seen[p]){seen[p]=1;uniq.push(p)}});
    var seq=uniq.join(' ✦ ')+' ✦ ';
    span.textContent=seq+seq;
    var track=document.createElement('span');track.className='marquee';
    var clone=span.cloneNode(true);
    span.parentNode.insertBefore(track,span);track.appendChild(span);track.appendChild(clone);
  });
  if(reduce) return;

  // Hero
  var first=document.querySelector('main > section');
  if(first){
    var heroEls=first.querySelectorAll('h1, h1 + p, .lbl, .sk, .lt, [role="group"]');
    heroEls.forEach(function(el,i){el.classList.add('hi');el.style.animationDelay=(0.1+i*0.08)+'s'});
  }

  // Scroll-Reveal
  var sel='main h2, main .card, main .lt, main details, main .band, main .rail > *, main .c1-m > *, main .c2-m > *, main .mas > *, main section > .wrap > p, main section > .wrap > .sk, main blockquote, main article';
  var items=[].slice.call(document.querySelectorAll(sel)).filter(function(el){return !(first&&first.contains(el))&&!el.classList.contains('hi')});
  items.forEach(function(el){
    el.classList.add('rv');
    var sib=el.parentNode?[].indexOf.call(el.parentNode.children,el):0;
    el.style.transitionDelay=(Math.min(sib,6)*0.08)+'s';
  });
  var io=new IntersectionObserver(function(entries){
    entries.forEach(function(e){
      if(!e.isIntersecting) return;
      var el=e.target; el.classList.add('in'); io.unobserve(el);
      setTimeout(function(){el.style.transitionDelay=''},1400);
    });
  },{threshold:0.12,rootMargin:'0px 0px -40px 0px'});
  items.forEach(function(el){io.observe(el)});
  var ticking=false;
  function sweep(){ticking=false;var vh=window.innerHeight;items.forEach(function(el){if(!el.classList.contains('in')&&el.getBoundingClientRect().top<vh){el.classList.add('in');io.unobserve(el)}})}
  window.addEventListener('scroll',function(){if(!ticking){ticking=true;requestAnimationFrame(sweep)}},{passive:true});
  window.addEventListener('load',sweep);

  // Zahlen hochzählen
  var nums=[].slice.call(document.querySelectorAll('main span')).filter(function(s){return s.children.length===0&&/^\d’\d{3}\+$/.test(s.textContent.trim())});
  var nio=new IntersectionObserver(function(entries){
    entries.forEach(function(e){
      if(!e.isIntersecting) return; nio.unobserve(e.target);
      var el=e.target,target=parseInt(el.textContent.replace(/\D/g,''),10),t0=null,dur=1400;
      function fmt(n){var s=String(n);return (s.length>3?s.slice(0,-3)+'’'+s.slice(-3):s)+'+'}
      function step(ts){if(!t0)t0=ts;var p=Math.min((ts-t0)/dur,1),ease=1-Math.pow(1-p,3);el.textContent=fmt(Math.round(target*ease/100)*100);if(p<1)requestAnimationFrame(step);else el.textContent=el.dataset.final||fmt(target)}
      el.style.minWidth=el.offsetWidth+'px';el.textContent=fmt(0);requestAnimationFrame(step);
    });
  },{threshold:0.5});
  nums.forEach(function(n){nio.observe(n)});
})();

// Instagram: Follower und neueste Reels (über /api/instagram)
(function(){
  var rail=document.querySelector('[data-ig-videos]');
  var counters=document.querySelectorAll('[data-ig="followers"]');
  if(!rail&&!counters.length) return;
  function fmt(n){var r=Math.floor(n/100)*100,s=String(r);return (s.length>3?s.slice(0,-3)+'’'+s.slice(-3):s)+'+'}
  function esc(s){return String(s).replace(/[&<>"]/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]})}
  fetch('/api/instagram').then(function(r){return r.ok?r.json():null}).then(function(d){
    if(!d) return;
    if(d.followers){counters.forEach(function(el){el.dataset.final=fmt(d.followers);el.textContent=fmt(d.followers)})}
    if(rail&&d.videos&&d.videos.length){
      var logo=rail.querySelector('img');var logoSrc=logo?logo.getAttribute('src'):'assets/logo.png';
      rail.innerHTML=d.videos.map(function(v){
        var date=v.timestamp?new Date(v.timestamp).toLocaleDateString('de-CH',{day:'2-digit',month:'2-digit',year:'numeric'}):'';
        return '<a href="'+esc(v.permalink)+'" target="_blank" rel="noopener" class="card in" style="width:270px;display:flex;flex-direction:column;gap:12px;text-decoration:none;color:#ffffff">'+
          '<span class="ph" style="position:relative;display:block;aspect-ratio:9/16;border-radius:24px;overflow:hidden;box-shadow:0 0 0 3px #ff007f">'+
          (v.thumbnail?'<img src="'+esc(v.thumbnail)+'" alt="" loading="lazy" style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover">':'')+
          '<img src="'+logoSrc+'" alt="" style="position:absolute;top:12px;left:12px;width:36px;height:36px;border-radius:999px;box-shadow:0 0 0 2px #ffffff">'+
          '<span style="position:absolute;inset:0;background:linear-gradient(180deg,rgba(11,0,6,0) 45%,rgba(11,0,6,.92) 100%)"></span>'+
          '<span style="position:absolute;left:14px;right:14px;bottom:14px;display:flex;flex-direction:column;gap:6px"><span class="lbl" style="color:#f5a705">Reel · '+esc(date)+'</span><span class="d" style="font-size:20px">'+esc(v.caption||'Neues Video auf Instagram')+'</span></span>'+
          '</span></a>';
      }).join('');
    }
  }).catch(function(){});
})();
