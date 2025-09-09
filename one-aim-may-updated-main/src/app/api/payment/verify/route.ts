import { NextRequest, NextResponse } from 'next/server';
import { verifyPayment } from '../actions';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = body;
    
    if (!razorpay_payment_id || !razorpay_order_id || !razorpay_signature) {
      return NextResponse.json(
        { error: 'Missing required parameters' },
        { status: 400 }
      );
    }
    
    // Verify the payment
    const result = await verifyPayment(
      razorpay_payment_id,
      razorpay_order_id,
      razorpay_signature
    );
    
    return NextResponse.json(result);
  } catch (error) {
    console.error('Payment verification error:', error);
    return NextResponse.json(
      { error: 'Payment verification failed' },
      { status: 500 }
    );
  }
}