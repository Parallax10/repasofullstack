import { createClient } from '@supabase/supabase-js';
const supabaseUrl = 'https://zshyyemefdwmlqcbxjrv.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpzaHl5ZW1lZmR3bWxxY2J4anJ2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI3MzQxNjMsImV4cCI6MjA4ODMxMDE2M30.Ms-bChRS2byX4gfZ0MeBSXlx4kV1LL58TN_Ok7BOST8';
const supabase = createClient(supabaseUrl, supabaseKey);

export async function GET(request) {
    const {searchParams}=new URL(request.url)
    const stockparams=searchParams.get("stock")
    if(stockparams!=null){
        const{data:productos,error}=await supabase
        .from("productos")
        .select("*")
        .eq("stock",stockparams)
        if(error){
            return new Response(JSON.stringify(error),{status:400});
        }
        return new Response(JSON.stringify(productos),{status:200})
    }else{
        const{data:productos,error}=await supabase
        .from("productos")
        .select("*");
        if(error){
        return new Response(JSON.stringify(error),{status:400});
        }
        return new Response(JSON.stringify(productos),{status:200})
    }
}

export async function DELETE(request) {
    const body=await request.json()
    const id=body.id
    const {data:productos,error}=await supabase
    .from("productos")
    .delete()
    .eq("id",id)

    if (error){return new Response(JSON.stringify((error),{status:400}))}

    return new Response(JSON.stringify((productos),{status:200}))
}

export async function POST(request) {
    const body=await request.json()
    const {nombre,descripcion,precio,stock,fecha}=body
    const {data,error}=await supabase
    .from("productos")
    .insert([{nombre,descripcion,precio,stock,fecha}])
    .select();
    if(error){
        return new Response(JSON.stringify(error),{
            status:400
        })
    }
    return new Response(JSON.stringify(data[0]),
    {status:200}
)
}