function Cart({ cart, updateQty }) {
  const items = Object.values(cart)
  const totalItems = items.reduce((sum, i) => sum + i.qty, 0)
  const totalPrice = items.reduce((sum, i) => sum + i.qty * i.product.price, 0)

  if (items.length === 0) {
    return <div className="cart"><p className="empty">Your cart is empty</p></div>
  }

  return (
    <div className="cart">
      {items.map(i => (
        <div key={i.product.id} className="cart-item">
          <span>{i.product.title}</span>
          <div className="qty">
            <button onClick={() => updateQty(i.product.id, i.qty - 1)}>-</button>
            <span>{i.qty}</span>
            <button
              onClick={() => updateQty(i.product.id, i.qty + 1)}
              disabled={i.qty >= i.product.stock}
            >+</button>
          </div>
          <span>₹{i.product.price * i.qty}</span>
        </div>
      ))}

      <div className="summary">
        <p>Total Items: {totalItems}</p>
        <p>Total Price: ₹{totalPrice}</p>
      </div>
    </div>
  )
}

export default Cart
