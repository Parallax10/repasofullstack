import { createClient } from '@supabase/supabase-js';
const supabaseUrl = 'https://zshyyemefdwmlqcbxjrv.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpzaHl5ZW1lZmR3bWxxY2J4anJ2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI3MzQxNjMsImV4cCI6MjA4ODMxMDE2M30.Ms-bChRS2byX4gfZ0MeBSXlx4kV1LL58TN_Ok7BOST8';
const supabase = createClient(supabaseUrl, supabaseKey);

export async function GET(request) {
    const {data:articulos,error}=await supabase
    .from("articulos")
    .select("*");
    
    if(error) {return new Response(JSON.stringify(error),{status:400})}

    return new Response(JSON.stringify(articulos),{status:400})

}





export async function DELETE(request) {
    const body=await request.json()
    const idArticulo=body.id
    const {data:deleteData,error}=await supabase
    .from("articulos")
    .delete()
    .eq("id",idArticulo)
    if(error){
        return new Response(JSON.stringify(error),{status:400});
    }
    return new Response(JSON.stringify({success:"Articulo eliminado"}),{status:200});
}





















export async function POST(request) {
    const body=await request.json();
    const {titulo,contenido,autor}=body;
    const {data,error}=await supabase
    .from("articulos")
    .insert([{titulo,contenido,autor}])
    .select();
    if(error){
        return new Response(JSON.stringify(error),{
            status:400,
            headers:{"Content-Type":"application/json"},
        });
    }
    return new Response(
        JSON.stringify(data[0]),
        {status:200,headers:{"Content-Type":"application/json"}},
    );

}
