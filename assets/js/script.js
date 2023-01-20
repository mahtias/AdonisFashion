(function () {
  let productContainer = document.querySelector("#productContainer");
  let cartContainer = document.querySelector("#shopping-cart");
  let cartContent = document.querySelector("#cart-content");
  let toggleCartBtn = document.getElementById('toggle-cart-btn');
  let clearCartBtn = document.querySelector("#clear-cart");
  let checkoutBtn = document.querySelector("#checkout-btn");
  let totalPriceContainer = document.querySelector("#total-price");
  let closebtn = document.getElementsByClassName("close");

  // Afficher le pannier
  function toggleCart() {
    // cartContainer.addClassList("open");
   if( cartContainer.style.opacity=="0"){
    cartContainer.style.opacity="1"
   }else{
    cartContainer.style.opacity="0"
   }
  }


  // recuperer le contenu du local storage, si il est vide creer un tableau vide
  function getLSContent() {
    const lsContent = JSON.parse(localStorage.getItem("products")) || [];
    return lsContent;
  }

  // ajouter du contenu au local storage
  function setLSContent(lsContent) {
    localStorage.setItem("products", JSON.stringify(lsContent));
  }

  //   calculer le total du pannier
  function calculateTotal(prices) {
    return prices.reduce(function (prev, next) {
      return prev + next;
    }, 0);
  }

  //   recuperer le prix du produit dans le pannier pour calculer le total du pannier
  function getCartItemPrices() {
    const prices = [];
    let nums = cartContent.querySelectorAll("tr td:nth-child(3)");
    if (nums.length > 0) {
      for (let cell = 0; cell < nums.length; cell++) {
        let num = nums[cell].innerText;
        num = num.replace(/[^\d]/g, "");
        num = parseFloat(num);
        prices.push(num);
      }
      return prices;
    } else {
      return;
    }
  }

  // afficher le total du pannier
  function displayCartTotal() {
    const prices = getCartItemPrices();
    let total = 0;
    if (prices) {
      total = calculateTotal(prices);
      totalPriceContainer.innerHTML = `<span class="total">Total: $${total.toFixed(
        2
      )}</span>`;
    } else {
      totalPriceContainer.innerHTML = '<span class="total">Total: $0</span>';
    }
  }

  // afficher la liste des articles dans le pannier
  function displayProducts() {
    // recuperer les articles du local storage
    const lsContent = getLSContent();
    let productMarkup = "";
    if (lsContent !== null) {
      for (let product of lsContent) {
        productMarkup += `
          <tr>
          <td><img class="cart-image" src="${product.image}" alt="${product.name}" width="120"></td>
          <td>
            ${product.name}
          </td>
          <td>${product.price}</td>
          <td><a href="#" data-id="${product.id}" class="remove">X</a></td>
          </tr>
        `;
      }
    } else {
      productMarkup = "Your cart is empty.";
    }
    cartContent.querySelector("tbody").innerHTML = productMarkup;
  }

  // sauvegarder l'arcticle choisie par l'utilisateur dans le local Storage
  function saveProduct(clickedBtn) {
    const productId = clickedBtn.getAttribute("data-id");
    const card = clickedBtn.parentElement.parentElement;
    const cardInfo = clickedBtn.parentElement;
    const prodImage = card.querySelector("img").src;
    const prodName = cardInfo.querySelector("h5").textContent;
    const prodPrice = cardInfo.querySelector("h4").textContent;

    let isProductInCart = false;

    const lsContent = getLSContent();

    lsContent.forEach(function (product) {
      if (product.id === productId) {
        alert("This course is already in your cart.");
        isProductInCart = true;
      }
    });

    if (!isProductInCart) {
      lsContent.push({
        id: productId,
        image: prodImage,
        name: prodName,
        price: prodPrice,
      });

      setLSContent(lsContent);
      displayProducts();
    }
  }

  // retirer le product dans le local storage

  function removeProduct(productId) {
    const lsContent = getLSContent();
    let productIndex;
    lsContent.forEach(function (product, i) {
      if (product.id === productId) {
        productIndex = i;
      }
    });
    lsContent.splice(productIndex, 1);
    setLSContent(lsContent);
    displayProducts();
  }

  //   effacer la liste des articles
  function clearCart() {
    const lsContent = getLSContent();
    lsContent.splice(0, lsContent.length);
    setLSContent(lsContent);
    displayProducts();
  }

  //   function checkout() {
  //     // checkout: just clear the cart
  //     // after user confirms the checkout process
  //     const cartProducts = cartContent.querySelector("tbody").innerHTML;
  //     if (cartProducts !== "" && confirm("Are you sure you want to checkout?")) {
  //       clearCart();
  //     } else {
  //       return;
  //     }
  //   }

  document.addEventListener("DOMContentLoaded", function (e) {
    displayProducts();
    displayCartTotal();
  });

  toggleCartBtn.addEventListener("click", function(e) {
    e.preventDefault();
    toggleCart();
  });

  closebtn.addEventListener("click", function(e) {
    e.preventDefault();
    close();
  });

  productContainer.addEventListener("click", function(e) {
    if (e.target.classList.contains("add-to-cart")) {
      e.preventDefault();
      const clickedBtn = e.target;
      saveProduct(clickedBtn);
    }
  });

  productContainer.addEventListener("click", function(e) {
    if (e.target.classList.contains("add-to-cart")) {
      displayCartTotal();
    }
  });

  cartContent.querySelector("tbody").addEventListener("click", function(e) {
    e.preventDefault();
    const clickedBtn = e.target;
    if (e.target.classList.contains("remove")) {
      const productId = clickedBtn.getAttribute("data-id");
      removeProduct(productId);
      displayCartTotal();
    }
  });

  clearCartBtn.addEventListener("click", function(e) {
    e.preventDefault();
    clearCart();
  });
  clearCartBtn.addEventListener("click", displayCartTotal);


  checkoutBtn.addEventListener("click", function(e) {
    e.preventDefault();
    checkout();
  });
  checkoutBtn.addEventListener("click", displayCartTotal);

})();
