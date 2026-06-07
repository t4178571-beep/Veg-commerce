import React, { useState } from 'react'
import { Search, CheckCircle, Package } from 'lucide-react'

const trackingSteps = [
  { label: 'Order Placed', time: 'Jun 7, 2026 — 08:30 AM', status: 'done' },
  { label: 'Processing', time: 'Jun 7, 2026 — 11:00 AM', status: 'done' },
  { label: 'Shipped', time: 'Jun 8, 2026 — 09:15 AM', status: 'active' },
  { label: 'Out for Delivery', time: 'Estimated: Jun 10, 2026', status: 'inactive' },
  { label: 'Delivered', time: 'Estimated: Jun 11, 2026', status: 'inactive' },
]

export default function TrackOrder() {
  const [orderId, setOrderId] = useState('')
  const [email, setEmail] = useState('')
  const [tracked, setTracked] = useState(false)

  const handleTrack = (e) => {
    e.preventDefault()
    if (orderId || email) setTracked(true)
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'center', padding: '2.5rem 1.5rem' }}>
      <div style={{ maxWidth: '520px', width: '100%' }}>
        <h1 style={{ fontWeight: 800, fontSize: '1.75rem', color: '#1A1A2E', marginBottom: '0.5rem', textAlign: 'center' }}>
          Track Your Order
        </h1>
        <p style={{ textAlign: 'center', color: '#6B7280', marginBottom: '1.75rem', fontSize: '0.9rem' }}>
          Enter your order ID to track real-time status
        </p>

        <div className="card" style={{ padding: '1.5rem', marginBottom: '1.5rem' }}>
          <form onSubmit={handleTrack} style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
            <input
              className="input"
              placeholder="Order ID (e.g. SB-2026-1234)"
              value={orderId}
              onChange={e => setOrderId(e.target.value)}
            />
            <input
              className="input"
              type="email"
              placeholder="Billing Email"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
            <button type="submit" className="btn btn-primary btn-full btn-lg">
              <Search size={16} /> Track Now
            </button>
          </form>
        </div>

        {tracked && (
          <div className="card animate-fadeIn" style={{ padding: '1.5rem' }}>
            <div style={{
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              marginBottom: '1.25rem', flexWrap: 'wrap', gap: '0.5rem',
            }}>
              <div>
                <p style={{ fontWeight: 700, fontSize: '0.95rem', color: '#1A1A2E' }}>
                  #{orderId || 'SB-2026-1234'}
                </p>
                <p style={{ fontSize: '0.8rem', color: '#6B7280' }}>Placed on Jun 7, 2026</p>
              </div>
              <span className="badge badge-blue" style={{ padding: '0.35rem 0.875rem', fontSize: '0.8rem' }}>
                Shipped
              </span>
            </div>

            <div style={{ paddingLeft: '0.5rem' }}>
              {trackingSteps.map((step, i) => (
                <div
                  key={step.label}
                  className={`tracking-step ${step.status}`}
                >
                  <div className={`tracking-icon ${step.status}`}>
                    {step.status === 'done' ? (
                      <CheckCircle size={16} />
                    ) : step.status === 'active' ? (
                      <div className="pulse-dot" />
                    ) : (
                      <Package size={14} />
                    )}
                  </div>
                  <div>
                    <p style={{
                      fontWeight: 600, fontSize: '0.875rem',
                      color: step.status === 'inactive' ? '#9CA3AF' : '#1A1A2E',
                    }}>{step.label}</p>
                    <p style={{ fontSize: '0.775rem', color: '#9CA3AF', marginTop: '0.1rem' }}>{step.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
