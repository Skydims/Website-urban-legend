// Pilih semua tombol dengan class "toggleCerita"
const buttons = document.querySelectorAll(".toggleCerita");

buttons.forEach((button) => {
  button.addEventListener("click", function () {
    // Dapatkan elemen ceritaLanjut yang ada di dalam section yang sama
    const ceritaLanjut = button.nextElementSibling;

    // Tampilkan atau sembunyikan cerita
    if (
      ceritaLanjut.style.display === "none" ||
      ceritaLanjut.style.display === ""
    ) {
      ceritaLanjut.style.display = "block";
      button.textContent = "Tutup Cerita";
    } else {
      ceritaLanjut.style.display = "none";
      button.textContent = "Baca Selengkapnya";
    }
  });
});
