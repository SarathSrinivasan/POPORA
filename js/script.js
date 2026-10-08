
const POPORA = (() => {
  const products = [
    {"id":"p01","name":"Sea Salt Snap","category":"Savory","price":9.5,"image":"https://images.unsplash.com/photo-1585647347384-2593bc35786b?auto=format&fit=crop&w=1200&q=85","desc":"Air-popped kernels finished with mineral-rich sea salt and a clean, buttery crunch."},
    {"id":"p02","name":"Midnight Cocoa","category":"Chocolate","price":12,"image":"https://images.unsplash.com/photo-1599599810694-b5ac9ddc9e0b?auto=format&fit=crop&w=1200&q=85","desc":"Dark cocoa, toasted sugar and a whisper of vanilla for an indulgent evening bite."},
    {"id":"p03","name":"Tangerine Heat","category":"Spicy","price":10.5,"image":"https://images.unsplash.com/photo-1566843972142-a7fcb70de55a?auto=format&fit=crop&w=1200&q=85","desc":"Bright citrus notes meet a slow-building chili finish that keeps the bowl moving."},
    {"id":"p04","name":"Brown Sugar Cloud","category":"Sweet","price":10,"image":"https://images.unsplash.com/photo-1511381939415-e44015466834?auto=format&fit=crop&w=1200&q=85","desc":"Warm brown sugar and vanilla glaze around delicate, cloud-light popcorn."},
    {"id":"p05","name":"Maple Smoke","category":"Savory","price":11,"image":"https://images.unsplash.com/photo-1606312619070-d48b4c652a52?auto=format&fit=crop&w=1200&q=85","desc":"Maple sweetness balanced by smoked salt for a grown-up sweet-savory profile."},
    {"id":"p06","name":"Birthday Confetti","category":"Sweet","price":13,"image":"https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=1200&q=85","desc":"Vanilla glaze, colorful candy crunch and party-ready energy in every handful."},
    {"id":"p07","name":"Chili Lime","category":"Spicy","price":10.5,"image":"https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=1200&q=85","desc":"Zesty lime, ancho chili and a savory finish made for movie nights."},
    {"id":"p08","name":"Cocoa Crunch Duo","category":"Chocolate","price":18,"image":"https://images.unsplash.com/photo-1549007994-cb92caebd54b?auto=format&fit=crop&w=1200&q=85","desc":"A two-flavor chocolate pairing designed for gifting, sharing and keeping."},
    {"id":"p09","name":"The Host Box","category":"Gift Boxes","price":38,"image":"https://images.unsplash.com/photo-1513883049090-d0b7439799bf?auto=format&fit=crop&w=1200&q=85","desc":"Four crowd-pleasing flavors packed for dinner hosts, new neighbors and thank-yous."},
    {"id":"p10","name":"Office Favorite Box","category":"Gift Boxes","price":64,"image":"https://images.unsplash.com/photo-1607344645866-009c320b63e0?auto=format&fit=crop&w=1200&q=85","desc":"A polished assortment for client appreciation, team celebrations and holiday drops."},
    {"id":"p11","name":"Golden Caramel","category":"Sweet","price":11.5,"image":"https://images.unsplash.com/photo-1541592106381-b31e9677c0e5?auto=format&fit=crop&w=1200&q=85","desc":"Glossy caramel, roasted sugar and just enough salt for a luminous classic."},
    {"id":"p12","name":"After Hours Box","category":"Gift Boxes","price":48,"image":"https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=1200&q=85","desc":"A late-night mix of cocoa, chili and caramel flavors with a sophisticated edge."}
  ];

  const $ = (s, r=document) => r.querySelector(s);
  const $$ = (s, r=document) => [...r.querySelectorAll(s)];
  const money = n => new Intl.NumberFormat('en-US',{style:'currency',currency:'USD'}).format(n);

  function toast(message){
    let el=$('.toast'); if(!el){el=document.createElement('div');el.className='toast';document.body.appendChild(el)}
    el.textContent=message; el.classList.add('show');
    clearTimeout(el._t); el._t=setTimeout(()=>el.classList.remove('show'),2800);
  }

  function initPreferences(){
    const theme=localStorage.getItem('popora-theme');
    const dir=localStorage.getItem('popora-dir');
    if(theme) document.documentElement.dataset.theme=theme;
    if(dir) document.documentElement.dir=dir;
    const themeBtn=$('[data-theme-toggle]'), dirBtn=$('[data-dir-toggle]');
    const paint=()=>{ if(themeBtn) themeBtn.setAttribute('aria-label',document.documentElement.dataset.theme==='dark'?'Switch to light mode':'Switch to dark mode'); if(themeBtn) themeBtn.textContent=document.documentElement.dataset.theme==='dark'?'☼':'◐'; if(dirBtn) dirBtn.textContent=document.documentElement.dir==='rtl'?'LTR':'RTL'; };
    themeBtn?.addEventListener('click',()=>{const next=document.documentElement.dataset.theme==='dark'?'light':'dark';document.documentElement.dataset.theme=next;localStorage.setItem('popora-theme',next);paint()});
    dirBtn?.addEventListener('click',()=>{const next=document.documentElement.dir==='rtl'?'ltr':'rtl';document.documentElement.dir=next;localStorage.setItem('popora-dir',next);paint();toast(next==='rtl'?'RTL layout enabled':'LTR layout enabled')});
    paint();
  }

  function initHeader(){
    const contact=$('[data-contact-toggle]'), pop=$('[data-contact-pop]');
    contact?.addEventListener('click',()=>{const open=pop.classList.toggle('open');contact.setAttribute('aria-expanded',open)});
    document.addEventListener('click',e=>{if(pop && !e.target.closest('[data-contact]')) pop.classList.remove('open')});
    const ham=$('[data-menu-toggle]'), panel=$('[data-mobile-panel]');
    ham?.addEventListener('click',()=>{const open=panel.classList.toggle('open');ham.setAttribute('aria-expanded',open)});
    $$('.nav a, .mobile-panel a').forEach(a=>{if(a.pathname===location.pathname) a.classList.add('active')});
  }

  function renderProducts(filter='All', target='[data-products]'){
    const grid=$(target); if(!grid) return;
    const list=filter==='All'?products:products.filter(p=>p.category===filter);
    grid.innerHTML=list.map((p,i)=>`
      <article class="product-card reveal" style="transition-delay:${(i%4)*60}ms">
        <div class="product-image"><img src="${p.image}" alt="${p.name} specialty popcorn" loading="lazy"><span class="product-badge">${p.category}</span></div>
        <div class="product-body">
          <span class="category">${p.category}</span><h3>${p.name}</h3><p>${p.desc}</p>
          <span class="price">${money(p.price)}</span>
          <div class="product-actions"><button class="mini-btn" data-quick="${p.id}" aria-label="Quick view ${p.name}">Quick view</button><button class="mini-btn" data-gift="${p.id}">+ Gift box</button></div>
        </div>
      </article>`).join('');
    initReveal();
    $$('[data-quick]', grid).forEach(b=>b.addEventListener('click',()=>openProduct(b.dataset.quick)));
    $$('[data-gift]', grid).forEach(b=>b.addEventListener('click',()=>addGift(b.dataset.gift)));
  }

  function openProduct(id){
    const p=products.find(x=>x.id===id); if(!p) return;
    let modal=$('#productModal'); if(!modal){modal=document.createElement('div');modal.id='productModal';modal.className='modal';document.body.appendChild(modal)}
    modal.innerHTML=`<div class="modal-card" role="dialog" aria-modal="true" aria-label="${p.name}">
      <button class="modal-close" data-modal-close aria-label="Close">×</button>
      <div class="modal-content"><img src="${p.image}" alt="${p.name}">
      <div class="modal-copy"><span class="kicker">${p.category}</span><h2>${p.name}</h2><p class="lede">${p.desc}</p><h3>${money(p.price)}</h3>
      <div class="actions"><button class="btn btn-accent" data-gift="${p.id}">Add to gift box</button><a class="btn btn-secondary" href="enquiry.html">Ask about gifting</a></div></div></div></div>`;
    modal.classList.add('open');document.body.style.overflow='hidden';
    $('[data-modal-close]',modal).addEventListener('click',closeModal);
    $('[data-gift]',modal).addEventListener('click',()=>{addGift(p.id);closeModal()});
    modal.addEventListener('click',e=>{if(e.target===modal)closeModal()});
    document.addEventListener('keydown',escClose,{once:true});
  }
  function escClose(e){if(e.key==='Escape')closeModal()}
  function closeModal(){const m=$('.modal.open');if(m){m.classList.remove('open');document.body.style.overflow=''}}

  function addGift(id){
    const current=JSON.parse(localStorage.getItem('popora-giftbox')||'[]'); current.push(id);localStorage.setItem('popora-giftbox',JSON.stringify(current));
    updateGiftCount(); toast('Added to your gift box');
  }
  function updateGiftCount(){const count=JSON.parse(localStorage.getItem('popora-giftbox')||'[]').length;$$('[data-gift-count]').forEach(x=>x.textContent=count)}

  function initFilters(){
    $$('.filter-btn[data-filter]').forEach(btn=>btn.addEventListener('click',()=>{
      $$('.filter-btn[data-filter]').forEach(b=>b.classList.remove('active'));btn.classList.add('active');
      renderProducts(btn.dataset.filter);
    }));
    const search=$('[data-product-search]');
    search?.addEventListener('input',()=>{const q=search.value.toLowerCase();const grid=$('[data-products]');const list=products.filter(p=>(p.name+' '+p.category+' '+p.desc).toLowerCase().includes(q));grid.innerHTML=list.map(p=>`
      <article class="product-card reveal"><div class="product-image"><img src="${p.image}" alt="${p.name}" loading="lazy"><span class="product-badge">${p.category}</span></div><div class="product-body"><span class="category">${p.category}</span><h3>${p.name}</h3><p>${p.desc}</p><span class="price">${money(p.price)}</span><div class="product-actions"><button class="mini-btn" data-quick="${p.id}">Quick view</button><button class="mini-btn" data-gift="${p.id}">+ Gift box</button></div></div></article>`).join('');initReveal();$$('[data-quick]').forEach(b=>b.onclick=()=>openProduct(b.dataset.quick));$$('[data-gift]').forEach(b=>b.onclick=()=>addGift(b.dataset.gift))});
  }

  function initForms(){
    $$('form[data-demo-form]').forEach(form=>form.addEventListener('submit',e=>{
      e.preventDefault(); let ok=true;
      $$('[required]',form).forEach(input=>{const valid=input.type==='checkbox'?input.checked:input.value.trim();input.classList.toggle('invalid',!valid);if(!valid)ok=false});
      if(form.querySelector('input[type=email]') && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.querySelector('input[type=email]').value)){form.querySelector('input[type=email]').classList.add('invalid');ok=false}
      if(!ok){toast('Please check the highlighted fields');return}
      const key=form.dataset.demoForm; localStorage.setItem('popora-last-form',key);
      form.reset(); toast(key==='newsletter'?'You’re on the POPORA list.':'Thanks — your enquiry has been saved as a frontend demo.');
      const success=form.parentElement.querySelector('[data-success]');if(success){success.hidden=false}
    }));
  }

  function initFAQ(){
    $$('.faq-q').forEach(q=>q.addEventListener('click',()=>q.parentElement.classList.toggle('open')));
  }

  function initReveal(){
    const items=$$('.reveal:not(.visible)'); if(!('IntersectionObserver' in window)){items.forEach(x=>x.classList.add('visible'));return}
    const io=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');io.unobserve(e.target)}}),{threshold:.08});
    items.forEach(x=>io.observe(x));
  }

  function initCounters(){
    $$('.counter').forEach(el=>{const target=Number(el.dataset.target||0);let started=false;const run=()=>{if(started)return;started=true;let n=0;const step=target<10?target/35:Math.max(1,Math.ceil(target/50));const t=setInterval(()=>{n+=step;if(n>=target){n=target;clearInterval(t)}el.textContent=Number.isInteger(target)?n.toLocaleString():n.toFixed(1)},22)};new IntersectionObserver(es=>es.forEach(e=>e.isIntersecting&&run()),{threshold:.5}).observe(el)})
  }

  function init(){
    initPreferences();initHeader();initForms();initFAQ();initReveal();initCounters();updateGiftCount();initFilters();
    if($('[data-products]')) renderProducts();
    const year=$('[data-year]');if(year)year.textContent=new Date().getFullYear();
    const top=$('[data-top]');window.addEventListener('scroll',()=>{if(top)top.hidden=scrollY<600});top?.addEventListener('click',()=>scrollTo({top:0,behavior:'smooth'}));
  }
  return {init,renderProducts,toast};
})();
document.addEventListener('DOMContentLoaded',POPORA.init);

