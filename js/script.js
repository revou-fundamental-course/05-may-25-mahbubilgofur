/* ~~~~~~~~~~~~~~~~~~~~~~ */
/* bagian fungsi navbar */
const tombolNav = document.querySelector(".tombol-nav");
const navbar = document.getElementById("navbar");
const closeBtn = document.getElementById("closeBtn");
const closeBtn1 = document.getElementById("li1");
const closeBtn2 = document.getElementById("li2");
const closeBtn3 = document.getElementById("li3");
const closeBtn4 = document.getElementById("li4");

tombolNav.addEventListener("click", () => {
  navbar.classList.remove("hide");
  navbar.style.display = "block";
  setTimeout(() => {
    navbar.classList.add("show");
  }, 10);
});

closeBtn.addEventListener("click", () => {
  navbar.classList.remove("show");
  navbar.classList.add("hide");
  setTimeout(() => {
    navbar.style.display = "none";
  }, 400);
});
closeBtn1.addEventListener("click", () => {
  navbar.classList.remove("show");
  navbar.classList.add("hide");
});
closeBtn2.addEventListener("click", () => {
  navbar.classList.remove("show");
  navbar.classList.add("hide");
});
closeBtn3.addEventListener("click", () => {
  navbar.classList.remove("show");
  navbar.classList.add("hide");
});
closeBtn4.addEventListener("click", () => {
  navbar.classList.remove("show");
  navbar.classList.add("hide");
});
/* ~~~~~~~~~~~~~~~~~~~~~~ */
/* ~~~~~~~~~~~~~~~~~~~~~~ */
/* halaman bagian animasi scroll */
/* ~~~~~~~~~~~~~~~~~~~~~~ */
// Fungsi untuk menangani visibilitas elemen-elemen yang diamati
function toggleVisibility(entries) {
  entries.forEach((entry) => {
    console.log(entry); // Mencetak informasi elemen yang diamati
    if (entry.isIntersecting) {
      entry.target.classList.add("show"); // Menambahkan kelas 'show' saat elemen masuk viewport
    } else {
      entry.target.classList.remove("show"); // Menghapus kelas 'show' saat elemen keluar viewport
    }
  });
}

// Buat instance IntersectionObserver
const observer = new IntersectionObserver(toggleVisibility, {
  threshold: 0.1, // Ketika 30% dari elemen terlihat di viewport
});

// Fungsi untuk mengamati elemen-elemen tertentu
function observeHiddenElements() {
  // Gabungkan semua elemen yang ingin diamati dengan querySelectorAll
  const hiddenElements = document.querySelectorAll(
    ".tentang-text1, .home-text1, .home-text2,.home-foto-profil,.home-aksesoris-content-profil1,.home-text-baground,.skill-container,.project,h1"
  );
  // Menambahkan setiap elemen untuk diamati oleh observer
  hiddenElements.forEach((el) => observer.observe(el));
}

// Panggil fungsi untuk mengamati elemen-elemen yang memiliki kelas-kelas di atas
observeHiddenElements();

/* ~~~~~~~~~~~~~~~~~~~~~~ */
/*  */
/* ~~~~~~~~~~~~~~~~~~~~~~ */

/* ~~~~~~~~~~~~~~~~~~~~~~ */
/* fitur slide */
/* ~~~~~~~~~~~~~~~~~~~~~~ */
const slideContainer = document.getElementById("slide-container");
const totalSlide = slideContainer.children.length;
const dotsContainer = document.getElementById("dots");
const pauseBtn = document.getElementById("pauseBtn");
let currentSlide = 0;
let isPaused = false;
let autoSlide;

function updateDots() {
  dotsContainer.innerHTML = "";
  for (let i = 0; i < totalSlide; i++) {
    const dot = document.createElement("div");
    dot.classList.add("dot");
    if (i === currentSlide) dot.classList.add("active");
    dot.addEventListener("click", () => goToSlide(i));
    dotsContainer.appendChild(dot);
  }
}

function moveSlide(step) {
  currentSlide += step;
  if (currentSlide < 0) currentSlide = totalSlide - 1;
  if (currentSlide >= totalSlide) currentSlide = 0;
  updateSlider();
}

function goToSlide(index) {
  currentSlide = index;
  updateSlider();
}

function updateSlider() {
  const offset = currentSlide * -100;
  slideContainer.style.transform = `translateX(${offset}%)`;
  updateDots();
}

function startAutoSlide() {
  autoSlide = setInterval(() => {
    moveSlide(1);
  }, 5000);
}

function stopAutoSlide() {
  clearInterval(autoSlide);
}

pauseBtn.addEventListener("click", () => {
  if (isPaused) {
    startAutoSlide();
    pauseBtn.innerHTML = "⏸";
  } else {
    stopAutoSlide();
    pauseBtn.innerHTML = " ▶";
  }
  isPaused = !isPaused;
});

// Init
updateDots();
startAutoSlide();
/* ~~~~~~~~~~~~~~~~~~~~~~ */
/*  */
/* ~~~~~~~~~~~~~~~~~~~~~~ */

