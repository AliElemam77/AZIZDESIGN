(function(){
'use strict';
var cfg=window.siteConfig||{}, all=window.projectsData||[];
var bySlug=function(s){return all.filter(function(x){return x.slug===s})[0]};
var cats=[{k:'visuals',name:'Visuals',slugs:['visual-1','visual-2']},{k:'social-media',name:'Social Media',slugs:['we-care','befluent','kids-inn','bleco','eye-q','tennis']},{k:'3d-designs',name:'3D Designs',slugs:['3d-motion','3d-shots','3d-products']},{k:'branding',name:'Branding',slugs:['molhem']}].map(function(c){
  var ps=c.slugs.map(bySlug).filter(Boolean);c.ps=ps;c.images=[].concat.apply([],ps.map(function(p){return p.images}));
  c.title=c.name;c.category=ps.map(function(p){return p.title}).join(' / ');
  c.description=ps.length?ps.map(function(p){return p.description}).join(' '):'Coming soon.';return c});
var projects=cats;
var $=function(s,r){return (r||document).querySelector(s)}, $$=function(s,r){return [].slice.call((r||document).querySelectorAll(s))};
var esc=function(s){return String(s==null?'':s).replace(/[&<>"]/g,function(c){return{'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]})};
var reduce=matchMedia('(prefers-reduced-motion:reduce)').matches;
var body=document.body, root=document.documentElement, main=$('#main'), logo=$('#logo'), viewer=$('#viewer');
var pad=function(n){return String(n).padStart(2,'0')};

/* shapes */
function shp(k,g){
  var f='fill="url(#'+g+')"', i='';
  if(k==='star')i='<path '+f+' d="M50 0C54 34 66 46 100 50 66 54 54 66 50 100 46 66 34 54 0 50 34 46 46 34 50 0Z"/>';
  else if(k==='flower')i=[0,60,120].map(function(r){return '<ellipse '+f+' cx="50" cy="50" rx="15" ry="46" transform="rotate('+r+' 50 50)"/>'}).join('')+'<circle cx="50" cy="50" r="9" fill="#fff" opacity=".85"/>';
  else if(k==='ring')i='<circle cx="50" cy="50" r="33" fill="none" stroke="url(#'+g+')" stroke-width="22"/>';
  else if(k==='plus')i='<path '+f+' d="M38 4h24v34h34v24H62v34H38V62H4V38h34z"/>';
  else if(k==='hex')i='<polygon '+f+' points="50,3 92,27 92,73 50,97 8,73 8,27"/>';
  else if(k==='drop')i='<path '+f+' d="M50 2C75 30 90 48 90 66a40 40 0 0 1-80 0C10 48 25 30 50 2Z"/>';
  else if(k==='squig')i='<path d="M6 60C20 20 34 20 46 50S72 80 94 40" fill="none" stroke="url(#'+g+')" stroke-width="16" stroke-linecap="round"/>';
  else i='<circle '+f+' cx="50" cy="50" r="46"/>';
  return '<svg viewBox="0 0 100 100" aria-hidden="true">'+i+'</svg>';
}

/* data */
var allImgs=[];all.forEach(function(p){p.images.forEach(function(im){allImgs.push(im)})});
if(allImgs.length>24){var st=allImgs.length/24;allImgs=Array.apply(null,Array(24)).map(function(_,i){return allImgs[Math.floor(i*st)]})}
var services=[
 ['Social Media Design','Campaign systems, post and story templates, consistent feeds that stay recognisable.'],
 ['Visual Identity','Logos, colour, type and the rules that keep a brand coherent everywhere.'],
 ['Brochures & Print','Layouts for brochures, booklets and printed material, ready for production.'],
 ['Performance Creatives','Ad visuals built to stop the scroll and drive action.']
];
var socials=[['Instagram',cfg.instagram],['Behance',cfg.behance],['LinkedIn',cfg.linkedin]].filter(function(s){return s[1]});
var labels=['Social Media Design','Visual Identity','Campaign','3D'];
function tiles(arr){var h=arr.map(function(im){return '<div class="tl"><img src="'+im.src+'" width="'+im.w+'" height="'+im.h+'" alt="" loading="lazy"></div>'}).join('');return '<div class="sh"><div class="tr">'+h+h+'</div></div>'}
function giant(){return ['HI, I\'M','AZIZ'].map(function(w,k){var o='';for(var i=0;i<w.length;i++)o+='<span class="ch" style="--i:'+(k*8+i)+'">'+(w[i]===' '?'&nbsp;':esc(w[i]))+'</span>';return '<span class="ln">'+o+'</span>'}).join('')}
var rib=['Visuals','Social Media','3D Designs','Branding'].map(function(t){return '<span>'+t+'</span>'}).join('');
var ev=allImgs.filter(function(_,i){return i%2===0}),od=allImgs.filter(function(_,i){return i%2===1});

main.innerHTML=
'<section class="pn st dk" id="home"><div class="hero">'+
  '<img class="herobg" src="img/hero.webp" alt="Mohamed Aziz" width="2200" height="1237">'+
  '<h1 class="giant disp" aria-label="Hi, I\'m Aziz">'+giant()+'</h1>'+
  '<div class="hsub"><b>Graphic Designer</b>Crafting bold social campaigns and visual identities that look sharp and sell.</div>'+
  '<div class="hr"><a class="btn" href="#contact">Contact me</a>'+(cfg.availability?'<span class="mono avail">'+esc(cfg.availability)+'</span>':'')+'</div>'+
  '<div class="scrollcue mono">Scroll &darr;</div></div>'+
  '<div class="gal"><div class="ribbon"><div class="tr">'+rib+rib+rib+rib+'</div></div><div class="rows"><div class="row">'+tiles(ev)+'</div><div class="row">'+tiles(od)+'</div></div></div><i class="shade"></i></section>'+

'<section class="pn st dk" id="about"><div class="about"><h2 class="h2 disp metal rv">About<br>me</h2>'+
  '<p class="lead rv" style="--d:.1s">I&rsquo;m Mohamed Aziz, a graphic designer from Egypt. I create visually compelling, effective designs, with a deep understanding of design principles and a strong attention to detail.</p>'+
  '<div class="sws rv" style="--d:.2s"><div class="sw" style="--c:#31a8ff;--d1:#0b3d6e;--d2:#00121f;--i:0"><div class="orb"><i class="rg rb"></i><div class="ball"><b>Ps</b></div><i class="rg rf"></i></div><span>Photoshop</span></div><div class="sw" style="--c:#ff9a00;--d1:#6e3500;--d2:#1c0600;--i:1"><div class="orb"><i class="rg rb"></i><div class="ball"><b>Ai</b></div><i class="rg rf"></i></div><span>Illustrator</span></div><div class="sw" style="--c:#a29bff;--d1:#2a2a9e;--d2:#04043a;--i:2"><div class="orb"><i class="rg rb"></i><div class="ball"><b>Ae</b></div><i class="rg rf"></i></div><span>After Effects</span></div><div class="sw" style="--c:#ff8a1f;--d1:#5b2d00;--d2:#160800;--i:3"><div class="orb"><i class="rg rb"></i><div class="ball"><img src="img/sw/blender.png" alt="" width="56" height="56"></div><i class="rg rf"></i></div><span>Blender</span></div></div>'+
  '<div class="stats rv" style="--d:.2s"><div><b>5+</b>Years</div><div><b>35+</b>Campaigns</div><div><b>40+</b>Clients</div></div>'+
  '<div class="exp rv" style="--d:.3s"><div class="exh">Experience</div><div class="xr"><span class="xy">2024 &ndash; Now</span><b>Tar Company</b><span class="xt">Senior Graphic Designer</span></div><div class="xr"><span class="xy">2025 &ndash; Now</span><b>Hadaf Tic</b><span class="xt">Senior Graphic Designer</span></div><div class="xr"><span class="xy">2024</span><b>First Media</b><span class="xt">Mid-level Graphic Designer</span></div><div class="xr"><span class="xy">2022 &ndash; 2024</span><b>Freelance</b><span class="xt">Graphic Designer &middot; 50+ brands</span></div><div class="xr"><span class="xy">2021 &ndash; 2022</span><b>Bash Marketeer</b><span class="xt">Junior Graphic Designer</span></div></div>'+
  '<a class="btn rv" style="--d:.35s" href="#contact">Contact me</a>'+
  [['star','gv','8%','18%','clamp(70px,9vw,140px)',.12],['flower','gw','84%','14%','clamp(70px,9vw,140px)',-.1],['ring','gi','12%','70%','clamp(60px,8vw,120px)',-.16],['plus','gv','86%','66%','clamp(50px,6vw,90px)',.18],['hex','gi','70%','38%','clamp(40px,4.4vw,70px)',.08],['drop','gw','24%','42%','clamp(36px,4vw,60px)',-.12]].map(function(s){return '<div class="shape" data-sp="'+s[5]+'" style="left:'+s[2]+';top:'+s[3]+';width:'+s[4]+';height:'+s[4]+'">'+shp(s[0],s[1])+'</div>'}).join('')+
  '</div><i class="shade"></i></section>'+

'<section class="pn st lg" id="services"><div class="services"><h2 class="h2 disp metal-d rv">Services</h2><div class="sv-list">'+
  services.map(function(s,i){return '<div class="sv rv" style="--d:'+(i*.08)+'s"><span class="n">'+pad(i+1)+'</span><h4>'+esc(s[0])+'</h4><p>'+esc(s[1])+'</p></div>'}).join('')+
  '</div></div><i class="shade"></i></section>'+

'<section class="pn dk" id="projects"><div class="projects"><h2 class="h2 disp metal rv">Projects</h2><div class="stk" id="stk">'+
  cats.map(function(c,i){var has=c.images.length>0;var T=['#3a22d8','#7B3BFF','#1a0b52','#4a1fd0'][i];return '<article class="sc'+(has?'':' empty')+'" data-k="'+c.k+'" style="--i:'+i+';--tint:'+T+'" '+(has?'tabindex="0" role="link"':'')+' aria-label="'+esc(c.name)+'">'+(has?'<div class="bgi" style="background-image:url('+c.images[0].src+')"></div>':'')+'<div class="lb"><span class="t">'+esc(c.name)+'.</span><span class="m mono">'+(has?(c.ps.length>1?c.ps.length+(c.k==='visuals'?' visuals':c.k==='3d-designs'?' collections':' clients'):c.images.length+' works')+' &nearr;':'Coming soon')+'</span></div></article>'}).join('')+
  '</div>'+
  '</div></section>'+

'<section class="pn lg" id="contact"><div class="contact"><h2 class="h2 disp metal-d rv" style="text-align:left">Contact</h2><div class="cgrid">'+
  '<div class="rv"><div class="big disp metal-d">Let&rsquo;s get<br>in touch</div><p class="mail">Tell me about your project and I will get back to you. Your message opens in WhatsApp, ready to send.</p>'+
  '<div class="soc mono">'+socials.map(function(s){return '<a href="'+esc(s[1])+'" target="_blank" rel="noopener">'+s[0]+'</a>'}).join('')+(cfg.email?'<a href="mailto:'+esc(cfg.email)+'">Email</a>':'')+'</div></div>'+
  '<form class="fcard rv" id="cform" style="--d:.12s" novalidate><h5>Start a project</h5>'+
  '<div class="chips" id="chips">'+labels.map(function(s,i){return '<button type="button" class="chip'+(i===0?' on':'')+'" data-v="'+s+'">'+s+'</button>'}).join('')+'</div>'+
  '<label class="fld"><input id="cn" placeholder="Your name" autocomplete="name"></label>'+
  '<label class="fld"><input id="ce" type="email" placeholder="Your email" autocomplete="email" inputmode="email"></label>'+
  '<label class="fld msg"><input id="cm" placeholder="Tell me about your project&hellip;" autocomplete="off"><button type="submit" class="send"><span id="sl">Send</span><i>&#8599;</i></button></label>'+
  '<p class="note" id="cnote">Opens WhatsApp with your message ready.</p></form>'+
  '</div><div class="shape" data-sp=".1" style="right:6%;top:10%;width:clamp(60px,8vw,120px);height:clamp(60px,8vw,120px)">'+shp('star','gv')+'</div></div></section>'+

'<footer class="pn dk" id="foot"><div class="foot ty"><div class="fbig"><div class="name disp metal">Thank you</div></div><div class="copyr mono"><span>&copy; Mohamed Aziz</span><span>Graphic Designer</span></div></div></footer>';

/* logo glitch */
var pool='#%&@*+=<>/\\|ABCDEFGHKMNRSTXZ0123456789',orig='AZIZ',gt=null;
function glitch(ms){
  if(reduce)return;clearInterval(gt);var t0=Date.now();
  gt=setInterval(function(){var k=(Date.now()-t0)/ms;if(k>=1){clearInterval(gt);logo.textContent=orig;return}
    var s='';for(var i=0;i<orig.length;i++)s+=(Math.random()<k*1.1-i*.06)?orig[i]:pool[Math.random()*pool.length|0];logo.textContent=s},42);
}

/* reveal */
var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('on');io.unobserve(e.target)}})},{threshold:.15});
$$('.rv,.stk').forEach(function(el){io.observe(el)});

