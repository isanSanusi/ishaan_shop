// Cek apakah localStorage sudah ada data user
if (!localStorage.getItem("users")) {
   localStorage.setItem("users", JSON.stringify([])); // Jika belum ada, buat array kosong
}

// Sistem Signup
document.addEventListener("DOMContentLoaded", () => {
   document.getElementById("signUp-btn").addEventListener("click", (e) => {
      e.preventDefault();

      let Uname = document.getElementById("username").value.trim();
      let Hp = document.getElementById("handphone").value.trim();
      let Pass = document.getElementById("password").value;
      let ConfPass = document.getElementById("confpassword").value;
      let PassWd = document.getElementById("passwordwd").value;
      let ConfPassWd = document.getElementById("confpasswd").value;

      // Validasi data kosong
      if (!Uname || !Hp || !Pass || !ConfPass || !PassWd || !ConfPassWd) {
         alert("Semua field harus diisi!");
         return;
      }

      // Validasi password harus sama
      if (Pass !== ConfPass || PassWd !== ConfPassWd) {
         alert("Password dan Confirm Password harus sama!");
         return;
      }

      // Validasi nomor HP (harus angka)
      if (!/^\d+$/.test(Hp)) {
         alert("Nomor HP hanya boleh angka!");
         return;
      }

      // Ambil daftar user dari localStorage
      let users = JSON.parse(localStorage.getItem("users"));

      // Cek apakah username sudah terdaftar
      if (users.some((user) => user.username === Uname)) {
         alert("Username sudah digunakan!");
         return;
      }

      // Simpan user baru ke localStorage
      let newUser = {
         username: Uname,
         Hp: Hp,
         password: Pass,
         passWd: PassWd,
         saldo: 00,
      };
      users.push(newUser);
      localStorage.setItem("users", JSON.stringify(users));

      alert("Registrasi berhasil!");

      document.getElementById("signup-page").style.display = "none";
      document.getElementById("login-page").style.display = "flex";
   });
});

// Sistem Login
document.addEventListener("DOMContentLoaded", () => {
   document.getElementById("btn-login").addEventListener("click", (e) => {
      e.preventDefault();

      let UnameLogin = document.getElementById("username-Login").value.trim();
      let PassLogin = document.getElementById("password-Login").value;

      if (!UnameLogin || !PassLogin) {
         alert("Username dan Password wajib diisi!");
         return;
      }

      // Ambil daftar user dari localStorage
      let users = JSON.parse(localStorage.getItem("users"));

      // Cek apakah username & password cocok
      let user = users.find(
         (user) => user.username === UnameLogin && user.password === PassLogin
      );

      if (user) {
         localStorage.setItem("loggedInUser", JSON.stringify(user)); // Simpan user yang login
         alert("Login berhasil!");
         window.location.href = "../main/index.html"; // Redirect ke halaman utama
      } else {
         alert("User tidak ditemukan atau password salah!");
      }
   });
});

// bajak identitas
document.addEventListener("DOMContentLoaded", () => {
   let loggedInUser = localStorage.getItem("loggedInUser");

   if (!loggedInUser) {
      alert("Silahkan Daftar Atau Masuk Dengan Akun Anda!");
      // window.location.href = "./signUp-page.html"; // Redirect ke halaman login
   }
});
