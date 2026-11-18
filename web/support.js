import { firebaseConfig, firebaseReady } from './firebase-config.js';

const $ = s => document.querySelector(s);
const panel=$('#chatPanel'), toggle=$('#chatToggle'), close=$('#chatClose');
const log=$('#chatLog'), form=$('#chatForm'), field=$('#chatMessage');
const KEY='mhag-chat-pending-v1', CONV='mhag-chat-conversation-v1';
let db=null, auth=null, conversationId=localStorage.getItem(CONV), unsubscribe=null, busy=false;
const pending=()=>{try{return JSON.parse(localStorage.getItem(KEY)||'[]')}catch{return []}};
const savePending=a=>localStorage.setItem(KEY,JSON.stringify(a));
const escapeHTML=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
function bubble(text,time,mine=false,status=''){const el=document.createElement('div');el.className='chatBubble'+(mine?' mine':'');el.innerHTML=escapeHTML(text)+'<small>'+new Date(time).toLocaleString()+(status?' · '+escapeHTML(status):'')+'</small>';log.append(el);log.scrollTop=log.scrollHeight}
function renderPending(){log.querySelectorAll('.chatBubble.local').forEach(x=>x.remove());pending().forEach(m=>{const el=document.createElement('div');el.className='chatBubble mine local';el.textContent=m.text+' (পাঠানোর অপেক্ষায়)';log.append(el)})}
function open(){panel.hidden=false;toggle.setAttribute('aria-expanded','true');field.focus()}
function shut(){panel.hidden=true;toggle.setAttribute('aria-expanded','false')}
toggle?.addEventListener('click',open);close?.addEventListener('click',shut);
function status(){const online=navigator.onLine;$('#chatStatus').textContent=online?'মেসেজিং সংযোগ উপলব্ধ':'Offline · ড্রাফট সংরক্ষণ হবে';$('#chatMode').textContent=online?'Secure support connection':'Offline draft supported'}
window.addEventListener('online',()=>{status();flushPending()});window.addEventListener('offline',status);status();
async function initFirebase(){
  if(!firebaseReady){$('#chatStatus').textContent='Backend setup required';return false}
  try{
    const [appMod,authMod,fireMod]=await Promise.all([
      import('https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js'),
      import('https://www.gstatic.com/firebasejs/10.14.1/firebase-auth.js'),
      import('https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js')
    ]);
    const app=appMod.initializeApp(firebaseConfig);auth=authMod.getAuth(app);db=fireMod.getFirestore(app);
    const cred=await authMod.signInAnonymously(auth);
    if(!conversationId){
      const ref=await fireMod.addDoc(fireMod.collection(db,'conversations'),{ownerUid:cred.user.uid,createdAt:fireMod.serverTimestamp(),updatedAt:fireMod.serverTimestamp(),status:'open',lastMessage:'',visitorLanguage:navigator.language||'en'});
      conversationId=ref.id;localStorage.setItem(CONV,conversationId);
    }
    const q=fireMod.query(fireMod.collection(db,'conversations',conversationId,'messages'),fireMod.orderBy('createdAt','asc'),fireMod.limit(100));
    unsubscribe=fireMod.onSnapshot(q,snap=>{log.innerHTML='';snap.forEach(d=>{const m=d.data();bubble(m.text||'[Attachment]',m.createdAt?.toDate?.()||Date.now(),m.senderUid===auth.currentUser?.uid,m.status||'')});renderPending()});
    window.__mhagFirebase={fireMod,db,auth,conversationId};
    $('#chatStatus').textContent='Connected · Admin reply enabled after backend setup';
    await flushPending();return true;
  }catch(e){console.error('Live chat setup failed',e);$('#chatStatus').textContent='Chat backend unavailable · WhatsApp available';return false}
}
async function sendRemote(text){
  const f=window.__mhagFirebase;if(!f)throw Error('Firebase not connected');
  const {fireMod,db,auth,conversationId}=f;
  await fireMod.addDoc(fireMod.collection(db,'conversations',conversationId,'messages'),{text,senderUid:auth.currentUser.uid,senderRole:'visitor',createdAt:fireMod.serverTimestamp(),status:'sent'});
  await fireMod.updateDoc(fireMod.doc(db,'conversations',conversationId),{lastMessage:text.slice(0,180),updatedAt:fireMod.serverTimestamp()});
}
async function flushPending(){
  if(!navigator.onLine||busy||!pending().length)return;
  busy=true;
  try{
    if(!window.__mhagFirebase && !(await initFirebase()))return;
    const queue=pending();
    for(const m of queue){await sendRemote(m.text);savePending(pending().filter(x=>x.id!==m.id))}
    renderPending();
  }catch(e){console.warn('Pending messages retained',e)}finally{busy=false}
}
form?.addEventListener('submit',async e=>{
  e.preventDefault();const text=field.value.trim();if(!text)return;
  field.value='';
  if(navigator.onLine && window.__mhagFirebase){try{await sendRemote(text);return}catch(e){console.warn(e)}}
  const q=pending();q.push({id:crypto.randomUUID?.()||String(Date.now()),text,createdAt:Date.now()});savePending(q);renderPending();
  if(navigator.onLine)flushPending();
});
renderPending();
if(firebaseReady && navigator.onLine)initFirebase();
