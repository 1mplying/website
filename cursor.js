const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

const chars = "IMPLYING";
const particles = []
;

class Particle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.alpha = 1;
    this.char = chars[Math.floor(Math.random() * chars.length)];
    this.size = 20; 
    this.vx = (Math.random() - 0.5) *5;
    this.vy = (Math.random() - 0.5) *3;
  }
  update() {
    this.x += this.vx;
    this.y += this.vy;
    this.alpha -= 0.02; 
  }
  draw(ctx) {
    ctx.globalAlpha = this.alpha;
    ctx.fillStyle = "#ff6969ff";
    ctx.font = `${this.size}px monospace`;
    ctx.fillText(this.char, this.x, this.y);
    ctx.globalAlpha = 1;
  }
}

window.addEventListener("mousemove", (e) => {
  for (let i = 0; i < 5; i++) {
    const randomX=Math.random() * canvas.width;
    const randomY=Math.random() * canvas.height;
    particles.push(new Particle(randomX, randomY));
  }
});

function animate() {
 ctx.fillStyle = 'rgba(255, 255, 255, 0)'; 
ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let i = particles.length - 1; i >= 0; i--) {
    particles[i].update();
    particles[i].draw(ctx);
    if (particles[i].alpha <= 0) {
      particles.splice(i, 1);
    }
  }
  requestAnimationFrame(animate);
}

animate();
