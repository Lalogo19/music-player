// Reproductor minimalista: solo play/pause, barra de progreso y volumen
const audio = document.getElementById('audio');
const playBtn = document.getElementById('play');
const progress = document.getElementById('progress');
const volumeEl = document.getElementById('volume');
const volumeIcon = document.querySelector('.volume-icon');

// Inicializar con clase paused para mostrar triángulo
playBtn.classList.add('paused');

// Play/Pause
playBtn.addEventListener('click', ()=>{
  if(audio.paused){
    audio.play();
  } else {
    audio.pause();
  }
});

// Actualizar icono según estado
audio.addEventListener('play', ()=>{ 
  playBtn.classList.remove('paused');
});
audio.addEventListener('pause', ()=>{ 
  playBtn.classList.add('paused');
});

// Actualizar barra de progreso
audio.addEventListener('timeupdate', ()=>{
  if(!isFinite(audio.duration) || audio.duration===0) return;
  const pct = (audio.currentTime / audio.duration) * 100;
  progress.value = pct;
});

// Permitir cambiar posición con la barra
progress.addEventListener('input', ()=>{
  if(!isFinite(audio.duration)) return;
  const t = (progress.value/100) * audio.duration;
  audio.currentTime = t;
});

// Control de volumen
volumeEl.addEventListener('input', ()=>{ 
  audio.volume = parseFloat(volumeEl.value);
});

// Click en icono de volumen para expandir/retraer y muteador rápido
volumeIcon.addEventListener('click', ()=>{
  const volumeControl = document.querySelector('.volume-control');
  volumeControl.classList.toggle('expanded');
  
  // Si se expande, asegurarse que el volumen no esté mutado
  if(volumeControl.classList.contains('expanded')){
    if(audio.volume === 0){
      audio.volume = 1;
      volumeEl.value = 1;
    }
  }
});

// Canvas para visualización Tesla
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
let canvasWidth = canvas.width = window.innerWidth;
let canvasHeight = canvas.height = window.innerHeight;

// Determinar si es móvil
const isMobile = () => window.innerWidth <= 768;

// Tamaño de bobinas adaptable
let coilRadius = isMobile() ? 60 : 80;

// Ajustar canvas al redimensionar ventana
window.addEventListener('resize', ()=>{
  canvasWidth = canvas.width = window.innerWidth;
  canvasHeight = canvas.height = window.innerHeight;
  coilRadius = isMobile() ? 60 : 80;
  // Recalcular posiciones de bobinas
  updateTeslaCoilPositions();
});

// Actualizar posiciones de bobinas según tamaño de pantalla
function updateTeslaCoilPositions(){
  const horizontalOffset = isMobile() ? 0.15 : 0.25;
  teslaCoils[0] = { x: canvasWidth * 0.5, y: canvasHeight * 0.2, angle: Math.PI * 1.5 };
  teslaCoils[1] = { x: canvasWidth * horizontalOffset, y: canvasHeight * 0.7, angle: Math.PI * 0.5 };
  teslaCoils[2] = { x: canvasWidth * (1 - horizontalOffset), y: canvasHeight * 0.7, angle: -Math.PI * 0.5 };
}



// VISUALIZACIÓN TESLA - Bobinas en triángulo con rayos
let teslaTime = 0;
let teslaCoils = [
  { x: canvasWidth * 0.5, y: canvasHeight * 0.2, angle: Math.PI * 1.5 }, // arriba
  { x: canvasWidth * 0.25, y: canvasHeight * 0.7, angle: Math.PI * 0.5 },  // abajo-izq
  { x: canvasWidth * 0.75, y: canvasHeight * 0.7, angle: -Math.PI * 0.5 }  // abajo-der
];

updateTeslaCoilPositions();

// Dibujar bobina Tesla (espiral frontal sin rotación)
function drawTeslaCoil(x, y, radius){
  ctx.save();
  ctx.translate(x, y);
  
  // Bobina: múltiples espirales concéntricas (vista frontal)
  for(let layer = 0; layer < 3; layer++){
    ctx.beginPath();
    const r = radius * (0.3 + layer * 0.25);
    for(let a = 0; a < Math.PI * 2 * 4; a += 0.05){
      const px = Math.cos(a) * r * (1 + Math.sin(a * 0.5) * 0.2);
      const py = Math.sin(a) * r * (1 + Math.sin(a * 0.5) * 0.2);
      if(a === 0) ctx.moveTo(px, py);
      else ctx.lineTo(px, py);
    }
    // Colores azules para las capas
    const brightness = 40 + layer * 15;
    ctx.strokeStyle = `hsl(210, 100%, ${brightness}%)`;
    ctx.lineWidth = 2.5;
    ctx.stroke();
  }
  
  // Centro brillante azul
  const g = ctx.createRadialGradient(0, 0, 0, 0, 0, radius * 0.15);
  g.addColorStop(0, `hsl(180, 100%, 90%)`);
  g.addColorStop(0.5, `hsl(200, 100%, 60%)`);
  g.addColorStop(1, `hsl(220, 100%, 30%)`);
  ctx.fillStyle = g;
  ctx.beginPath();
  ctx.arc(0, 0, radius * 0.15, 0, Math.PI * 2);
  ctx.fill();
  
  // Anillo exterior azul brillante
  ctx.strokeStyle = `hsl(180, 100%, 80%)`;
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.arc(0, 0, radius * 0.08, 0, Math.PI * 2);
  ctx.stroke();
  
  ctx.restore();
}

