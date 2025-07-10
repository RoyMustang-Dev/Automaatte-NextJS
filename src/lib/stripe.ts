import { loadStripe } from '@stripe/stripe-js'

const stripePublishableKey = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || 'pk_test_your_key'

export const stripe = await loadStripe(stripePublishableKey)

export const createCheckoutSession = async (priceId: string, mode: 'payment' | 'subscription' = 'subscription') => {
  try {
    const response = await fetch('/api/create-checkout-session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        priceId,
        mode,
        successUrl: `${window.location.origin}/success`,
        cancelUrl: `${window.location.origin}/pricing`,
      }),
    })

    const session = await response.json()
    
    if (stripe) {
      const { error } = await stripe.redirectToCheckout({
        sessionId: session.id,
      })
      
      if (error) {
        console.error('Stripe checkout error:', error)
      }
    }
  } catch (error) {
    console.error('Error creating checkout session:', error)
  }
}

// UPI Payment Integration for Indian customers
export const createUPIPayment = async (amount: number, currency: 'INR' = 'INR') => {
  try {
    const response = await fetch('/api/create-upi-payment', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        amount: amount * 100, // Convert to paise
        currency,
        payment_method_types: ['upi'],
        successUrl: `${window.location.origin}/success`,
        cancelUrl: `${window.location.origin}/pricing`,
      }),
    })

    const paymentIntent = await response.json()
    return paymentIntent
  } catch (error) {
    console.error('Error creating UPI payment:', error)
    throw error
  }
}