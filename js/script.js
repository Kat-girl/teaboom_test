// Переключение фасовки
const items         = document.querySelectorAll('.packaging-item');
const skuValueEl    = document.querySelector('.product-sku-value');
const oldPriceEl    = document.querySelector('.product-price-old');
const actualPriceEl = document.querySelector('.product-price-actual');

function formatPrice(value) {
  return value.toLocaleString('ru-RU', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }) + ' ₽';
}

function renderPackaging(item) {
  const sku         = item.dataset.sku;
  const actualPrice = Number(item.dataset.actualPrice);
  const oldPrice    = item.dataset.oldPrice ? Number(item.dataset.oldPrice) : null;

  skuValueEl.textContent    = sku;
  actualPriceEl.textContent = formatPrice(actualPrice);

  // Скидка есть, если старая цена задана и она больше актуальной
  const hasDiscount = oldPrice !== null && oldPrice > actualPrice;

  if (hasDiscount) {
    oldPriceEl.textContent = formatPrice(oldPrice);
    oldPriceEl.hidden = false;
  } else {
    oldPriceEl.textContent = '';
    oldPriceEl.hidden = true;
  }

  items.forEach((el) => el.classList.toggle('active', el === item));
}

items.forEach((item) => {
  item.addEventListener('click', () => renderPackaging(item));
});

renderPackaging(items[0]);