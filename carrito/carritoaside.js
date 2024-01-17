const $carritoAside = document.getElementById( 'carritoAside' )

$carritoAside.innerHTML += `<div class="container">
<div class="card cart">
  <label class="title">CHECKOUT</label>
  <div class="steps">
    <div class="step">
      <div>
        <span>SHIPPING</span>
        <p>221B Baker Street, W1U 8ED</p>
        <p>London, United Kingdom</p>
      </div>
      <hr>
      <div>
        <span>PAYMENT METHOD</span>
        <p>Visa</p>
        <p>**** **** **** 4243</p>
      </div>
      <hr>
      <div class="promo">
        <span>HAVE A PROMO CODE?</span>
        <form class="form">
          <input type="text" placeholder="Enter a Promo Code" class="input_field">
          <button>Apply</button>
        </form>
      </div>
      <hr>
      <div class="payments">
        <span>PAYMENT</span>
        <div class="details">
          <span>Subtotal:</span>
          <span>$240.00</span>
          <span>Shipping:</span>
          <span>$10.00</span>
          <span>Tax:</span>
          <span>$30.40</span>
        </div>
      </div>
    </div>
  </div>
</div>

<div class="card checkout">
  <div class="footer">
    <label class="price">$280.40</label>
    <button class="checkout-btn">Checkout</button>
  </div>
</div>
</div>`