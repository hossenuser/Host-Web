// "Install app" button: Chrome/Edge (Android, Windows, macOS, ChromeOS) use the native prompt;
// iPhone/iPad Safari has no prompt API, so we show the Share > Add to Home Screen steps instead.
(()=>{
  const standalone=matchMedia('(display-mode: standalone)').matches||navigator.standalone===true;
  const inShell=/Electron/i.test(navigator.userAgent)||(window.Capacitor&&window.Capacitor.isNativePlatform&&window.Capacitor.isNativePlatform());
  if(standalone||inShell)return;
  const host=document.querySelector('.actions');if(!host)return;
  const btn=document.createElement('button');btn.className='sitebtn installBtn';btn.type='button';btn.hidden=true;btn.textContent='⤓ Install app';
  host.prepend(btn);
  const toast=t=>{const x=document.querySelector('#toast');if(!x)return;x.textContent=t;x.classList.add('show');setTimeout(()=>x.classList.remove('show'),5000)};
  let deferred=null;
  addEventListener('beforeinstallprompt',e=>{e.preventDefault();deferred=e;btn.hidden=false});
  addEventListener('appinstalled',()=>{btn.hidden=true;deferred=null});
  const ios=/iphone|ipad|ipod/i.test(navigator.userAgent)||(navigator.platform==='MacIntel'&&navigator.maxTouchPoints>1);
  if(ios){btn.hidden=false;btn.onclick=()=>toast('iPhone/iPad: Share বাটন চাপুন → "Add to Home Screen"')}
  else btn.onclick=async()=>{if(!deferred)return;deferred.prompt();await deferred.userChoice;deferred=null;btn.hidden=true};
})();