/* ~~~~~~~~~~~~~~~~~~~~~~ */
/* fungsi halaman skill */
/* ~~~~~~~~~~~~~~~~~~~~~~ */
//
/* ~~~~~~~~~~~~~~~~~~~~~~ */
/*  Fungsi utama animasi */
/* ~~~~~~~~~~~~~~~~~~~~~~ */
//
// Ambil elemen canvas dan context 2D-nya
const canvas = document.getElementById("lineCanvas");
const ctx = canvas.getContext("2d");

// Ambil semua elemen skill
const skills = Array.from(document.querySelectorAll(".skill"));
const particles = [];

// Atur ukuran canvas dan buat partikel
function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  createParticles();
}

// Dapatkan titik tengah layar (pusat kabel)
function getCenter() {
  return {
    x: canvas.width / 2,
    y: canvas.height / 2,
  };
}

// Buat partikel listrik dari pusat ke setiap skill
function createParticles() {
  const center = getCenter();
  particles.length = 0;

  skills.forEach((skill) => {
    const rect = skill.getBoundingClientRect();
    const canvasRect = canvas.getBoundingClientRect();
    const end = {
      x: rect.left + rect.width / 2 - canvasRect.left,
      y: rect.top + rect.height / 2 - canvasRect.top,
    };

    // Buat 20 partikel untuk setiap skill
    for (let i = 0; i < 2; i++) {
      particles.push({
        start: center,
        end: end,
        progress: Math.random(),
        speed: 0.002 + Math.random() * 0.004,
      });
    }
  });
}

// Fungsi untuk menggambar animasi kabel dan partikel
function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  const center = getCenter();

  skills.forEach((skill) => {
    const x = skill.offsetLeft + skill.offsetWidth / 2;
    const y = skill.offsetTop + skill.offsetHeight / 2;

    ctx.beginPath();
    ctx.moveTo(center.x, center.y);
    ctx.lineTo(x, y);
    ctx.strokeStyle = "rgba(117, 117, 117, 0.13)";
    ctx.lineWidth = 2;
    ctx.stroke();
  });

  particles.forEach((p) => {
    const x = p.start.x + (p.end.x - p.start.x) * p.progress;
    const y = p.start.y + (p.end.y - p.start.y) * p.progress;

    ctx.beginPath();
    ctx.arc(x, y, 2, 0, Math.PI * 2);
    ctx.fillStyle = "rgb(117, 117, 117)";
    ctx.fill();

    p.progress += p.speed;
    if (p.progress > 1) p.progress = 0;
  });

  requestAnimationFrame(animate);
}

// Saat halaman dimuat, jalankan resize dan animasi
window.addEventListener("load", () => {
  resizeCanvas();
  animate();
});

// Saat layar diubah ukurannya
window.addEventListener("resize", resizeCanvas);
/* ~~~~~~~~~~~~~~~~~~~~~~ */
/*  */
/* ~~~~~~~~~~~~~~~~~~~~~~ */
/* ~~~~~~~~~~~~~~~~~~~~~~ */
/* pesan eror kontak form */
/* ~~~~~~~~~~~~~~~~~~~~~~ */
function kirim() {
  const nama = document.getElementById("input-nama");
  const email = document.getElementById("input-email");
  const subjek = document.getElementById("input-subjek");
  const pesan = document.getElementById("input-pesan");

  const error1 = document.getElementById("pesan-eror-1");
  const error2 = document.getElementById("pesan-eror-2");
  const error3 = document.getElementById("pesan-eror-3");
  const error4 = document.getElementById("pesan-eror-4");

  let adaError = false;

  // Reset pesan sebelumnya
  error1.textContent = "";
  error2.textContent = "";
  error3.textContent = "";
  error4.textContent = "";

  if (nama.value.trim() === "") {
    error1.textContent = "Nama wajib diisi!";
    setTimeout(() => (error1.textContent = ""), 3000);
    adaError = true;
  }

  if (email.value.trim() === "") {
    error2.textContent = "Email wajib diisi!";
    setTimeout(() => (error2.textContent = ""), 3000);
    adaError = true;
  } else if (
    !/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/.test(email.value)
  ) {
    error2.textContent =
      "Email tidak valid! Harus sesuai format seperti contoh: email@gmail.com";
    setTimeout(() => (error2.textContent = ""), 3000);
    adaError = true;
  }

  if (subjek.value.trim() === "") {
    error3.textContent = "Subjek wajib diisi!";
    setTimeout(() => (error3.textContent = ""), 3000);
    adaError = true;
  }

  if (pesan.value.trim() === "") {
    error4.textContent = "Pesan wajib diisi!";
    setTimeout(() => (error4.textContent = ""), 3000);
    adaError = true;
  }

  if (!adaError) {
    // Tampilkan SweetAlert2
    Swal.fire({
      icon: "success",
      title: "Pesan berhasil dikirim!",
      text: "Terima kasih telah menghubungi kami.",
      confirmButtonColor: "#2a9d8f",
      timer: 3000,
      showConfirmButton: false,
      timerProgressBar: true,
    });

    // (Opsional) Kosongkan form setelah berhasil
    nama.value = "";
    email.value = "";
    subjek.value = "";
    pesan.value = "";
  }
}
