/* ===== LADDER ANIMATION ===== */
const ladder = document.getElementById("ladder");
const totalRungs = 24, spacing = 35;
for (let i=0;i<totalRungs;i++){
  const rung = document.createElement("div");
  rung.className="rung"; rung.style.top=`${i*spacing}px`;
  ladder.appendChild(rung);
}
new IntersectionObserver(entries=>{
  entries.forEach(e=>{
    if(e.isIntersecting){
      ladder.querySelectorAll(".rung").forEach((r,i)=>{
        r.style.animation=`popRung .4s ease-out forwards ${i*0.1}s`;
      });
      // run once
      e.target && observer.unobserve(e.target);
    }
  });
},{threshold:.3}).observe(ladder);

/* ===== CONTACT + CTA SLIDE‑IN ===== */
const contact = document.querySelector('.contact-us');
new IntersectionObserver(es=>{es[0].isIntersecting && contact.classList.add('animate');},{threshold:.3}).observe(contact);

const gameCta = document.querySelector('.game-cta');
new IntersectionObserver(es=>{
  if(es[0].isIntersecting){gameCta.classList.add('animate-slide-in');}
},{threshold:.3}).observe(gameCta);

/* ===== PARALLAX FLOATING ===== */
window.addEventListener('scroll',()=>{
  const y = window.scrollY*.1;
  document.querySelectorAll('.float').forEach(el=>{
    el.style.transform=`translateY(${y}px)`;
  });
  const txtOffset = window.scrollY*.3;
  document.querySelector('.hero-text').style.transform=`translateY(${txtOffset}px) rotateX(4deg)`;
});

/* ===== CURSOR‑FOLLOW SNAKE ===== */
document.addEventListener('mousemove',e=>{
  const snake=document.getElementById('snakeFollow');
  snake.style.transform=`translate(${e.clientX}px,${e.clientY}px)`;
});

/* ===== 3‑D DICE (VanillaTilt) ===== */
VanillaTilt.init(document.querySelectorAll(".dice"),{
  max:25,speed:400,scale:1.1,glare:true,"max-glare":0.3
});

/* ===== DICE SOUND ===== */
const rollSound=document.getElementById('rollSound');
document.getElementById('rollBtn').addEventListener('click',()=>{
  if(rollSound){rollSound.currentTime=0;rollSound.play();}
});
