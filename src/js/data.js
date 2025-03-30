// patching data from storage
window.addEventListener("DOMContentLoaded", (e) => {
   e.preventDefault();
   let user = JSON.parse(localStorage.getItem("loggedInUser"));
   let name = document.getElementById("nameDisplay");
   let saldo = document.getElementById("saldo");
   let saldo2 = document.getElementById("saldo2");

   if (user) {
      name.innerText = user.username;
      saldo.innerText = user.saldo;
      saldo2.innerText = user.saldo;
   } else {
      name.innerText = "Guest";
   }
});

window.onload = function () {
   let loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

   if (loggedInUser && loggedInUser.saldo !== undefined) {
      document.getElementById(
         "saldo"
      ).innerText = `IDR ${loggedInUser.saldo.toLocaleString("id-ID")}`;
      document.getElementById(
         "saldo2"
      ).innerText = `IDR ${loggedInUser.saldo.toLocaleString("id-ID")}`;
   } else {
      document.getElementById("saldo").innerText = "IDR 0";
      document.getElementById("saldo2").innerText = "IDR 0";
   }
};

// withdraw
let btnWithdraw = document.getElementById("btnWd");

btnWithdraw.addEventListener("click", () => {
   let outWithdraw = document.getElementById("outputJumlah").innerText;
   let users = JSON.parse(localStorage.getItem("users")) || [];
   let loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

   if (!users.length || !loggedInUser) {
      alert("Data user tidak ditemukan!");
      return;
   }

   // Cari index user yang sedang login
   let userIndex = users.findIndex(
      (user) =>
         user.username.trim().toLowerCase() ===
         loggedInUser.username.trim().toLowerCase()
   );

   if (userIndex === -1) {
      alert("User tidak ditemukan di dalam users!");
      return;
   }

   // Ambil saldo lama
   let saldoLama = users[userIndex].saldo || 0;

   // Ambil nominal penarikan (hapus "IDR" dan titik pemisah)
   let nominal = parseInt(
      outWithdraw.replace("IDR ", "").replace(/\./g, ""),
      10
   );

   if (isNaN(nominal) || nominal <= 0) {
      alert("Nominal tidak valid!");
      return;
   }

   // Cek apakah saldo cukup
   if (saldoLama < nominal) {
      alert("Saldo tidak mencukupi!");
      return;
   }

   // Kurangi saldo
   let saldoBaru = saldoLama - nominal;
   users[userIndex].saldo = saldoBaru;

   // Simpan kembali ke localStorage
   localStorage.setItem("users", JSON.stringify(users));

   // Perbarui loggedInUser juga
   loggedInUser.saldo = saldoBaru;
   localStorage.setItem("loggedInUser", JSON.stringify(loggedInUser));

   // Tampilkan saldo terbaru
   document.getElementById("saldo").innerText = `IDR ${saldoBaru.toLocaleString(
      "id-ID"
   )}`;
   document.getElementById(
      "saldo2"
   ).innerText = `IDR ${saldoBaru.toLocaleString("id-ID")}`;

   alert("Penarikan berhasil!");
});

// Deposit
let btnDepo = document.getElementById("btnDepo");

btnDepo.addEventListener("click", () => {
   let outDepo = document.getElementById("output2").innerText;
   let users = JSON.parse(localStorage.getItem("users")) || [];
   let loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

   if (!users.length || !loggedInUser) {
      alert("Data user tidak ditemukan!");
      return;
   }

   // Cari index user yang sedang login
   let userIndex = users.findIndex(
      (user) =>
         user.username.trim().toLowerCase() ===
         loggedInUser.username.trim().toLowerCase()
   );

   if (userIndex === -1) {
      alert("User tidak ditemukan di dalam users!");
      return;
   }

   // Ambil saldo lama
   let saldoLama = users[userIndex].saldo || 0;

   // Ambil nominal deposit (hapus "IDR" dan titik pemisah)
   let nominal = parseInt(outDepo.replace("IDR ", "").replace(/\./g, ""), 10);

   if (isNaN(nominal) || nominal <= 0) {
      alert("Nominal tidak valid!");
      return;
   }

   // Update saldo
   let saldoBaru = saldoLama + nominal;
   users[userIndex].saldo = saldoBaru;

   // Simpan kembali ke localStorage
   localStorage.setItem("users", JSON.stringify(users));

   // Perbarui loggedInUser juga
   loggedInUser.saldo = saldoBaru;
   localStorage.setItem("loggedInUser", JSON.stringify(loggedInUser));

   // Tampilkan saldo terbaru
   document.getElementById("saldo").innerText = `IDR ${saldoBaru.toLocaleString(
      "id-ID"
   )}`;
   document.getElementById(
      "saldo2"
   ).innerText = `IDR ${saldoBaru.toLocaleString("id-ID")}`;

   alert("Saldo berhasil ditambahkan!");
});

// back button
let back = document.getElementById("backBtnDp");
let back2 = document.getElementById("backBtnWd");
let isiUlang = document.getElementById("isiSaldo");
let wd = document.getElementById("withdraw");

let main = document.getElementById("menu");
let subMenu = document.getElementById("subMenu");
let subMenu2 = document.getElementById("subMenu2");

main.style.display = "flex";
subMenu.style.display = "none";
subMenu2.style.display = "none";

back.addEventListener("click", (e) => {
   e.preventDefault();
   main.style.display = "flex";
   subMenu.style.display = "none";
   subMenu2.style.display = "none";
});

back2.addEventListener("click", (e) => {
   e.preventDefault();
   main.style.display = "flex";
   subMenu.style.display = "none";
   subMenu2.style.display = "none";
});

isiUlang.addEventListener("click", (e) => {
   e.preventDefault();
   main.style.display = "none";
   subMenu.style.display = "flex";
   subMenu2.style.display = "none";
});

wd.addEventListener("click", (e) => {
   e.preventDefault();
   main.style.display = "none";
   subMenu.style.display = "none";
   subMenu2.style.display = "flex";
});

function addNum(num) {
   let out = document.getElementById("outputJumlah");
   let outs = document.getElementById("output2");
   let out2 = document.getElementById("penarikan");
   let out3 = document.getElementById("pengisian");
   out.innerText = num;
   outs.innerText = num;
   out2.value = num;
   out3.value = num;
}

function addIDR() {
   let input = document.getElementById("penarikan");
   if (!input.value.startsWith("IDR ")) {
      input.value = "IDR ";
   }
   let input2 = document.getElementById("pengisian");
   if (!input2.value.startsWith("IDR ")) {
      input2.value = "IDR ";
   }
}

function updateOutput() {
   let out = document.getElementById("outputJumlah");
   let outs = document.getElementById("output2");
   let input = document.getElementById("penarikan");
   let input2 = document.getElementById("pengisian");
   let value = input.value.replace(/[^\d]/g, ""); // Hanya angka
   let value2 = input2.value.replace(/[^\d]/g, ""); // Hanya angka

   if (value.length > 0) {
      input.value = "IDR " + new Intl.NumberFormat("id-ID").format(value);
      input2.value = "IDR " + new Intl.NumberFormat("id-ID").format(value2);
   } else {
      input.value = "IDR ";
      input2.value = "IDR ";
   }
   out.innerText = input.value;
   outs.innerText = input2.value;
}

function checkEmpty() {
   let input = document.getElementById("penarikan");
   let input2 = document.getElementById("pengisian");
   if (input.value === "IDR ") {
      input.value = "";
   }
   if (input2.value === "IDR ") {
      input2.value = "";
   }
}
