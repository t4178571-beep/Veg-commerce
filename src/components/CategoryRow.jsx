import React from 'react'
import { Leaf, Wind, Flame, Star, Snowflake, Shield } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const iconMap = { Leaf, Wind, Flame, Star, Snowflake, Shield }

const categoriesData = [
  { name: 'Fresh Vegetables', icon: 'Leaf',      bg: '#10B981', image: '/images/products/peas.webp' },
  { name: 'Root Vegetables',  icon: 'Snowflake', bg: '#D97706', image: '/images/products/potato.jfif' },
  { name: 'Leafy Vegetables', icon: 'Wind',      bg: '#059669', image: '/images/products/Spinach.webp' },
  { name: 'Spices & Herbs',   icon: 'Flame',     bg: '#65A30D', image: '/images/products/Green Chili.jpg' },
  { name: 'Exotic Veggies',   icon: 'Star',      bg: '#8B5CF6', image: '/images/products/Pumpkin.webp' },
]

export default function CategoryRow() {
  const navigate = useNavigate()

  return (
    <div style={{ borderBottom: '1px solid #F1F5F9', background: '#fff' }}>
      <div
        className="scrollbar-hide"
        style={{ display: 'flex', overflowX: 'auto', padding: '0.875rem 1.5rem', gap: '1.25rem', alignItems: 'center', justifyContent: 'center' }}
      >
        {categoriesData.map(cat => {
          const Icon = iconMap[cat.icon]
          return (
            <button
              key={cat.name}
              onClick={() => navigate(`/shop?category=${encodeURIComponent(cat.name)}`)}
              style={{
                display: 'flex', flexDirection: 'column', alignItems: 'center',
                gap: '0.45rem', border: 'none', background: 'transparent',
                cursor: 'pointer', minWidth: '80px', padding: '0.25rem 0.5rem',
                borderRadius: '0px', transition: 'background 0.15s',
              }}
              onMouseEnter={e => e.currentTarget.style.background = 'var(--primary-light)'}
              onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
            >
              <div style={{
                width: '52px', height: '52px', borderRadius: '0px',
                background: cat.image ? '#fff' : cat.bg,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexShrink: 0, transition: 'transform 0.2s ease',
                overflow: 'hidden',
                padding: cat.image ? '0.2rem' : '0',
                border: cat.image ? '1px solid #E2E8F0' : 'none'
              }}
                onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.08)'}
                onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
              >
                {cat.image ? (
                  <img src={cat.image} alt={cat.name} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                ) : (
                  Icon && <Icon size={24} color="#fff" />
                )}
              </div>
              <span style={{
                fontSize: '0.72rem', color: '#475569', fontWeight: 600,
                textAlign: 'center', lineHeight: 1.3, whiteSpace: 'nowrap',
              }}>
                {cat.name}
              </span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
