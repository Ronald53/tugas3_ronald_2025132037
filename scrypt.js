// =====================================================
// SCRIPT.JS - APLIKASI BISNIS KOPIKITA
// =====================================================

// 1. MENGAMBIL ELEMEN HTML DENGAN getElementById
// Syarat tugas: minimal mengambil 5 elemen HTML

const formPesanan = document.getElementById("formPesanan");
const nama = document.getElementById("nama");
const email = document.getElementById("email");
const telepon = document.getElementById("telepon");
const kategori = document.getElementById("kategori");
const menuPesanan = document.getElementById("menu-pesanan");
const harga = document.getElementById("harga");
const jumlah = document.getElementById("jumlah");
const catatan = document.getElementById("catatan");
const hasil = document.getElementById("hasil");
const tabelRiwayat = document.getElementById("tabelRiwayat");


// =====================================================
// 2. MENGUBAH HARGA OTOMATIS BERDASARKAN MENU
// =====================================================

menuPesanan.addEventListener("change", function () {

    // Mengambil pilihan menu yang dipilih
    const pilihan = menuPesanan.options[menuPesanan.selectedIndex];

    // Mengambil harga dari data-price
    const hargaProduk = pilihan.dataset.price || 0;

    // Menampilkan harga ke input harga satuan
    harga.value = hargaProduk;
});


// =====================================================
// 3. FUNGSI FORMAT RUPIAH
// =====================================================

function formatRupiah(angka) {

    return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0
    }).format(angka);

}


// =====================================================
// 4. PROSES FORM PEMESANAN
// =====================================================

formPesanan.addEventListener("submit", function (event) {

    // Mencegah halaman melakukan refresh
    event.preventDefault();


    // =================================================
    // MENGAMBIL DATA DARI FORM
    // =================================================

    const namaPelanggan = nama.value.trim();
    const emailPelanggan = email.value.trim();
    const nomorTelepon = telepon.value.trim();
    const kategoriPelanggan = kategori.value;
    const produk = menuPesanan.value;
    const hargaSatuan = Number(harga.value);
    const jumlahPesanan = Number(jumlah.value);
    const catatanPesanan = catatan.value.trim();


    // =================================================
    // VALIDASI DATA
    // =================================================

    if (
        namaPelanggan === "" ||
        emailPelanggan === "" ||
        nomorTelepon === "" ||
        kategoriPelanggan === "" ||
        produk === "" ||
        hargaSatuan <= 0 ||
        jumlahPesanan <= 0
    ) {

        hasil.innerHTML = `
            <h3>Data Belum Lengkap</h3>
            <p>Silakan lengkapi semua data pemesanan terlebih dahulu.</p>
        `;

        return;
    }


    // =================================================
    // PERHITUNGAN TOTAL
    // =================================================

    const total = hargaSatuan * jumlahPesanan;


    // =================================================
    // MENAMPILKAN HASIL PERHITUNGAN
    // MENGGUNAKAN innerHTML
    // =================================================

    hasil.innerHTML = `
        <h3>Hasil Perhitungan</h3>

        <p>
            <strong>Nama Pelanggan:</strong>
            ${namaPelanggan}
        </p>

        <p>
            <strong>Kategori Pelanggan:</strong>
            ${kategoriPelanggan}
        </p>

        <p>
            <strong>Produk:</strong>
            ${produk}
        </p>

        <p>
            <strong>Harga Satuan:</strong>
            ${formatRupiah(hargaSatuan)}
        </p>

        <p>
            <strong>Jumlah:</strong>
            ${jumlahPesanan}
        </p>

        <p>
            <strong>Catatan:</strong>
            ${catatanPesanan || "-"}
        </p>

        <p class="result-total">
            <strong>Total Bayar:</strong>
            ${formatRupiah(total)}
        </p>
    `;


    // =================================================
    // MEMBUAT BARIS BARU UNTUK TABEL
    // MENGGUNAKAN createElement
    // =================================================

    const baris = document.createElement("tr");


    // =================================================
    // MENENTUKAN NOMOR TRANSAKSI
    // =================================================

    const nomor = tabelRiwayat.children.length + 1;


    // =================================================
    // DATA YANG AKAN DIMASUKKAN KE TABEL
    // =================================================

    const dataTransaksi = [
        nomor,
        namaPelanggan,
        kategoriPelanggan,
        produk,
        formatRupiah(hargaSatuan),
        jumlahPesanan,
        formatRupiah(total)
    ];


    // =================================================
    // MEMBUAT <td> DENGAN createElement
    // DAN MEMASUKKANNYA DENGAN appendChild
    // =================================================

    dataTransaksi.forEach(function (nilai) {

        // Membuat elemen <td>
        const cell = document.createElement("td");

        // Memasukkan isi menggunakan textContent
        cell.textContent = nilai;

        // Memasukkan <td> ke dalam <tr>
        baris.appendChild(cell);

    });


    // =================================================
    // MEMASUKKAN BARIS KE TABEL RIWAYAT
    // =================================================

    tabelRiwayat.appendChild(baris);


    // =================================================
    // MEMBERSIHKAN FORM SETELAH TRANSAKSI
    // =================================================

    formPesanan.reset();

    // Mengosongkan kembali harga
    harga.value = "";

});
