'use client'

import Link from 'next/link'
import { useState } from 'react'

export default function MyLinks() {
  const [email, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState('')
  const [showModal, setShowModal] = useState(false)

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return

    setIsSubmitting(true)
    setSubmitStatus('')

    try {
      // Send to our server-side API route
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      })

      const result = await response.json()

      if (result.success) {
        setSubmitStatus('Thank you! We\'ll notify you when we launch.')
        setEmail('')
      } else {
        setSubmitStatus('Something went wrong. Please try again.')
      }
    } catch (error) {
      setSubmitStatus('Something went wrong. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const links = [
    {
      title: 'Instagram',
      description: 'Follow us for the latest fashion updates',
      url: 'https://instagram.com/shopmeseki',
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
        </svg>
      ),
      color: 'from-pink-500 to-purple-600'
    },
    {
      title: 'TikTok',
      description: 'Watch our fashion content and behind-the-scenes',
      url: 'https://tiktok.com/@shopmeseki',
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
        </svg>
      ),
      color: 'from-black to-gray-800'
    },
    {
      title: 'Facebook',
      description: 'Follow us for the latest updates and news',
      url: 'https://facebook.com/shopmeseki',
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
        </svg>
      ),
      color: 'from-blue-600 to-blue-800'
    },
    {
      title: 'Email Newsletter',
      description: 'Get exclusive updates and early access',
      url: '#',
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
        </svg>
      ),
      color: 'from-gray-600 to-gray-800',
      isModal: true
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black relative overflow-hidden">
      {/* Background Image - you can replace this with your custom background */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
        style={{
          backgroundImage: "url('/images/desktop-bg.png')"
        }}
      />
      {/* Mobile Background */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20 md:hidden"
        style={{
          backgroundImage: "url('/images/mobile-bg.png')"
        }}
      />
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60" />
      
      {/* Content */}
      <div className="relative z-10 min-h-screen px-4 py-8">
        {/* Header */}
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <Link 
              href="/"
              className="text-2xl md:text-3xl font-bold transition-colors duration-200 hover:opacity-70"
              style={{ color: '#f5f3f2' }}
            >
              MESEKI
            </Link>
            <Link 
              href="/"
              className="transition-colors duration-200 hover:opacity-70"
              style={{ color: '#f5f3f2' }}
            >
              ← Back to Home
            </Link>
          </div>

          {/* Page Title */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-bold mb-4" style={{ color: '#f5f3f2' }}>
              Connect With Us
            </h1>
            <p className="text-lg md:text-xl max-w-2xl mx-auto" style={{ color: '#f5f3f2' }}>
              Connect with us across all platforms and stay updated with the latest from Meseki
            </p>
          </div>

          {/* Links Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {links.map((link, index) => (
              <a
                key={index}
                href={link.url}
                target={link.isModal ? undefined : "_blank"}
                rel={link.isModal ? undefined : "noopener noreferrer"}
                onClick={link.isModal ? (e) => { 
                  e.preventDefault(); 
                  console.log('Modal clicked, setting showModal to true');
                  setShowModal(true); 
                } : undefined}
                className="group relative bg-white/10 backdrop-blur-sm border-2 border-white/20 rounded-xl p-6 hover:border-white/40 transition-all duration-300 hover:scale-105"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${link.color} opacity-0 group-hover:opacity-10 rounded-xl transition-opacity duration-300`} />
                
                <div className="relative z-10">
                  <div className="flex items-center mb-4">
                    <div className={`p-3 rounded-lg bg-gradient-to-br ${link.color} text-white mr-4`}>
                      {link.icon}
                    </div>
                    <h3 className="text-xl font-semibold" style={{ color: '#f5f3f2' }}>
                      {link.title}
                    </h3>
                  </div>
                  
                   <p className="text-sm leading-relaxed" style={{ color: '#f5f3f2' }}>
                    {link.description}
                  </p>
                  
                  <div className="mt-4 flex items-center transition-colors duration-200 group-hover:opacity-70" style={{ color: '#f5f3f2' }}>
                    <span className="text-sm">Visit Link</span>
                    <svg className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </div>
                </div>
              </a>
            ))}
          </div>


          {/* Contact Section */}
          <div className="mt-16 text-center">
             <div className="bg-white/5 backdrop-blur-sm border-2 border-white/20 rounded-xl p-8">
              <h3 className="text-2xl font-semibold mb-4" style={{ color: '#f5f3f2' }}>
                Get in Touch
              </h3>
               <p className="mb-6" style={{ color: '#f5f3f2' }}>
                Have questions or want to collaborate? We'd love to hear from you.
              </p>
              <a 
                href="mailto:info@meseki.com"
                className="inline-flex items-center px-6 py-3 font-semibold border-2 rounded-lg transition-colors duration-200"
                style={{ color: '#f5f3f2', backgroundColor: '#2d1a14', borderColor: '#d4b8a3' }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#d4b8a3'
                  e.currentTarget.style.borderColor = '#2a2a2a'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#2d1a14'
                  e.currentTarget.style.borderColor = '#d4b8a3'
                }}
              >
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                </svg>
                Contact Us
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Newsletter Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white/10 backdrop-blur-sm border-2 border-white/20 rounded-xl p-8 max-w-md w-full">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-semibold" style={{ color: '#f5f3f2' }}>
                Newsletter Signup
              </h3>
              <button
                onClick={() => setShowModal(false)}
                className="text-white/70 hover:text-white transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <p className="mb-6" style={{ color: '#f5f3f2' }}>
              Subscribe to our newsletter for exclusive updates and early access to new collections.
            </p>
            
            <form onSubmit={handleEmailSubmit} className="space-y-4">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border-2 border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent"
                style={{ color: '#f5f3f2' }}
              />
              <button 
                type="submit"
                disabled={isSubmitting}
                className="w-full px-6 py-3 font-semibold border-2 rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                style={{ color: '#f5f3f2', backgroundColor: '#2d1a14', borderColor: '#d4b8a3' }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#d4b8a3'
                  e.currentTarget.style.borderColor = '#2a2a2a'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#2d1a14'
                  e.currentTarget.style.borderColor = '#d4b8a3'
                }}
              >
                {isSubmitting ? 'Subscribing...' : 'Subscribe'}
              </button>
            </form>
            
            {submitStatus && (
              <p className="mt-4 text-sm" style={{ color: submitStatus.includes('Thank you') ? '#10b981' : '#ef4444' }}>
                {submitStatus}
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