document.addEventListener('DOMContentLoaded',()=>{
 const blogData=[
  {cat:'Flavor',date:'Oct 02, 2026',title:'The anatomy of a great sweet-savory bite',desc:'Why contrast keeps the bowl interesting from first handful to last.',img:'https://images.unsplash.com/photo-1606312619070-d48b4c652a52?auto=format&fit=crop&w=900&q=85'},
  {cat:'Gifting',date:'Sep 18, 2026',title:'A practical guide to better thank-you gifts',desc:'Five details that make a small box feel genuinely considered.',img:'https://images.unsplash.com/photo-1513883049090-d0b7439799bf?auto=format&fit=crop&w=900&q=85'},
  {cat:'Corporate',date:'Sep 05, 2026',title:'The anti-swag guide to client appreciation',desc:'A snack can be more memorable than another object on a desk.',img:'https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=900&q=85'},
  {cat:'Events',date:'Aug 21, 2026',title:'How to make the favor part of the party',desc:'Designing an edible takeaway that belongs to the room.',img:'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=900&q=85'},
  {cat:'Snack Culture',date:'Aug 07, 2026',title:'Why every gathering needs a bowl',desc:'Shared snacks create a low-pressure invitation to connect.',img:'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&w=900&q=85'},
  {cat:'Behind the Brand',date:'Jul 24, 2026',title:'The package is part of the flavor',desc:'A look at how tactile details shape the gifting experience.',img:'https://images.unsplash.com/photo-1607344645866-009c320b63e0?auto=format&fit=crop&w=900&q=85'},
  {cat:'Flavor',date:'Jul 10, 2026',title:'What cocoa and chili have in common',desc:'Two bold notes, one surprisingly elegant finish.',img:'https://images.unsplash.com/photo-1549007994-cb92caebd54b?auto=format&fit=crop&w=900&q=85'},
  {cat:'Gifting',date:'Jun 28, 2026',title:'Building a gift box around the person',desc:'Start with the recipient, then choose the flavors.',img:'https://images.unsplash.com/photo-1512909006721-3d6018887383?auto=format&fit=crop&w=900&q=85'}
 ];
 const grid=document.querySelector('[data-blog-grid]');
 const render=(cat='All')=>{if(!grid)return;grid.innerHTML=blogData.filter(x=>cat==='All'||x.cat===cat).map(x=>`<article class="blog-card reveal"><img src="${x.img}" alt="${x.title}" loading="lazy"><div class="copy"><span class="meta">${x.cat} · ${x.date}</span><h3>${x.title}</h3><p>${x.desc}</p><a class="btn btn-secondary" href="enquiry.html">Read more →</a></div></article>`).join('');document.querySelectorAll('.reveal').forEach(x=>x.classList.add('visible'))};
 render();
 document.querySelectorAll('[data-blog-filter]').forEach(b=>b.addEventListener('click',()=>{document.querySelectorAll('[data-blog-filter]').forEach(x=>x.classList.remove('active'));b.classList.add('active');render(b.dataset.blogFilter)}));
});

document.addEventListener('submit',e=>{
 const f=e.target;
 if(f.dataset.demoForm==='signup'){
   const a=f.querySelector('#s-password'), b=f.querySelector('#s-confirm');
   if(a&&b&&a.value!==b.value){e.preventDefault();b.classList.add('invalid');POPORA.toast('Passwords do not match');}
 }
});
