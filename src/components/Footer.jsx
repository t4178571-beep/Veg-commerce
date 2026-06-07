import React from 'react'
import { Link } from 'react-router-dom'
import {
  Globe, ShieldCheck, RotateCcw, Headphones,
  Share2, Heart, MessageCircle, Play,
  MapPin, Phone, Mail, ArrowRight
} from 'lucide-react'

export default function Footer() {
  return (
    <footer>
      <div style={{ background: '#fff', borderTop: '1px solid #E2E8F0', padding: '2rem 1.5rem' }}>
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '1.5rem', maxWidth: '1280px', margin: '0 auto',
        }}>
          {[
            { icon: Globe,       title: 'Worldwide Delivery',   sub: '200+ countries covered' },
            { icon: ShieldCheck, title: '100% Secure Payment',  sub: 'All popular methods' },
            { icon: RotateCcw,   title: 'Easy Returns',         sub: 'Within 60 days' },
            { icon: Headphones,  title: '24/7 Support',         sub: 'Reply within 24 hours' },
          ].map(item => (
            <div key={item.title} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.875rem' }}>
              <div style={{
                width: '44px', height: '44px', borderRadius: '0px',
                background: 'var(--primary-light)', border: '1px solid var(--primary)',
                display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
              }}>
                <item.icon size={20} color="var(--primary)" />
              </div>
              <div>
                <p style={{ fontWeight: 700, fontSize: '0.875rem', color: '#0F172A' }}>{item.title}</p>
                <p style={{ fontSize: '0.78rem', color: '#64748B', marginTop: '0.15rem' }}>{item.sub}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ background: '#0F172A', padding: '3rem 1.5rem 0' }}>
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(196px, 1fr))',
          gap: '2rem', maxWidth: '1280px', margin: '0 auto 2.5rem',
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', marginBottom: '0.875rem' }}>
              <img src="/images/logo.png" alt="Aamir Vegetables Logo" style={{ height: '36px', objectFit: 'contain' }} />
              <span style={{ fontWeight: 800, fontSize: '1.05rem', color: '#fff' }}>
                Aamir<span style={{ color: 'var(--primary)' }}>Vegetables</span>
              </span>
            </div>
            <p style={{ fontSize: '0.8rem', color: '#64748B', lineHeight: 1.7, marginBottom: '1.25rem', maxWidth: '220px' }}>
              Your trusted partner for fresh, farm-picked organic vegetables delivered right to your doorstep.
            </p>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              {[Share2, Heart, MessageCircle, Play].map((Icon, i) => (
                <button key={i} style={{
                  background: '#1E293B', border: '1px solid #334155',
                  borderRadius: '0px', width: '34px', height: '34px',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  cursor: 'pointer', transition: 'all 0.15s', color: '#64748B',
                }}
                  onMouseEnter={e => { e.currentTarget.style.background = 'var(--primary)'; e.currentTarget.style.borderColor = 'var(--primary)'; e.currentTarget.style.color = '#fff' }}
                  onMouseLeave={e => { e.currentTarget.style.background = '#1E293B'; e.currentTarget.style.borderColor = '#334155'; e.currentTarget.style.color = '#64748B' }}
                >
                  <Icon size={15} />
                </button>
              ))}
            </div>
          </div>

          <div>
            <h4 style={{ color: '#fff', fontWeight: 700, fontSize: '0.75rem', marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Quick Links</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {[
                { label: 'Home',        path: '/' },
                { label: 'Shop',        path: '/shop' },
                { label: 'Compare',     path: '/compare' },
                { label: 'Track Order', path: '/track-order' },
                { label: 'Wishlist',    path: '/wishlist' },
                { label: 'About Us',    path: '/about' },
                { label: 'Contact Us',  path: '/contact' },
              ].map(link => (
                <Link key={link.label} to={link.path} style={{
                  fontSize: '0.83rem', color: '#64748B', display: 'flex',
                  alignItems: 'center', gap: '0.3rem', transition: 'color 0.15s',
                }}
                  onMouseEnter={e => e.currentTarget.style.color = '#fff'}
                  onMouseLeave={e => e.currentTarget.style.color = '#64748B'}
                >
                  <ArrowRight size={11} /> {link.label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h4 style={{ color: '#fff', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', fontSize: '0.75rem', marginBottom: '1rem' }}>Contact</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {[
                { Icon: MapPin, text: '116, Aamir Vegetable, APMC, Anand' },
                { Icon: Phone,  text: '+91 97372 00794, 98255 25041, 99987 61995' },
                { Icon: Mail,   text: 'support@aamirvegetables.com' },
              ].map(({ Icon, text }, i) => (
                <div key={i} style={{ display: 'flex', gap: '0.625rem', alignItems: 'flex-start' }}>
                  <div style={{ width: '28px', height: '28px', borderRadius: '0px', background: '#1E293B', border: '1px solid #334155', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Icon size={13} color="var(--primary)" />
                  </div>
                  <span style={{ fontSize: '0.8rem', color: '#64748B', lineHeight: 1.5 }}>{text}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h4 style={{ color: '#fff', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', fontSize: '0.75rem', marginBottom: '0.5rem' }}>Newsletter</h4>
            <p style={{ fontSize: '0.8rem', color: '#64748B', marginBottom: '0.875rem', lineHeight: 1.6 }}>
              Get the best deals delivered to your inbox.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <input type="email" placeholder="your@email.com" style={{
                background: '#1E293B', border: '1px solid #334155',
                borderRadius: '0px', padding: '0.65rem 0.875rem',
                color: '#fff', fontSize: '0.83rem', outline: 'none', width: '100%',
                transition: 'border-color 0.15s',
              }}
                onFocus={e => e.currentTarget.style.borderColor = 'var(--primary)'}
                onBlur={e => e.currentTarget.style.borderColor = '#334155'}
              />
              <button className="btn btn-primary btn-full" style={{ borderRadius: '0px', fontSize: '0.83rem' }}>
                Subscribe
              </button>
            </div>
          </div>
        </div>

        <div style={{
          borderTop: '1px solid #1E293B',
          maxWidth: '1280px', margin: '0 auto',
          padding: '1.25rem 0.75rem',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.5rem',
        }}>
          <p style={{ fontSize: '0.78rem', color: '#475569' }}>
            © 2026 Aamir Vegetables. All rights reserved.
          </p>
          <div style={{ display: 'flex', gap: '1.25rem' }}>
            {['Privacy Policy', 'Terms of Service', 'Refund Policy'].map(t => (
              <a key={t} href="#" style={{ fontSize: '0.78rem', color: '#475569', transition: 'color 0.15s' }}
                onMouseEnter={e => e.currentTarget.style.color = '#fff'}
                onMouseLeave={e => e.currentTarget.style.color = '#475569'}
              >{t}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
