import React from 'react'
import { Star, ShoppingCart } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../context/AppContext'
import ProductImage from './ProductImage'

export default function ProductCard({ product, size = 'sm' }) {
  const navigate = useNavigate()
  const { addToCart } = useCart()
  const isLarge = size === 'lg'

  const handleAdd = (e) => {
    e.stopPropagation()
    addToCart(product)
  }

  // Calculate discount percentage
  const discountPercent = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)

  return (
    <div
      className="card"
      onClick={() => navigate(`/product/${product.id}`)}
      style={{
        width: isLarge ? '100%' : '172px',
        minWidth: isLarge ? 'unset' : '172px',
        cursor: 'pointer', flexShrink: 0,
        display: 'flex', flexDirection: 'column',
        overflow: 'hidden', borderRadius: '0px',
        transition: 'all 0.2s',
        border: '1px solid #E2E8F0',
      }}
    >
      <div style={{ position: 'relative', overflow: 'hidden' }}>
        <ProductImage product={product} height={isLarge ? 180 : 130} className="card-img-container" />
        <span style={{
          position: 'absolute', top: '0.5rem', left: '0.5rem',
          background: 'var(--primary)', color: '#fff',
          borderRadius: '0px', padding: '0.15rem 0.5rem',
          fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.04em',
        }}>{product.category}</span>
        {discountPercent > 0 && (
          <span style={{
            position: 'absolute', top: '0.5rem', right: '0.5rem',
            background: '#EF4444', color: '#fff',
            borderRadius: '0px', padding: '0.15rem 0.5rem',
            fontSize: '0.65rem', fontWeight: 800,
          }}>{discountPercent}% OFF</span>
        )}
      </div>
      <div style={{ padding: '0.75rem', display: 'flex', flexDirection: 'column', gap: '0.3rem', flex: 1 }}>
        <span style={{ fontSize: '0.65rem', fontWeight: 700, color: '#64748B', letterSpacing: '0.05em' }}>
          {product.brand ? product.brand.toUpperCase() : 'GENERIC'}
        </span>
        <p className="card-title" style={{
          fontSize: isLarge ? '0.875rem' : '0.78rem', fontWeight: 600,
          color: '#0F172A', display: '-webkit-box', WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical', overflow: 'hidden', lineHeight: 1.3,
          height: '2.6em',
        }}>{product.name}</p>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
          <Star size={10} fill="#F59E0B" color="#F59E0B" />
          <span style={{ fontSize: '0.7rem', color: '#64748B', fontWeight: 600 }}>{product.rating}</span>
          <span style={{ fontSize: '0.65rem', color: '#94A3B8' }}>({product.reviews})</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.4rem', marginTop: '0.1rem', flexWrap: 'wrap' }}>
          <span className="card-price" style={{ fontSize: isLarge ? '1rem' : '0.9rem', fontWeight: 800, color: 'var(--primary)' }}>
            ₹{product.price.toLocaleString()}
          </span>
          <span className="card-original-price" style={{ fontSize: '0.7rem', color: '#94A3B8', textDecoration: 'line-through' }}>
            ₹{product.originalPrice.toLocaleString()}
          </span>
        </div>
        <div style={{ fontSize: '0.65rem', color: '#10B981', fontWeight: 600, marginTop: '0.05rem' }}>
          {product.stock < 10 ? `Only ${product.stock} left in stock!` : 'In Stock'}
        </div>
        <button
          className="btn btn-primary btn-full card-btn"
          onClick={handleAdd}
          style={{ marginTop: 'auto', borderRadius: '0px', padding: '0.45rem' }}
        >
          <ShoppingCart size={12} /> Add to Cart
        </button>
      </div>
    </div>
  )
}
