import React from 'react'
import {
  Leaf, Wind, Flame, Star, Snowflake, Package
} from 'lucide-react'

const iconMap = {
  'Fresh Vegetables': { icon: Leaf,      bg: '#10B981' },
  'Root Vegetables':  { icon: Snowflake, bg: '#D97706' },
  'Leafy Vegetables': { icon: Wind,      bg: '#059669' },
  'Spices & Herbs':   { icon: Flame,     bg: '#65A30D' },
  'Exotic Veggies':   { icon: Star,      bg: '#8B5CF6' },
}

export default function ProductImage({ product, height = 128, borderRadius = '0', className = '' }) {
  const catInfo = iconMap[product.category]
  const bg = catInfo ? catInfo.bg : 'var(--primary)'
  const Icon = catInfo ? catInfo.icon : Package

  if (product.image) {
    return (
      <div className={className} style={{
        height: `${height}px`,
        width: '100%',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        borderRadius: borderRadius, flexShrink: 0,
        overflow: 'hidden',
        background: '#fff',
      }}>
        <img 
          src={product.image} 
          alt={product.name}
          style={{
            width: '100%', height: '100%', objectFit: 'contain',
            transition: 'transform 0.3s ease',
            padding: '1rem'
          }}
          onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'}
          onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
        />
      </div>
    )
  }

  return (
    <div className={className} style={{
      height: `${height}px`,
      background: bg,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      borderRadius: borderRadius, flexShrink: 0,
    }}>
      <Icon size={Math.round(height * 0.36)} color="rgba(255,255,255,0.88)" />
    </div>
  )
}