/* sticky tops for tall panels */
var stickies=$$('.pn.st'), panels=$$('.pn');
function setTops(){stickies.forEach(function(p){p.style.top=Math.min(0,innerHeight-p.offsetHeight)+'px'})}

/* scroll effects */
var shapesEl=$$('.shape'),foots=$$('#shapes svg'),rows=$$('.row .sh'),ticking=false;
function frame(){
  ticking=false;var vh=innerHeight,y=scrollY;
  stickies.forEach(function(p){
    var nx=p.nextElementSibling;if(!nx)return;
    var t=nx.getBoundingClientRect().top;
    var pr=Math.max(0,Math.min(1,1-t/vh));
    p.style.transform=reduce?'':'scale('+(1-.06*pr)+')';
    p.lastElementChild.style.opacity=(.55*pr).toFixed(3);
  });
  if(!reduce){
    rows.forEach(function(r,i){r.style.transform='translateX('+((i?1:-1)*y*.22)+'px)'});
    shapesEl.forEach(function(s){var r=s.getBoundingClientRect();var c=r.top+r.height/2-vh/2;s.style.transform='translateY('+(c*parseFloat(s.dataset.sp||0))+'px)'});
    foots.forEach(function(s,i){var r=s.getBoundingClientRect();s.style.transform='rotate('+((r.top-vh)*.06*(i%2?1:-1))+'deg)'});
  }
  var on=false,ly=34;
  panels.forEach(function(p){var r=p.getBoundingClientRect();if(r.top<=ly&&r.bottom>ly)on=p.classList.contains('lg')});
  body.classList.toggle('lt',on&&!body.classList.contains('vw'));
}
function req(){if(!ticking){ticking=true;requestAnimationFrame(frame)}}
addEventListener('scroll',req,{passive:true});
addEventListener('resize',function(){setTops();req()});

