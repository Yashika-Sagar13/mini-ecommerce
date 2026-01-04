function ProductCard({ product, addToCart }) {
  const inStock = product.stock > 0

  return (
    <div className="card">
      <h3>{product.title}</h3>
      <p className="category">{product.category}</p>
      <p className="price">₹{product.price}</p>
      <p className={inStock ? "in" : "out"}>
        {inStock ? "In Stock" : "Out of Stock"}
      </p>
      <button onClick={() => addToCart(product)} disabled={!inStock}>
        Add to Cart
      </button>
    </div>
  )
}

export default ProductCard

