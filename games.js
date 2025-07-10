/* ====== DOM ====== */
const board   = document.getElementById('board');
const sidebar = document.getElementById('sidebar');

const introOverlay = document.getElementById('introOverlay');
const playBtn  = document.getElementById('playBtn');
const learnBtn = document.getElementById('learnBtn');

const p1C  = document.getElementById('p1Card');
const p2C  = document.getElementById('p2Card');
const p1PosT = p1C.querySelector('.pos');
const p1ScrT = p1C.querySelector('.score');
const p2PosT = p2C.querySelector('.pos');
const p2ScrT = p2C.querySelector('.score');

const diceArea = document.getElementById('diceArea');
const dice     = document.getElementById('dice');
const rollBtn  = document.getElementById('rollBtn');
const diceRes  = document.getElementById('diceResult');
const statusT  = document.getElementById('status');

const overlay  = document.getElementById('overlay');
const qBox     = document.getElementById('questionBox');
const qText    = document.getElementById('questionText');
const optWrap  = document.getElementById('options');
const feedback = document.getElementById('feedback');
const nextBtn  = document.getElementById('nextBtn');

const sounds = {
  start:  document.getElementById('startSound'),
  move:   document.getElementById('moveSound'),
  snake:  document.getElementById('snakeSound'),
  ladder: document.getElementById('ladderSound'),
  correct:document.getElementById('correctSound'),
  wrong:  document.getElementById('wrongSound'),
  win:    document.getElementById('winSound')
};

function playSound(name){
  if(sounds[name]) {
    sounds[name].currentTime = 0;
    sounds[name].play();
  }
}

/* ====== DATA ====== */
const snakesArr = [
  {from:16,to:6},{from:47,to:26},{from:49,to:11},{from:56,to:53},
  {from:62,to:19},{from:64,to:60},{from:87,to:24},{from:93,to:73},
  {from:95,to:75},{from:98,to:78}
];
const laddersArr = [
  {from:1,to:38},{from:4,to:14},{from:9,to:31},{from:21,to:42},
  {from:28,to:84},{from:36,to:44},{from:51,to:67},{from:71,to:91},
  {from:80,to:100}
];
const snakes  = Object.fromEntries(snakesArr.map(o=>[o.from,o.to]));
const ladders = Object.fromEntries(laddersArr.map(o=>[o.from,o.to]));

