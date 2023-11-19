var orders = [
  { id: 1, product: 'Product A', quantity: 5},
  { id: 2, product: 'Product B', quantity: 1},
  { id: 3, product: 'Product C', quantity: 2},
  { id: 4, product: 'Product D', quantity: 3}
  // Add more objects as needed
];
var products = ['Product A', 'Product B', 'Product C', 'Product D'];

var productPrices = {
  'Product A': 10,
  'Product B': 15,
  'Product C': 20,
}

function getPriceForProduct(product) {
  return productPrices[product] || 0; // Default to 0 if the product is not found
}

function renderTable() {
  var tbody = document.getElementById('ordersTable').getElementsByTagName('tbody')[0];
  tbody.innerHTML = ''; // Clear existing rows

  orders.forEach(function(order) {
      var row = document.createElement('tr');
      row.setAttribute('data-order-id', order.id);

      var cellId = document.createElement('td');
      cellId.textContent = order.id;
      row.appendChild(cellId);

      var cellProduct = document.createElement('td');
      cellProduct.textContent = order.product;
      row.appendChild(cellProduct);

      var cellQuantity = document.createElement('td');
      cellQuantity.textContent = order.quantity;
      row.appendChild(cellQuantity);

      var cellPrice = document.createElement('td');
      var price = getPriceForProduct(order.product);
      cellPrice.className = 'cellprice'
      cellPrice.textContent = price.toFixed(2);
      row.appendChild(cellPrice)

      var cellTotal = document.createElement('td');
      var total = (order.quantity * getPriceForProduct(order.product)).toFixed(2);
      cellTotal.textContent = total; 
      cellTotal.className = 'cellTotal'
      // Calculate and display total
      row.appendChild(cellTotal);

      var cellActions = document.createElement('td');
      cellActions.className = 'action-buttons';

      var editButton = document.createElement('button');
      editButton.textContent = 'Edit';
      editButton.className = 'btn-edit'
      editButton.onclick = function() {
          editOrder(order.id);
      };
      cellActions.appendChild(editButton);

      var deleteButton = document.createElement('button');
      deleteButton.textContent = 'Delete';
      deleteButton.className = 'btn-delete'
      deleteButton.onclick = function() {
        confirmDeleteOrder(order.id);
      };
      cellActions.appendChild(deleteButton);

      row.appendChild(cellActions);

      tbody.appendChild(row);
  });
}

// Call the renderTable function to initially populate the table
renderTable();

function editOrder(orderId) {
  // Add logic to handle edit action
  var order = getOrderById(orderId);

  if (order){
    // Populate modal inputs with current order information
    document.getElementById('productName').value = order.product;
    document.getElementById('quantity').value = order.quantity;
    
    // Set data-order-id attribute on the modal
    var modalContent = document.querySelector('.modal-content');
    modalContent.setAttribute('data-order-id', orderId);

    // Populate the product dropdown list
    var productNameDropdown = document.getElementById('productName');
        productNameDropdown.innerHTML = ''; // Clear existing options

        // Add options for each product
        products.forEach(function(product) {
            var option = document.createElement('option');
            option.value = product;
            option.textContent = product;
            productNameDropdown.appendChild(option);
        });

        // Set the selected product in the dropdown
        productNameDropdown.value = order.product;

        //Update the price
        updatePrice();

    //DISPLAY
    var modal = document.getElementById('editModal');
    modal.style.display = 'block';
  } else{
    console.log('Order not Found:', orderId)
  }
}

function getOrderById(orderId) {
  return orders.find(function(order) {
      return order.id === orderId;
  });
}

function closeModal() {
  // Hide the modal
  console.log('closeModal function called');
  var modal = document.getElementById('editModal');
  modal.style.display = 'none';

  // Clear modal inputs
  document.getElementById('productName').value = '';
  document.getElementById('quantity').value = '';
}

function saveChanges() {
  var productName = document.getElementById('productName').value;
    var quantity = document.getElementById('quantity').value;
    

    // Validate inputs
    if (!productName || !quantity) {
        return;
    }

    // Update order in the array
    var orderId = parseInt(document.querySelector('.modal-content').getAttribute('data-order-id'));
    var order = getOrderById(orderId);

    if (order) {
        order.product = productName;
        order.quantity = parseInt(quantity);

        // Update the table and close the modal
        renderTable();
        closeModal();
    } else {
        console.log('Order not found:', orderId);
    }
  }


function updatePrice() {
  var selectedProduct = document.getElementById('productName').value;

  var price = getPriceForProduct(selectedProduct);
  
  // Find the price of the selected product
  var priceSpan = document.getElementById('price');
    if (priceSpan) {
        priceSpan.textContent = price.toFixed(2);
    } else {
        console.error('priceSpan is not defined.');
    }
}

function getPriceForProduct(product) {
  // Implement logic to get the price for the specified product
  // This can be from a predefined list, a database, or any other source
  // For simplicity, let's assume a fixed price for each product
  const prices = {
      'Product A': 10,
      'Product B': 15,
      'Product C': 9,
      'Product D': 3
      // Add more products and prices as needed
  };

  return prices[product] || 0; // Default to 0 if the product is not found
}
      
function openConfirmationModal() {
  var confirmationModal = document.getElementById('confirmationModal');
  confirmationModal.style.display = 'block';
}


function closeConfirmationModal() {
  var confirmationModal = document.getElementById('confirmationModal');
  confirmationModal.style.display = 'none';
}

function confirmDeleteOrder(orderId) {

  // Function to delete the order
  function deleteAndClose() {
      // Find the index of the order with the specified ID
      var orderIndex = orders.findIndex(order => order.id === orderId);

      if (orderIndex !== -1) {
          // Remove the order from the array
          orders.splice(orderIndex, 1);
          console.log('Order deleted:', orderId);
          renderTable(); // Update the table display after deletion
      } else {
          console.error('Order not found:', orderId);
      }

      // Close the confirmation modal
      closeConfirmationModal();
  }

  // Open the confirmation modal
  openConfirmationModal();

  // Attach the deleteAndClose function to the "Yes, Delete" button click event
  document.getElementById('confirmDeleteBtn').onclick = deleteAndClose;
}


document.getElementById('closeBtn').addEventListener('click', closeModal);
document.getElementById('productName').addEventListener('change', updatePrice);
document.getElementById('saveBtn').addEventListener('click', saveChanges);
