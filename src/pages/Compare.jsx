import React from 'react'
import { useNavigate } from 'react-router-dom'
import { GitCompare, X, Star, ShoppingCart } from 'lucide-react'
import { useCompare, useCart } from '../context/AppContext'
import ProductImage from '../components/ProductImage'

const compareRows = [
  { label: 'Image', key: 'image' },
  { label: 'Price', key: 'price' },
  { label: 'Rating', key: 'rating' },
  { label: 'Category', key: 'category' },
  { label: 'Stock Status', key: 'stock' },
  { label: 'Brand', key: 'brand' },
  { label: 'Add to Cart', key: 'cart' },
]

export default function Compare() {
  const { items, removeFromCompare } = useCompare()
  const { addToCart } = useCart()
  const navigate = useNavigate()

  if (items.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '5rem 1.5rem' }}>
        <GitCompare size={72} color="#E5E7EB" style={{ margin: '0 auto 1.25rem' }} />
        <h2 style={{ fontWeight: 700, fontSize: '1.25rem', color: '#1A1A2E', marginBottom: '0.5rem' }}>
          No products to compare
        </h2>
        <p style={{ color: '#6B7280', marginBottom: '1.5rem' }}>Add products from the shop to compare their features.</p>
        <button className="btn btn-primary" onClick={() => navigate('/shop')}>Browse Shop</button>
      </div>
    )
  }

  return (
    <div className="responsive-sec-pad-full" style={{ padding: '1.5rem' }}>
      <div style={{ marginBottom: '1.5rem' }}>
        <h1 style={{ fontWeight: 800, fontSize: '1.375rem', color: '#1A1A2E' }}>Compare Products</h1>
        <p style={{ fontSize: '0.875rem', color: '#6B7280', marginTop: '0.25rem' }}>Add up to 4 products</p>
      </div>

      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '500px' }}>
          <thead>
            <tr>
              <th style={{ width: '140px', padding: '0.875rem', textAlign: 'left', fontSize: '0.8rem', fontWeight: 700, color: '#6B7280', background: 'var(--primary-light)', borderBottom: '1px solid #E5E7EB' }}>
                Feature
              </th>
              {items.map(p => (
                <th key={p.id} style={{ padding: '0.875rem 1.25rem', textAlign: 'center', background: 'var(--primary-light)', borderBottom: '1px solid #E5E7EB', borderLeft: '1px solid #E5E7EB' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.3rem' }}>
                    <span style={{ fontSize: '0.875rem', fontWeight: 700, color: '#1A1A2E' }}>{p.name}</span>
                    <button
                      onClick={() => removeFromCompare(p.id)}
                      style={{ fontSize: '0.75rem', color: '#EF4444', background: 'transparent', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.25rem' }}
                    >
                      <X size={12} /> Remove
                    </button>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {compareRows.map((row, ri) => (
              <tr key={row.key} style={{ background: ri % 2 === 0 ? '#fff' : 'var(--primary-light)' }}>
                <td style={{ padding: '1rem', fontSize: '0.85rem', fontWeight: 600, color: '#6B7280', borderBottom: '1px solid #F3F4F6' }}>
                  {row.label}
                </td>
                {items.map(p => (
                  <td key={p.id} style={{ padding: '1rem', textAlign: 'center', borderBottom: '1px solid #F3F4F6', borderLeft: '1px solid #F3F4F6' }}>
                    {row.key === 'image' && (
                      <div style={{ width: '72px', height: '72px', borderRadius: '0.625rem', overflow: 'hidden', margin: '0 auto', cursor: 'pointer' }}
                        onClick={() => navigate(`/product/${p.id}`)}>
                        <ProductImage product={p} height={72} borderRadius="0.625rem" />
                      </div>
                    )}
                    {row.key === 'price' && (
                      <span style={{ fontWeight: 700, color: 'var(--primary)', fontSize: '1rem' }}>₹{p.price.toLocaleString()}</span>
                    )}
                    {row.key === 'rating' && (
                      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.25rem' }}>
                        {[1,2,3,4,5].map(s => (
                          <Star key={s} size={13} fill={s <= Math.round(p.rating) ? '#F59E0B' : 'transparent'} color="#F59E0B" />
                        ))}
                        <span style={{ fontSize: '0.8rem', color: '#6B7280' }}>{p.rating}</span>
                      </div>
                    )}
                    {row.key === 'category' && (
                      <span className="badge badge-blue">{p.category}</span>
                    )}
                    {row.key === 'stock' && (
                      <span className={`badge ${p.stock > 0 ? 'badge-green' : 'badge-red'}`}>
                        {p.stock > 0 ? 'In Stock' : 'Out of Stock'}
                      </span>
                    )}
                    {row.key === 'brand' && (
                      <span style={{ fontSize: '0.875rem', fontWeight: 600, color: '#1A1A2E' }}>{p.brand}</span>
                    )}
                    {row.key === 'cart' && (
                      <button
                        className="btn btn-secondary btn-sm"
                        onClick={() => addToCart(p)}
                        disabled={p.stock === 0}
                        style={{ opacity: p.stock === 0 ? 0.5 : 1 }}
                      >
                        <ShoppingCart size={13} /> Add
                      </button>
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
