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