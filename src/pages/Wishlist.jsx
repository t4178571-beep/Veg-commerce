import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Heart, Trash2, ShoppingCart } from 'lucide-react'
import { useWishlist, useCart } from '../context/AppContext'
import ProductImage from '../components/ProductImage'

export default function Wishlist() {
  const { items, removeFromWishlist } = useWishlist()
  const { addToCart } = useCart()
  const navigate = useNavigate()

  if (items.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '5rem 1.5rem' }}>
        <Heart size={72} color="#E5E7EB" style={{ margin: '0 auto 1.25rem' }} />
        <h2 style={{ fontWeight: 700, fontSize: '1.25rem', color: '#1A1A2E', marginBottom: '0.5rem' }}>Your wishlist is empty</h2>
        <p style={{ color: '#6B7280', marginBottom: '1.5rem' }}>Save your favourite items here.</p>
        <button className="btn btn-primary" onClick={() => navigate('/shop')}>Browse Products</button>
      </div>
    )
  }

  return (
    <div className="responsive-sec-pad-full" style={{ padding: '1.5rem' }}>
      <h1 style={{ fontWeight: 800, fontSize: '1.375rem', color: '#1A1A2E', marginBottom: '1.5rem' }}>
        My Wishlist ({items.length} items)
      </h1>
      
      {/* Desktop Table View */}
      <div className="card hide-mobile" style={{ overflow: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '600px' }}>
          <thead>
            <tr style={{ background: '#F8FAFF' }}>
              {['Product', 'Price', 'Availability', 'Add to Cart', 'Remove'].map(h => (
                <th key={h} style={{
                  padding: '0.875rem 1.25rem', textAlign: 'left',
                  fontSize: '0.8rem', fontWeight: 700, color: '#6B7280',
                  borderBottom: '1px solid #E5E7EB', whiteSpace: 'nowrap',
                }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {items.map((item, i) => (
              <tr key={item.id} style={{ background: i % 2 === 0 ? '#fff' : '#FAFAFA' }}>
                <td style={{ padding: '1rem 1.25rem', borderBottom: '1px solid #F3F4F6' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.875rem', cursor: 'pointer' }}
                    onClick={() => navigate(`/product/${item.id}`)}>
                    <div style={{ width: '52px', height: '52px', borderRadius: '0.625rem', overflow: 'hidden', flexShrink: 0 }}>
                      <ProductImage product={item} height={52} borderRadius="0.625rem" />
                    </div>
                    <div>
                      <p style={{ fontWeight: 600, fontSize: '0.875rem', color: '#1A1A2E' }}>{item.name}</p>
                      <span className="badge badge-blue">{item.category}</span>
                    </div>
                  </div>
                </td>
                <td style={{ padding: '1rem 1.25rem', borderBottom: '1px solid #F3F4F6' }}>
                  <span style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--primary)' }}>₹{item.price.toLocaleString()}</span>
                </td>
                <td style={{ padding: '1rem 1.25rem', borderBottom: '1px solid #F3F4F6' }}>
                  <span className={`badge ${item.stock > 0 ? 'badge-green' : 'badge-red'}`}>
                    {item.stock > 0 ? 'In Stock' : 'Out of Stock'}
                  </span>
                </td>
                <td style={{ padding: '1rem 1.25rem', borderBottom: '1px solid #F3F4F6' }}>
                  <button
                    className="btn btn-secondary btn-sm"
                    disabled={item.stock === 0}
                    onClick={() => addToCart(item)}
                    style={{ opacity: item.stock === 0 ? 0.5 : 1, cursor: item.stock === 0 ? 'not-allowed' : 'pointer' }}
                  >
                    <ShoppingCart size={13} /> Add
                  </button>
                </td>
                <td style={{ padding: '1rem 1.25rem', borderBottom: '1px solid #F3F4F6' }}>
                  <button
                    onClick={() => removeFromWishlist(item.id)}
                    style={{
                      background: 'transparent', border: 'none', cursor: 'pointer',
                      color: '#EF4444', padding: '0.25rem', borderRadius: '0.375rem',
                      transition: 'background 0.2s',
                    }}
                    onMouseEnter={e => e.currentTarget.style.background = '#FEE2E2'}
                    onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                  >
                    <Trash2 size={17} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Card List View */}
      <div className="hide-desktop" style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        {items.map(item => (
          <div key={item.id} style={{ background: '#fff', border: '1px solid #E2E8F0', padding: '1rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }} onClick={() => navigate(`/product/${item.id}`)}>
              <div style={{ width: '56px', height: '56px', borderRadius: '0px', overflow: 'hidden', flexShrink: 0 }}>
                <ProductImage product={item} height={56} borderRadius="0px" />
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{ fontWeight: 700, fontSize: '0.875rem', color: '#0A0F1E', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{item.name}</p>
                <span className="badge badge-blue" style={{ marginTop: '0.2rem' }}>{item.category}</span>
              </div>
            </div>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #F1F5F9', paddingTop: '0.75rem' }}>
              <div>
                <span style={{ fontSize: '0.75rem', color: '#64748B', display: 'block' }}>Price</span>
                <span style={{ fontWeight: 850, fontSize: '0.95rem', color: 'var(--primary)' }}>₹{item.price.toLocaleString()}</span>
              </div>
              <div>
                <span style={{ fontSize: '0.75rem', color: '#64748B', display: 'block', textAlign: 'right' }}>Status</span>
                <span className={`badge ${item.stock > 0 ? 'badge-green' : 'badge-red'}`} style={{ marginTop: '0.15rem' }}>
                  {item.stock > 0 ? 'In Stock' : 'Out of Stock'}
                </span>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '0.5rem', borderTop: '1px solid #F1F5F9', paddingTop: '0.75rem' }}>
              <button
                className="btn btn-secondary btn-sm"
                disabled={item.stock === 0}
                onClick={() => addToCart(item)}
                style={{ flex: 1, opacity: item.stock === 0 ? 0.5 : 1, borderRadius: '0px' }}
              >
                <ShoppingCart size={13} /> Add to Cart
              </button>
              <button
                className="btn btn-outline-dark btn-sm"
                onClick={() => removeFromWishlist(item.id)}
                style={{ padding: '0.4rem 0.75rem', color: '#EF4444', borderColor: '#FEE2E2', background: '#FEF2F2', borderRadius: '0px' }}
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
