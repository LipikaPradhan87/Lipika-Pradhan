let selectedVariantId = null;
let selectedOptions = {};

document.addEventListener("DOMContentLoaded", function () {

  const modal = document.getElementById('product-modal');

  document.querySelectorAll('.plus-btn').forEach(btn => {
    btn.addEventListener('click', function (e) {

      e.stopPropagation();

      const card = this.closest('.product-card');
      const productData = JSON.parse(card.dataset.product);

      console.log(productData);

      document.getElementById('modal-title').innerText = productData.title;
      document.getElementById('modal-price').innerText = productData.price / 100 + " Rs";
      document.getElementById('modal-description').innerHTML = productData.description;

      document.getElementById('modal-image').src = "https:" + productData.featured_image;

      renderVariants(productData);

      modal.classList.add('active');
    });
  });

  document.getElementById('close-modal').onclick = () => {
    modal.classList.remove('active');
  };

});

document.getElementById('add-to-cart').onclick = function () {

  if (!selectedVariantId) {
    alert("Please select options");
    return;
  }

  addToCart(selectedVariantId);
};
if (selectedOptions["Color"] === "Black" && selectedOptions["Size"] === "M") {
  addToCart(softWinterVariantId);
}