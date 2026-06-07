import React, { useState } from 'react'
import { MapPin, Phone, Mail, Send, CheckCircle } from 'lucide-react'

export default function Contact() {
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', message: '' })

  const handleSubmit = (e) => {
    e.preventDefault()
    if (form.name && form.email && form.message) {
      setSubmitted(true)
      setForm({ name: '', email: '', message: '' })
    }
  }

  return (
    <div style={{ background: '#FFFFFF', padding: '4rem 1.5rem' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <span style={{
            color: 'var(--primary)',
            fontWeight: 800,
            textTransform: 'uppercase',
            letterSpacing: '0.15rem',
            fontSize: '0.8rem'
          }}>
            Get In Touch
          </span>
          <h1 style={{
            fontSize: '2.5rem',
            fontWeight: 900,
            color: '#0F172A',
            marginTop: '0.5rem',
            letterSpacing: '-0.03em'
          }}>
            Contact Aamir Vegetables
          </h1>
          <p style={{ color: '#475569', fontSize: '1rem', marginTop: '0.5rem' }}>
            We would love to hear from you. Please reach out with any questions or comments.
          </p>
        </div>

        <div className="responsive-flex" style={{ display: 'flex', gap: '3rem', flexWrap: 'wrap' }}>
          {/* Contact Details & Map */}
          <div style={{ flex: '1 1 400px', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <div>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#0F172A', marginBottom: '1.25rem' }}>
                Contact Information
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {[
                  { icon: MapPin, label: 'Address', text: '116, Aamir Vegetable, APMC, Anand' },
                  { icon: Phone, label: 'Phone', text: '+91 97372 00794, 98255 25041, 99987 61995' },
                  { icon: Mail, label: 'Email', text: 'support@aamirvegetables.com' }
                ].map((item, i) => (
                  <div key={i} style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                    <div style={{
                      width: '42px',
                      height: '42px',
                      background: 'var(--primary-light)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderRadius: '0px'
                    }}>
                      <item.icon size={18} color="var(--primary)" />
                    </div>
                    <div>
                      <p style={{ fontSize: '0.75rem', fontWeight: 700, color: '#94A3B8', textTransform: 'uppercase' }}>{item.label}</p>
                      <p style={{ fontSize: '0.95rem', fontWeight: 600, color: '#0F172A' }}>{item.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Map wrapper */}
            <div style={{
              height: '280px',
              border: '1px solid var(--border-dark)',
              background: '#F8FAFF',
              position: 'relative',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              textAlign: 'center',
              padding: '1rem'
            }}>
              {/* Styled Mock Map */}
              <div style={{
                position: 'absolute', inset: 0, opacity: 0.15,
                backgroundImage: 'radial-gradient(circle, #10B981 10%, transparent 11%), radial-gradient(circle, #34D399 10%, transparent 11%)',
                backgroundSize: '20px 20px', backgroundPosition: '0 0, 10px 10px'
              }} />
              <MapPin size={40} color="var(--primary)" style={{ position: 'relative', zIndex: 1, marginBottom: '0.75rem' }} />
              <h4 style={{ position: 'relative', zIndex: 1, fontWeight: 800, color: '#0F172A' }}>Find us in APMC, Anand</h4>
              <p style={{ position: 'relative', zIndex: 1, fontSize: '0.8rem', color: '#475569', maxWidth: '300px', marginTop: '0.25rem' }}>
                Visit our wholesale and retail store at APMC Anand for the freshest quality.
              </p>
              <a href="https://maps.google.com" target="_blank" rel="noreferrer" className="btn btn-outline btn-sm" style={{ position: 'relative', zIndex: 1, marginTop: '1rem' }}>
                Open Google Maps
              </a>
            </div>
          </div>

          {/* Form */}
          <div style={{ flex: '1 1 400px', background: '#F8FAFF', border: '1px solid var(--border-dark)', padding: '2.5rem' }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#0F172A', marginBottom: '1.25rem' }}>
              Send us a Message
            </h2>
            {submitted ? (
              <div style={{ textAlign: 'center', padding: '2rem 0' }}>
                <CheckCircle size={48} color="var(--primary)" style={{ margin: '0 auto 1rem' }} />
                <h3 style={{ fontWeight: 800, color: '#0F172A' }}>Message Sent!</h3>
                <p style={{ color: '#475569', fontSize: '0.9rem', marginTop: '0.5rem' }}>
                  Thank you for reaching out. Our team will get back to you shortly.
                </p>
                <button className="btn btn-primary btn-sm" style={{ marginTop: '1.5rem' }} onClick={() => setSubmitted(false)}>
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#475569', textTransform: 'uppercase', marginBottom: '0.4rem' }}>Your Name</label>
                  <input className="input" placeholder="John Doe" required value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#475569', textTransform: 'uppercase', marginBottom: '0.4rem' }}>Your Email</label>
                  <input className="input" type="email" placeholder="john@example.com" required value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#475569', textTransform: 'uppercase', marginBottom: '0.4rem' }}>Message</label>
                  <textarea className="input" rows={5} placeholder="How can we help you?" required style={{ resize: 'vertical' }} value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} />
                </div>
                <button type="submit" className="btn btn-primary btn-full" style={{ padding: '0.75rem' }}>
                  Send Message <Send size={15} />
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