/* viewer */
var savedY=0,open=false;
var cur='',lbEl=null,lbi=0,lbs=[],lbt='';
var mvp=false;
function loadMV(){if(mvp)return;mvp=true;var sc=document.createElement('script');sc.type='module';sc.src='https://unpkg.com/@google/model-viewer@3.5.0/dist/model-viewer.min.js';document.head.appendChild(sc)}
function mvHtml(im){loadMV();return '<model-viewer src="'+im.model+'" alt="'+esc(im.name||'3D model')+'" camera-controls disable-zoom disable-pan auto-rotate auto-rotate-delay="0" rotation-per-second="30deg" touch-action="none" orbit-sensitivity="1.4" shadow-intensity="1.1" shadow-softness="1" exposure="1.05" environment-image="neutral" interaction-prompt="none" loading="eager" style="background:url('+im.src+') center/contain no-repeat,radial-gradient(circle at 50% 40%,#fff,#ddd3f2)" data-fb="1"><div class="mvl" slot="progress-bar"></div></model-viewer><div class="mvh mono">Drag to rotate 360&deg;</div>'}
function lbShow(){var im=lbs[lbi],w=lbEl.querySelector('.li');w.innerHTML=(im.model?mvHtml(im):im.video?'<video src="'+im.video+'" poster="'+im.src+'" controls autoplay loop playsinline></video>':'<img src="'+im.src+'" alt="'+lbt+' '+(lbi+1)+'">')+(im.pair?'<img src="'+im.pair.src+'" alt="'+lbt+' '+(lbi+1)+' motion">':'');var mvEl=w.querySelector('model-viewer');if(mvEl)mvEl.addEventListener('load',function(){mvEl.style.background='radial-gradient(circle at 50% 40%,#fff,#ddd3f2)';mvEl.removeAttribute('poster')});lbEl.classList.toggle('pr',!!im.pair);lbEl.classList.toggle('mv',!!im.model);lbEl.querySelector('.lc').textContent=pad(lbi+1)+' / '+pad(lbs.length)}
function lbClose(){if(lbEl){lbEl.classList.remove('on');var e=lbEl;lbEl=null;setTimeout(function(){e.remove()},350)}}
function lbStep(d){lbi=(lbi+d+lbs.length)%lbs.length;lbShow()}
function lb(imgs,i,t){
  if(lbEl)return;lbs=imgs;lbi=i;lbt=t;
  lbEl=document.createElement('div');lbEl.className='lbx';lbEl.setAttribute('role','dialog');
  lbEl.innerHTML='<div class="li"></div><button type="button" class="lp" aria-label="Previous">&larr;</button><button type="button" class="ln" aria-label="Next">&rarr;</button><button type="button" class="lx">Close</button><span class="lc mono"></span>';
  document.body.appendChild(lbEl);lbShow();
  lbEl.addEventListener('click',function(e){if(e.target.tagName!=='IMG'&&e.target.tagName!=='MODEL-VIEWER'&&e.target.tagName!=='VIDEO'&&!e.target.classList.contains('lp')&&!e.target.classList.contains('ln'))lbClose()});
  lbEl.querySelector('.lp').onclick=function(){lbStep(-1)};lbEl.querySelector('.ln').onclick=function(){lbStep(1)};
  var x0=null;lbEl.addEventListener('touchstart',function(e){x0=e.touches[0].clientX},{passive:true});
  lbEl.addEventListener('touchend',function(e){if(x0==null)return;var d=e.changedTouches[0].clientX-x0;if(Math.abs(d)>50)lbStep(d<0?1:-1);x0=null});
  requestAnimationFrame(function(){requestAnimationFrame(function(){lbEl&&lbEl.classList.add('on')})});
}
function openProject(spec){
  var parts=spec.split('/'),p=cats.filter(function(x){return x.k===parts[0]})[0];if(!p||!p.images.length)return;
  var multi=p.ps.length>1,sub=multi&&parts[1]?bySlug(parts[1]):null;if(sub&&p.ps.indexOf(sub)<0)sub=null;
  var picker=multi&&!sub;
  var title=sub?sub.title:p.title,cat=sub?sub.category:p.category,desc=sub?sub.description:(multi?'Choose a client to see their work.':p.description);
  var imgs=sub?sub.images:p.images;
  if(!open)savedY=scrollY;
  var rail=picker?p.ps.map(function(c){return '<figure class="cl" tabindex="0" role="link" data-s="'+c.slug+'"><img src="'+c.images[0].src+'" width="'+c.images[0].w+'" height="'+c.images[0].h+'" alt="'+esc(c.title)+'" loading="eager"><figcaption><span class="cn">'+esc(c.title)+'</span><span class="cm mono">'+c.images.length+' '+(c.images.length>1?'designs':'design')+' &nearr;</span></figcaption></figure>'}).join(''):
   imgs.map(function(im,i){var one=function(m,a){if(m.model)return '<img src="'+m.src+'" width="'+m.w+'" height="'+m.h+'" alt="'+esc(m.name||title)+'" loading="lazy"><span class="b3">360&deg;</span><figcaption>'+esc(m.name||'')+'</figcaption>';if(m.video)return '<video src="'+m.video+'" poster="'+m.src+'" width="'+m.w+'" height="'+m.h+'" style="aspect-ratio:'+m.w+'/'+m.h+'" muted loop playsinline autoplay preload="metadata" aria-label="'+esc(title)+' '+(i+1)+'"></video><span class="vb" aria-hidden="true"></span>';return '<img src="'+m.src+'" width="'+m.w+'" height="'+m.h+'" alt="'+esc(title)+' '+(i+1)+a+'" loading="'+(i<3?'eager':'lazy')+'">'};return '<figure'+(im.pair?' class="pr"':im.model?' class="md"':'')+'>'+one(im,'')+(im.pair?one(im.pair,' motion'):'')+'</figure>'}).join('');
  viewer.innerHTML='<div class="vbg" style="background-image:url('+imgs[0].src+')"></div>'+
   '<div class="info"><h2 class="disp"><span>'+esc(title)+'</span></h2><div class="meta"><b>'+esc(picker?p.name:cat)+'</b>'+esc(desc)+'</div></div>'+
   '<div class="rail" id="rail">'+rail+'</div>'+
   '<div class="bar"><span class="mono" id="cnt">01 / '+pad(picker?p.ps.length:imgs.length)+'</span><span class="mono hint">Scroll / drag &rarr;</span>'+(sub?'<button type="button" id="vb">Back</button>':'')+'<button type="button" id="vx">Close</button></div>';
  var railEl=$('#rail'),cnt=$('#cnt');
  $('#vx').onclick=function(){location.hash='#projects'};
  if(sub)$('#vb').onclick=function(){location.hash='#p-'+p.k};
  $$('.cl',railEl).forEach(function(f){var go=function(){location.hash='#p-'+p.k+'/'+f.dataset.s};f.addEventListener('click',function(){if(!moved)go()});f.addEventListener('keydown',function(e){if(e.key==='Enter')go()})});
  if(!picker)$$('figure',railEl).forEach(function(f,i){f.classList.add('zm');f.addEventListener('click',function(){if(!moved)lb(imgs,i,title)})});
  railEl.addEventListener('wheel',function(e){if(Math.abs(e.deltaY)>Math.abs(e.deltaX)){railEl.scrollLeft+=e.deltaY;e.preventDefault()}},{passive:false});
  var down=false,sx=0,sl=0,moved=false;
  railEl.addEventListener('pointerdown',function(e){if(e.pointerType==='touch')return;down=true;moved=false;sx=e.clientX;sl=railEl.scrollLeft;railEl.classList.add('drag')});
  railEl.addEventListener('pointermove',function(e){if(down){if(Math.abs(e.clientX-sx)>5)moved=true;railEl.scrollLeft=sl-(e.clientX-sx)}});
  addEventListener('pointerup',function(){down=false;railEl.classList.remove('drag')});
  railEl.addEventListener('scroll',function(){var f=[].slice.call(railEl.children),mid=railEl.scrollLeft+railEl.clientWidth*.35,idx=0;f.forEach(function(el,i){if(el.offsetLeft<=mid)idx=i});cnt.textContent=pad(idx+1)+' / '+pad(f.length)});
  root.classList.add('locked');body.classList.add('vw');body.classList.remove('lt');
  viewer.setAttribute('aria-hidden','false');
  var was=open;viewer.classList.remove('on');$$('video',viewer).forEach(function(v){var pl=v.play();if(pl&&pl.catch)pl.catch(function(){})});
  requestAnimationFrame(function(){requestAnimationFrame(function(){viewer.classList.add('on')})});
  open=true;cur=spec;if(!was)glitch(600);
}
function closeProject(){lbClose();$$('video',viewer).forEach(function(v){v.pause()});
  viewer.classList.remove('on');viewer.setAttribute('aria-hidden','true');
  root.classList.remove('locked');body.classList.remove('vw');open=false;
  root.style.scrollBehavior='auto';window.scrollTo(0,savedY);root.style.scrollBehavior='';req();
}
$$('.sc:not(.empty)').forEach(function(c){
  c.addEventListener('click',function(){location.hash='#p-'+c.dataset.k});
  c.addEventListener('keydown',function(e){if(e.key==='Enter')location.hash='#p-'+c.dataset.k});
});
function route(){
  var h=(location.hash||'').slice(1);
  if(h.indexOf('p-')===0){if(!open||cur!==h.slice(2))openProject(h.slice(2))}
  else if(open){closeProject()}
}
addEventListener('hashchange',route);
addEventListener('keydown',function(e){if(lbEl){if(e.key==='Escape')lbClose();else if(e.key==='ArrowRight')lbStep(1);else if(e.key==='ArrowLeft')lbStep(-1);return}if(e.key==='Escape'&&open)location.hash='#projects'});
logo.addEventListener('click',function(e){e.preventDefault();if(open){closeProject()}try{history.replaceState(null,'',location.pathname+location.search)}catch(_){if(location.hash)location.hash=''}intro()});

