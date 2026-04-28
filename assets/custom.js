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
      document.getElementById('modal-price').innerText = "$" + productData.price / 100 ;
      document.getElementById('modal-description').innerHTML = productData.description;

      document.getElementById('modal-image').src = "https:" + productData.featured_image;

      renderVariants(productData);

      modal.classList.add('active');
    });
  });

  document.getElementById('close-modal').onclick = () => {
    modal.classList.remove('active');
  };
document.getElementById('add-to-cart').onclick = function () {

  if (!selectedVariantId) {
    alert("Please select options");
    return;
  }

const qtyInput = document.getElementById('quantity');
const quantity = qtyInput ? qtyInput.value : 1;

addToCart(selectedVariantId, quantity);

  if (selectedOptions["Color"] === "Black" && selectedOptions["Size"] === "M") {
    addToCart(softWinterVariantId, 1);
  }
};
});

function renderVariants(product) {

  const container = document.getElementById('modal-variants');
  container.innerHTML = "";

  product.options.forEach((optionName, index) => {

    const wrapper = document.createElement('div');
    wrapper.classList.add('variant-group');

    const label = document.createElement('strong');
    label.innerText = optionName;
    wrapper.appendChild(label);

    const values = [
      ...new Set(
        product.variants
          .map(v => v[`option${index + 1}`])
          .filter(Boolean)
      )
    ];
    console.log(values);
    values.forEach(value => {

      const btn = document.createElement('button');
      btn.classList.add('variant-option');

      if (optionName.toLowerCase() === "color") {
        btn.classList.add('color-swatch');
        btn.style.backgroundColor = value.toLowerCase();
        btn.title = value;
      } else {
        btn.innerText = value;
      }
      const isAvailable = product.variants.some(v => {

        return product.options.every((opt, i) => {

          const selected = selectedOptions[opt];

          if (opt === optionName) {
            return v[`option${i+1}`] === value;
          }
          if (selected) {
            return v[`option${i+1}`] === selected;
          }
          return true;
        }) && v.available;

      });
      btn.disabled = !isAvailable;
      btn.classList.toggle('disabled', !isAvailable);

      btn.onclick = () => {

        selectedOptions[optionName] = value;

        wrapper.querySelectorAll('button').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        findVariant(product);
        updateAvailability(product); 
      };

      wrapper.appendChild(btn);
    });
    container.appendChild(wrapper);
  });
}
function updateAvailability(product) {

  const groups = document.querySelectorAll('.variant-group');

  product.options.forEach((optionName, index) => {

    const buttons = groups[index].querySelectorAll('button');

    buttons.forEach(btn => {

      const value = btn.innerText || btn.title;

      const isAvailable = product.variants.some(v => {

        return product.options.every((opt, i) => {

          const selected = selectedOptions[opt];

          if (opt === optionName) {
            return v[`option${i+1}`] === value;
          }

          if (selected) {
            return v[`option${i+1}`] === selected;
          }

          return true;

        }) && v.available;

      });

      btn.disabled = !isAvailable;
      btn.classList.toggle('disabled', !isAvailable);

    });
  });
}
function findVariant(product) {

  const variant = product.variants.find(v => {
    return product.options.every((opt, i) => {
      return v[`option${i+1}`] === selectedOptions[opt];
    });
  });

  if (variant) {
    selectedVariantId = variant.id;
    console.log("Selected Variant:", variant);
  }
}
function addToCart(variantId, quantity = 1) {

  fetch('/cart/add.js', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'same-origin', 
    body: JSON.stringify({
      id: variantId,
      quantity: Number(quantity)
    })
  })
  .then(res => {
    if (!res.ok) {
      throw new Error("Add to cart failed");
    }
    return res.json();
  })
  .then(data => {
    console.log("Added to cart:", data);

    alert("Product added to cart!");
  })
  .catch(err => {
    console.error(err);
    alert("Error adding to cart");
  });
}
