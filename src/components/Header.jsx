import React, { useState, useRef, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import {
  Zap, Search, ShoppingCart, X, Menu, ChevronDown,
  ChevronRight, LogOut, LayoutDashboard, UserCircle, Heart
} from 'lucide-react'
import { useCart } from '../context/AppContext'
import { useAuth } from '../context/AppContext'
import CartDrawer from './CartDrawer'

const navLinks = [
  { label: 'Home',        path: '/' },
  { label: 'Shop',        path: '/shop', hasDropdown: true },
  { label: 'Compare',     path: '/compare' },
  { label: 'Track Order', path: '/track-order' },
  { label: 'Wishlist',    path: '/wishlist' },
  { label: 'About',       path: '/about' },
  { label: 'Contact',     path: '/contact' },
]

const shopDropdown = [
  { label: 'All Vegetables',    path: '/shop' },
  { label: 'Fresh Vegetables',  path: '/shop?category=Fresh+Vegetables' },
  { label: 'Root Vegetables',   path: '/shop?category=Root+Vegetables' },
  { label: 'Leafy Vegetables',  path: '/shop?category=Leafy+Vegetables' },
  { label: 'Spices & Herbs',    path: '/shop?category=Spices+%26+Herbs' },
]

export default function Header() {
  const { cartCount } = useCart()
  const { isLoggedIn, user, login, logout } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [cartOpen, setCartOpen] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [userDropOpen, setUserDropOpen] = useState(false)
  const [shopDropOpen, setShopDropOpen] = useState(false)
  const searchRef = useRef(null)
  const userRef = useRef(null)

  useEffect(() => {
    if (searchOpen && searchRef.current) searchRef.current.focus()
  }, [searchOpen])

  useEffect(() => {
    const handler = (e) => {
      if (userRef.current && !userRef.current.contains(e.target)) setUserDropOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      navigate(`/shop?search=${encodeURIComponent(searchQuery)}`)
      setSearchOpen(false)
      setSearchQuery('')
    }
  }

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/'
    return location.pathname.startsWith(path) && path !== '#'
  }

  return (
    <>
      <header style={{
        position: 'sticky', top: 0, zIndex: 100,
        background: '#fff', borderBottom: '1px solid #E2E8F0',
        height: '62px', display: 'flex', alignItems: 'center',
      }}>
        <div style={{
          display: 'flex', alignItems: 'center', justify_content: 'space-between',
          width: '100%', padding: '0 1.5rem', height: '100%',
          justifyContent: 'space-between'
        }}>
          <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.625rem' }}>
            <img src="/images/logo.png" alt="Aamir Vegetables Logo" style={{ height: '36px', objectFit: 'contain' }} />
            <span style={{ fontWeight: 900, fontSize: '1.2rem', color: '#0F172A', letterSpacing: '-0.5px' }}>
              Aamir <span style={{ color: 'var(--primary)' }}>Vegetables</span>
            </span>
          </Link>

          <nav className="hide-mobile" style={{ display: 'flex', alignItems: 'center' }}>
            {navLinks.map(link => (
              <div key={link.label} style={{ position: 'relative' }}
                onMouseEnter={() => link.hasDropdown && setShopDropOpen(true)}
                onMouseLeave={() => link.hasDropdown && setShopDropOpen(false)}
              >
                <Link to={link.path} style={{
                  display: 'flex', alignItems: 'center', gap: '0.2rem',
                  padding: '0.45rem 0.7rem', borderRadius: '0px',
                  fontSize: '0.85rem', fontWeight: 600,
                  color: isActive(link.path) ? 'var(--primary)' : '#374151',
                  background: isActive(link.path) ? 'var(--primary-light)' : 'transparent',
                  transition: 'all 0.15s',
                }}
                  onMouseEnter={e => { if (!isActive(link.path)) { e.currentTarget.style.color = 'var(--primary)'; e.currentTarget.style.background = '#F8FAFF' } }}
                  onMouseLeave={e => { if (!isActive(link.path)) { e.currentTarget.style.color = '#374151'; e.currentTarget.style.background = 'transparent' } }}
                >
                  {link.label}
                  {link.hasDropdown && <ChevronDown size={13} />}
                </Link>

                {link.hasDropdown && shopDropOpen && (
                  <div style={{
                    position: 'absolute', top: '100%', left: 0, zIndex: 300,
                    background: '#fff', borderRadius: '0px',
                    border: '1px solid #E2E8F0',
                    boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
                    minWidth: '196px', padding: '0.375rem',
                    animation: 'fadeIn 0.15s ease',
                  }}>
                    {shopDropdown.map(item => (
                      <Link key={item.label} to={item.path}
                        style={{
                          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                          padding: '0.55rem 0.875rem', fontSize: '0.83rem',
                          color: '#374151', borderRadius: '0px', transition: 'all 0.12s',
                        }}
                        onMouseEnter={e => { e.currentTarget.style.background = 'var(--primary-light)'; e.currentTarget.style.color = 'var(--primary)' }}
                        onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#374151' }}
                        onClick={() => setShopDropOpen(false)}
                      >
                        {item.label} <ChevronRight size={13} color="#94A3B8" />
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <button onClick={() => setSearchOpen(!searchOpen)} style={{
              background: 'transparent', border: 'none', cursor: 'pointer',
              color: '#64748B', padding: '0.45rem', borderRadius: '0px',
              display: 'flex', alignItems: 'center', transition: 'all 0.15s',
            }}
              onMouseEnter={e => { e.currentTarget.style.background = '#F1F5F9'; e.currentTarget.style.color = 'var(--primary)' }}
              onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#64748B' }}
            >
              <Search size={19} />
            </button>

            <Link to="/wishlist" style={{
              background: 'transparent', border: 'none', cursor: 'pointer',
              color: '#64748B', padding: '0.45rem', borderRadius: '0px',
              display: 'flex', alignItems: 'center', transition: 'all 0.15s',
            }}
              onMouseEnter={e => { e.currentTarget.style.background = '#F1F5F9'; e.currentTarget.style.color = '#EF4444' }}
              onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#64748B' }}
            >
              <Heart size={19} />
            </Link>

            <button onClick={() => setCartOpen(true)} style={{
              background: 'transparent', border: 'none', cursor: 'pointer',
              position: 'relative', color: '#64748B', padding: '0.45rem',
              borderRadius: '0px', display: 'flex', alignItems: 'center', transition: 'all 0.15s',
            }}
              onMouseEnter={e => { e.currentTarget.style.background = '#F1F5F9'; e.currentTarget.style.color = 'var(--primary)' }}
              onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#64748B' }}
            >
              <ShoppingCart size={19} />
              {cartCount > 0 && (
                <span style={{
                  position: 'absolute', top: '2px', right: '2px',
                  background: 'var(--primary)', color: '#fff', borderRadius: '0px',
                  width: '16px', height: '16px', fontSize: '0.62rem', fontWeight: 800,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>{cartCount > 9 ? '9+' : cartCount}</span>
              )}
            </button>

            <div className="hide-mobile" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginLeft: '0.25rem' }}>
              {isLoggedIn ? (
                <div ref={userRef} style={{ position: 'relative' }}>
                  <button onClick={() => setUserDropOpen(!userDropOpen)} style={{
                    width: '34px', height: '34px', borderRadius: '0px',
                    background: 'var(--primary)', color: '#fff', fontWeight: 800,
                    fontSize: '0.75rem', border: 'none', cursor: 'pointer',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    letterSpacing: '0.02em',
                  }}>{user.initials}</button>
                  {userDropOpen && (
                    <div style={{
                      position: 'absolute', right: 0, top: 'calc(100% + 8px)',
                      background: '#fff', borderRadius: '0px',
                      border: '1px solid #E2E8F0',
                      boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
                      minWidth: '168px', zIndex: 300, overflow: 'hidden',
                      animation: 'fadeIn 0.15s ease',
                    }}>
                      <div style={{ padding: '0.75rem 1rem', borderBottom: '1px solid #E2E8F0', background: '#F8FAFF' }}>
                        <p style={{ fontWeight: 700, fontSize: '0.84rem', color: '#0A0F1E' }}>{user.name}</p>
                        <p style={{ fontSize: '0.73rem', color: '#64748B', marginTop: '0.1rem' }}>{user.email}</p>
                      </div>
                      {[{ icon: LayoutDashboard, label: 'Dashboard' }, { icon: UserCircle, label: 'Profile' }].map(item => (
                        <button key={item.label} style={{
                          display: 'flex', alignItems: 'center', gap: '0.5rem',
                          width: '100%', padding: '0.6rem 1rem',
                          background: 'transparent', border: 'none',
                          fontSize: '0.83rem', color: '#374151', cursor: 'pointer', transition: 'background 0.12s',
                        }}
                          onMouseEnter={e => e.currentTarget.style.background = '#F8FAFF'}
                          onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                        >
                          <item.icon size={14} color="#64748B" /> {item.label}
                        </button>
                      ))}
                      <button onClick={() => { logout(); setUserDropOpen(false) }} style={{
                        display: 'flex', alignItems: 'center', gap: '0.5rem',
                        width: '100%', padding: '0.6rem 1rem',
                        background: 'transparent', border: 'none',
                        fontSize: '0.83rem', color: '#EF4444', cursor: 'pointer',
                        borderTop: '1px solid #E2E8F0', transition: 'background 0.12s',
                      }}
                        onMouseEnter={e => e.currentTarget.style.background = '#FEF2F2'}
                        onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                      >
                        <LogOut size={14} /> Logout
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <>
                  <button className="btn btn-outline-dark btn-sm" onClick={login}>Login</button>
                  <button className="btn btn-primary btn-sm" onClick={login}>Sign Up</button>
                </>
              )}
            </div>

            <button className="hide-desktop" onClick={() => setMobileOpen(true)} style={{
              background: 'transparent', border: '1.5px solid #E2E8F0', cursor: 'pointer',
              color: '#374151', padding: '0.375rem', borderRadius: '0px',
              display: 'flex', alignItems: 'center',
            }}>
              <Menu size={20} />
            </button>
          </div>
        </div>

        {searchOpen && (
          <div style={{
            position: 'absolute', top: '100%', left: 0, right: 0, zIndex: 200,
            background: '#fff', borderBottom: '1px solid #E2E8F0',
            padding: '0.875rem 1.5rem', boxShadow: '0 4px 16px rgba(0,0,0,0.06)',
            animation: 'fadeIn 0.18s ease',
          }}>
            <form onSubmit={handleSearch} style={{
              display: 'flex', gap: '0.75rem', alignItems: 'center',
              border: '1.5px solid var(--primary)', borderRadius: '0px',
              padding: '0.5rem 1rem', background: '#fff',
            }}>
              <Search size={16} color="var(--primary)" style={{ flexShrink: 0 }} />
              <input ref={searchRef} type="text" value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search fresh vegetables, herbs, roots..."
                style={{ flex: 1, border: 'none', outline: 'none', fontSize: '0.9rem', color: '#0A0F1E', background: 'transparent' }}
              />
              <button type="button" onClick={() => setSearchOpen(false)} style={{
                background: 'transparent', border: 'none', cursor: 'pointer', color: '#94A3B8',
                display: 'flex', alignItems: 'center', padding: '0.1rem',
              }}>
                <X size={16} />
              </button>
            </form>
          </div>
        )}
      </header>

      {mobileOpen && (
        <div className="overlay" style={{ justifyContent: 'flex-start' }} onClick={() => setMobileOpen(false)}>
          <div className="animate-slideInLeft" style={{
            width: '280px', height: '100%', background: '#fff',
            padding: '0', overflowY: 'auto', display: 'flex', flexDirection: 'column',
          }} onClick={e => e.stopPropagation()}>
            <div style={{
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              padding: '1.25rem 1.25rem', borderBottom: '1px solid #E2E8F0',
            }}>
              <span style={{ fontWeight: 800, fontSize: '1.1rem', color: '#0A0F1E', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <img src="/images/logo.png" alt="Aamir Vegetables Logo" style={{ height: '28px', objectFit: 'contain' }} />
                Aamir <span style={{ color: 'var(--primary)' }}>Vegetables</span>
              </span>
              <button onClick={() => setMobileOpen(false)} style={{
                background: '#F1F5F9', border: 'none', cursor: 'pointer', color: '#374151',
                padding: '0.35rem', borderRadius: '0px', display: 'flex',
              }}>
                <X size={18} />
              </button>
            </div>

            {isLoggedIn ? (
              <div style={{
                display: 'flex', alignItems: 'center', gap: '0.75rem',
                padding: '1rem 1.25rem', borderBottom: '1px solid #E2E8F0',
                background: '#F8FAFF',
              }}>
                <div style={{
                  width: '38px', height: '38px', borderRadius: '0px',
                  background: 'var(--primary)', display: 'flex', alignItems: 'center',
                  justifyContent: 'center', color: '#fff', fontWeight: 800, fontSize: '0.8rem',
                }}>{user.initials}</div>
                <div>
                  <p style={{ fontWeight: 700, fontSize: '0.875rem', color: '#0A0F1E' }}>{user.name}</p>
                  <p style={{ fontSize: '0.73rem', color: '#64748B' }}>Welcome back!</p>
                </div>
              </div>
            ) : (
              <div style={{ display: 'flex', gap: '0.5rem', padding: '1rem 1.25rem', borderBottom: '1px solid #E2E8F0' }}>
                <button className="btn btn-outline btn-sm" onClick={() => { login(); setMobileOpen(false) }} style={{ flex: 1 }}>Login</button>
                <button className="btn btn-primary btn-sm" onClick={() => { login(); setMobileOpen(false) }} style={{ flex: 1 }}>Sign Up</button>
              </div>
            )}

            <div style={{ display: 'flex', flexDirection: 'column', padding: '0.5rem 0.75rem', flex: 1 }}>
              {navLinks.map(link => (
                <Link key={link.label} to={link.path}
                  style={{
                    padding: '0.75rem 0.75rem', borderRadius: '0px', fontSize: '0.875rem',
                    fontWeight: 600, color: isActive(link.path) ? 'var(--primary)' : '#374151',
                    background: isActive(link.path) ? 'var(--primary-light)' : 'transparent',
                    marginBottom: '0.125rem', transition: 'all 0.12s',
                  }}
                  onClick={() => setMobileOpen(false)}
                >{link.label}</Link>
              ))}

              {isLoggedIn && (
                <div style={{ display: 'flex', flexDirection: 'column', borderTop: '1px solid #E2E8F0', paddingTop: '0.5rem', marginTop: '0.5rem' }}>
                  <p style={{ fontSize: '0.7rem', fontWeight: 800, color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.05em', padding: '0.25rem 0.75rem' }}>User Account</p>
                  {[{ icon: LayoutDashboard, label: 'Dashboard' }, { icon: UserCircle, label: 'Profile' }].map(item => (
                    <button key={item.label} style={{
                      display: 'flex', alignItems: 'center', gap: '0.5rem',
                      padding: '0.65rem 0.75rem', background: 'transparent', border: 'none',
                      fontSize: '0.875rem', color: '#374151', cursor: 'pointer',
                      fontWeight: 600, width: '100%', textAlign: 'left',
                    }}
                      onClick={() => setMobileOpen(false)}
                    >
                      <item.icon size={15} color="#64748B" /> {item.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {isLoggedIn && (
              <div style={{ padding: '0.75rem 1.25rem', borderTop: '1px solid #E2E8F0' }}>
                <button onClick={() => { logout(); setMobileOpen(false) }} style={{
                  display: 'flex', alignItems: 'center', gap: '0.5rem',
                  width: '100%', padding: '0.65rem 0.75rem', borderRadius: '0px',
                  background: 'transparent', border: 'none', fontSize: '0.875rem',
                  color: '#EF4444', fontWeight: 600, cursor: 'pointer',
                }}>
                  <LogOut size={15} /> Logout
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {cartOpen && <CartDrawer onClose={() => setCartOpen(false)} />}
    </>
  )
}
