import { createClient } from '@supabase/supabase-js';
const supabaseUrl = 'https://zshyyemefdwmlqcbxjrv.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpzaHl5ZW1lZmR3bWxxY2J4anJ2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI3MzQxNjMsImV4cCI6MjA4ODMxMDE2M30.Ms-bChRS2byX4gfZ0MeBSXlx4kV1LL58TN_Ok7BOST8';
const supabase = createClient(supabaseUrl, supabaseKey);

export async function GET(request,{params}) {
    const {id}=await params;
    const { data: articulos, error } = await supabase
    .from('articulos')
    .select('*')
    .eq("id",id)
    .single();

    if (error) {
        return new Response(JSON.stringify(error), { status: 400 });
    }

    return new Response(JSON.stringify(articulos), { status: 200 });
}