// Dibujar rayo entre dos puntos (azul)
function drawRay(fromX, fromY, toX, toY, intensity){
  const segments = 20;
  const displacement = intensity * 8 * Math.random();
  
  ctx.beginPath();
  ctx.moveTo(fromX, fromY);
  
  for(let i = 0; i <= segments; i++){
    const t = i / segments;
    const baseX = fromX + (toX - fromX) * t;
    const baseY = fromY + (toY - fromY) * t;
    
    // Offset aleatorio para efecto de rayo
    const offset = (Math.random() - 0.5) * displacement;
    const angle = Math.atan2(toY - fromY, toX - fromX) + Math.PI * 0.5;
    
    const x = baseX + Math.cos(angle) * offset;
    const y = baseY + Math.sin(angle) * offset;
    
    if(i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  }
  
  // Rayo principal azul brillante
  ctx.strokeStyle = `hsla(200, 100%, ${50 + intensity * 30}%, ${intensity})`;
  ctx.lineWidth = Math.max(1, intensity * 3);
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';
  ctx.stroke();
  
  // Brillo adicional azul cian
  ctx.strokeStyle = `hsla(180, 100%, ${70 + intensity * 20}%, ${intensity * 0.7})`;
  ctx.lineWidth = Math.max(0.5, intensity * 1.5);
  ctx.stroke();
}

// Obtener intensidad de audio (para animar rayos)
function getAudioIntensity(){
  // Si audio está en pausa, retornar intensidad mínima
  if(audio.paused) return 0.2;
  
  // Usar tiempo del audio para sincronizar animación
  const t = audio.currentTime * 2;
  const base = Math.sin(t) * 0.3 + 0.5;
  
  // Agregar variación aleatoria para más caos
  return Math.max(0.2, base + Math.random() * 0.5);
}

// Loop de animación
function animate(){
  teslaTime += 0.016; // ~60fps
  
  // Fondo con degradado oscuro
  const bgGrad = ctx.createLinearGradient(0, 0, canvasWidth, canvasHeight);
  bgGrad.addColorStop(0, '#021024');
  bgGrad.addColorStop(0.5, '#0a1a3a');
  bgGrad.addColorStop(1, '#021024');
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, canvasWidth, canvasHeight);
  
  // Dibujar bobinas Tesla (sin rotación, vista frontal)
  teslaCoils.forEach((coil)=>{
    drawTeslaCoil(coil.x, coil.y, coilRadius);
  });
  
  // Obtener intensidad de audio
  const intensity = getAudioIntensity();
  
  // Dibujar rayos entre bobinas (triángulo)
  const rayCount = Math.floor(intensity * 8) + 3;
  for(let ray = 0; ray < rayCount; ray++){
    const from = teslaCoils[ray % 3];
    const to = teslaCoils[(ray + 1) % 3];
    const rayIntensity = intensity * (0.5 + Math.sin(teslaTime * 5 + ray) * 0.5);
    drawRay(from.x, from.y, to.x, to.y, rayIntensity);
  }
  
  // Rayos internos (caóticos cuando hay música)
  if(!audio.paused && intensity > 0.3){
    for(let i = 0; i < Math.floor(intensity * 5); i++){
      const from = teslaCoils[Math.floor(Math.random() * 3)];
      const to = teslaCoils[Math.floor(Math.random() * 3)];
      const rayIntensity = Math.random() * intensity * 0.6;
      drawRay(from.x, from.y, to.x, to.y, rayIntensity);
    }
  }
  
  // Partículas de energía azul
  const particleCount = Math.floor(intensity * 20);
  for(let p = 0; p < particleCount; p++){
    const angle = (teslaTime + p * 0.1) * (1 + intensity);
    const coil = teslaCoils[p % 3];
    const dist = 120 + Math.sin(teslaTime * 2 + p) * 40;
    const px = coil.x + Math.cos(angle) * dist;
    const py = coil.y + Math.sin(angle) * dist;
    
    const hue = 180 + Math.sin(angle * 0.5) * 30;
    ctx.fillStyle = `hsl(${hue}, 100%, ${60 + intensity * 20}%)`;
    ctx.beginPath();
    ctx.arc(px, py, intensity * 2, 0, Math.PI * 2);
    ctx.fill();
  }
  
  requestAnimationFrame(animate);
}

animate();

// Limpieza al descargar
window.addEventListener('unload', ()=>{});
