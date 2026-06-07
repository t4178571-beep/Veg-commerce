import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { CartProvider, WishlistProvider, AuthProvider, CompareProvider } from './context/AppContext'
import Header from './components/Header'
import CategoryRow from './components/CategoryRow'
import Footer from './components/Footer'
import Home from './pages/Home'
import Shop from './pages/Shop'
import ProductDetail from './pages/ProductDetail'
import Cart from './pages/Cart'
import Checkout from './pages/Checkout'
import OrderSuccess from './pages/OrderSuccess'
import TrackOrder from './pages/TrackOrder'
import Wishlist from './pages/Wishlist'
import Compare from './pages/Compare'
import About from './pages/About'
import Contact from './pages/Contact'

function Layout({ children, showCategories = true }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Header />
      {showCategories && <CategoryRow />}
      <main style={{ flex: 1 }}>{children}</main>
      <Footer />
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          <WishlistProvider>
            <CompareProvider>
              <Routes>
                <Route path="/" element={<Layout><Home /></Layout>} />
                <Route path="/shop" element={<Layout><Shop /></Layout>} />
                <Route path="/product/:id" element={<Layout><ProductDetail /></Layout>} />
                <Route path="/cart" element={<Layout showCategories={false}><Cart /></Layout>} />
                <Route path="/checkout" element={<Layout showCategories={false}><Checkout /></Layout>} />
                <Route path="/order-success" element={<Layout showCategories={false}><OrderSuccess /></Layout>} />
                <Route path="/track-order" element={<Layout showCategories={false}><TrackOrder /></Layout>} />
                <Route path="/wishlist" element={<Layout showCategories={false}><Wishlist /></Layout>} />
                <Route path="/compare" element={<Layout showCategories={false}><Compare /></Layout>} />
                <Route path="/about" element={<Layout showCategories={false}><About /></Layout>} />
                <Route path="/contact" element={<Layout showCategories={false}><Contact /></Layout>} />
              </Routes>
            </CompareProvider>
          </WishlistProvider>
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}
