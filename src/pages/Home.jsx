import React, { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Zap, Wind, Droplets, Truck, Clock, ShieldCheck, Cable, X,
  Flame, Star, ArrowRight, Package, Tag, RotateCcw
} from 'lucide-react'
import { products, brands, flashDeals } from '../data/products'
import { useCart } from '../context/AppContext'
import ProductCard from '../components/ProductCard'
import ProductImage from '../components/ProductImage'

function useCountdown(init = { h: 5, m: 42, s: 18 }) {
  const [t, setT] = useState(init)
  useEffect(() => {
    const id = setInterval(() => {
      setT(p => {
        let { h, m, s } = p
        s--; if (s < 0) { s = 59; m-- }; if (m < 0) { m = 59; h-- }; if (h < 0) { h = 5; m = 59; s = 59 }
        return { h, m, s }
      })
    }, 1000)
    return () => clearInterval(id)
  }, [])
  const pad = n => String(n).padStart(2, '0')
  return `${pad(t.h)}:${pad(t.m)}:${pad(t.s)}`
}

function AdPopup({ onClose }) {
  const navigate = useNavigate()
  const featured = products.slice(0, 3)
  return (
    <div className="overlay" style={{ zIndex: 400 }}>
      <div className="animate-scaleIn ad-popup-container" style={{
        background: '#fff', borderRadius: '0px',
        maxWidth: '580px', width: 'calc(100% - 2rem)',
        border: '1px solid #E2E8F0',
        boxShadow: '0 24px 60px rgba(10,15,30,0.18)',
      }}>
        <div className="ad-popup-left" style={{
          background: 'var(--primary)', padding: '2rem 1.5rem',
        }}>
          <div style={{
            background: 'rgba(255,255,255,0.15)', borderRadius: '0px',
            padding: '0.3rem 0.75rem', width: 'fit-content',
          }}>
            <span style={{ color: '#fff', fontWeight: 700, fontSize: '0.72rem', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
              Limited Time
            </span>
          </div>
          <h2 style={{ fontSize: '1.625rem', fontWeight: 900, color: '#fff', lineHeight: 1.15 }}>
            Get 20% Off
          </h2>
          <p style={{ fontSize: '0.82rem', color: 'rgba(255,255,255,0.72)', lineHeight: 1.6 }}>
            On your first order. Enter code at checkout:
          </p>
          <div style={{
            background: 'rgba(255,255,255,0.12)', border: '2px dashed rgba(255,255,255,0.4)',
            borderRadius: '0px', padding: '0.625rem 1rem', textAlign: 'center',
          }}>
            <span style={{ fontWeight: 900, color: '#fff', fontSize: '1.15rem', letterSpacing: '3px' }}>EBAJAR20</span>
          </div>
          <div style={{
            width: '64px', height: '64px', background: 'rgba(255,255,255,0.12)',
            borderRadius: '0px', display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <Tag size={32} color="#fff" />
          </div>
          <button className="btn btn-outline-white btn-full" onClick={() => { navigate('/shop'); onClose() }}>
            Shop Now <ArrowRight size={14} />
          </button>
        </div>
        <div className="ad-popup-right" style={{ padding: '1.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <h3 style={{ fontWeight: 800, fontSize: '0.95rem', color: '#0A0F1E' }}>🔥 Hot Right Now</h3>
            <button onClick={onClose} style={{
              background: '#F1F5F9', border: 'none', cursor: 'pointer',
              color: '#64748B', padding: '0.3rem', borderRadius: '0px', display: 'flex',
            }}>
              <X size={17} />
            </button>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.625rem', overflowY: 'auto' }}>
            {featured.map(p => (
              <div key={p.id} style={{
                display: 'flex', gap: '0.75rem', alignItems: 'center',
                padding: '0.75rem', background: 'var(--primary-light)', borderRadius: '0px',
                border: '1px solid #E2E8F0', cursor: 'pointer', transition: 'border-color 0.15s',
              }}
                onClick={() => { navigate(`/product/${p.id}`); onClose() }}
                onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--primary)'}
                onMouseLeave={e => e.currentTarget.style.borderColor = '#E2E8F0'}
              >
                <div style={{ width: '46px', height: '46px', borderRadius: '0px', overflow: 'hidden', flexShrink: 0 }}>
                  <ProductImage product={p} height={46} borderRadius="0px" />
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ fontSize: '0.78rem', fontWeight: 700, color: '#0A0F1E', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{p.name}</p>
                  <p style={{ fontSize: '0.83rem', fontWeight: 800, color: 'var(--primary)', marginTop: '0.1rem' }}>₹{p.price.toLocaleString()}</p>
                </div>
                <span style={{ fontSize: '0.72rem', color: 'var(--primary)', fontWeight: 700, flexShrink: 0 }}>Grab →</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function FloatingDeal() {
  const navigate = useNavigate()
  const [idx, setIdx] = useState(0)
  const [visible, setVisible] = useState(true)
  const [key, setKey] = useState(0)
  const hotP = products.slice(3, 6)

  useEffect(() => {
    const id = setInterval(() => { setIdx(i => (i + 1) % 3); setKey(k => k + 1) }, 5000)
    return () => clearInterval(id)
  }, [])

  if (!visible) return null
  const p = hotP[idx]

  return (
    <div key={key} className="animate-fadeIn hide-mobile" style={{
      position: 'fixed', bottom: '1.5rem', left: '1.5rem', zIndex: 200,
      width: '215px', background: '#fff', borderRadius: '0px',
      border: '1px solid #E2E8F0', boxShadow: '0 8px 32px rgba(0,0,0,0.14)',
      cursor: 'pointer', overflow: 'hidden',
    }} onClick={() => navigate(`/product/${p.id}`)}>
      <div style={{
        background: '#0A0F1E', padding: '0.4rem 0.75rem',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <span style={{ color: '#fff', fontWeight: 700, fontSize: '0.72rem', letterSpacing: '0.04em' }}>🔥 HOT DEAL</span>
        <button onClick={e => { e.stopPropagation(); setVisible(false) }} style={{
          background: 'transparent', border: 'none', color: 'rgba(255,255,255,0.5)',
          cursor: 'pointer', display: 'flex', padding: 0, lineHeight: 1,
        }}>
          <X size={13} />
        </button>
      </div>
      <div style={{ display: 'flex', gap: '0.625rem', alignItems: 'center', padding: '0.75rem' }}>
        <div style={{ width: '44px', height: '44px', borderRadius: '0px', overflow: 'hidden', flexShrink: 0 }}>
          <ProductImage product={p} height={44} borderRadius="0px" />
        </div>
        <div>
          <p style={{ fontSize: '0.72rem', fontWeight: 700, color: '#0A0F1E', lineHeight: 1.35 }}>
            {p.name.length > 24 ? p.name.slice(0, 24) + '…' : p.name}
          </p>
          <p style={{ fontSize: '0.85rem', fontWeight: 800, color: 'var(--primary)', marginTop: '0.15rem' }}>₹{p.price.toLocaleString()}</p>
        </div>
      </div>
    </div>
  )
}

export default function Home() {
  const navigate = useNavigate()
  const { addToCart } = useCart()
  const countdown = useCountdown()
  const [showAd, setShowAd] = useState(false)

  useEffect(() => {
    if (!sessionStorage.getItem('em_ad_shown')) {
      const t = setTimeout(() => {
        setShowAd(true)
        sessionStorage.setItem('em_ad_shown', '1')
      }, 5000)
      return () => clearTimeout(t)
    }
  }, [])

  const brandList = [...brands, ...brands, ...brands]

  const popularProducts = products.slice(0, 8).map((p, i) => {
    const discounts = [25, 18, 20, 22, 15, 30, 10, 12]
    const discount = discounts[i] || 15
    return { ...p, discount, dealPrice: Math.round(p.price * (1 - discount / 100)) }
  })

  return (
    <div style={{ background: '#FFFFFF' }}>
      {showAd && <AdPopup onClose={() => setShowAd(false)} />}
      <FloatingDeal />

      {/* ── HERO BANNER ── */}
      <section style={{ width: '100%', overflow: 'hidden', position: 'relative', height: 'clamp(200px, 35vh, 320px)' }}>
        <img 
          src="/images/products/vegetables_hero.png" 
          alt="Fresh Vegetables Banner" 
          style={{ width: '100%', height: '100%', objectFit: 'cover', position: 'absolute', inset: 0 }} 
        />
        <div style={{
          position: 'absolute', inset: 0, 
          background: 'linear-gradient(to right, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.9) 45%, rgba(255,255,255,0.5) 80%, transparent 100%)',
          display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 5%'
        }}>
          <div style={{ maxWidth: '520px' }}>
            <span style={{
              background: 'var(--primary)', color: '#fff', padding: '0.25rem 0.6rem', 
              fontSize: '0.65rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.06em',
              width: 'fit-content', marginBottom: '0.5rem', display: 'inline-block'
            }}>
              100% Organic Farms
            </span>
            <h1 style={{
              fontSize: 'clamp(1.2rem, 3.5vw, 2.2rem)', fontWeight: 900, color: '#0F172A',
              lineHeight: 1.15, marginBottom: '0.5rem', letterSpacing: '-0.02em'
            }}>
              Fresh Vegetables Delivered to Your Home
            </h1>
            <p className="hide-mobile" style={{ color: '#475569', fontSize: '0.85rem', marginBottom: '1.25rem', lineHeight: 1.5 }}>
              Harvested daily, packed with care, and shipped directly from local fields.
            </p>
            <button className="btn btn-primary" onClick={() => navigate('/shop')} style={{ borderRadius: '0px' }}>
              Shop Now <ArrowRight size={14} />
            </button>
          </div>
        </div>
      </section>

      {/* ── FEATURED PRODUCTS ── */}
      <section className="responsive-sec-pad">
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <div>
              <h2 className="section-heading">Featured Vegetables</h2>
              <p style={{ fontSize: '0.8rem', color: '#64748B', marginTop: '0.2rem' }}>Handpicked organic harvest</p>
            </div>
            <button onClick={() => navigate('/shop')} style={{
              background: 'transparent', border: '1.5px solid #E2E8F0',
              borderRadius: '0px', padding: '0.4rem 0.875rem', cursor: 'pointer',
              fontSize: '0.82rem', fontWeight: 700, color: 'var(--primary)',
              display: 'flex', alignItems: 'center', gap: '0.3rem', transition: 'all 0.15s',
            }}
              onMouseEnter={e => { e.currentTarget.style.background = 'var(--primary-light)'; e.currentTarget.style.borderColor = 'var(--primary)' }}
              onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.borderColor = '#E2E8F0' }}
            >
              View All <ArrowRight size={13} />
            </button>
          </div>
          <div className="scrollbar-hide" style={{ display: 'flex', gap: '0.875rem', overflowX: 'auto', paddingBottom: '0.75rem' }}>
            {products.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        </div>
      </section>

      {/* ── USP STRIP ── */}
      <section className="responsive-sec-pad" style={{ background: '#FFFFFF' }}>
        <div className="container">
          <div className="grid-usp-strip" style={{
            background: '#fff', border: '1px solid #E2E8F0', borderRadius: '0px',
            display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          }}>
            {[
              { icon: Truck,       title: 'Fast Free Delivery',  sub: 'On orders over ₹500' },
              { icon: Clock,       title: 'Farm Fresh Harvest',  sub: 'Picked & delivered daily' },
              { icon: ShieldCheck, title: 'Secure Checkouts',    sub: '100% secure direct payments' },
            ].map((item, i) => (
              <div key={i} className="grid-usp-item" style={{
                display: 'flex', alignItems: 'center', gap: '0.875rem',
                padding: '1.25rem 1.5rem',
                borderRight: i < 2 ? '1px solid #E2E8F0' : 'none',
              }}>
                <div style={{
                  width: '44px', height: '44px', borderRadius: '0px',
                  background: 'var(--primary-light)', display: 'flex', alignItems: 'center',
                  justifyContent: 'center', flexShrink: 0,
                }}>
                  <item.icon size={21} color="var(--primary)" />
                </div>
                <div>
                  <p style={{ fontWeight: 700, fontSize: '0.875rem', color: '#0F172A' }}>{item.title}</p>
                  <p style={{ fontSize: '0.77rem', color: '#64748B', marginTop: '0.1rem' }}>{item.sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CATEGORY PROMO ── */}
      <section className="responsive-sec-pad">
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '0.875rem' }}>
            {[
              { title: 'Kitchen Essentials', sub: 'Fresh potatoes, onions & ginger root', img: '/images/products/potato.jfif', cat: 'Root Vegetables' },
              { title: 'Healthy Greens',     sub: 'Iron-rich spinach & fresh herbs',     img: '/images/products/Spinach.webp',   cat: 'Leafy Vegetables' },
              { title: 'Daily Harvest',      sub: 'Sweet green peas & juicy tomatoes',   img: '/images/products/Red Tomatoe.jpg',  cat: 'Fresh Vegetables' },
            ].map((card, i) => (
              <div key={i} style={{
                background: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.6)), url(${card.img})`,
                backgroundSize: 'cover', backgroundPosition: 'center',
                borderRadius: '0px', padding: '1.75rem',
                display: 'flex', flexDirection: 'column', gap: '0.625rem',
                position: 'relative', overflow: 'hidden', minHeight: '190px',
                justifyContent: 'flex-end'
              }}>
                <p style={{ fontWeight: 800, fontSize: '1.15rem', color: '#fff', letterSpacing: '-0.02em', textShadow: '1px 1px 3px rgba(0,0,0,0.6)' }}>{card.title}</p>
                <p style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.85)', textShadow: '1px 1px 2px rgba(0,0,0,0.6)', marginBottom: '0.5rem' }}>{card.sub}</p>
                <button onClick={() => navigate(`/shop?category=${encodeURIComponent(card.cat)}`)}
                  className="btn btn-outline-white btn-sm" style={{ width: 'fit-content', borderRadius: '0px' }}>
                  Explore Range <ArrowRight size={12} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── POPULAR PRODUCTS ── */}
      <section className="responsive-sec-pad" style={{ background: '#FFFFFF' }}>
        <div className="container">
          <div style={{
            background: '#FFFFFF', borderRadius: '0px',
            padding: '1rem 0',
          }}>
            <div style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              marginBottom: '1.5rem', flexWrap: 'wrap', gap: '0.75rem',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem' }}>
                <div style={{
                  background: 'var(--primary)', width: '32px', height: '32px',
                  borderRadius: '0px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <Flame size={17} color="#fff" />
                </div>
                <div>
                  <h2 style={{ color: '#0F172A', fontWeight: 800, fontSize: '1.25rem', letterSpacing: '-0.02em' }}>Popular Products</h2>
                  <p style={{ color: '#64748B', fontSize: '0.75rem' }}>Most loved fresh items this week</p>
                </div>
              </div>
            </div>

            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fill, minmax(188px, 1fr))', 
              gap: '1rem' 
            }} className="grid-products-shop">
              {popularProducts.map(deal => (
                <div key={deal.id} onClick={() => navigate(`/product/${deal.id}`)} style={{
                  background: '#fff',
                  borderRadius: '0px', cursor: 'pointer',
                  border: '1px solid var(--border-dark)', overflow: 'hidden',
                  position: 'relative', transition: 'border-color 0.15s, box-shadow 0.15s',
                }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--primary)'; e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.05)' }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border-dark)'; e.currentTarget.style.boxShadow = 'none' }}
                >
                  <div style={{
                    position: 'absolute', top: '0.5rem', left: '0.5rem', zIndex: 1,
                    background: 'var(--primary)', color: '#fff', borderRadius: '0px',
                    padding: '0.15rem 0.5rem', fontSize: '0.65rem', fontWeight: 800, letterSpacing: '0.04em',
                  }}>
                    -{deal.discount}% OFF
                  </div>
                  <ProductImage product={deal} height={150} />
                  <div style={{ padding: '0.75rem' }}>
                    <p style={{
                      fontSize: '0.8rem', fontWeight: 700, color: '#0F172A',
                      marginBottom: '0.3rem', display: '-webkit-box',
                      WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden', lineHeight: 1.4,
                    }}>{deal.name}</p>
                    <p style={{ fontSize: '0.7rem', color: '#94A3B8', textDecoration: 'line-through' }}>
                      ₹{deal.price.toLocaleString()}
                    </p>
                    <p style={{ fontSize: '0.95rem', fontWeight: 800, color: 'var(--primary)', marginBottom: '0.5rem' }}>
                      ₹{deal.dealPrice.toLocaleString()}
                    </p>
                    <button className="btn btn-primary btn-sm btn-full"
                      style={{ borderRadius: '0px', fontSize: '0.73rem' }}
                      onClick={e => { e.stopPropagation(); addToCart(deal) }}>
                      Add to Cart
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── BRANDS MARQUEE ── */}
      <section style={{ padding: '2rem 0 3rem', background: '#FFFFFF' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '1.25rem', padding: '0 1.5rem' }}>
            <p style={{ fontSize: '0.72rem', fontWeight: 800, color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.12em' }}>
              Trusted by 10,000+ customers
            </p>
            <h2 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0F172A', marginTop: '0.3rem', letterSpacing: '-0.02em' }}>
              Our Organic Brand Partners
            </h2>
          </div>
          <div style={{ overflow: 'hidden' }}>
            <div className="marquee-track-left" style={{ marginBottom: '0.625rem' }}>
              {brandList.map((brand, i) => (
                <div key={i} style={{
                  background: '#fff', border: '1px solid #E2E8F0',
                  borderRadius: '0px', padding: '0.625rem 1.5rem',
                  margin: '0 0.4rem', fontWeight: 800, fontSize: '0.83rem',
                  color: '#0F172A', whiteSpace: 'nowrap', flexShrink: 0,
                  transition: 'all 0.15s', cursor: 'default',
                }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--primary)'; e.currentTarget.style.color = 'var(--primary)' }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = '#E2E8F0'; e.currentTarget.style.color = '#0F172A' }}
                >{brand}</div>
              ))}
            </div>
            <div className="marquee-track-right">
              {[...brandList].reverse().map((brand, i) => (
                <div key={i} style={{
                  background: '#fff', border: '1px solid #E2E8F0',
                  borderRadius: '0px', padding: '0.625rem 1.5rem',
                  margin: '0 0.4rem', fontWeight: 800, fontSize: '0.83rem',
                  color: '#0F172A', whiteSpace: 'nowrap', flexShrink: 0,
                  transition: 'all 0.15s', cursor: 'default',
                }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--primary)'; e.currentTarget.style.color = 'var(--primary)' }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = '#E2E8F0'; e.currentTarget.style.color = '#0F172A' }}
                >{brand}</div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
