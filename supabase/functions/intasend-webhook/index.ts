
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
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    const webhook = await req.json();
    console.log('IntaSend webhook received:', webhook);

    // Extract order ID from api_ref
    const apiRef = webhook.api_ref;
    const orderId = apiRef?.replace('order_', '');

    if (!orderId) {
      console.error('No order ID found in webhook');
      return new Response('No order ID found', { status: 400, headers: corsHeaders });
    }

    // Update order status based on payment status
    let orderStatus = 'pending';
    if (webhook.state === 'COMPLETE' || webhook.status === 'COMPLETE') {
      orderStatus = 'completed';
    } else if (webhook.state === 'FAILED' || webhook.status === 'FAILED') {
      orderStatus = 'failed';
    }

    // Update the order in the database
    const { error } = await supabaseClient
      .from('orders')
      .update({ 
        status: orderStatus,
        payment_reference: webhook.id || webhook.reference,
        updated_at: new Date().toISOString()
      })
      .eq('id', orderId);

    if (error) {
      console.error('Error updating order:', error);
      throw error;
    }

    console.log(`Order ${orderId} updated to status: ${orderStatus}`);

    return new Response(JSON.stringify({ success: true }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error: any) {
    console.error('Webhook error:', error);
    return new Response(
      JSON.stringify({ error: error?.message || 'Webhook processing failed' }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});