/* form -> WhatsApp */
(function(){
  var f=$('#cform'),note=$('#cnote'),sl=$('#sl'),m=$('#cm'),n=$('#cn'),em=$('#ce'),chips=$$('#chips .chip');
  chips.forEach(function(c){c.addEventListener('click',function(){c.classList.toggle('on')})});
  f.addEventListener('submit',function(e){
    e.preventDefault();var msg=m.value.trim();
    if(!msg){f.classList.remove('err');void f.offsetWidth;f.classList.add('err');note.textContent='Write a short message first.';m.focus();return}
    f.classList.remove('err');
    var sv=chips.filter(function(c){return c.classList.contains('on')}).map(function(c){return c.dataset.v});
    var text='Hi Aziz, '+(n.value.trim()?'I\'m '+n.value.trim()+'. ':'')+(em.value.trim()?'My email: '+em.value.trim()+'. ':'')+(sv.length?'I\'m interested in: '+sv.join(', ')+'. ':'')+msg;
    var num=(cfg.whatsapp||'').replace(/\D/g,'');
    if(num){var url='https://wa.me/'+num+'?text='+encodeURIComponent(text);
      try{navigator.clipboard.writeText(text).catch(function(){})}catch(_){}
      sl.textContent='Opening\u2026';note.textContent='Opening WhatsApp\u2026';
      try{var a=document.createElement('a');a.href=url;a.target='_top';a.rel='noopener';document.body.appendChild(a);a.click();a.remove()}catch(_){}
      setTimeout(function(){sl.textContent='Send';note.innerHTML='If WhatsApp did not open, <a href="'+url+'" target="_blank" rel="noopener" style="text-decoration:underline">tap here</a> or message me on +'+num.replace(/^(\d{2})(\d{3})(\d{3})(\d+)$/,'$1 $2 $3 $4')+'. Your message is copied.'},1400)}
    else{try{navigator.clipboard.writeText(text).catch(function(){})}catch(_){}note.textContent='WhatsApp number is not set yet. Message copied.'}
  });
})();

