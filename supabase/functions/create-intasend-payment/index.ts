
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? ''
    );

    const authHeader = req.headers.get('Authorization')!;
    const token = authHeader.replace('Bearer ', '');
    const { data } = await supabaseClient.auth.getUser(token);
    const user = data.user;

    if (!user) {
      throw new Error('Unauthorized');
    }

    const { amount, currency = 'KES', orderId, customerInfo } = await req.json();

    const intasendToken = Deno.env.get('INTASEND_API_TOKEN');
    const intasendPublishableKey = Deno.env.get('INTASEND_API_PUBLISHABLE_KEY');

    if (!intasendToken || !intasendPublishableKey) {
      throw new Error('IntaSend API credentials not configured');
    }

    console.log('Creating IntaSend payment for order:', orderId);

    // Create payment request with IntaSend
    const paymentData = {
      public_key: intasendPublishableKey,
      amount: amount,
      currency: currency,
      method: ['MPESA', 'CARD', 'BANK'], // Add payment methods
      api_ref: `order_${orderId}`,
      email: customerInfo.email,
      first_name: customerInfo.first_name,
      last_name: customerInfo.last_name,
      phone_number: customerInfo.phone,
      redirect_url: `${req.headers.get('origin')}/checkout?status=success&order_id=${orderId}`,
    };

    const response = await fetch('https://payment.intasend.com/api/v1/payment/collection/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-IntaSend-Public-API-Key': intasendPublishableKey,
      },
      body: JSON.stringify(paymentData),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('IntaSend API error:', errorText);
      throw new Error(`IntaSend API error: ${response.status}`);
    }

    const result = await response.json();
    console.log('IntaSend payment created:', result);

    return new Response(JSON.stringify(result), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error creating IntaSend payment:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});
