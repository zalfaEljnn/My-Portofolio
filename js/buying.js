// ==== CONFIG: ganti nomor ini dengan nomor WA penjual (format internasional tanpa +) ====
const SELLER_WHATSAPP_NUMBER = "6289675704270"; // contoh: 62... untuk Indonesia


// DOM refs
const productLabels = Array.from(document.querySelectorAll('.product'));
const mainPreview = document.getElementById('mainPreview');
const colorBtns = Array.from(document.querySelectorAll('.color-btn'));
const sizeSelect = document.getElementById('sizeSelect');
const orderForm = document.getElementById('orderForm');
const orderSummary = document.getElementById('orderSummary');

// state
let selectedProduct = null;
let selectedColor = null;
let selectedSize = null;

// helper: pick product
productLabels.forEach(label => {
  label.addEventListener('click', () => {
    // mark selected visually
    productLabels.forEach(l => l.classList.remove('selected'));
    label.classList.add('selected');

    // read data attributes
    selectedProduct = {
      name: label.dataset.name,
      price: label.dataset.price,
      images: JSON.parse(label.dataset.images || '[]')
    };

    // set preview image to first available
    if (selectedProduct.images.length) {
      mainPreview.src = selectedProduct.images[0];
    }

    renderSummary();
  });
});

// color selection
colorBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    colorBtns.forEach(b => b.classList.remove('selected'));
    btn.classList.add('selected');
    selectedColor = btn.dataset.color;
    renderSummary();
  });
});

// size selection
sizeSelect.addEventListener('change', () => {
  selectedSize = sizeSelect.value || null;
  renderSummary();
});

// render order summary simple
function renderSummary(){
  if (!selectedProduct) {
    orderSummary.textContent = "No product selected yet.";
    return;
  }
  orderSummary.innerHTML = `
    <strong>${selectedProduct.name}</strong><br>
    Price: $${selectedProduct.price} <br>
    Color: ${selectedColor || '-'} <br>
    Size: ${selectedSize || '-'}
  `;
}

// form submit -> build WA message
orderForm.addEventListener('submit', function(e){
  e.preventDefault();

  // basic validation
  const name = document.getElementById('buyerName').value.trim();
  const phone = document.getElementById('buyerPhone').value.trim();
  const email = document.getElementById('buyerEmail').value.trim();
  const note = document.getElementById('buyerNote').value.trim();
  const payment = document.querySelector('input[name="payment"]:checked').value;

  if (!selectedProduct) return alert('Please select a product first.');
  if (!selectedColor) return alert('Please choose a color.');
  if (!selectedSize) return alert('Please choose a size.');
  if (!name || !phone) return alert('Please fill your name and phone.');

  // build message
  let msg = `Halo, saya mau order dari Wear Jeenan.
    Product ${selectedProduct.name}
    Price: $${selectedProduct.price}
    Color: ${selectedColor}
    Size: ${selectedSize}
    Name: ${name}
    Phone: ${phone}. `;

  if (email) msg += `\nEmail: ${email}. `;
  if (note) msg += `\nNote: ${note}. `;

    msg += `\nPayment: ${payment}. 
    Terima kasih!`;

  // open WhatsApp
  const waUrl = `https://wa.me/${SELLER_WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
  window.open(waUrl, '_blank');
});