/* fit footer name */
function fit(){var n=$('.fbig .name');if(!n)return;n.style.fontSize='100px';var w=n.getBoundingClientRect().width,av=n.parentElement.clientWidth;n.style.fontSize=Math.min(av/w*100*.995,260)+'px'}
addEventListener('resize',fit);
/* start: open from a tiny frame */
function wait(ms){return new Promise(function(r){setTimeout(r,ms)})}
function finish(){body.classList.add('opened');root.classList.remove('locked');req()}
function start(){
  fit();setTops();req();
  try{history.scrollRestoration='manual'}catch(_){}
  window.scrollTo(0,0);
  if(location.hash.indexOf('#p-')===0){body.classList.remove('intro');body.classList.add('ready','opened');root.classList.remove('locked');route();return}
  intro();
}
var itimers=[],itk=null,iseq=0,raf=0,ov=$('#ov'),zoom={cx:0,cy:0};
function setupOv(){
  var W=innerWidth,H=innerHeight,svg=$('#ovs'),t=$('#ovt');
  svg.setAttribute('viewBox','0 0 '+W+' '+H);
  ['#ovr','#ovb'].forEach(function(s){var r=$(s);r.setAttribute('width',W);r.setAttribute('height',H)});
  var m=$('#ovm');m.setAttribute('x',0);m.setAttribute('y',0);m.setAttribute('width',W);m.setAttribute('height',H);
  t.removeAttribute('transform');t.setAttribute('font-size',100);t.setAttribute('x',0);t.setAttribute('y',0);
  var w100=t.getBBox().width||240,target=(W<700?.78:.6)*W,fs=target/w100*100,cap=fs*.72;
  t.setAttribute('font-size',fs);
  var w=t.getBBox().width;t.setAttribute('x',(W-w)/2);t.setAttribute('y',H/2+cap/2);
  var cx=W/2,cy=H/2;
  try{var e=t.getExtentOfChar(2);cx=e.x+e.width/2;cy=H/2}catch(_){}
  zoom.cx=cx;zoom.cy=cy;zoom.t=t;
}
function intro(){
  var my=++iseq;itimers.forEach(clearTimeout);itimers=[];clearInterval(itk);cancelAnimationFrame(raf);
  body.classList.add('intro');body.classList.remove('ready','opened');root.classList.add('locked');
  root.style.scrollBehavior='auto';window.scrollTo(0,0);root.style.scrollBehavior='';
  ov.style.display='';ov.style.opacity='';ov.classList.remove('in','go');setupOv();
  var n=$('#ldn'),t0=Date.now();n.textContent='000';
  itk=setInterval(function(){var k=Math.min(1,(Date.now()-t0)/1500);n.textContent=String(Math.round(k*100)).padStart(3,'0');if(k>=1)clearInterval(itk)},40);
  var img=$('.herobg'),dec=img.decode?img.decode().catch(function(){}):Promise.resolve();
  itimers.push(setTimeout(function(){if(my===iseq)ov.classList.add('in')},250));
  Promise.race([Promise.all([dec,wait(1900)]),wait(5000)]).then(function(){
    if(my!==iseq)return;
    ov.classList.add('go');
    var D=reduce?900:2000,z0=Date.now(),L=Math.log(17),t=zoom.t;
    (function step(){
      if(my!==iseq)return;
      var p=Math.min(1,(Date.now()-z0)/D),e=p<.5?4*p*p*p:1-Math.pow(-2*p+2,3)/2,s=Math.exp(L*e);
      var tx=zoom.cx+(innerWidth/2-zoom.cx)*e;t.setAttribute('transform','translate('+tx+' '+zoom.cy+') scale('+s+') translate('+(-zoom.cx)+' '+(-zoom.cy)+')');
      var f=Math.max(0,(p-.8)/.2);ov.style.opacity=String(1-f*f*(3-2*f));
      if(p>=1){ov.style.display='none';return}
      raf=requestAnimationFrame(step);
    })();
    itimers.push(setTimeout(function(){body.classList.remove('intro')},D*.55));
    itimers.push(setTimeout(function(){body.classList.add('ready');glitch(900)},D*.85));
    itimers.push(setTimeout(finish,D+900));
  });
}
if(document.fonts&&document.fonts.ready){Promise.race([document.fonts.ready,wait(1200)]).then(start)}else start();
addEventListener('load',function(){fit();setTops();req()});
addEventListener('pageshow',function(e){if(e.persisted){if(open)location.hash='';intro()}});
})();
