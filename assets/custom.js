document.addEventListener("DOMContentLoaded", function () {

  const cards = document.querySelectorAll('.product-card');
  const modal = document.getElementById('product-modal');
document.querySelectorAll('.product-card').length
  cards.forEach(card => {
    card.addEventListener('click', function () {

      const productData = JSON.parse(this.dataset.product);
       console.log(productData);
       
      console.log(productData); // debug

      document.getElementById('modal-title').innerText = productData.title;
      document.getElementById('modal-price').innerText = productData.price;

      modal.classList.add('active');
    });
  });

  document.getElementById('close-modal').addEventListener('click', function () {
    modal.classList.remove('active');
  });
 addToCart(softWinterVariantId);
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