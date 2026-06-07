import React from 'react'

export default function About() {
  return (
    <div style={{ background: '#FFFFFF', padding: '4rem 1.5rem' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
        <span style={{
          color: 'var(--primary)',
          fontWeight: 800,
          textTransform: 'uppercase',
          letterSpacing: '0.1em',
          fontSize: '0.85rem'
        }}>
          About Us
        </span>
        <h1 style={{
          fontSize: '2.5rem',
          fontWeight: 900,
          color: '#0F172A',
          marginTop: '0.5rem',
          marginBottom: '1.5rem',
          letterSpacing: '-0.03em'
        }}>
          Freshness Delivered Straight from Farms
        </h1>
        <p style={{
          color: '#475569',
          fontSize: '1.1rem',
          lineHeight: '1.8',
          marginBottom: '2rem'
        }}>
          Welcome to Aamir Vegetables, your number one source for all fresh vegetables. We are dedicated to providing you the very best of organic produce, with a focus on freshness, customer service, and direct farm sourcing.
        </p>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '2rem',
        maxWidth: '1000px',
        margin: '3rem auto 0'
      }}>
        {[
          { title: '100% Organic', desc: 'Our vegetables are grown without harmful pesticides using 100% organic and natural farming techniques.' },
          { title: 'Farm to Table', desc: 'We harvest our products daily and deliver them directly to your home within 12 hours of harvest.' },
          { title: 'Fair Pricing', desc: 'By cutting out middlemen, we ensure farmers get fair compensation and you get the best pricing.' }
        ].map((item, i) => (
          <div key={i} style={{
            background: 'var(--primary-light)',
            padding: '2rem 1.5rem',
            borderRadius: '0px',
            border: '1px solid var(--border-dark)',
            textAlign: 'center'
          }}>
            <h3 style={{ fontWeight: 800, color: 'var(--dark)', marginBottom: '0.75rem', fontSize: '1.15rem' }}>{item.title}</h3>
            <p style={{ color: '#475569', fontSize: '0.9rem', lineHeight: '1.6' }}>{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
