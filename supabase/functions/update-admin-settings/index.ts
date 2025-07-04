
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  return new Response(JSON.stringify({ 
    message: "Admin settings functionality has been simplified"
  }), {
    status: 200,
    headers: { "Content-Type": "application/json", ...corsHeaders },
  });
};

serve(handler);