const bank = [
{q:'Apa pengertian dari "online threats" (ancaman daring)?',o:['Masalah dunia nyata','Ancaman keselamatan di luar rumah','Ancaman via internet & digital','Gangguan jaringan lambat'],a:2},
{q:'Berikut ini yang termasuk contoh malware adalah …',o:['WhatsApp','Facebook','Ransomware','Zoom'],a:2},
{q:'Apa itu phishing?',o:['Antivirus','Mencuri data via situs/email palsu','Menyimpan file ke cloud','Mempercepat internet'],a:1},
{q:'Serangan ransomware 2024 di Indonesia menyerang …',o:['Sekolah dasar','Toko online','Pusat Data Nasional','Media sosial'],a:2},
{q:'Dampak paling umum ransomware?',o:['Internet cepat','Anak tak bisa main game','Data dikunci & diminta tebusan','File dibagi ke teman'],a:2},
{q:'Jika menerima email mencurigakan yang meminta password, tindakan?',o:['Balas & beri info','Abaikan & hapus','Forward ke semua','Daftar ulang di situs'],a:1},
{q:'Orang tua melindungi anak dari online threats dengan …',o:['Bebas tanpa pengawasan','Berikan gadget saja','Kontrol orang tua & diskusi','Anak belajar sendiri'],a:2},
{q:'Nama peretas yang bocorkan NIK & NPWP?',o:['Anonymous','Elon Musk','Bjorka','Stormbreaker'],a:2},
{q:'Fungsi autentikasi dua faktor (2FA)?',o:['Gandakan memori HP','Simpan foto otomatis','Tambah lapisan keamanan login','Nonaktifkan kamera'],a:2},
{q:'Mengapa orang tua perlu paham online threats?',o:['Agar bisa main game','Lindungi keluarga dari bahaya digital','Buat email baru','Hapus semua aplikasi'],a:1},
{q:'Apa itu OTP & mengapa rahasia?',o:['Kode kenalan teman','Kode pakai berulang','Kode sekali pakai verifikasi','Kode promo belanja'],a:2},
{q:'Bukan ciri pesan phishing?',o:['Pengirim pakai alamat resmi','Ada link mencurigakan','Bahasa mendesak','Pengirim tak dikenal'],a:0},
{q:'Kenapa tidak boleh unduh aplikasi di luar Play Store/App Store?',o:['Aplikasinya bosan','Memperlambat jaringan','Bisa berisi virus/malware','Ukurannya besar'],a:2},
{q:'Modus penipuan jual‑beli online?',o:['Bonus gratis','Barang dikirim dulu','Harga murah lalu kabur','Garansi seumur hidup'],a:2},
{q:'Apa itu brute‑force attack?',o:['Serangan fisik','Menebak password kombinasi banyak','Panggilan palsu','Sebar hoaks'],a:1},
{q:'Lindungi diri dari brute‑force dengan?',o:['Password tanggal lahir','Password sama semua akun','Password kuat + 2FA','Tanpa password'],a:2},
{q:'OTP diminta kurir, tindakan?',o:['Kirim saja','Tanya detail kurir','Jangan beri & akhiri pembicaraan','Minta OTP baru'],a:2},
{q:'Tanda akun WhatsApp/medsos diretas?',o:['Tak bisa stiker','Teman terima pesan aneh','Aplikasi sering update','Baterai boros'],a:1},
{q:'Apa itu ransomware & akibatnya?',o:['Virus bikin PC cepat','Virus nyalakan kamera','Kunci data & minta tebusan','Hapus aplikasi'],a:2},
{q:'Kenapa tidak sembarang isi data di kuis online?',o:['Bikin kuis susah','Kuis error','Data bisa disalahgunakan','Data hilang'],a:2},
{q:'Apa yang harus diperiksa sebelum klik link situs tidak dikenal?',o:['Warna latar','Iklan di dalamnya','URL & tampilan mencurigakan','Jumlah kata'],a:2},
{q:'Tawaran hadiah besar dari orang tak dikenal, tindakan?',o:['Klik link & isi data','Sebar ke teman','Abaikan & cek kebenaran','Telepon pengirim'],a:2},
{q:'Kenapa password tiap akun harus berbeda?',o:['Mudah diingat','Dipakai teman','Jika satu akun diretas, yang lain aman','Akses cepat'],a:2},
{q:'Risiko asal klik link pesan?',o:['Akun lebih cepat','Masuk situs palsu & data dicuri','Dapat hadiah','Internet lemot'],a:1},
{q:'Tanda situs aman transaksi online?',o:['Iklan warna‑warni','Bisa offline','Ada gembok & https://','Nama situs keren'],a:2},
{q:'Password "Andi123" aman?',o:['Aman huruf & angka','Aman pakai nama','Tidak aman — mudah ditebak','Terlalu panjang'],a:2},
{q:'Situs t0koterpercaya99.net tanpa gembok, tindakan?',o:['Lanjut belanja','Chat admin','Batalkan & cari situs aman','COD saja'],a:2},
{q:'Unduh app bank dari situs tak resmi, tindakan?',o:['Unduh saja','Unduh & ganti password','Cari versi resmi di Store','Unduh jika terpaksa'],a:2},
{q:'“Petugas pajak” minta KTP & rekening via chat, tindakan?',o:['Kirim saja','Tanya lalu kirim','Telepon verifikasi','Jangan kirim data pribadi'],a:3},
{q:'Pop‑up “Pengunjung ke‑1.000” muncul, tindakan?',o:['Klik infonya','Tutup & jangan klik','Simpan halaman','Screenshot'],a:1}
];

/* ====== STATE ====== */
let cells = [];
let tokens = {};
let players;          // {1:{pos,score},2:{pos,score}}
let turn;             // untuk pergantian pemain
let numPlayers;
let questionMap = {}; // {squareIdx:questionObj}

/* ====== HELPERS ====== */
const posToXY = n=>{
  const row     = Math.floor((n-1)/10);
  const col     = (n-1)%10;
  const trueCol = row%2===0 ? col : 9-col;
  return {x:trueCol*61+31, y:(9-row)*61+31};
};
const moveToken = (pid,pos)=>{
  const {x,y} = posToXY(pos);
  tokens[pid].style.left = x+'px';
  tokens[pid].style.top  = y+'px';
  tokens[pid].classList.add('hop');
  setTimeout(()=>tokens[pid].classList.remove('hop'),600);
};
const updatePanel = ()=>{
  p1PosT.textContent = players[1].pos;
  p1ScrT.textContent = players[1].score;
  p2PosT.textContent = players[2].pos;
  p2ScrT.textContent = players[2].score;
  p1C.classList.toggle('active',turn===1);
  p2C.classList.toggle('active',turn===2);
};

