import React from 'react'
import { X, ShoppingCart, Trash2, ArrowRight } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../context/AppContext'
import ProductImage from './ProductImage'

export default function CartDrawer({ onClose }) {
  const { items, removeFromCart, updateQty, cartTotal, cartCount } = useCart()
  const navigate = useNavigate()

  const shipping = cartTotal > 500 ? 0 : 99
  const gst = Math.round(cartTotal * 0.05)
  const total = cartTotal + shipping + gst

  return (
    <>
      <div onClick={onClose} style={{
        position: 'fixed', inset: 0, background: 'rgba(10,15,30,0.5)',
        zIndex: 300, backdropFilter: 'blur(2px)',
      }} />
      <div className="animate-slideInRight" style={{
        position: 'fixed', top: 0, right: 0, bottom: 0,
        width: 'min(380px, 100vw)', background: '#fff', zIndex: 301,
        display: 'flex', flexDirection: 'column',
        borderLeft: '1px solid #E2E8F0',
        boxShadow: '-8px 0 32px rgba(0,0,0,0.1)',
      }}>
        <div style={{
          padding: '1.125rem 1.25rem',
          borderBottom: '1px solid #E2E8F0',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          background: 'var(--primary-light)',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem' }}>
            <ShoppingCart size={18} color="var(--primary)" />
            <h2 style={{ fontWeight: 700, fontSize: '0.95rem', color: '#0A0F1E' }}>
              My Cart
            </h2>
            <span style={{
              background: 'var(--primary)', color: '#fff', borderRadius: '0px',
              width: '20px', height: '20px', fontSize: '0.68rem',
              fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>{cartCount}</span>
          </div>
          <button onClick={onClose} style={{
            background: '#F1F5F9', border: 'none', cursor: 'pointer',
            color: '#374151', padding: '0.375rem', borderRadius: '0px',
            display: 'flex', alignItems: 'center',
          }}>
            <X size={17} />
          </button>
        </div>

        <div style={{ flex: 1, overflowY: 'auto', padding: '1rem' }}>
          {items.length === 0 ? (
            <div style={{ textAlign: 'center', paddingTop: '3.5rem' }}>
              <div style={{
                width: '72px', height: '72px', borderRadius: '0px',
                background: '#F1F5F9', display: 'flex', alignItems: 'center',
                justifyContent: 'center', margin: '0 auto 1rem',
              }}>
                <ShoppingCart size={32} color="#CBD5E1" />
              </div>
              <p style={{ color: '#64748B', fontSize: '0.875rem', fontWeight: 600 }}>Your cart is empty</p>
              <p style={{ color: '#94A3B8', fontSize: '0.8rem', marginTop: '0.3rem' }}>Add items to get started</p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
              {items.map(item => (
                <div key={item.id} style={{
                  display: 'flex', gap: '0.75rem', alignItems: 'flex-start',
                  padding: '0.875rem', background: 'var(--primary-light)', borderRadius: '0px',
                  border: '1px solid #E2E8F0',
                }}>
                  <div style={{ width: '56px', height: '56px', borderRadius: '0px', overflow: 'hidden', flexShrink: 0 }}>
                    <ProductImage product={item} height={56} borderRadius="0px" />
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{
                      fontSize: '0.8rem', fontWeight: 700, color: '#0A0F1E',
                      overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                      marginBottom: '0.25rem',
                    }}>{item.name}</p>
                    <p style={{ fontSize: '0.875rem', fontWeight: 800, color: 'var(--primary)' }}>
                      ₹{(item.price * item.qty).toLocaleString()} <span style={{ fontSize: '0.72rem', color: '#64748B', fontWeight: 500, marginLeft: '0.25rem' }}>({item.selectedSize || '500g'})</span>
                    </p>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginTop: '0.4rem' }}>
                      <button className="qty-btn" style={{ width: '24px', height: '24px', fontSize: '0.9rem' }}
                        onClick={() => updateQty(item.id, item.qty - 1)}>−</button>
                      <span style={{ fontSize: '0.82rem', fontWeight: 700, minWidth: '20px', textAlign: 'center' }}>{item.qty}</span>
                      <button className="qty-btn" style={{ width: '24px', height: '24px', fontSize: '0.9rem' }}
                        onClick={() => updateQty(item.id, item.qty + 1)}>+</button>
                    </div>
                  </div>
                  <button onClick={() => removeFromCart(item.id)} style={{
                    background: 'transparent', border: 'none', cursor: 'pointer',
                    color: '#CBD5E1', padding: '0.2rem', borderRadius: '0px', transition: 'color 0.15s',
                  }}
                    onMouseEnter={e => e.currentTarget.style.color = '#EF4444'}
                    onMouseLeave={e => e.currentTarget.style.color = '#CBD5E1'}
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {items.length > 0 && (
          <div style={{ padding: '1rem', borderTop: '1px solid #E2E8F0', background: '#fff' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', marginBottom: '0.875rem' }}>
              {[
                { label: 'Subtotal', val: `₹${cartTotal.toLocaleString()}` },
                { label: 'GST (5%)', val: `₹${gst.toLocaleString()}` },
                { label: 'Shipping', val: shipping === 0 ? 'FREE' : `₹${shipping}`, green: shipping === 0 },
              ].map(row => (
                <div key={row.label} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', color: '#64748B' }}>
                  <span>{row.label}</span>
                  <span style={{ color: row.green ? '#10B981' : undefined, fontWeight: row.green ? 700 : undefined }}>{row.val}</span>
                </div>
              ))}
              <div style={{ height: '1px', background: '#E2E8F0', margin: '0.3rem 0' }} />
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.95rem', fontWeight: 800, color: '#0A0F1E' }}>
                <span>Total</span>
                <span style={{ color: 'var(--primary)' }}>₹{total.toLocaleString()}</span>
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <button className="btn btn-outline btn-full"
                onClick={() => { navigate('/cart'); onClose() }}>
                View Full Cart
              </button>
              <button className="btn btn-primary btn-full"
                onClick={() => { navigate('/checkout'); onClose() }}>
                Checkout <ArrowRight size={15} />
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  )
}
