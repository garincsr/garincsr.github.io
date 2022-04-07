const tanah = document.querySelectorAll('.tanah');
const tikus = document.querySelectorAll('.tikus');
const menyerah = document.getElementById('menyerah')
const papanSkor = document.querySelector('.papan-skor');
const gun = document.querySelector('#gun');

let tanahSebelumnya;
let selesai;
let skor;

function randomTanah(tanah) {
  const t = Math.floor(Math.random() * tanah.length);
  const tRandom = tanah[t];
  if (tRandom == tanahSebelumnya) {
    randomTanah(tanah);
  }
  tanahSebelumnya = tRandom;
  return tRandom;
}

function randomWaktu(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

function munculkanTikusEasy() {
  const tRandom = randomTanah(tanah);
  const wRandom = randomWaktu(2000, 2200);
  tRandom.classList.add('muncul');

  setTimeout(() => {
    tRandom.classList.remove('muncul');
    if (!selesai) {
      munculkanTikusEasy();
    }
  }, wRandom);
}

function munculkanTikusMedium() {
  const tRandom = randomTanah(tanah);
  const wRandom = randomWaktu(800, 1000);
  tRandom.classList.add('muncul');

  setTimeout(() => {
    tRandom.classList.remove('muncul');
    if (!selesai) {
      munculkanTikusMedium();
    }
  }, wRandom);
}

function munculkanTikusHard() {
  const tRandom = randomTanah(tanah);
  const wRandom = randomWaktu(100, 200);
  tRandom.classList.add('muncul');

  setTimeout(() => {
    tRandom.classList.remove('muncul');
    if (!selesai) {
      munculkanTikusHard();
    }
  }, wRandom);
}

function mulai() {
  selesai = false;
  skor = 0;
  papanSkor.textContent = 0;
  let i = 0;
  let interval = setInterval(() => {
    i++;
    if (i === 50) {
      clearInterval(interval);
      selesai = true;
    }
  }, 1000);

  setTimeout(() => {
    munculkanTikusEasy()
  }, 1000);

  setTimeout(() => {
    munculkanTikusMedium()
  }, 10000);

  setTimeout(() => {
    munculkanTikusHard()
  }, 20000);

  setTimeout(() => {
    clearInterval(interval);
    selesai = true;
  }, 50000);

  end()
}

function end() {
  menyerah.addEventListener('click', function(){
    selesai = true;
    skor = 0;
  });
}

function pukul() {
  skor++;
  this.parentNode.classList.remove('muncul');
  gun.play();
  papanSkor.textContent = skor;
  this.style.transition = "TOP 0.1s";
}

tikus.forEach(t => {
  t.addEventListener('click', pukul);
});