/* ====== BUILD BOARD ====== */
(function buildBoard(){
  for(let r=9;r>=0;r--){
    for(let c=0;c<10;c++){
      const idx = r%2===0 ? r*10+c+1 : r*10+(9-c)+1;
      const cell = document.createElement('div');
      cell.className='cell';
      cell.textContent = idx;
      cells[idx]=cell;
      board.appendChild(cell);
    }
  }

  /* 2 — paths container ABOVE cells (z-index via CSS) */
  const svg = document.createElementNS('http://www.w3.org/2000/svg','svg');
  svg.id='paths'; svg.setAttribute('width','610'); svg.setAttribute('height','610');
  board.appendChild(svg);

  svg.innerHTML = `
    <defs>
      <linearGradient id="snakeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="#4caf50" />
        <stop offset="100%" stop-color="#2e7d32" />
      </linearGradient>
      <radialGradient id="snakeHead" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stop-color="#99dd99" />
        <stop offset="100%" stop-color="#2e7d32" />
      </radialGradient>
    </defs>
  `;

  /* 3 — draw snakes */
  const drawSnake=(from,to)=>{
    const path=document.createElementNS('http://www.w3.org/2000/svg','path');
    const m1={x:(2*from.x+to.x)/3+40,y:(2*from.y+to.y)/3+40};
    const m2={x:(from.x+2*to.x)/3-40,y:(from.y+2*to.y)/3-40};
    path.setAttribute('d',`M${from.x},${from.y} Q${m1.x},${m1.y} ${m2.x},${m2.y} T${to.x},${to.y}`);
    path.setAttribute('class','snake-body');
    svg.appendChild(path);

    const head=document.createElementNS('http://www.w3.org/2000/svg','circle');
    head.setAttribute('cx',from.x); head.setAttribute('cy',from.y); head.setAttribute('r','14');
    head.setAttribute('class','snake-head');
    svg.appendChild(head);

    ['-5','5'].forEach(dx=>{
      const eye=document.createElementNS('http://www.w3.org/2000/svg','circle');
      eye.setAttribute('cx',from.x+ +dx); eye.setAttribute('cy',from.y-3); eye.setAttribute('r','3'); eye.setAttribute('class','eye');
      svg.appendChild(eye);
      const pupil=document.createElementNS('http://www.w3.org/2000/svg','circle');
      pupil.setAttribute('cx',from.x+ +dx); pupil.setAttribute('cy',from.y-3); pupil.setAttribute('r','1.3'); pupil.setAttribute('class','pupil');
      svg.appendChild(pupil);
    });
  };

  /* 4 — draw ladders */
  const drawLadder=(from,to)=>{
    const len=Math.hypot(to.x-from.x,to.y-from.y),ux=(to.y-from.y)/len*9,uy=-(to.x-from.x)/len*9;
    [[ux,uy],[-ux,-uy]].forEach(([dx,dy])=>{
      const rail=document.createElementNS('http://www.w3.org/2000/svg','path');
      rail.setAttribute('d',`M${from.x+dx},${from.y+dy} L${to.x+dx},${to.y+dy}`);
      rail.setAttribute('class','ladder-rail');
      svg.appendChild(rail);
    });
    for(let i=1;i<5;i++){
      const x=from.x+(to.x-from.x)*i/5, y=from.y+(to.y-from.y)*i/5;
      const rung=document.createElementNS('http://www.w3.org/2000/svg','line');
      rung.setAttribute('x1',x+ux); rung.setAttribute('y1',y+uy);
      rung.setAttribute('x2',x-ux); rung.setAttribute('y2',y-uy);
      rung.setAttribute('class','ladder-rung');
      svg.appendChild(rung);
    }
  };

  const p = n=>posToXY(n);
  snakesArr.forEach(s=>drawSnake(p(s.from),p(s.to)));
  laddersArr.forEach(l=>drawLadder(p(l.from),p(l.to)));

  /* 5 — tokens (top layer) */
  const makeToken=(txt,blue)=>{const d=document.createElement('div');d.className='token'+(blue?' blue':'');d.textContent=txt;return d;};
  tokens[1]=makeToken('1'); tokens[2]=makeToken('2',true);
  board.append(tokens[1],tokens[2]);
})();

