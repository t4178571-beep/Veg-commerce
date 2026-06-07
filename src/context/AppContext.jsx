import React, { createContext, useContext, useState, useEffect } from 'react'

const CartContext = createContext(null)
const WishlistContext = createContext(null)
const AuthContext = createContext(null)
const CompareContext = createContext(null)

export function CartProvider({ children }) {
  const [items, setItems] = useState(() => {
    try { return JSON.parse(localStorage.getItem('em_cart') || '[]') } catch { return [] }
  })

  useEffect(() => { localStorage.setItem('em_cart', JSON.stringify(items)) }, [items])

  const addToCart = (product, qty = 1, size = null) => {
    setItems(prev => {
      const existing = prev.find(i => i.id === product.id)
      if (existing) return prev.map(i => i.id === product.id ? { ...i, qty: i.qty + qty, selectedSize: size || i.selectedSize || '500g' } : i)
      return [...prev, { ...product, qty, selectedSize: size || product.selectedSize || '500g' }]
    })
  }

  const removeFromCart = (id) => setItems(prev => prev.filter(i => i.id !== id))

  const updateQty = (id, qty) => {
    if (qty < 1) return removeFromCart(id)
    setItems(prev => prev.map(i => i.id === id ? { ...i, qty } : i))
  }

  const clearCart = () => setItems([])

  const cartTotal = items.reduce((sum, i) => sum + i.price * i.qty, 0)
  const cartCount = items.reduce((sum, i) => sum + i.qty, 0)

  return (
    <CartContext.Provider value={{ items, addToCart, removeFromCart, updateQty, clearCart, cartTotal, cartCount }}>
      {children}
    </CartContext.Provider>
  )
}

export function WishlistProvider({ children }) {
  const [items, setItems] = useState(() => {
    try { return JSON.parse(localStorage.getItem('em_wishlist') || '[]') } catch { return [] }
  })

  useEffect(() => { localStorage.setItem('em_wishlist', JSON.stringify(items)) }, [items])

  const addToWishlist = (product) => {
    setItems(prev => prev.find(i => i.id === product.id) ? prev : [...prev, product])
  }

  const removeFromWishlist = (id) => setItems(prev => prev.filter(i => i.id !== id))

  const isInWishlist = (id) => items.some(i => i.id === id)

  return (
    <WishlistContext.Provider value={{ items, addToWishlist, removeFromWishlist, isInWishlist }}>
      {children}
    </WishlistContext.Provider>
  )
}

export function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const user = { name: 'Rahul Sharma', initials: 'RS', email: 'rahul.sharma@email.com' }

  const login = () => setIsLoggedIn(true)
  const logout = () => setIsLoggedIn(false)

  return (
    <AuthContext.Provider value={{ isLoggedIn, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function CompareProvider({ children }) {
  const [items, setItems] = useState([])

  const addToCompare = (product) => {
    setItems(prev => {
      if (prev.find(i => i.id === product.id)) return prev
      if (prev.length >= 4) return prev
      return [...prev, product]
    })
  }

  const removeFromCompare = (id) => setItems(prev => prev.filter(i => i.id !== id))

  return (
    <CompareContext.Provider value={{ items, addToCompare, removeFromCompare }}>
      {children}
    </CompareContext.Provider>
  )
}

export const useCart = () => useContext(CartContext)
export const useWishlist = () => useContext(WishlistContext)
export const useAuth = () => useContext(AuthContext)
export const useCompare = () => useContext(CompareContext)
