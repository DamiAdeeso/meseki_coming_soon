'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function Home() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  const [displayTime, setDisplayTime] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  const [email, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState('')
  const [showCountdown, setShowCountdown] = useState(false)

  useEffect(() => {
    // Set launch date (you can modify this)
    const launchDate = new Date('2025-10-18T00:00:00Z').getTime()

    // Calculate initial countdown values
    const calculateTimeLeft = () => {
      const now = new Date().getTime()
      const difference = launchDate - now

      if (difference > 0) {
        return {
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        }
      } else {
        return { days: 0, hours: 0, minutes: 0, seconds: 0 }
      }
    }

    // Set initial values
    const initialTime = calculateTimeLeft()
    setTimeLeft(initialTime)

    // Start the roll-up animation after a short delay
    const runUpTimer = setTimeout(() => {
      setShowCountdown(true)
      
      // Animate each number from 0 to target value
      const animateNumber = (target: number, setter: (value: number) => void, duration: number = 2000) => {
        const startTime = Date.now()
        const animate = () => {
          const elapsed = Date.now() - startTime
          const progress = Math.min(elapsed / duration, 1)
          const easeOut = 1 - Math.pow(1 - progress, 3) // Cubic ease-out
          const current = Math.floor(easeOut * target)
          setter(current)
          
          if (progress < 1) {
            requestAnimationFrame(animate)
          }
        }
        animate()
      }

      // Animate each countdown value
      animateNumber(initialTime.days, (value) => setDisplayTime(prev => ({ ...prev, days: value })), 2000)
      animateNumber(initialTime.hours, (value) => setDisplayTime(prev => ({ ...prev, hours: value })), 2000)
      animateNumber(initialTime.minutes, (value) => setDisplayTime(prev => ({ ...prev, minutes: value })), 2000)
      animateNumber(initialTime.seconds, (value) => setDisplayTime(prev => ({ ...prev, seconds: value })), 2000)
    }, 1000)

    // Regular countdown updates - start immediately but update display smoothly
    const timer = setInterval(() => {
      const newTime = calculateTimeLeft()
      setTimeLeft(newTime)
      
      // Smooth transition to real values after animation
      setTimeout(() => {
        setDisplayTime(newTime)
      }, 2000) // Wait for animation to complete
    }, 1000)

    return () => {
      clearInterval(timer)
      clearTimeout(runUpTimer)
    }
  }, [])

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black relative overflow-hidden">
      {/* Background Image - you can replace this with your custom background */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-30 transition-opacity duration-500"
        style={{
          backgroundImage: `
            url('/images/desktop-bg-optimized.webp'),
            url('/images/desktop-bg-fallback.jpg')
          `,
          zIndex: 1
        }}
      />
      {/* Mobile Background */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-30 md:hidden transition-opacity duration-500"
        style={{
          backgroundImage: `
            url('/images/mobile-bg-optimized.webp'),
            url('/images/mobile-bg-fallback.jpg')
          `,
          zIndex: 1
        }}
      />
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50" />
      
      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 text-center">
        {/* Logo/Brand Name */}
        <div className="mb-3 md:mb-6">
          <h1 className="text-4xl md:text-6xl font-bold mb-1 md:mb-3 tracking-wider" style={{ color: '#f5f3f2' }}>
            MESEKI
          </h1>
          <div className="w-24 h-1 mx-auto" style={{ backgroundColor: '#f5f3f2' }}></div>
        </div>

        {/* Coming Soon Text */}
        <div className="mb-4 md:mb-8">
          <h2 className="text-lg md:text-2xl font-light mb-1 md:mb-3" style={{ color: '#f5f3f2' }}>
            Coming Soon
          </h2>
          <p className="text-sm md:text-lg max-w-2xl mx-auto leading-relaxed" style={{ color: '#f5f3f2' }}>
            We're crafting something extraordinary. A new era of fashion is about to begin.
          </p>
        </div>


         {/* Countdown Timer */}
         <div className="mb-4 md:mb-8">
           {/* Mobile: Single line without boxes */}
           <div className="md:hidden text-center">
             <div className="relative">
               <div className="text-4xl font-bold mb-2 tracking-wider" style={{ color: '#f5f3f2' }}>
                 <span className="inline-block min-w-[3rem] text-center">
                   {showCountdown ? displayTime.days.toString().padStart(2, '0') : '00'}
                 </span>
                 <span className="mx-2" style={{ color: '#f5f3f2' }}>:</span>
                 <span className="inline-block min-w-[3rem] text-center">
                   {showCountdown ? displayTime.hours.toString().padStart(2, '0') : '00'}
                 </span>
                 <span className="mx-2" style={{ color: '#f5f3f2' }}>:</span>
                 <span className="inline-block min-w-[3rem] text-center">
                   {showCountdown ? displayTime.minutes.toString().padStart(2, '0') : '00'}
                 </span>
                 <span className="mx-2" style={{ color: '#f5f3f2' }}>:</span>
                 <span className="inline-block min-w-[3rem] text-center">
                   {showCountdown ? displayTime.seconds.toString().padStart(2, '0') : '00'}
                 </span>
               </div>
               <div className="text-xs uppercase tracking-[0.2em] font-light mb-1" style={{ color: '#f5f3f2' }}>
                 <span className="inline-block min-w-[3rem] text-center">Days</span>
                 <span className="mx-2 opacity-0">:</span>
                 <span className="inline-block min-w-[3rem] text-center">Hours</span>
                 <span className="mx-2 opacity-0">:</span>
                 <span className="inline-block min-w-[3rem] text-center">Minutes</span>
                 <span className="mx-2 opacity-0">:</span>
                 <span className="inline-block min-w-[3rem] text-center">Seconds</span>
               </div>
             </div>
           </div>
           
           {/* Desktop: Grid with boxes */}
           <div className="hidden md:grid grid-cols-4 gap-4">
             <div className="bg-white/10 backdrop-blur-sm border-2 border-white/20 rounded-xl p-4">
               <div className="text-4xl font-bold mb-1" style={{ color: '#f5f3f2' }}>
                 {showCountdown ? displayTime.days.toString().padStart(2, '0') : '00'}
               </div>
               <div className="text-sm uppercase tracking-wide" style={{ color: '#f5f3f2' }}>
                 Days
               </div>
             </div>
             <div className="bg-white/10 backdrop-blur-sm border-2 border-white/20 rounded-xl p-4">
               <div className="text-4xl font-bold mb-1" style={{ color: '#f5f3f2' }}>
                 {showCountdown ? displayTime.hours.toString().padStart(2, '0') : '00'}
               </div>
               <div className="text-sm uppercase tracking-wide" style={{ color: '#f5f3f2' }}>
                 Hours
               </div>
             </div>
             <div className="bg-white/10 backdrop-blur-sm border-2 border-white/20 rounded-xl p-4">
               <div className="text-4xl font-bold mb-1" style={{ color: '#f5f3f2' }}>
                 {showCountdown ? displayTime.minutes.toString().padStart(2, '0') : '00'}
               </div>
               <div className="text-sm uppercase tracking-wide" style={{ color: '#f5f3f2' }}>
                 Minutes
               </div>
             </div>
             <div className="bg-white/10 backdrop-blur-sm border-2 border-white/20 rounded-xl p-4">
               <div className="text-4xl font-bold mb-1" style={{ color: '#f5f3f2' }}>
                 {showCountdown ? displayTime.seconds.toString().padStart(2, '0') : '00'}
               </div>
               <div className="text-sm uppercase tracking-wide" style={{ color: '#f5f3f2' }}>
                 Seconds
               </div>
             </div>
           </div>
         </div>

         {/* Email Signup */}
         <div className="mb-4 md:mb-8 max-w-md w-full">
           <form onSubmit={handleEmailSubmit} className="flex flex-col sm:flex-row gap-4">
             <input
               type="email"
               value={email}
               onChange={(e) => setEmail(e.target.value)}
               placeholder="Enter your email"
               required
               className="flex-1 px-4 py-3 bg-white/10 backdrop-blur-sm border-2 border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent"
               style={{ color: '#f5f3f2' }}
             />
             <button 
               type="submit"
               disabled={isSubmitting}
               className="px-8 py-3 font-semibold border-2 rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
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
               {isSubmitting ? 'Submitting...' : 'Notify Me'}
             </button>
           </form>
           {submitStatus && (
             <p className="mt-3 text-sm" style={{ color: submitStatus.includes('Thank you') ? '#10b981' : '#ef4444' }}>
               {submitStatus}
             </p>
           )}
         </div>

         {/* Interactive Section */}
         <div className="mb-3 md:mb-6 max-w-2xl mx-auto">
           <div className="text-center mb-3 md:mb-4">
             <h3 className="text-sm md:text-lg font-semibold mb-1 md:mb-2" style={{ color: '#f5f3f2' }}>
               Already Live on Social Media
             </h3>
             <p className="text-xs md:text-sm" style={{ color: '#f5f3f2' }}>
               While we're preparing for our official website launch, you can already interact with us and place orders through our social media channels.
             </p>
           </div>
           {/* Desktop only badges */}
           <div className="hidden md:flex flex-col sm:flex-row gap-2 justify-center mb-4">
             <div className="flex items-center justify-center p-2 bg-white/10 rounded-lg">
               <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24" style={{ color: '#d4b8a3' }}>
                 <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
               </svg>
               <span className="text-xs" style={{ color: '#f5f3f2' }}>Orders Available</span>
             </div>
             <div className="flex items-center justify-center p-2 bg-white/10 rounded-lg">
               <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24" style={{ color: '#d4b8a3' }}>
                 <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
               </svg>
               <span className="text-xs" style={{ color: '#f5f3f2' }}>Early Access</span>
             </div>
             <div className="flex items-center justify-center p-2 bg-white/10 rounded-lg">
               <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24" style={{ color: '#d4b8a3' }}>
                 <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 11H7v-2h10v2z"/>
               </svg>
               <span className="text-xs" style={{ color: '#f5f3f2' }}>Special Offers</span>
             </div>
           </div>
         </div>

         {/* Social Links */}
         <div className="flex gap-6 justify-center">
           <a href="mailto:info@meseki.com" className="p-3 transition-colors duration-200 hover:opacity-70" style={{ color: '#f5f3f2' }}>
             <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
               <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
             </svg>
           </a>
           <a href="https://instagram.com/shopmeseki" target="_blank" rel="noopener noreferrer" className="p-3 transition-colors duration-200 hover:opacity-70" style={{ color: '#f5f3f2' }}>
             <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
               <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
             </svg>
           </a>
           <a href="https://tiktok.com/@shopmeseki" target="_blank" rel="noopener noreferrer" className="p-3 transition-colors duration-200 hover:opacity-70" style={{ color: '#f5f3f2' }}>
             <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
               <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
             </svg>
           </a>
         </div>
      </div>
    </div>
  )
}