/* ====== INTRO FLOW ====== */
learnBtn.onclick = ()=>window.open('https://example.com/belajar-online-safety','_blank');
playBtn.onclick  = ()=>{
  numPlayers = document.querySelector('[name="mode"]:checked').value==='duo' ? 2 : 1;
  tokens[2].style.display = numPlayers===2 ? '' : 'none';
  p2C.classList.toggle('hidden',numPlayers===1);
  introOverlay.style.display='none';
  sidebar.classList.remove('hidden');
  initGame();
};

/* ====== GAME INIT ====== */
function initGame(){
  questionMap={};
  [...Array(98).keys()].map(i=>i+2).sort(()=>Math.random()-.5).slice(0,30)
    .forEach((idx,i)=>questionMap[idx]=bank[i]);

  players={1:{pos:1,score:0},2:{pos:1,score:0}};
  turn=1;

  [1,2].forEach(id=>{
    tokens[id].style.transition='none';
    moveToken(id,1);
  });
  setTimeout(()=>tokens[1].style.transition=tokens[2].style.transition='top .6s ease,left .6s ease',50);

  diceArea.classList.remove('hidden');
  diceRes.textContent='';
  statusT.textContent='Giliran Pemain 1';
  rollBtn.disabled=false;
  updatePanel();
}

/* ====== DICE ====== */
rollBtn.onclick = ()=>{
  dice.classList.add('rolling');
  const roll = Math.floor(Math.random()*6)+1;
  setTimeout(()=>{
    dice.classList.remove('rolling');
    const rot=[[0,0],[0,-90],[-90,0],[0,90],[90,0],[0,180]][roll-1];
    dice.style.transform=`rotateX(${rot[0]}deg) rotateY(${rot[1]}deg)`;
    diceRes.textContent='Dadu: '+roll;
    advance(roll);
  },1000);
};

/* ====== MOVE LOGIC ====== */
function advance(roll){
  const p = players[turn];
  let next = p.pos + roll;
  if(next>100){statusT.textContent='Harus pas 100!';return endTurn();}

  statusT.textContent = `P${turn} ke ${next}`;
  animate(next,()=>{
    if(snakes[next]){
      const dst=snakes[next];
      statusT.textContent='🐍 Turun ke '+dst;
      animate(dst,()=>after(dst));
    }else if(ladders[next]){
      const dst=ladders[next];
      statusT.textContent='🪜 Naik ke '+dst;
      animate(dst,()=>after(dst));
    }else after(next);
  });
}
function animate(target,cb){
  players[turn].pos=target;
  moveToken(turn,target);
  setTimeout(cb,650);
}
function after(pos){
  questionMap[pos] ? ask(pos) : checkWin();
}

/* ====== QUESTIONS ====== */
function ask(idx){
  const d=questionMap[idx];
  overlay.classList.remove('hidden');
  qBox.classList.remove('hidden');

  qText.textContent=d.q;
  optWrap.innerHTML='';
  feedback.classList.add('hidden');
  nextBtn.classList.add('hidden');

  ['A','B','C','D'].slice(0,d.o.length).forEach((label,i)=>{
    const btn=document.createElement('button');
    btn.innerHTML=`<strong>${label}.</strong> ${d.o[i]}`;
    btn.onclick=()=>evaluate(i===d.a,d.o[d.a]);
    optWrap.appendChild(btn);
  });
}
function evaluate(correct,ans){
  feedback.textContent = correct ? '✅ Benar! +10' : '❌ Salah. Jawaban: '+ans;
  feedback.style.color = correct ? 'var(--green)' : 'var(--red)';
  feedback.classList.remove('hidden');
  nextBtn.classList.remove('hidden');
  if(correct) players[turn].score+=10;
  updatePanel();
  nextBtn.onclick=()=>{
    overlay.classList.add('hidden');
    qBox.classList.add('hidden');
    checkWin();
  };
}

/* ====== END TURN / WIN ====== */
function checkWin(){
  if(players[turn].pos===100){
    alert(`🎉 Pemain ${turn} MENANG!\nSkor: ${players[turn].score}`);
    rollBtn.disabled=true; return;
  }
  endTurn();
}
function endTurn(){
  if(numPlayers===2){
    turn = turn===1 ? 2 : 1;
    updatePanel();
    statusT.textContent=`Giliran Pemain ${turn}`;
  }
}
