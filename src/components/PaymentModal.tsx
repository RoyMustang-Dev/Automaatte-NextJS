import React, { useState } from 'react'
import { X, CreditCard, Smartphone, IndianRupee, DollarSign } from 'lucide-react'
import { createCheckoutSession, createUPIPayment } from '../lib/stripe'

interface PaymentModalProps {
  isOpen: boolean
  onClose: () => void
  plan: {
    name: string
    price: string
    priceId?: string
    features: string[]
  }
}

export const PaymentModal: React.FC<PaymentModalProps> = ({ isOpen, onClose, plan }) => {
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'upi'>('card')
  const [loading, setLoading] = useState(false)
  const [region, setRegion] = useState<'global' | 'india'>('global')

  if (!isOpen) return null

  const handlePayment = async () => {
    setLoading(true)
    
    try {
      if (paymentMethod === 'upi' && region === 'india') {
        // Convert USD to INR (approximate rate)
        const priceInINR = plan.price === '$29' ? 2400 : plan.price === '$99' ? 8200 : 0
        await createUPIPayment(priceInINR, 'INR')
      } else {
        // Use Stripe for card payments
        const priceId = plan.priceId || 'price_default'
        await createCheckoutSession(priceId)
      }
    } catch (error) {
      console.error('Payment error:', error)
      alert('Payment failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const getLocalizedPrice = () => {
    if (region === 'india') {
      return plan.price === '$29' ? '₹2,400' : plan.price === '$99' ? '₹8,200' : plan.price
    }
    return plan.price
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-slate-900 rounded-2xl border border-purple-500/20 p-8 w-full max-w-md relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-white mb-2">Complete Your Purchase</h2>
          <p className="text-gray-400">Subscribe to {plan.name} Plan</p>
        </div>

        <div className="bg-slate-800/50 rounded-lg p-6 mb-6">
          <div className="flex justify-between items-center mb-4">
            <span className="text-white font-semibold">{plan.name} Plan</span>
            <span className="text-2xl font-bold text-purple-400">{getLocalizedPrice()}/month</span>
          </div>
          <ul className="space-y-2">
            {plan.features.slice(0, 3).map((feature, index) => (
              <li key={index} className="text-gray-300 text-sm flex items-center">
                <div className="w-1.5 h-1.5 bg-purple-400 rounded-full mr-2"></div>
                {feature}
              </li>
            ))}
          </ul>
        </div>

        <div className="mb-6">
          <label className="block text-white font-semibold mb-3">Select Region</label>
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => setRegion('global')}
              className={`p-3 rounded-lg border transition-all ${
                region === 'global'
                  ? 'border-purple-400 bg-purple-500/20 text-white'
                  : 'border-gray-600 bg-slate-800 text-gray-300 hover:border-purple-500/50'
              }`}
            >
              <DollarSign className="w-5 h-5 mx-auto mb-1" />
              <span className="text-sm">Global (USD)</span>
            </button>
            <button
              onClick={() => setRegion('india')}
              className={`p-3 rounded-lg border transition-all ${
                region === 'india'
                  ? 'border-purple-400 bg-purple-500/20 text-white'
                  : 'border-gray-600 bg-slate-800 text-gray-300 hover:border-purple-500/50'
              }`}
            >
              <IndianRupee className="w-5 h-5 mx-auto mb-1" />
              <span className="text-sm">India (INR)</span>
            </button>
          </div>
        </div>

        <div className="mb-6">
          <label className="block text-white font-semibold mb-3">Payment Method</label>
          <div className="space-y-3">
            <button
              onClick={() => setPaymentMethod('card')}
              className={`w-full p-4 rounded-lg border transition-all flex items-center space-x-3 ${
                paymentMethod === 'card'
                  ? 'border-purple-400 bg-purple-500/20'
                  : 'border-gray-600 bg-slate-800 hover:border-purple-500/50'
              }`}
            >
              <CreditCard className="w-5 h-5 text-purple-400" />
              <div className="text-left">
                <div className="text-white font-medium">Credit/Debit Card</div>
                <div className="text-gray-400 text-sm">Visa, Mastercard, American Express</div>
              </div>
            </button>
            
            {region === 'india' && (
              <button
                onClick={() => setPaymentMethod('upi')}
                className={`w-full p-4 rounded-lg border transition-all flex items-center space-x-3 ${
                  paymentMethod === 'upi'
                    ? 'border-purple-400 bg-purple-500/20'
                    : 'border-gray-600 bg-slate-800 hover:border-purple-500/50'
                }`}
              >
                <Smartphone className="w-5 h-5 text-purple-400" />
                <div className="text-left">
                  <div className="text-white font-medium">UPI Payment</div>
                  <div className="text-gray-400 text-sm">PhonePe, Google Pay, Paytm</div>
                </div>
              </button>
            )}
          </div>
        </div>

        <button
          onClick={handlePayment}
          disabled={loading}
          className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-4 rounded-lg font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Processing...' : `Pay ${getLocalizedPrice()}`}
        </button>

        <p className="text-gray-400 text-xs text-center mt-4">
          Secure payment powered by Stripe. Cancel anytime.
        </p>
      </div>
    </div>
  )
}