import React, { useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { CheckCircle, Package, Truck, MapPin } from 'lucide-react'

function getOrderNum() { return Math.floor(1000 + Math.random() * 9000) }
function addDays(d, n) {
  const r = new Date(d); r.setDate(r.getDate() + n)
  return r.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })
}

export default function OrderSuccess() {
  const navigate = useNavigate()
  const location = useLocation()
  const [orderNum] = useState(getOrderNum)
  const [ready, setReady] = useState(false)
  const today = new Date()
  const payMethod = location.state?.payMethod || 'card'
  const total = location.state?.total || 0
  const payLabel = payMethod==='card'?'Credit/Debit Card':payMethod==='upi'?'UPI':'Cash on Delivery'

  useEffect(() => { const t = setTimeout(() => setReady(true), 80); return () => clearTimeout(t) }, [])

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '3rem 1.5rem', minHeight: '65vh' }}>
      <div style={{ maxWidth: '540px', width: '100%' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{
            width: '88px', height: '88px', borderRadius: '16px',
            background: '#ECFDF5', border: '2px solid #10B981',
            display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.25rem',
            transform: ready ? 'scale(1)' : 'scale(0)',
            transition: 'transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)',
          }}>
            <CheckCircle size={44} color="#10B981" />
          </div>
          <h1 style={{
            fontWeight: 900, fontSize: '1.625rem', color: '#0A0F1E', marginBottom: '0.5rem',
            letterSpacing: '-0.02em',
            opacity: ready ? 1 : 0, transform: ready ? 'translateY(0)' : 'translateY(8px)',
            transition: 'all 0.4s ease 0.25s',
          }}>Order Confirmed!</h1>
          <p style={{
            color: '#64748B', fontSize: '0.875rem',
            opacity: ready ? 1 : 0, transition: 'opacity 0.4s ease 0.4s',
          }}>
            Thank you, Rahul! Your order is confirmed and will be dispatched soon.
          </p>
        </div>

        <div style={{
          background: '#fff', border: '1px solid #E2E8F0', borderRadius: '10px',
          overflow: 'hidden', marginBottom: '1.5rem',
        }}>
          <div style={{ padding: '1rem 1.25rem', borderBottom: '1px solid #E2E8F0', background: 'var(--primary-light)' }}>
            <p style={{ fontWeight: 800, fontSize: '0.875rem', color: '#0A0F1E' }}>Order #SB-2026-{orderNum}</p>
          </div>
          <div style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {[
              { label: 'Order Date', val: today.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }) },
              { label: 'Payment', val: payLabel },
              { label: 'Estimated Delivery', val: `${addDays(today, 3)} – ${addDays(today, 5)}` },
            ].map(row => (
              <div key={row.label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.82rem', color: '#64748B' }}>{row.label}</span>
                <span style={{ fontSize: '0.875rem', fontWeight: 700, color: '#0A0F1E' }}>{row.val}</span>
              </div>
            ))}
            <div style={{ height: '1px', background: '#E2E8F0', margin: '0.1rem 0' }} />
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '0.875rem', fontWeight: 700, color: '#0A0F1E' }}>Total Paid</span>
              <span style={{ fontSize: '1.1rem', fontWeight: 900, color: 'var(--primary)' }}>₹{total.toLocaleString()}</span>
            </div>
          </div>
        </div>

        <div style={{ background: 'var(--primary-light)', border: '1px solid #E2E8F0', borderRadius: '10px', padding: '1rem 1.25rem', marginBottom: '1.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            {[
              { icon: CheckCircle, label: 'Confirmed', color: 'var(--primary)' },
              { icon: Package,     label: 'Processing', color: 'var(--primary)' },
              { icon: Truck,       label: 'Shipped', color: '#94A3B8' },
              { icon: MapPin,      label: 'Delivered', color: '#94A3B8' },
            ].map((s, i) => (
              <React.Fragment key={s.label}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.375rem' }}>
                  <div className="tracking-bubble" style={{
                    width: '36px', height: '36px', borderRadius: '50%',
                    background: i < 2 ? s.color : '#F1F5F9',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    border: `2px solid ${i < 2 ? s.color : '#E2E8F0'}`,
                  }}>
                    <s.icon size={16} color={i < 2 ? '#fff' : '#94A3B8'} />
                  </div>
                  <span className="tracking-label" style={{ fontSize: '0.67rem', fontWeight: 700, color: i < 2 ? '#0A0F1E' : '#94A3B8', textAlign: 'center' }}>{s.label}</span>
                </div>
                {i < 3 && <div className="tracking-line" style={{ flex: 1, height: '2px', background: i < 1 ? 'var(--primary)' : '#E2E8F0', margin: '0 0.25rem' }} />}
              </React.Fragment>
            ))}
          </div>
        </div>

        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
          <button className="btn btn-primary btn-lg" onClick={() => navigate('/track-order')} style={{ flex: 1 }}>
            Track My Order
          </button>
          <button className="btn btn-outline btn-lg" onClick={() => navigate('/shop')} style={{ flex: 1 }}>
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
  )
}
