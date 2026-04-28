document.addEventListener("DOMContentLoaded", function () {

  const modal = document.getElementById('product-modal');

  document.querySelectorAll('.plus-btn').forEach(btn => {

    btn.addEventListener('click', function (e) {

      e.stopPropagation(); 

      const card = this.closest('.product-card');
      const productData = JSON.parse(card.dataset.product);

      console.log(productData); // debug

      document.getElementById('modal-title').innerText = productData.title;
      document.getElementById('modal-price').innerText = productData.price;

      modal.classList.add('active');
    });

  });

  document.getElementById('close-modal').addEventListener('click', function () {
    modal.classList.remove('active');
  });

});

function addToCart(variantId) {
  fetch('/cart/add.js', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      id: variantId,
      quantity: 1
    })
  });
}
// if(color === 'Black' && size === 'Medium') {
//   addToCart(softWinterVariantId);
// }