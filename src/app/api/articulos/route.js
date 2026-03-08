import { createClient } from '@supabase/supabase-js';
const supabaseUrl = 'https://zshyyemefdwmlqcbxjrv.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpzaHl5ZW1lZmR3bWxxY2J4anJ2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI3MzQxNjMsImV4cCI6MjA4ODMxMDE2M30.Ms-bChRS2byX4gfZ0MeBSXlx4kV1LL58TN_Ok7BOST8';
const supabase = createClient(supabaseUrl, supabaseKey);

export async function GET(request) {
    const{data:articulos,error}=await supabase
    .from("articulos")
    .select("*")
    if(error) return new Response(JSON.stringify((error),{status:400}))
    return new Response(JSON.stringify((articulos),{status:200}))
}

export async function POST(response) {
    const body=await response.json()
    const {titulo,contenido,autor,fecha}=body
    const {data,error}=await supabase
    .from("articulos")
    .insert([{titulo,contenido,autor,fecha_publicacion:fecha}])
    .select();
    if(error){return new Response(JSON.stringify((error)),{status:400})}
    return new Response(JSON.stringify((data[0]),{status:200}))
}


export async function PUT(response) {
    const body=await response.json()
    const{id,titulo,contenido,autor,fecha}=body
    const{data,error}=await supabase
    .from("articulos")
    .update([{titulo,contenido,autor,fecha_publicacion:fecha}])
    .eq("id",id)
    .select();
    if(error){return new Response(JSON.stringify((error)),{status:400})}
    return new Response(JSON.stringify((data[0]),{status:200}))
}
export async function DELETE(response) {
    const body=await response.json()
    const id=body.id
    const{data:variable,error}=await supabase
    .from("articulos")
    .delete()
    .eq("id",id)
    if(error){return new Response(JSON.stringify((error),{status:400}))}
    return new Response(JSON.stringify((variable),{status:200}))
}

