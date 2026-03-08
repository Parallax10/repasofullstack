"use client"
import { useEffect, useState } from "react"

export default function Productos(){
    const [productos, setProductos] = useState([])
    const [cargando, setCargando] = useState(true)

    const [nombre, setNombre] = useState("")
    const [stock, setStock] = useState(0)
    const [precio, setPrecio] = useState(0.00)
    const [descripcion, setDescripcion] = useState("") 
    const [filtroStock, setFiltroStock] = useState("");
    const [fecha,setFecha]=useState("")

const fetchProductos = async () => {
    try{
        const url = filtroStock !== "" 
            ? `/api/productos?stock=${filtroStock}` 
            : "/api/productos";

        const response = await fetch(url);
        const data = await response.json();
        setProductos(data);
        setProductos(data)
    }catch(error){
        console.error("Error detallado al cargar:", error)
    }finally{
        setCargando(false)
    }
}

    useEffect(()=>{
        fetchProductos()
    },[])

    if(cargando){
        return <div>Cargando productos...</div>
    }


    const borrarProducto= async (id)=>{
        try{
            const response=await fetch("/api/productos",{
                method:"DELETE",
                body:JSON.stringify({id:id})
            })
            if(response.ok){
                fetchProductos()
                alert("se borro")
            }else{
                alert("algo fallo al borrar")
            }
        }catch(error){
        }
    }
    const enviarProducto = async () => {
        const precioNum = parseFloat(precio);
        const stockNum = Number(stock);
        if (nombre === "" || descripcion === "" || precioNum <= 0 || stockNum < 0 || fecha === "") {
            alert("campos incorrectos")
            return; 
        }
        const nuevoProducto = {
            nombre: nombre,
            precio: precioNum,
            descripcion: descripcion,
            stock: stockNum,
            fecha: fecha
        }

        try {
            const response = await fetch("/api/productos", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(nuevoProducto),
            });

            if (response.ok) {
                fetchProductos()
                setNombre("");
                setDescripcion("");
                setPrecio(0);
                setStock(0);
                setFecha("")
            } else {
                const errorData = await response.json(); 
                console.error("EL SERVIDOR SE QUEJA DE ESTO:", errorData);
            }
        } catch (error) {
            console.error("Error al enviar el producto:", error);
        }
    }

    return(
        <div>
            <p>Filtro</p>
            <input type="number" value={filtroStock} onChange={(e)=>setFiltroStock(e.target.value)}></input>
            <button onClick={() => fetchProductos(filtroStock)} style={{marginLeft: "10px"}}>Buscar en API</button>
            <button onClick={() => { setFiltroStock(""); fetchProductos(""); }} style={{marginLeft: "10px"}}>Ver todos</button>
            {productos.map((producto)=>(
                <div key={producto.id} style={{ borderBottom: "1px solid #ccc", marginBottom: "10px" }}>
                    <p>Nombre: {producto.nombre}</p>
                    <p>Descripcion: {producto.descripcion}</p>
                    <p>Precio: {producto.precio}</p>
                    <p>Fecha:{producto.fecha}</p>
                    {producto.stock === 0 ? <p style={{color:"red"}}>stock: {producto.stock}</p> : <p>stock: {producto.stock}</p>}
                    <button onClick={()=>borrarProducto(producto.id)}>Borrar</button>
                </div>
            ))}
            
            <hr />
            <h3>Añadir Nuevo Producto</h3>

            <p>Nombre</p>
            <input type="text" value={nombre} onChange={(e)=>setNombre(e.target.value)}></input>
            <p>Descripcion</p>
            <input type="text" value={descripcion} onChange={(e)=>setDescripcion(e.target.value)}></input>
            <p>Precio</p>
            <input type="number" step="0.01" value={precio} onChange={(e)=>setPrecio(e.target.value)}></input>
            <p>Stock</p>
            <input type="number" value={stock} onChange={(e)=>setStock(e.target.value)}></input>
            <p>Fecha</p>
            <input type="date" value={fecha} onChange={(e)=>setFecha(e.target.value)}></input>
            <br /><br />
            <button onClick={()=>enviarProducto()}>Añadir</button>
        </div>
    )
}