import { useState, useEffect } from "react"
import ProductList from "./components/ProductList"
import Filters from "./components/Filters"
import Cart from "./components/Cart"

function App() {
  const [products, setProducts] = useState([])
  const [cart, setCart] = useState({})
  const [search, setSearch] = useState("")
  const [category, setCategory] = useState("")
  const [sort, setSort] = useState("")

  useEffect(() => {
    const data = [
      { id: 1, title: "Notebook", category: "Stationery", price: 50, stock: 10, image: "https://picsum.photos/id/101/200/150" },
      { id: 2, title: "Ballpoint Pen", category: "Stationery", price: 15, stock: 20, image: "https://picsum.photos/id/102/200/150" },
      { id: 3, title: "Geometry Box", category: "Stationery", price: 120, stock: 5, image: "https://picsum.photos/id/103/200/150" },
      { id: 4, title: "Water Bottle", category: "Accessories", price: 200, stock: 8, image: "https://picsum.photos/id/104/200/150" },
      { id: 5, title: "Backpack", category: "Accessories", price: 800, stock: 3, image: "https://picsum.photos/id/105/200/150" },
      { id: 6, title: "Pencil Box", category: "Stationery", price: 75, stock: 12, image: "https://picsum.photos/id/106/200/150" },
      { id: 7, title: "Lunch Box", category: "Accessories", price: 350, stock: 6, image: "https://picsum.photos/id/107/200/150" },
      { id: 8, title: "Highlighter Set", category: "Stationery", price: 90, stock: 10, image: "https://picsum.photos/id/108/200/150" },
      { id: 9, title: "Eraser", category: "Stationery", price: 10, stock: 50, image: "https://picsum.photos/id/109/200/150" },
      { id: 10, title: "Sharpener", category: "Stationery", price: 20, stock: 40, image: "https://picsum.photos/id/110/200/150" },
      { id: 11, title: "Sports Shoes", category: "Clothing", price: 1200, stock: 4, image: "https://picsum.photos/id/111/200/150" },
      { id: 12, title: "T-Shirt", category: "Clothing", price: 400, stock: 7, image: "https://picsum.photos/id/112/200/150" },
      { id: 13, title: "Notebook Set", category: "Stationery", price: 180, stock: 5, image: "https://picsum.photos/id/113/200/150" },
      { id: 14, title: "Cap", category: "Clothing", price: 150, stock: 6, image: "https://picsum.photos/id/114/200/150" },
      { id: 15, title: "Calculator", category: "Accessories", price: 550, stock: 2, image: "https://picsum.photos/id/115/200/150" }
    ]
    setProducts(data)
  }, [])

  const addToCart = (product) => {
    setCart(prev => {
      const existing = prev[product.id]
      if (existing) {
        if (existing.qty < product.stock) {
          return { ...prev, [product.id]: { product, qty: existing.qty + 1 } }
        } else return prev
      } else {
        return { ...prev, [product.id]: { product, qty: 1 } }
      }
    })
  }

  const updateQty = (id, qty) => {
    setCart(prev => {
      if (qty <= 0) {
        const newCart = { ...prev }
        delete newCart[id]
        return newCart
      }
      if (qty > prev[id].product.stock) qty = prev[id].product.stock
      return { ...prev, [id]: { ...prev[id], qty } }
    })
  }

  let filtered = products.filter(p => p.title.toLowerCase().includes(search.toLowerCase()))
  if (category) filtered = filtered.filter(p => p.category === category)
  if (sort === "low") filtered = filtered.sort((a,b)=>a.price-b.price)
  if (sort === "high") filtered = filtered.sort((a,b)=>b.price-a.price)

  return (
    <div className="app">
      <h1 className="title">Student Mini Shop</h1>
      <Filters
        products={products}
        search={search}
        setSearch={setSearch}
        category={category}
        setCategory={setCategory}
        sort={sort}
        setSort={setSort}
        clearFilters={() => { setSearch(""); setCategory(""); setSort(""); }}
      />
      <div className="content">
        <ProductList products={filtered} addToCart={addToCart} />
        <Cart cart={cart} updateQty={updateQty} />
      </div>
    </div>
  )
}

export default App
