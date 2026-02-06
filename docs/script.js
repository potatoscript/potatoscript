document.addEventListener("DOMContentLoaded", function(){

  const ctx = document.getElementById('expChart');
  if(!ctx) return;

  new Chart(ctx, {
    type: 'pie',
    data: {
      labels: ['Eng', 'Auto', 'Soft'], // shorter legend text
      datasets: [{
        data: [30,10,60],
        backgroundColor: [
          '#2c678e',
          '#5298b3',
          '#72a579'
        ]
      }]
    },

    options: {
      responsive:true,

      plugins:{
        legend:{
          position:'bottom',
          labels: {
            boxWidth: 12,
            boxHeight: 12   // ← makes it square
          }
        },

        datalabels:{
          color:'#fff',
          font:{
            weight:'bold',
            size:14
          },
          formatter:(value)=> value + "%"
        }
      }
    },

    plugins:[ChartDataLabels]
  });

});




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