import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { CheckCircle, CreditCard, Smartphone, Truck } from 'lucide-react'
import { useCart } from '../context/AppContext'
import ProductImage from '../components/ProductImage'

export default function Checkout() {
  const navigate = useNavigate()
  const { items, cartTotal, clearCart } = useCart()
  const [payMethod, setPayMethod] = useState('card')
  const [detecting, setDetecting] = useState(false)
  const [form, setForm] = useState({
    firstName: '', lastName: '', email: '', phone: '',
    address1: '', address2: '', city: '', state: '', pincode: '', country: 'India',
    cardNumber: '', expiry: '', cvv: '', upiId: '',
  })

  const shipping = cartTotal > 500 ? 0 : 99
  const gst = Math.round(cartTotal * 0.05) // 5% GST for fresh produce
  const total = cartTotal + shipping + gst

  const fc = (field) => (e) => setForm(f => ({ ...f, [field]: e.target.value }))

  const handleOrder = () => { 
    if (!form.firstName || !form.phone || !form.address1) {
      alert('Please fill in required fields (First Name, Phone, and Address).')
      return
    }
    clearCart()
    navigate('/order-success', { state: { payMethod, total } }) 
  }

  const detectLocation = () => {
    setDetecting(true)
    setTimeout(() => {
      setForm(f => ({
        ...f,
        address1: 'Farmhouse Society Road, Sector 18',
        city: 'Noida',
        state: 'Uttar Pradesh',
        pincode: '201301',
      }))
      setDetecting(false)
    }, 1200)
  }

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem 1.5rem' }}>
      <h1 style={{ fontWeight: 900, fontSize: '1.75rem', marginBottom: '2rem', color: '#0F172A', letterSpacing: '-0.03em' }}>Checkout</h1>
      
      <div className="responsive-flex" style={{ display: 'flex', gap: '2rem', alignItems: 'flex-start', flexWrap: 'wrap' }}>
        {/* Left Side: Live Location + Unified Details Form */}
        <div style={{ flex: '1.8 1 480px', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          
          {/* Live Location Selector */}
          <div style={{ background: '#FFFFFF', border: '1px solid var(--border-dark)', padding: '1.5rem', borderRadius: '0px' }}>
            <h2 style={{ fontWeight: 800, fontSize: '1.1rem', color: '#0F172A', marginBottom: '0.75rem' }}>📍 Delivery Location</h2>
            <p style={{ fontSize: '0.82rem', color: '#64748B', marginBottom: '1rem' }}>
              We can automatically detect your live location to fill out your delivery address.
            </p>
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
              <button 
                type="button"
                className="btn btn-outline" 
                onClick={detectLocation} 
                disabled={detecting}
                style={{ padding: '0.6rem 1.25rem', cursor: 'pointer' }}
              >
                {detecting ? 'Detecting Location...' : 'Detect My Live Location'}
              </button>
              {form.city && (
                <span style={{ fontSize: '0.82rem', color: 'var(--primary)', fontWeight: 700 }}>
                  ✓ Location Loaded: Noida, UP
                </span>
              )}
            </div>
          </div>

          {/* Unified Customer & Shipping Details Form */}
          <div style={{ background: '#FFFFFF', border: '1px solid var(--border-dark)', padding: '1.5rem', borderRadius: '0px' }}>
            <h2 style={{ fontWeight: 800, fontSize: '1.1rem', color: '#0F172A', marginBottom: '1.25rem' }}>Customer & Shipping Details</h2>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div className="grid-2-col" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                <div>
                  <label style={{ fontSize: '0.75rem', fontWeight: 700, color: '#475569', display: 'block', marginBottom: '0.35rem', textTransform: 'uppercase' }}>First Name *</label>
                  <input className="input" placeholder="Rahul" value={form.firstName} onChange={fc('firstName')} required />
                </div>
                <div>
                  <label style={{ fontSize: '0.75rem', fontWeight: 700, color: '#475569', display: 'block', marginBottom: '0.35rem', textTransform: 'uppercase' }}>Last Name</label>
                  <input className="input" placeholder="Sharma" value={form.lastName} onChange={fc('lastName')} />
                </div>
              </div>

              <div className="grid-2-col" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                <div>
                  <label style={{ fontSize: '0.75rem', fontWeight: 700, color: '#475569', display: 'block', marginBottom: '0.35rem', textTransform: 'uppercase' }}>Email Address</label>
                  <input className="input" type="email" placeholder="rahul@email.com" value={form.email} onChange={fc('email')} />
                </div>
                <div>
                  <label style={{ fontSize: '0.75rem', fontWeight: 700, color: '#475569', display: 'block', marginBottom: '0.35rem', textTransform: 'uppercase' }}>Phone Number *</label>
                  <input className="input" type="tel" placeholder="+91 98765 43210" value={form.phone} onChange={fc('phone')} required />
                </div>
              </div>

              <div>
                <label style={{ fontSize: '0.75rem', fontWeight: 700, color: '#475569', display: 'block', marginBottom: '0.35rem', textTransform: 'uppercase' }}>Delivery Address *</label>
                <input className="input" placeholder="Street address, Apartment, Suite, etc." value={form.address1} onChange={fc('address1')} required style={{ marginBottom: '0.5rem' }} />
                <input className="input" placeholder="Landmark, Floor, Suite (Optional)" value={form.address2} onChange={fc('address2')} />
              </div>

              <div className="grid-2-col" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                <div>
                  <label style={{ fontSize: '0.75rem', fontWeight: 700, color: '#475569', display: 'block', marginBottom: '0.35rem', textTransform: 'uppercase' }}>City</label>
                  <input className="input" placeholder="Noida" value={form.city} onChange={fc('city')} />
                </div>
                <div>
                  <label style={{ fontSize: '0.75rem', fontWeight: 700, color: '#475569', display: 'block', marginBottom: '0.35rem', textTransform: 'uppercase' }}>State</label>
                  <input className="input" placeholder="Uttar Pradesh" value={form.state} onChange={fc('state')} />
                </div>
              </div>

              <div className="grid-2-col" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                <div>
                  <label style={{ fontSize: '0.75rem', fontWeight: 700, color: '#475569', display: 'block', marginBottom: '0.35rem', textTransform: 'uppercase' }}>Pincode</label>
                  <input className="input" placeholder="201301" value={form.pincode} onChange={fc('pincode')} />
                </div>
                <div>
                  <label style={{ fontSize: '0.75rem', fontWeight: 700, color: '#475569', display: 'block', marginBottom: '0.35rem', textTransform: 'uppercase' }}>Country</label>
                  <input className="input" placeholder="India" value={form.country} onChange={fc('country')} />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Payment Methods & Order Summary */}
        <div style={{ flex: '1.2 1 340px', display: 'flex', flexDirection: 'column', gap: '1.5rem' }} className="sticky-desktop">
          
          {/* Direct Payment Method Selector */}
          <div style={{ background: '#FFFFFF', border: '1px solid var(--border-dark)', padding: '1.5rem', borderRadius: '0px' }}>
            <h2 style={{ fontWeight: 800, fontSize: '1.1rem', color: '#0F172A', marginBottom: '1.25rem' }}>Payment Method</h2>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
              {[
                { id: 'card', icon: CreditCard, label: 'Credit / Debit Card', sub: 'Visa, Mastercard, RuPay' },
                { id: 'upi',  icon: Smartphone, label: 'UPI Payment',         sub: 'GPay, PhonePe, BHIM' },
                { id: 'cod',  icon: Truck,       label: 'Cash on Delivery',   sub: 'Pay when you receive' },
              ].map(opt => (
                <div key={opt.id}>
                  <div className={`radio-card${payMethod === opt.id ? ' selected' : ''}`}
                    onClick={() => setPayMethod(opt.id)}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.875rem' }}>
                      <input type="radio" name="pay" checked={payMethod === opt.id}
                        onChange={() => setPayMethod(opt.id)} style={{ accentColor: 'var(--primary)' }} />
                      <div style={{
                        width: '38px', height: '38px', borderRadius: '0px',
                        background: payMethod === opt.id ? 'var(--primary)' : '#F1F5F9',
                        display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                        transition: 'background 0.15s',
                      }}>
                        <opt.icon size={18} color={payMethod === opt.id ? '#fff' : '#64748B'} />
                      </div>
                      <div>
                        <p style={{ fontWeight: 700, fontSize: '0.875rem', color: '#0F172A' }}>{opt.label}</p>
                        <p style={{ fontSize: '0.72rem', color: '#64748B' }}>{opt.sub}</p>
                      </div>
                    </div>
                  </div>
                  {payMethod === 'card' && opt.id === 'card' && (
                    <div style={{ padding: '1rem', background: '#F8FAFF', borderRadius: '0px', border: '1px solid #E2E8F0', borderTop: 'none', display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
                      <input className="input" placeholder="Card Number (16 digits)" value={form.cardNumber} onChange={fc('cardNumber')} />
                      <div className="grid-2-col" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.625rem' }}>
                        <input className="input" placeholder="MM / YY" value={form.expiry} onChange={fc('expiry')} />
                        <input className="input" placeholder="CVV" type="password" value={form.cvv} onChange={fc('cvv')} />
                      </div>
                    </div>
                  )}
                  {payMethod === 'upi' && opt.id === 'upi' && (
                    <div style={{ padding: '1rem', background: '#F8FAFF', borderRadius: '0px', border: '1px solid #E2E8F0', borderTop: 'none' }}>
                      <input className="input" placeholder="Enter UPI ID (e.g. name@upi)" value={form.upiId} onChange={fc('upiId')} />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Order Summary */}
          <div style={{ background: '#FFFFFF', border: '1px solid var(--border-dark)', borderRadius: '0px', overflow: 'hidden' }}>
            <div style={{ padding: '1rem 1.25rem', borderBottom: '1px solid var(--border-dark)', background: '#F8FAFF' }}>
              <h2 style={{ fontWeight: 800, fontSize: '0.95rem', color: '#0F172A' }}>Order Summary</h2>
            </div>
            <div style={{ padding: '1.25rem' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.625rem', marginBottom: '1rem', maxHeight: '200px', overflowY: 'auto' }}>
                {items.map(item => (
                  <div key={item.id} style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                    <div style={{ width: '42px', height: '42px', borderRadius: '0px', overflow: 'hidden', flexShrink: 0 }}>
                      <ProductImage product={item} height={42} borderRadius="0px" />
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <p style={{ fontSize: '0.77rem', fontWeight: 700, color: '#0F172A', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{item.name}</p>
                      <p style={{ fontSize: '0.72rem', color: '#64748B' }}>Qty: {item.qty} | Weight: {item.selectedSize || '500g'}</p>
                    </div>
                    <p style={{ fontWeight: 800, fontSize: '0.82rem', color: 'var(--primary)', flexShrink: 0 }}>₹{(item.price*item.qty).toLocaleString()}</p>
                  </div>
                ))}
              </div>
              <div style={{ height: '1px', background: '#E2E8F0', marginBottom: '0.875rem' }} />
              {[
                { l: 'Subtotal', v: `₹${cartTotal.toLocaleString()}` },
                { l: 'GST (5%)', v: `₹${gst.toLocaleString()}` },
                { l: 'Delivery Charges', v: shipping === 0 ? 'FREE' : `₹${shipping}`, g: shipping === 0 },
              ].map(r => (
                <div key={r.l} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', color: '#64748B', marginBottom: '0.4rem' }}>
                  <span>{r.l}</span>
                  <span style={{ color: r.g ? '#10B981' : undefined, fontWeight: r.g ? 800 : undefined }}>{r.v}</span>
                </div>
              ))}
              <div style={{ height: '1px', background: '#E2E8F0', margin: '0.5rem 0' }} />
              <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 900, fontSize: '1rem', color: '#0F172A' }}>
                <span>Total</span>
                <span style={{ color: 'var(--primary)' }}>₹{total.toLocaleString()}</span>
              </div>

              <button className="btn btn-primary btn-lg btn-full" style={{ marginTop: '1.5rem', cursor: 'pointer' }} onClick={handleOrder}>
                Place Order (₹{total.toLocaleString()})
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
