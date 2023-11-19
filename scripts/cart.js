'use strict';

// all initial elements
const payAmountBtn = document.querySelector('#payAmount');
const decrementBtn = document.querySelectorAll('#decrement');
const quantityElem = document.querySelectorAll('#quantity');
const incrementBtn = document.querySelectorAll('#increment');
const priceElem = document.querySelectorAll('#price');
const subtotalElem = document.querySelector('#subtotal');
const taxElem = document.querySelector('#tax');
const totalElem = document.querySelector('#total');
const closeIcons = document.querySelectorAll('.product-close-btn');
const button1 = document.querySelectorAll('#button1');





$(document).ready(function () {
  // Event listener for the "Pay in delivery" button
  $('.payment-method .method:nth-child(2)').on('click', function () {
    resetErrors();
    $('.card-payment').addClass('hide');
    $('.payment-method .method:nth-child(1) .checkmark').removeClass('fill');
    $('.payment-method .method:nth-child(1)').removeClass('selected');
    $('.payment-method .method:nth-child(2) .checkmark').addClass('fill');
    $(this).addClass('selected');
    $('.btn-primary b').text('Order');
  });

  $('.payment-method .method:nth-child(1)').on('click', function () {
    resetErrors();
    $('.card-payment').removeClass('hide');
    $('.payment-method .method:nth-child(2) .checkmark').removeClass('fill');
    $('.payment-method .method:nth-child(2)').removeClass('selected');
    $('.payment-method .method:nth-child(1) .checkmark').addClass('fill');
    $(this).addClass('selected');
    $('.btn-primary b').text('Pay');

  });
  $('.btn-primary').on('click', function () {
    // Check if the button text is "Order" or "Pay"

    if ($(this).text() === 'Pay') {
      validateAndSubmit();
    }
  });
});
function validateAndSubmit(buttonText) {
  if (!button1.disabled) {
    console.log(buttonText);
    resetErrors();
    event.preventDefault();
    var isValidated = true;
    const address = $("#shipping-address").val();
    if (address.trim() === '') {
      $("#addressSpn").html("Please enter your address.");
      isValidated = false;
    }
    // Check if the buttonText contains "Pay"
    if (buttonText.includes("Pay")) {


      // Validate the card payment form
      const cardholderName = $("#cardholder-name").val();
      const cardNumber = $("#card-number").val();
      const expireDateDay = $("#expire-date-day").val();
      const expireDateMonth = $("#expire-date-year").val();
      const cvv = $("#cvv").val();

      if (cardholderName.trim() === '') {
        $("#nameSpn").html("Please enter the cardholder's name.");
        isValidated = false;
      }

      if (!/^\d{16}$/.test(cardNumber)) {
        $("#numberSpn").html("Please enter a 16-digit card number.");
        isValidated = false;
      }

      if (!/^\d{2}$/.test(expireDateDay) || !/^\d{2}$/.test(expireDateMonth)) {
        $("#daySpn").html("Invalid date format.");
        $("#yearSpn").html("Invalid date format.");
        isValidated = false;
      }

      if (!/^\d{3}$/.test(cvv)) {
        $("#cvvSpn").html("Please enter a 3-digit CVV.");
        isValidated = false;
      }
    }
    if (isValidated === false) {
      return;
    }
    alert('Order succesful redirecting to orders page')
    window.location.href = "orders.html";
  } else {
    alert('Cart Empty');
  }
}




function resetErrors() {
  $("#nameSpn").html("");
  $("#numberSpn").html("");
  $("#daySpn").html("");
  $("#yearSpn").html("");
  $("#cvvSpn").html("");
  $("#addressSpn").html("");
}

// loop: add event listeners for multiple close icons
for (let i = 0; i < closeIcons.length; i++) {
  closeIcons[i].addEventListener('click', function () {
    // Set the quantity text content to 0
    const quantity = this.parentElement.querySelector('#quantity');
    quantity.textContent = 0;

    totalCalc();

    const productCard = this.closest('.product-card');
    productCard.remove();
  });
}

/* loop: for add event on multiple `increment` & `decrement` button */
for (let i = 0; i < incrementBtn.length; i++) {

  incrementBtn[i].addEventListener('click', function () {
    let increment = Number(this.previousElementSibling.textContent);
    increment++;
    this.previousElementSibling.textContent = increment;
    totalCalc();
  });

  decrementBtn[i].addEventListener('click', function () {
    let decrement = Number(this.nextElementSibling.textContent);
    decrement <= 1 ? 1 : decrement--;
    this.nextElementSibling.textContent = decrement;
    totalCalc();
  });

}


const totalCalc = function () {
  const tax = 0.05;
  let subtotal = 0;
  let totalTax = 0;
  let total = 0;

  // loop: calculate `subtotal` value from every single product
  for (let i = 0; i < quantityElem.length; i++) {
    subtotal += Number(quantityElem[i].textContent) * Number(priceElem[i].textContent);
  }
  subtotalElem.textContent = subtotal.toFixed(2);

  totalTax = subtotal * tax;
  taxElem.textContent = totalTax.toFixed(2);

  total = subtotal + totalTax;

  console.log(total)
  // show the `total` variable value on `totalElem` & `payAmountBtn` element
  totalElem.textContent = total.toFixed(2);
  payAmountBtn.textContent = total.toFixed(2);
  if (total === 0) {
    button1.disabled = true;
    console.log('disabled')
  } else {
    button1.disabled = false;
  }
};

// Initial total calculation when the page loads
totalCalc();
setInterval(() => {
  document.getElementById("currentYear").innerHTML = new Date().toLocaleTimeString();
}, 1000);
