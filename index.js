// Audio Autoplay
window.addEventListener("DOMContentLoaded", function () {
  const audio = document.getElementById("backgroundAudio");
  audio.muted = false; // Aktifkan suara setelah halaman dimuat
  audio.play().catch((error) => {
    console.error("Autoplay gagal:", error);
  });
});

function toggleText(button) {
  const card = button.parentElement; // Mendapatkan elemen card tempat tombol berada
  const moreText = card.querySelector(".more-text"); // Elemen teks tersembunyi

  if (moreText.style.display === "none" || !moreText.style.display) {
    // Jika teks tersembunyi, tampilkan
    moreText.style.display = "inline";
    button.textContent = "Tutup";
  } else {
    // Jika teks terlihat, sembunyikan
    moreText.style.display = "none";
    button.textContent = "Selengkapnya";
  }
}
// Diskusi dengan Local Storage
document.addEventListener("DOMContentLoaded", function () {
  const formKomentar = document.getElementById("formKomentar");
  const listKomentar = document.getElementById("listKomentar");

  // Fungsi untuk mengambil komentar dari Local Storage
  function loadKomentar() {
    const komentarData = localStorage.getItem("komentarList");
    return komentarData ? JSON.parse(komentarData) : [];
  }

  // Fungsi untuk menyimpan komentar ke Local Storage
  function saveKomentar(komentarList) {
    localStorage.setItem("komentarList", JSON.stringify(komentarList));
  }

  // Fungsi untuk menampilkan komentar di halaman
  function renderKomentar(komentarList) {
    listKomentar.innerHTML = ""; // Hapus daftar sebelumnya
    komentarList.forEach(({ nama, komentar }, index) => {
      const commentDiv = document.createElement("div");
      commentDiv.classList.add("comment");

      const nameElement = document.createElement("p");
      nameElement.classList.add("comment-name");
      nameElement.textContent = nama;

      const commentTextElement = document.createElement("p");
      commentTextElement.classList.add("comment-text");
      commentTextElement.textContent = komentar;

      const deleteButton = document.createElement("button");
      deleteButton.classList.add("delete-button");
      deleteButton.textContent = "Hapus";
      deleteButton.addEventListener("click", function () {
        deleteKomentar(index);
      });

      commentDiv.appendChild(nameElement);
      commentDiv.appendChild(commentTextElement);
      commentDiv.appendChild(deleteButton);
      listKomentar.appendChild(commentDiv);
    });
  }

  // Fungsi untuk menghapus komentar
  function deleteKomentar(index) {
    const komentarList = loadKomentar();
    komentarList.splice(index, 1); // Hapus komentar berdasarkan indeks
    saveKomentar(komentarList);
    renderKomentar(komentarList); // Render ulang komentar
  }

  // Fungsi untuk menambahkan komentar baru
  formKomentar.addEventListener("submit", function (e) {
    e.preventDefault();

    // Ambil nilai input
    const nama = document.getElementById("nama").value.trim();
    const komentar = document.getElementById("komentar").value.trim();

    if (nama && komentar) {
      const komentarList = loadKomentar();
      komentarList.push({ nama, komentar });

      // Simpan ke Local Storage dan render ulang
      saveKomentar(komentarList);
      renderKomentar(komentarList);

      // Reset form
      formKomentar.reset();
    } else {
      alert("Harap isi nama dan komentar.");
    }
  });

  // Muat komentar yang ada saat halaman pertama kali dibuka
  const komentarList = loadKomentar();
  renderKomentar(komentarList);
});
