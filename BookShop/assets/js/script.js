'use strict';

/**
 * navbar toggle
 */

const overlay = document.querySelector("[data-overlay]");
const navOpenBtn = document.querySelector("[data-nav-open-btn]");
const navbar = document.querySelector("[data-navbar]");
const navCloseBtn = document.querySelector("[data-nav-close-btn]");

const navElems = [overlay, navOpenBtn, navCloseBtn];

for (let i = 0; i < navElems.length; i++) {
  navElems[i].addEventListener("click", function () {
    navbar.classList.toggle("active");
    overlay.classList.toggle("active");
  });
}

/**
 * header & go top btn active on page scroll
 */

const header = document.querySelector("[data-header]");
const goTopBtn = document.querySelector("[data-go-top]");

window.addEventListener("scroll", function () {
  if (window.scrollY >= 80) {
    header.classList.add("active");
    goTopBtn.classList.add("active");
  } else {
    header.classList.remove("active");
    goTopBtn.classList.remove("active");
  }
});

function themVaoGioHang(ten, gia, hinhAnh) {
  let gioHang = JSON.parse(localStorage.getItem('gioHang')) || [];
  let sanPham = { ten, gia, hinhAnh, soLuong: 1 };
  let sanPhamTonTai = gioHang.find(item => item.ten === ten);

  if (sanPhamTonTai) {
    sanPhamTonTai.soLuong += 1;
  } else {
    gioHang.push(sanPham);
  }

  localStorage.setItem('gioHang', JSON.stringify(gioHang));
  alert('Sản phẩm đã được thêm vào giỏ hàng');
  taiGioHang();
}

function taiGioHang() {
  let gioHang = JSON.parse(localStorage.getItem('gioHang')) || [];
  let containerSanPham = document.getElementById('cart-items');
  containerSanPham.innerHTML = '';

  let tongGia = 0;

  gioHang.forEach(item => {
    tongGia += item.gia * item.soLuong;

    let sanPham = document.createElement('div');
    sanPham.className = 'cart-item';

    sanPham.innerHTML = `
          <img src="${item.hinhAnh}" alt="${item.ten}">
          <div class="cart-item-details">
              <h3>${item.ten}</h3>
              <p>${item.gia.toLocaleString('vi-VN')}đ</p>
              <div class="cart-item-quantity">
                  <button onclick="capNhatSoLuong('${item.ten}', -1)">-</button>
                  <input type="text" value="${item.soLuong}" readonly>
                  <button onclick="capNhatSoLuong('${item.ten}', 1)">+</button>
              </div>
              <button onclick="xoaKhoiGioHang('${item.ten}')">Xóa</button>
          </div>
      `;

    containerSanPham.appendChild(sanPham);
  });

  document.getElementById('total-price').innerText = `Tổng cộng: ${tongGia.toLocaleString('vi-VN')}đ`;
}

function capNhatSoLuong(ten, delta) {
  let gioHang = JSON.parse(localStorage.getItem('gioHang')) || [];
  let sanPham = gioHang.find(item => item.ten === ten);

  if (sanPham) {
    sanPham.soLuong += delta;
    if (sanPham.soLuong <= 0) {
      gioHang = gioHang.filter(item => item.ten !== ten);
    }
    localStorage.setItem('gioHang', JSON.stringify(gioHang));
    taiGioHang();
  }
}

function xoaKhoiGioHang(ten) {
  let gioHang = JSON.parse(localStorage.getItem('gioHang')) || [];
  gioHang = gioHang.filter(item => item.ten !== ten);
  localStorage.setItem('gioHang', JSON.stringify(gioHang));
  taiGioHang();
}

function muaThem() {
  window.location.href = 'index.html#product';
}
// Load cart items on page load
document.addEventListener('DOMContentLoaded', taiGioHang);
