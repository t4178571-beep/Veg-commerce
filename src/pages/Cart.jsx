import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Trash2, ShoppingCart, ArrowRight, ShoppingBag } from 'lucide-react'
import { useCart } from '../context/AppContext'
import ProductImage from '../components/ProductImage'

export default function Cart() {
  const { items, removeFromCart, updateQty, cartTotal, cartCount } = useCart()
  const navigate = useNavigate()

  const shipping = cartTotal > 500 ? 0 : 99
  const gst = Math.round(cartTotal * 0.05)
  const total = cartTotal + shipping + gst

  if (items.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '5rem 1.5rem' }}>
        <div style={{
          width: '88px', height: '88px', borderRadius: '0px',
          background: '#F1F5F9', display: 'flex', alignItems: 'center',
          justifyContent: 'center', margin: '0 auto 1.5rem',
        }}>
          <ShoppingBag size={40} color="#CBD5E1" />
        </div>
        <h2 style={{ fontWeight: 800, fontSize: '1.25rem', color: '#0A0F1E', marginBottom: '0.5rem' }}>Your cart is empty</h2>
        <p style={{ color: '#64748B', marginBottom: '1.75rem', fontSize: '0.875rem' }}>
          Looks like you haven't added anything yet.
        </p>
        <button className="btn btn-primary btn-lg" onClick={() => navigate('/shop')} style={{ borderRadius: '0px' }}>
          Continue Shopping <ArrowRight size={16} />
        </button>
      </div>
    )
  }

  return (
    <div className="container responsive-sec-pad-full">
      <div className="responsive-flex" style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-start', flexWrap: 'wrap' }}>
        <div style={{ flex: '2 1 400px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
            <h1 style={{ fontWeight: 900, fontSize: '1.35rem', color: '#0A0F1E', letterSpacing: '-0.02em' }}>My Cart</h1>
            <span style={{
              background: 'var(--primary)', color: '#fff', borderRadius: '0px',
              padding: '0.2rem 0.5rem', fontSize: '0.72rem', fontWeight: 800,
            }}>{cartCount} items</span>
          </div>

          <div style={{ background: '#fff', border: '1px solid #E2E8F0', borderRadius: '0px', overflow: 'hidden' }}>
            {items.map((item, i) => (
              <div key={item.id}>
                <div className="cart-item-row" style={{
                  display: 'flex', gap: '1rem', padding: '1.25rem',
                  alignItems: 'center', flexWrap: 'wrap',
                }}>
                  <div className="cart-item-img" style={{ width: '72px', height: '72px', borderRadius: '0px', overflow: 'hidden', flexShrink: 0, cursor: 'pointer' }}
                    onClick={() => navigate(`/product/${item.id}`)}>
                    <ProductImage product={item} height={72} borderRadius="0px" />
                  </div>
                  <div className="cart-item-info" style={{ flex: 1, minWidth: '140px' }}>
                    <p style={{ fontWeight: 700, fontSize: '0.875rem', color: '#0A0F1E', marginBottom: '0.25rem', lineHeight: 1.3 }}>{item.name}</p>
                    <div style={{ display: 'flex', gap: '0.4rem', alignItems: 'center', flexWrap: 'wrap' }}>
                      <span style={{
                        display: 'inline-block', background: 'var(--primary-light)', color: 'var(--primary)',
                        borderRadius: '0px', padding: '0.15rem 0.5rem', fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.04em',
                      }}>{item.category}</span>
                      <span style={{
                        display: 'inline-block', background: '#F1F5F9', color: '#475569',
                        borderRadius: '0px', padding: '0.15rem 0.5rem', fontSize: '0.68rem', fontWeight: 700,
                      }}>{item.selectedSize || '500g'}</span>
                    </div>
                  </div>
                  <div className="cart-item-qty" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <button className="qty-btn" onClick={() => updateQty(item.id, item.qty - 1)}>−</button>
                    <span style={{ fontSize: '0.9rem', fontWeight: 800, minWidth: '24px', textAlign: 'center' }}>{item.qty}</span>
                    <button className="qty-btn" onClick={() => updateQty(item.id, item.qty + 1)}>+</button>
                  </div>
                  <div className="cart-item-price" style={{ textAlign: 'right', flexShrink: 0 }}>
                    <p style={{ fontWeight: 800, fontSize: '1rem', color: 'var(--primary)' }}>₹{(item.price * item.qty).toLocaleString()}</p>
                    <p style={{ fontSize: '0.72rem', color: '#94A3B8', marginTop: '0.15rem' }}>₹{item.price.toLocaleString()} each</p>
                  </div>
                  <button className="cart-item-trash" onClick={() => removeFromCart(item.id)} style={{
                    background: 'transparent', border: '1.5px solid #E2E8F0', cursor: 'pointer',
                    color: '#CBD5E1', padding: '0.375rem', borderRadius: '0px',
                    display: 'flex', alignItems: 'center', transition: 'all 0.15s',
                  }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = '#EF4444'; e.currentTarget.style.color = '#EF4444'; e.currentTarget.style.background = '#FEF2F2' }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = '#E2E8F0'; e.currentTarget.style.color = '#CBD5E1'; e.currentTarget.style.background = 'transparent' }}
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
                {i < items.length - 1 && <div style={{ height: '1px', background: '#F1F5F9', margin: '0 1.25rem' }} />}
              </div>
            ))}
          </div>
        </div>

        <div className="sticky-desktop" style={{ flex: '1 1 280px', top: '78px' }}>
          <div style={{ background: '#fff', border: '1px solid #E2E8F0', borderRadius: '0px', overflow: 'hidden' }}>
            <div style={{ padding: '1rem 1.25rem', borderBottom: '1px solid #E2E8F0', background: 'var(--primary-light)' }}>
              <h2 style={{ fontWeight: 800, fontSize: '0.95rem', color: '#0A0F1E' }}>Order Summary</h2>
            </div>
            <div style={{ padding: '1.25rem' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1rem' }}>
                {[
                  { label: `Subtotal (${cartCount} items)`, val: `₹${cartTotal.toLocaleString()}` },
                  { label: 'GST (5%)', val: `₹${gst.toLocaleString()}` },
                  { label: 'Shipping', val: shipping === 0 ? 'FREE' : `₹${shipping}`, green: shipping === 0 },
                ].map(row => (
                  <div key={row.label} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.83rem', color: '#64748B' }}>
                    <span>{row.label}</span>
                    <span style={{ color: row.green ? '#10B981' : undefined, fontWeight: row.green ? 800 : undefined }}>{row.val}</span>
                  </div>
                ))}
                <div style={{ height: '1px', background: '#E2E8F0', margin: '0.25rem 0' }} />
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1rem', fontWeight: 900, color: '#0A0F1E' }}>
                  <span>Total</span>
                  <span style={{ color: 'var(--primary)' }}>₹{total.toLocaleString()}</span>
                </div>
              </div>

              <div style={{
                border: '1.5px solid #E2E8F0', borderRadius: '0px',
                padding: '0.875rem', marginBottom: '0.875rem',
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              }}>
                <div>
                  <p style={{ fontWeight: 800, fontSize: '0.82rem', color: '#0A0F1E' }}>PayPal</p>
                  <p style={{ fontSize: '0.72rem', color: '#64748B' }}>Secure PayPal checkout</p>
                </div>
                <button style={{
                  background: '#003087', color: '#fff', border: 'none',
                  borderRadius: '0px', padding: '0.35rem 0.75rem',
                  fontSize: '0.72rem', fontWeight: 800, cursor: 'pointer',
                }}>Pay</button>
              </div>

              <button className="btn btn-primary btn-lg btn-full" onClick={() => navigate('/checkout')} style={{ borderRadius: '0px' }}>
                Proceed to Checkout <ArrowRight size={16} />
              </button>
              <button className="btn btn-outline btn-full" style={{ marginTop: '0.5rem', fontSize: '0.82rem', borderRadius: '0px' }}
                onClick={() => navigate('/shop')}>
                Continue Shopping
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
