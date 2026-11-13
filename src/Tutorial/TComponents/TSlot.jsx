import React, { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Calendar,
  Clock,
  MapPin,
  Users,
  Sparkles,
  Trophy,
  Star,
  Loader2,
  AlertCircle,
  CalendarCheck,
  Zap,
  Award,
  X
} from 'lucide-react'
import { Tutorial_Base } from '../../../baseURL'

function FloatingParticle({ delay, x, y }) {
  return (
    <motion.div
      className="absolute w-2 h-2 rounded-full bg-gradient-to-r from-orange-400 to-amber-400 opacity-60 pointer-events-none"
      style={{ left: `${x}%`, top: `${y}%` }}
      animate={{ y: [0, -30, 0], x: [0, 10, -10, 0], opacity: [0.4, 0.8, 0.4], scale: [1, 1.4, 1] }}
      transition={{ duration: 3 + (delay % 2), delay, repeat: Infinity, ease: 'easeInOut' }}
    />
  )
}

export default function TSlot({ userId, technologyId, technologyName, onClose }) {
  const [slots, setSlots] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [selectedSlot, setSelectedSlot] = useState(null)
  const [booking, setBooking] = useState(false)
  const [booked, setBooked] = useState(false)
  const [alreadyBooked, setAlreadyBooked] = useState(false)
  const [bookingError, setBookingError] = useState(null)

  const particles = [
    { id: 0, delay: 0, x: 10, y: 15 }, { id: 1, delay: 0.4, x: 25, y: 60 },
    { id: 2, delay: 0.8, x: 42, y: 30 }, { id: 3, delay: 1.2, x: 60, y: 70 },
    { id: 4, delay: 1.6, x: 75, y: 20 }, { id: 5, delay: 2.0, x: 88, y: 55 },
    { id: 6, delay: 0.6, x: 55, y: 10 }, { id: 7, delay: 1.4, x: 18, y: 80 }
  ]

  const fetchSlots = useCallback(async () => {
    if (!technologyId) return
    try {
      setLoading(true)
      setError(null)
      const res = await fetch(`${Tutorial_Base}/slotBooking/available?technologyId=${technologyId}`)
      if (!res.ok) throw new Error(`Failed to load slots (HTTP ${res.status})`)
      const data = await res.json()
      setSlots(Array.isArray(data) ? data : [])
    } catch (err) {
      setError(err.message || 'Could not load available slots.')
    } finally {
      setLoading(false)
    }
  }, [technologyId])

  useEffect(() => { fetchSlots() }, [fetchSlots])

  const handleBookSlot = async () => {
    if (!selectedSlot || booking) return
    try {
      setBooking(true)
      setBookingError(null)
      const res = await fetch(`${Tutorial_Base}/slotBooking/book`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: Number(userId), slotId: selectedSlot.slotId })
      })
      if (!res.ok) {
        const responseText = await res.text().catch(() => '')
        let errorMsg = responseText
        try {
          const parsed = JSON.parse(responseText)
          errorMsg = parsed.message || parsed.error || responseText
        } catch (e) {
          // response text is plain text
        }

        const lowerMsg = (errorMsg || '').toLowerCase()
        // Check if message indicates slot was already booked
        if (lowerMsg.includes('already booked') || lowerMsg.includes('booked')) {
          setAlreadyBooked(true)
          return
        }
        throw new Error(errorMsg || `Booking failed (HTTP ${res.status})`)
      }
      setBooked(true)
    } catch (err) {
      const errLower = (err.message || '').toLowerCase()
      if (errLower.includes('already booked') || errLower.includes('booked')) {
        setAlreadyBooked(true)
      } else {
        setBookingError(err.message || 'Failed to book slot. Please try again.')
      }
    } finally {
      setBooking(false)
    }
  }

  const formatDate = (dateStr) => {
    if (!dateStr) return ''
    return new Date(dateStr).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
  }

  const formatTime = (timeStr) => {
    if (!timeStr) return ''
    const [h, m] = timeStr.split(':')
    const hour = parseInt(h)
    return `${hour % 12 || 12}:${m} ${hour >= 12 ? 'PM' : 'AM'}`
  }

  // Already booked screen
  if (alreadyBooked) {
    return (
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
        className="relative overflow-hidden min-h-[320px]">
        {particles.map((p) => <FloatingParticle key={p.id} {...p} />)}
        <div className="text-center space-y-5 py-8 relative z-10">
          <motion.div
            initial={{ scale: 0 }} animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 200, damping: 14, delay: 0.1 }}
            className="relative mx-auto w-20 h-20"
          >
            <div className="absolute inset-0 rounded-full bg-blue-400/20 blur-xl animate-pulse" />
            <div className="relative w-20 h-20 rounded-full bg-gradient-to-br from-blue-400 to-indigo-500 flex items-center justify-center shadow-xl">
              <CalendarCheck className="w-10 h-10 text-white" />
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="space-y-2">
            <h2 className="text-xl font-extrabold text-slate-800">Slot Already Booked!</h2>
            <p className="text-slate-500 text-sm max-w-xs mx-auto leading-relaxed">
              You have already booked a slot for this exam. No further action is needed.
            </p>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-50 border border-blue-200 text-blue-700 text-xs font-bold">
            <CalendarCheck className="w-3.5 h-3.5" />
            Your booking is confirmed — check My Slots in the header
          </motion.div>
          {onClose && (
            <motion.button initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }} onClick={onClose}
              className="mt-2 px-8 py-2.5 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-bold text-sm transition-all shadow-lg cursor-pointer">
              Back to Tutorial
            </motion.button>
          )}
        </div>
      </motion.div>
    )
  }

  if (booked) {
    return (
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="relative overflow-hidden min-h-[400px]">
        {particles.map((p) => <FloatingParticle key={p.id} {...p} />)}
        <div className="text-center space-y-5 py-6 relative z-10">
          <motion.div
            initial={{ scale: 0, rotate: -20 }} animate={{ scale: 1, rotate: 0 }}
            transition={{ type: 'spring', stiffness: 200, damping: 12, delay: 0.1 }}
            className="relative mx-auto w-24 h-24"
          >
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 opacity-20 blur-xl animate-pulse" />
            <div className="relative w-24 h-24 rounded-full bg-gradient-to-br from-amber-400 via-orange-500 to-rose-500 flex items-center justify-center shadow-2xl">
              <Trophy className="w-12 h-12 text-white" />
            </div>
            <motion.div animate={{ rotate: 360 }} transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
              className="absolute -inset-2 rounded-full border-2 border-dashed border-amber-400/40" />
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
            className="flex items-center justify-center gap-1">
            {[0,1,2,3,4].map((i) => (
              <motion.div key={i} initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.4 + i * 0.08, type: 'spring' }}>
                <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
              </motion.div>
            ))}
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="space-y-2">
            <h2 className="text-2xl font-extrabold bg-gradient-to-r from-orange-600 via-amber-500 to-rose-500 bg-clip-text text-transparent">
              Congratulations!
            </h2>
            <p className="text-slate-700 font-semibold text-base">Your Final Exam Slot Has Been Booked!</p>
            <p className="text-slate-500 text-sm max-w-xs mx-auto leading-relaxed">
              You've completed all levels and your final exam slot is confirmed. Best of luck!
            </p>
          </motion.div>

          {selectedSlot && (
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.55 }}
              className="bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-200 rounded-2xl p-5 text-left space-y-3 mx-auto max-w-sm">
              <div className="flex items-center gap-2 text-emerald-700 font-bold text-sm border-b border-emerald-200/60 pb-2.5">
                <CalendarCheck className="w-4 h-4" /> Booking Confirmed
              </div>
              <div className="space-y-2.5 text-xs text-slate-700">
                <div className="flex items-center gap-2.5"><Calendar className="w-4 h-4 text-orange-500 shrink-0" /><span className="font-semibold">{formatDate(selectedSlot.slotDate)}</span></div>
                <div className="flex items-center gap-2.5"><Clock className="w-4 h-4 text-orange-500 shrink-0" /><span className="font-semibold">{formatTime(selectedSlot.slotTime)}</span></div>
                <div className="flex items-center gap-2.5"><MapPin className="w-4 h-4 text-orange-500 shrink-0" /><span className="font-semibold">{selectedSlot.centerLocation}</span></div>
              </div>
            </motion.div>
          )}

          {onClose && (
            <motion.button initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }} onClick={onClose}
              className="px-8 py-3 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-bold text-sm transition-all shadow-lg hover:shadow-xl cursor-pointer">
              Back to Tutorial
            </motion.button>
          )}
        </div>
      </motion.div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="relative overflow-hidden bg-gradient-to-r from-orange-400 via-amber-500 to-orange-500 rounded-2xl p-5 text-white text-center">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-2 left-4 w-8 h-8 rounded-full bg-white animate-ping" style={{ animationDuration: '3s' }} />
          <div className="absolute top-3 right-6 w-5 h-5 rounded-full bg-white animate-ping" style={{ animationDelay: '1s', animationDuration: '3.5s' }} />
          <div className="absolute bottom-2 left-1/3 w-6 h-6 rounded-full bg-white animate-ping" style={{ animationDelay: '0.5s', animationDuration: '2.8s' }} />
        </div>
        <div className="relative z-10 space-y-1">
          <div className="flex items-center justify-center gap-2 mb-2">
            {/* <Award className="w-6 h-6" /><Sparkles className="w-5 h-5" /><Award className="w-6 h-6" /> */}
          </div>
          <h2 className="text-xl font-extrabold tracking-tight">All Levels Completed!</h2>
          <p className="text-white/85 text-xs font-medium">
            You have mastered{technologyName ? ` ${technologyName}` : ''} — book your Final Exam slot below
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <CalendarCheck className="w-5 h-5 text-orange-500" />
        <div>
          <h3 className="font-bold text-slate-900 text-sm">Book Your Final Exam Slot</h3>
          <p className="text-xs text-slate-500">Select an available slot and confirm your booking</p>
        </div>
      </div>

      {loading && (
        <div className="flex items-center justify-center py-10 gap-3 text-slate-400 text-sm">
          <Loader2 className="w-5 h-5 animate-spin text-orange-500" /> Loading available slots...
        </div>
      )}

      {error && !loading && (
        <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-xl text-red-600 text-xs font-semibold">
          <AlertCircle className="w-4 h-4 shrink-0" /> {error}
          <button onClick={fetchSlots} className="ml-auto underline text-red-700 cursor-pointer">Retry</button>
        </div>
      )}

      {!loading && !error && slots.length === 0 && (
        <div className="text-center py-10 space-y-2">
          <Calendar className="w-10 h-10 text-slate-300 mx-auto" />
          <p className="text-slate-500 text-sm font-medium">No slots available at the moment</p>
          <p className="text-slate-400 text-xs">Please check back later or contact support</p>
        </div>
      )}

      {!loading && !error && slots.length > 0 && (
        <div className="space-y-3">
          {slots.map((slot) => {
            const isSelected = selectedSlot?.slotId === slot.slotId
            const isFull = slot.seatsLeft <= 0
            const fillPercent = Math.min(100, Math.round((slot.bookedCount / slot.capacity) * 100))

            return (
              <motion.button
                key={slot.slotId} type="button" disabled={isFull}
                onClick={() => !isFull && setSelectedSlot(slot)}
                whileHover={!isFull ? { scale: 1.01 } : {}}
                whileTap={!isFull ? { scale: 0.99 } : {}}
                className={`w-full text-left rounded-2xl border-2 p-4 transition-all relative overflow-hidden ${
                  isFull ? 'bg-slate-50 border-slate-200 opacity-60 cursor-not-allowed'
                  : isSelected ? 'bg-gradient-to-r from-orange-50 to-amber-50 border-orange-500 shadow-md ring-2 ring-orange-400/20 cursor-pointer'
                  : 'bg-white border-slate-200 hover:border-orange-300 hover:bg-orange-50/30 hover:shadow-sm cursor-pointer'
                }`}
              >
                {isSelected && <div className="absolute inset-0 bg-gradient-to-r from-orange-400/5 to-amber-400/5 pointer-events-none" />}
                <div className="flex items-start justify-between gap-3 relative z-10">
                  <div className="space-y-2 flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
                      <span className="flex items-center gap-1.5 font-bold text-slate-900 text-sm">
                        <Calendar className="w-4 h-4 text-orange-500 shrink-0" />{formatDate(slot.slotDate)}
                      </span>
                      <span className="flex items-center gap-1.5 font-semibold text-slate-700 text-sm">
                        <Clock className="w-4 h-4 text-orange-500 shrink-0" />{formatTime(slot.slotTime)}
                      </span>
                    </div>
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-600">
                      <span className="flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-orange-400 shrink-0" /><span className="font-semibold">{slot.centerLocation}</span>
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Users className="w-3.5 h-3.5 text-orange-400 shrink-0" /><span>{slot.seatsLeft} / {slot.capacity} seats left</span>
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-2 shrink-0">
                    {isFull ? (
                      <span className="px-2.5 py-1 rounded-full bg-slate-200 text-slate-500 text-[10px] font-bold uppercase tracking-wider">Full</span>
                    ) : slot.seatsLeft <= 2 ? (
                      <span className="px-2.5 py-1 rounded-full bg-red-100 text-red-600 text-[10px] font-bold uppercase tracking-wider flex items-center gap-1">
                        <Zap className="w-3 h-3" />Almost Full
                      </span>
                    ) : (
                      <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-700 text-[10px] font-bold uppercase tracking-wider">Available</span>
                    )}
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                      isSelected ? 'border-orange-500 bg-orange-500' : 'border-slate-300 bg-white'
                    }`}>
                      {isSelected && <div className="w-2 h-2 bg-white rounded-full" />}
                    </div>
                  </div>
                </div>
                <div className="mt-3 relative z-10">
                  <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                    <motion.div initial={{ width: 0 }} animate={{ width: `${fillPercent}%` }}
                      transition={{ duration: 0.8, ease: 'easeOut' }}
                      className={`h-full rounded-full ${isFull ? 'bg-slate-400' : slot.seatsLeft <= 2 ? 'bg-red-400' : 'bg-emerald-500'}`}
                    />
                  </div>
                  <div className="flex justify-between mt-1 text-[10px] text-slate-400">
                    <span>{slot.bookedCount} booked</span><span>{slot.capacity} total</span>
                  </div>
                </div>
              </motion.button>
            )
          })}
        </div>
      )}

      <AnimatePresence>
        {bookingError && (
          <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
            className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-xl text-red-600 text-xs font-semibold">
            <AlertCircle className="w-4 h-4 shrink-0" />{bookingError}
            <button onClick={() => setBookingError(null)} className="ml-auto cursor-pointer"><X className="w-4 h-4" /></button>
          </motion.div>
        )}
      </AnimatePresence>

      {!loading && slots.length > 0 && (
        <button type="button" onClick={handleBookSlot} disabled={!selectedSlot || booking}
          className={`w-full py-3.5 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 shadow-lg ${
            !selectedSlot || booking
              ? 'bg-slate-200 text-slate-400 cursor-not-allowed shadow-none'
              : 'bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white hover:shadow-xl active:scale-[0.98] cursor-pointer'
          }`}
        >
          {booking ? (
            <><Loader2 className="w-4 h-4 animate-spin" />Confirming Booking...</>
          ) : (
            <><CalendarCheck className="w-4 h-4" />{selectedSlot ? 'Confirm Slot Booking' : 'Select a Slot to Continue'}</>
          )}
        </button>
      )}
    </div>
  )
}