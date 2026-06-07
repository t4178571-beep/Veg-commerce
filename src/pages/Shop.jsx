import React, { useState, useMemo } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { Filter, X, Star, SlidersHorizontal } from 'lucide-react'
import { products, brands } from '../data/products'
import ProductCard from '../components/ProductCard'

const categories = ['All','Fresh Vegetables','Root Vegetables','Leafy Vegetables','Spices & Herbs','Exotic Veggies']

function SidebarContent({ clearAll, minRating, setMinRating, priceRange, setPriceRange, selectedBrands, toggleBrand, isMobile, onClose }) {
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <SlidersHorizontal size={15} color="var(--primary)" />
          <h3 style={{ fontWeight: 800, fontSize: '0.9rem', color: '#0F172A' }}>Filters</h3>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <button onClick={clearAll} style={{
            fontSize: '0.75rem', color: 'var(--primary)', fontWeight: 700,
            background: 'var(--primary-light)', border: 'none', borderRadius: '0px',
            padding: '0.25rem 0.625rem', cursor: 'pointer',
          }}>Clear All</button>
          {isMobile && (
            <button onClick={onClose} style={{
              background: '#F1F5F9', border: 'none', cursor: 'pointer',
              color: '#374151', padding: '0.3rem', borderRadius: '0px', display: 'flex',
            }}>
              <X size={15} />
            </button>
          )}
        </div>
      </div>

      <div style={{ marginBottom: '1.5rem' }}>
        <p style={{ fontWeight: 700, fontSize: '0.75rem', color: '#0F172A', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.75rem' }}>By Rating</p>
        <div style={{ height: '1px', background: '#E2E8F0', marginBottom: '0.75rem' }} />
        {[4, 3, 2, 1].map(r => (
          <label key={r} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', marginBottom: '0.5rem' }}>
            <input type="radio" name="rating" checked={minRating === r}
              onChange={() => setMinRating(minRating === r ? 0 : r)}
              style={{ accentColor: 'var(--primary)' }} />
            <div style={{ display: 'flex', gap: '1px' }}>
              {[1,2,3,4,5].map(s => <Star key={s} size={12} fill={s<=r?'#F59E0B':'transparent'} color="#F59E0B" />)}
            </div>
            <span style={{ fontSize: '0.8rem', color: '#374151' }}>{r} & above</span>
          </label>
        ))}
      </div>

      <div style={{ marginBottom: '1.5rem' }}>
        <p style={{ fontWeight: 700, fontSize: '0.75rem', color: '#0F172A', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.75rem' }}>By Price</p>
        <div style={{ height: '1px', background: '#E2E8F0', marginBottom: '0.75rem' }} />
        <input type="range" min={0} max={500} step={10}
          value={priceRange} onChange={e => setPriceRange(Number(e.target.value))}
          style={{ width: '100%', accentColor: 'var(--primary)' }} />
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '0.375rem' }}>
          <span style={{ fontSize: '0.75rem', color: '#64748B' }}>₹0</span>
          <span style={{ fontSize: '0.75rem', color: 'var(--primary)', fontWeight: 700 }}>₹{priceRange.toLocaleString()}</span>
        </div>
      </div>

      <div>
        <p style={{ fontWeight: 700, fontSize: '0.75rem', color: '#0F172A', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.75rem' }}>By Brand</p>
        <div style={{ height: '1px', background: '#E2E8F0', marginBottom: '0.75rem' }} />
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.425rem' }}>
          {brands.map(brand => (
            <label key={brand} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
              <input type="checkbox" checked={selectedBrands.includes(brand)}
                onChange={() => toggleBrand(brand)} style={{ accentColor: 'var(--primary)', width: '14px', height: '14px' }} />
              <span style={{ fontSize: '0.82rem', color: '#374151', fontWeight: selectedBrands.includes(brand) ? 700 : 400 }}>{brand}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Shop() {
  const [searchParams] = useSearchParams()
  const initCat = searchParams.get('category') || 'All'
  const initSearch = searchParams.get('search') || ''

  const [activeCategory, setActiveCategory] = useState(initCat)
  const [selectedBrands, setSelectedBrands] = useState([])
  const [minRating, setMinRating] = useState(0)
  const [priceRange, setPriceRange] = useState(500)
  const [sortBy, setSortBy] = useState('featured')
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false)

  const filtered = useMemo(() => {
    let list = [...products]
    if (initSearch) list = list.filter(p => p.name.toLowerCase().includes(initSearch.toLowerCase()) || p.brand.toLowerCase().includes(initSearch.toLowerCase()))
    if (activeCategory !== 'All') list = list.filter(p => p.category === activeCategory)
    if (selectedBrands.length) list = list.filter(p => selectedBrands.includes(p.brand))
    if (minRating) list = list.filter(p => p.rating >= minRating)
    list = list.filter(p => p.price <= priceRange)
    if (sortBy === 'price-asc')  list.sort((a, b) => a.price - b.price)
    else if (sortBy === 'price-desc') list.sort((a, b) => b.price - a.price)
    else if (sortBy === 'rating') list.sort((a, b) => b.rating - a.rating)
    return list
  }, [activeCategory, selectedBrands, minRating, priceRange, sortBy, initSearch])

  const toggleBrand = (brand) => setSelectedBrands(prev => prev.includes(brand) ? prev.filter(b => b !== brand) : [...prev, brand])

  const clearAll = () => { setActiveCategory('All'); setSelectedBrands([]); setMinRating(0); setPriceRange(500); setSortBy('featured') }

  return (
    <div className="container responsive-sec-pad-full">
      <div className="responsive-flex" style={{ display: 'flex', gap: '1.25rem', alignItems: 'flex-start' }}>
        <aside className="hide-mobile" style={{
          width: '236px', flexShrink: 0, position: 'sticky', top: '78px',
          background: '#fff', border: '1px solid #E2E8F0',
          borderRadius: '0px', padding: '1.25rem',
        }}>
          <SidebarContent 
            clearAll={clearAll}
            minRating={minRating}
            setMinRating={setMinRating}
            priceRange={priceRange}
            setPriceRange={setPriceRange}
            selectedBrands={selectedBrands}
            toggleBrand={toggleBrand}
          />
        </aside>

        <div style={{ flex: 1, minWidth: 0 }}>
          <div className="scrollbar-hide" style={{
            display: 'flex', gap: '0.4rem', overflowX: 'auto',
            marginBottom: '1rem', paddingBottom: '0.25rem',
          }}>
            {categories.map(cat => (
              <button key={cat} onClick={() => setActiveCategory(cat)} style={{
                padding: '0.4rem 0.875rem', borderRadius: '0px', flexShrink: 0,
                fontSize: '0.78rem', fontWeight: 700, cursor: 'pointer', transition: 'all 0.15s',
                background: activeCategory === cat ? 'var(--primary)' : '#fff',
                color: activeCategory === cat ? '#fff' : '#64748B',
                border: activeCategory === cat ? '1.5px solid var(--primary)' : '1.5px solid #E2E8F0',
              }}>{cat}</button>
            ))}
          </div>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.875rem', flexWrap: 'wrap', gap: '0.5rem' }}>
            <p style={{ fontSize: '0.82rem', color: '#64748B' }}>
              Showing <strong style={{ color: '#0F172A', fontWeight: 800 }}>{filtered.length}</strong> Products
              {initSearch && <span> for "<em>{initSearch}</em>"</span>}
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem' }}>
              <button className="hide-desktop" onClick={() => setMobileFilterOpen(true)} style={{
                display: 'flex', alignItems: 'center', gap: '0.4rem',
                border: '1.5px solid #E2E8F0', borderRadius: '0px', background: '#fff',
                padding: '0.4rem 0.75rem', cursor: 'pointer', fontSize: '0.78rem', fontWeight: 700, color: '#374151',
              }}>
                <Filter size={13} /> Filter
              </button>
              <select value={sortBy} onChange={e => setSortBy(e.target.value)} style={{
                border: '1.5px solid #E2E8F0', borderRadius: '0px',
                padding: '0.4rem 0.75rem', fontSize: '0.78rem', color: '#374151',
                background: '#fff', cursor: 'pointer', outline: 'none', fontWeight: 600,
              }}>
                <option value="featured">Featured</option>
                <option value="price-asc">Price: Low → High</option>
                <option value="price-desc">Price: High → Low</option>
                <option value="rating">Top Rated</option>
              </select>
            </div>
          </div>

          {filtered.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '4rem 0' }}>
              <div style={{ width: '64px', height: '64px', borderRadius: '0px', background: '#F1F5F9', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem' }}>
                <Filter size={28} color="#CBD5E1" />
              </div>
              <p style={{ fontSize: '1rem', fontWeight: 700, color: '#0F172A', marginBottom: '0.375rem' }}>No products found</p>
              <p style={{ fontSize: '0.82rem', color: '#64748B', marginBottom: '1.25rem' }}>Try adjusting your filters</p>
              <button className="btn btn-primary" onClick={clearAll} style={{ borderRadius: '0px' }}>Clear Filters</button>
            </div>
          ) : (
            <div className="grid-products-shop">
              {filtered.map(p => <ProductCard key={p.id} product={p} size="lg" />)}
            </div>
          )}
        </div>

        {mobileFilterOpen && (
          <div className="overlay" style={{ zIndex: 300, alignItems: 'flex-end' }} onClick={() => setMobileFilterOpen(false)}>
            <div style={{
              background: '#fff', borderRadius: '0px',
              padding: '1.25rem', width: '100%', maxHeight: '80vh', overflowY: 'auto',
              boxShadow: '0 -8px 24px rgba(0,0,0,0.15)',
              borderTop: '2.5px solid var(--primary)',
              animation: 'fadeIn 0.2s ease',
            }} onClick={e => e.stopPropagation()}>
              <SidebarContent 
                clearAll={clearAll}
                minRating={minRating}
                setMinRating={setMinRating}
                priceRange={priceRange}
                setPriceRange={setPriceRange}
                selectedBrands={selectedBrands}
                toggleBrand={toggleBrand}
                isMobile={true}
                onClose={() => setMobileFilterOpen(false)}
              />
              <button className="btn btn-primary btn-full" style={{ marginTop: '1.25rem', borderRadius: '0px' }} onClick={() => setMobileFilterOpen(false)}>
                Apply Filters
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
