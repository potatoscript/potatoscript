function reveal(){
  document.querySelectorAll(".reveal").forEach(el=>{
    let top = el.getBoundingClientRect().top;
    let windowHeight = window.innerHeight;
    if(top < windowHeight - 80){
      el.classList.add("active");
    }
  });
}
window.addEventListener("scroll",reveal);
reveal();

function emojiFavicon(emoji) {
  const canvas = document.createElement("canvas");
  canvas.width = 64;
  canvas.height = 64;

  const ctx = canvas.getContext("2d");
  ctx.font = "56px serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(emoji, 32, 32);

  const link = document.querySelector("link[rel='icon']") || document.createElement("link");
  link.rel = "icon";
  link.href = canvas.toDataURL();
  document.head.appendChild(link);
}

emojiFavicon("🥔");