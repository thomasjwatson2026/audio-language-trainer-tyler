const btn=document.getElementById("menuBtn");
const drawer=document.getElementById("drawer");
const topbar=document.querySelector('.topbar');
if(topbar && !document.getElementById('hdrRefresh')){
  const r=document.createElement('button');
  r.id='hdrRefresh';
  r.className='menu-btn top-refresh';
  r.textContent='♻️';
  r.title='Hard refresh';
  r.setAttribute('aria-label','Hard refresh');
  r.addEventListener('click', async ()=>{
    try{
      if(window.caches && caches.keys){
        const keys=await caches.keys();
        await Promise.all(keys.map(k=>caches.delete(k)));
      }
      if('serviceWorker' in navigator){
        const regs=await navigator.serviceWorker.getRegistrations();
        await Promise.all(regs.map(r=>r.unregister()));
      }
    }catch{}
    const u=new URL(window.location.href);
    u.searchParams.set('v',Date.now().toString());
    window.location.replace(u.toString());
  });
  const spacer=document.createElement('div');
  spacer.style.flex='1';
  topbar.appendChild(spacer);
  topbar.appendChild(r);
}
if(btn&&drawer){
  btn.addEventListener("click",()=>drawer.classList.toggle("open"));
  document.addEventListener("click",(e)=>{if(!drawer.contains(e.target)&&e.target!==btn)drawer.classList.remove("open");});
}
