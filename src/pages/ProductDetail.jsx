import React, { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Star, ShoppingCart, Heart, CheckCircle, Minus, Plus, ArrowLeft, GitCompare } from 'lucide-react'
import { products } from '../data/products'
import { useCart, useWishlist, useCompare } from '../context/AppContext'
import ProductImage from '../components/ProductImage'

const reviews = [
  { name: 'Amit Verma',   date: '12 May 2025', rating: 5, comment: 'Excellent quality product. Exactly as described. Delivered on time, packaging was great.' },
  { name: 'Priya Nair',   date: '3 Apr 2025',  rating: 4, comment: 'Good product for the price. Works well, happy with the purchase overall.' },
  { name: 'Suresh Kumar', date: '20 Mar 2025', rating: 5, comment: 'Top notch quality. Have been using it for 2 months, no issues. Highly recommended!' },
]

function StarRow({ count, size = 15 }) {
  return (
    <div style={{ display: 'flex', gap: '2px' }}>
      {[1,2,3,4,5].map(s => (
        <Star key={s} size={size} fill={s<=Math.round(count)?'#F59E0B':'transparent'} color="#F59E0B" />
      ))}
    </div>
  )
}

export default function ProductDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const product = products.find(p => p.id === Number(id))
  const { addToCart } = useCart()
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist()
  const { addToCompare } = useCompare()
  const [qty, setQty] = useState(1)
  const [activeTab, setActiveTab] = useState('description')
  const [activeThumb, setActiveThumb] = useState(0)
  const [selectedSize, setSelectedSize] = useState('500g')

  if (!product) return (
    <div style={{ textAlign: 'center', padding: '4rem' }}>
      <p style={{ color: '#64748B', marginBottom: '1rem' }}>Product not found.</p>
      <button className="btn btn-primary" onClick={() => navigate('/shop')}>Back to Shop</button>
    </div>
  )

  const discount = Math.round((1 - product.price / product.originalPrice) * 100)
  const inWish = isInWishlist(product.id)

  return (
    <div className="responsive-sec-pad-full" style={{ maxWidth: '1100px', margin: '0 auto' }}>
      <button onClick={() => navigate(-1)} style={{
        display: 'flex', alignItems: 'center', gap: '0.4rem',
        background: 'transparent', border: 'none', cursor: 'pointer',
        color: '#64748B', fontSize: '0.82rem', fontWeight: 600, marginBottom: '1.25rem',
        padding: '0.4rem 0', transition: 'color 0.15s',
      }}
        onMouseEnter={e => e.currentTarget.style.color = 'var(--primary)'}
        onMouseLeave={e => e.currentTarget.style.color = '#64748B'}
      >
        <ArrowLeft size={15} /> Back
      </button>

      <div className="responsive-flex" style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap', marginBottom: '1.75rem' }}>
        {/* Images with Thumbnails on the Left */}
        <div style={{ flex: '1 1 320px', display: 'flex', gap: '0.75rem' }}>
          {/* Thumbnails */}
          <div className="detail-thumbs-container" style={{ display: 'flex', flexDirection: 'column', gap: '0.625rem', flexShrink: 0 }}>
            {[0,1,2].map(i => (
              <div key={i} onClick={() => setActiveThumb(i)} style={{
                width: '68px', height: '68px', borderRadius: '0px', overflow: 'hidden',
                cursor: 'pointer', opacity: 0.55 + i * 0.225,
                border: `2px solid ${activeThumb === i ? 'var(--primary)' : '#E2E8F0'}`,
                transition: 'border-color 0.15s',
              }}>
                <ProductImage product={product} height={68} borderRadius="0" />
              </div>
            ))}
          </div>
          {/* Main Image */}
          <div className="detail-main-img" style={{
            flex: 1, height: '360px', borderRadius: '0px', overflow: 'hidden',
            border: '1px solid #E2E8F0',
            opacity: 0.85 + activeThumb * 0.075,
            transition: 'opacity 0.25s',
          }}>
            <ProductImage product={product} height={360} borderRadius="0px" className="detail-main-img" />
          </div>
        </div>

        {/* Info */}
        <div style={{ flex: '1 1 320px', display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
          <div>
            <span style={{
              fontSize: '0.65rem', fontWeight: 850, color: 'var(--primary)',
              textTransform: 'uppercase', letterSpacing: '0.12em',
            }}>{product.brand ? product.brand.toUpperCase() : 'GENERIC'}</span>
            <h1 style={{
              fontSize: '1.45rem', fontWeight: 800, color: '#0F172A',
              marginTop: '0.15rem', lineHeight: 1.25, letterSpacing: '-0.025em',
            }}>{product.name}</h1>
            <p style={{ fontSize: '0.72rem', color: '#64748B', marginTop: '0.2rem' }}>
              Product Code / SKU: <strong style={{ color: '#0F172A' }}>SB-{(product.brand || 'GEN').substring(0,3).toUpperCase()}-{product.id}09</strong>
            </p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem' }}>
            <StarRow count={product.rating} />
            <span style={{ fontSize: '0.8rem', color: '#64748B', fontWeight: 600 }}>{product.rating} ({product.reviews} reviews)</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.75rem', flexWrap: 'wrap' }}>
            <span style={{ fontSize: '1.875rem', fontWeight: 900, color: 'var(--primary)', letterSpacing: '-0.02em' }}>
              ₹{product.price.toLocaleString()}
            </span>
            <span style={{ fontSize: '1.05rem', color: '#94A3B8', textDecoration: 'line-through' }}>
              ₹{product.originalPrice.toLocaleString()}
            </span>
            <span style={{
              background: '#EF4444', color: '#fff', borderRadius: '0px',
              padding: '0.2rem 0.625rem', fontSize: '0.72rem', fontWeight: 800, letterSpacing: '0.03em',
            }}>{discount}% OFF</span>
          </div>

          {/* Organic Farms Certification Box */}
          <div style={{
            background: 'var(--primary-light)', border: '1px solid var(--border-dark)',
            padding: '0.6rem 0.875rem', display: 'flex', flexDirection: 'column', gap: '0.15rem',
            borderRadius: '0px',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--primary)', fontWeight: 800, fontSize: '0.8rem' }}>
              <CheckCircle size={14} /> 100% Certified Organic Produce
            </div>
            <span style={{ fontSize: '0.72rem', color: '#475569', lineHeight: 1.3 }}>
              Sourced directly from local verified farmers. No chemical fertilizers or artificial pesticides used.
            </span>
          </div>

          <div style={{ height: '1px', background: '#E2E8F0' }} />

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <div style={{ width: '8px', height: '8px', borderRadius: '0px', background: '#10B981', flexShrink: 0 }} />
              <span style={{ color: '#10B981', fontWeight: 700, fontSize: '0.85rem' }}>
                Fresh Stock Available
              </span>
            </div>
            <p style={{ color: '#EF4444', fontSize: '0.78rem', fontWeight: 600, paddingLeft: '1.125rem' }}>
              🔥 {product.sold} Kg sold in last 12 hours
            </p>
          </div>

          {/* Pincode Estimator */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', background: '#F8F9FA', padding: '0.75rem', border: '1px solid #E2E8F0', borderRadius: '0px' }}>
            <label style={{ fontSize: '0.78rem', fontWeight: 700, color: '#0F172A' }}>Check Delivery in Your Area:</label>
            <div style={{ display: 'flex', gap: '0.5rem', maxWidth: '280px' }}>
              <input type="text" placeholder="Enter 6-digit Pincode" maxLength={6} style={{
                padding: '0.45rem 0.75rem', border: '1px solid #CBD5E1', borderRadius: '0px',
                fontSize: '0.78rem', outline: 'none', flex: 1, background: '#fff'
              }} />
              <button className="btn btn-outline" style={{ padding: '0.45rem 0.875rem', borderRadius: '0px', fontSize: '0.78rem', fontWeight: 700 }}>Check</button>
            </div>
            <span style={{ fontSize: '0.72rem', color: '#10B981', fontWeight: 600 }}>Standard Delivery within 24 Hours | Free on Orders ₹500+</span>
          </div>

          <div style={{ height: '1px', background: '#E2E8F0' }} />

          <div>
            <p style={{ fontSize: '0.8rem', fontWeight: 700, color: '#0F172A', marginBottom: '0.5rem' }}>Select Weight</p>
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              {['100g','250g','500g','1kg','2kg','5kg'].map(w => (
                <button key={w} onClick={() => setSelectedSize(w)} style={{
                  padding: '0.375rem 0.875rem', borderRadius: '0px', fontSize: '0.8rem', fontWeight: 700,
                  background: selectedSize === w ? 'var(--primary)' : '#fff',
                  color: selectedSize === w ? '#fff' : '#374151',
                  border: selectedSize === w ? '1.5px solid var(--primary)' : '1.5px solid var(--border-dark)',
                  cursor: 'pointer', transition: 'all 0.15s',
                }}>{w}</button>
              ))}
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.875rem' }}>
            <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#0F172A' }}>Quantity:</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <button className="qty-btn" onClick={() => setQty(q => Math.max(1, q-1))}><Minus size={13} /></button>
              <span style={{ fontSize: '1rem', fontWeight: 800, minWidth: '28px', textAlign: 'center', color: '#0F172A' }}>{qty}</span>
              <button className="qty-btn" onClick={() => setQty(q => q+1)}><Plus size={13} /></button>
            </div>
          </div>

          <div style={{ height: '1px', background: '#E2E8F0' }} />

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
            <button className="btn btn-secondary btn-lg btn-full" onClick={() => addToCart(product, qty, selectedSize)} style={{ borderRadius: '0px' }}>
              <ShoppingCart size={17} /> Add to Cart
            </button>
            <button className="btn btn-primary btn-lg btn-full" onClick={() => { addToCart(product, qty, selectedSize); navigate('/checkout') }} style={{ borderRadius: '0px' }}>
              Buy Now
            </button>
            <div style={{ display: 'flex', gap: '0.625rem' }}>
              <button onClick={() => inWish ? removeFromWishlist(product.id) : addToWishlist(product)} style={{
                flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem',
                padding: '0.6rem', borderRadius: '0px', fontWeight: 700, fontSize: '0.82rem',
                background: inWish ? '#FEF2F2' : '#fff',
                color: inWish ? '#EF4444' : '#374151',
                border: `1.5px solid ${inWish ? '#EF4444' : '#E2E8F0'}`,
                cursor: 'pointer', transition: 'all 0.15s',
              }}>
                <Heart size={15} fill={inWish ? '#EF4444' : 'transparent'} color={inWish ? '#EF4444' : '#374151'} />
                {inWish ? 'Wishlisted' : 'Wishlist'}
              </button>
              <button onClick={() => addToCompare(product)} style={{
                flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem',
                padding: '0.6rem', borderRadius: '0px', fontWeight: 700, fontSize: '0.82rem',
                background: '#fff', color: '#374151', border: '1.5px solid #E2E8F0',
                cursor: 'pointer', transition: 'all 0.15s',
              }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--primary)'; e.currentTarget.style.color = 'var(--primary)' }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = '#E2E8F0'; e.currentTarget.style.color = '#374151' }}
              >
                <GitCompare size={15} /> Compare
              </button>
            </div>
          </div>

          <div style={{ height: '1px', background: '#E2E8F0' }} />

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
            {[
              'Original manufacturer warranty included',
              'Free delivery on orders above ₹500',
              '60-day easy return policy',
              'Genuine product — verified seller',
            ].map((feat, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
                <CheckCircle size={14} color="#10B981" style={{ flexShrink: 0, marginTop: '2px' }} />
                <span style={{ fontSize: '0.8rem', color: '#64748B' }}>{feat}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ background: '#fff', border: '1px solid #E2E8F0', borderRadius: '0px', overflow: 'hidden' }}>
        <div className="scrollbar-hide" style={{ display: 'flex', borderBottom: '1px solid #E2E8F0', background: '#F8FAFF', overflowX: 'auto', whiteSpace: 'nowrap' }}>
          {['description','details','reviews'].map(tab => (
            <button key={tab} className={`tab-btn${activeTab === tab ? ' active' : ''}`}
              onClick={() => setActiveTab(tab)} style={{ flexShrink: 0 }}>
              {tab === 'description' ? 'Description' : tab === 'details' ? 'Specifications' : `Reviews (${product.reviews})`}
            </button>
          ))}
        </div>

        <div style={{ padding: '1.5rem' }}>
          {activeTab === 'description' && (
            <div>
              <p style={{ color: '#374151', lineHeight: 1.8, marginBottom: '0.875rem' }}>{product.description}</p>
              <p style={{ color: '#374151', lineHeight: 1.8 }}>
                Ideal for healthy salads, curries, and daily nutritious meals. Sourced fresh from organic farming zones to ensure rich vitamins and minerals.
              </p>
            </div>
          )}

          {activeTab === 'details' && (
            <table style={{ width: '100%', borderCollapse: 'collapse', border: '1px solid #E2E8F0' }}>
              <tbody>
                {/* Dynamically Inject SKU / Code and Availability */}
                <tr style={{ background: '#F8FAFF' }}>
                  <td style={{ padding: '0.75rem 1rem', fontWeight: 700, fontSize: '0.72rem', color: '#64748B', width: '40%', borderBottom: '1px solid #E2E8F0', textTransform: 'uppercase', letterSpacing: '0.04em' }}>SKU Code</td>
                  <td style={{ padding: '0.75rem 1rem', fontSize: '0.875rem', color: '#0F172A', fontWeight: 600, borderBottom: '1px solid #E2E8F0' }}>SB-{(product.brand || 'GEN').substring(0,3).toUpperCase()}-{product.id}09</td>
                </tr>
                <tr style={{ background: '#fff' }}>
                  <td style={{ padding: '0.75rem 1rem', fontWeight: 700, fontSize: '0.72rem', color: '#64748B', width: '40%', borderBottom: '1px solid #E2E8F0', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Certification</td>
                  <td style={{ padding: '0.75rem 1rem', fontSize: '0.875rem', color: 'var(--primary)', fontWeight: 700, borderBottom: '1px solid #E2E8F0' }}>100% Certified Organic (Zero Chemical Pesticides)</td>
                </tr>
                {Object.entries(product.specs).map(([key, val], i) => (
                  <tr key={key} style={{ background: i % 2 === 0 ? '#F8FAFF' : '#fff' }}>
                    <td style={{ padding: '0.75rem 1rem', fontWeight: 700, fontSize: '0.72rem', color: '#64748B', width: '40%', borderBottom: '1px solid #E2E8F0', textTransform: 'uppercase', letterSpacing: '0.04em' }}>{key}</td>
                    <td style={{ padding: '0.75rem 1rem', fontSize: '0.875rem', color: '#0F172A', fontWeight: 600, borderBottom: '1px solid #E2E8F0' }}>{val}</td>
                  </tr>
                ))}
                <tr style={{ background: '#F8FAFF' }}>
                  <td style={{ padding: '0.75rem 1rem', fontWeight: 700, fontSize: '0.72rem', color: '#64748B', width: '40%', borderBottom: '1px solid #E2E8F0', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Return window</td>
                  <td style={{ padding: '0.75rem 1rem', fontSize: '0.875rem', color: '#0F172A', fontWeight: 600, borderBottom: '1px solid #E2E8F0' }}>24 Hours Freshness Guarantee Return Window</td>
                </tr>
                <tr style={{ background: '#fff' }}>
                  <td style={{ padding: '0.75rem 1rem', fontWeight: 700, fontSize: '0.72rem', color: '#64748B', width: '40%', borderBottom: '1px solid #E2E8F0', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Cash on Delivery</td>
                  <td style={{ padding: '0.75rem 1rem', fontSize: '0.875rem', color: '#10B981', fontWeight: 700, borderBottom: '1px solid #E2E8F0' }}>Yes, Available</td>
                </tr>
              </tbody>
            </table>
          )}

          {activeTab === 'reviews' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
              {reviews.map((r, i) => (
                <div key={i} style={{
                  padding: '1rem', background: '#F8FAFF',
                  borderRadius: '0px', border: '1px solid #E2E8F0',
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <div style={{
                        width: '32px', height: '32px', borderRadius: '0px',
                        background: 'var(--primary)', display: 'flex', alignItems: 'center',
                        justifyContent: 'center', color: '#fff', fontWeight: 800, fontSize: '0.78rem',
                        flexShrink: 0,
                      }}>
                        {r.name.split(' ').map(w => w[0]).join('')}
                      </div>
                      <div>
                        <p style={{ fontWeight: 700, fontSize: '0.875rem', color: '#0F172A' }}>{r.name}</p>
                        <p style={{ fontSize: '0.72rem', color: '#94A3B8' }}>{r.date}</p>
                      </div>
                    </div>
                    <StarRow count={r.rating} size={13} />
                  </div>
                  <p style={{ fontSize: '0.83rem', color: '#374151', lineHeight: 1.65 }}>{r.comment}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

