"use client"
import { useEffect, useState } from "react"

export default function Productos(){
    const [productos, setProductos] = useState([])
    const [cargando, setCargando] = useState(true)

    const [nombre, setNombre] = useState("")
    const [stock, setStock] = useState(0)
    const [precio, setPrecio] = useState(0.00)
    const [descripcion, setDescripcion] = useState("") // Usamos siempre 'descripcion' con 'r'

    useEffect(()=>{
        const fetchProductos = async () => {
            try{
                const response = await fetch("/api/productos")
                const data = await response.json();
                setProductos(data)
            }catch(error){
                console.error("Error al cargar")
            }finally{
                setCargando(false)
            }
        }
        fetchProductos()
    },[])

    if(cargando){
        return <div>Cargando productos...</div>
    }

    const enviarProducto = async () => {
        // 1. Convertimos los strings del input a números reales
        const precioNum = parseFloat(precio);
        const stockNum = Number(stock);

        if (nombre === "" || descripcion === "" || precioNum <= 0 || stockNum < 0) {
            alert("Gilipollas")
            return; 
        }

        const nuevoProducto = {
            nombre: nombre,
            precio: precioNum,
            descripcion: descripcion, // Asegúrate de que en la BD la columna se llame así
            stock: stockNum
        }

        try {
            const response = await fetch("/api/productos", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(nuevoProducto),
            });

            if (response.ok) {
                const data = await response.json();
                // Tu backend ya devuelve data[0], así que insertamos 'data' directamente
                setProductos((prev) => [...prev, data]); 
                
                // Limpiamos los inputs
                setNombre("");
                setDescripcion("");
                setPrecio(0);
                setStock(0);
            } else {
                alert("Algo fallo en el servidor")
            }
        } catch (error) {
            console.error("Error al enviar el producto:", error);
        }
    }

    return(
        <div>
            {productos.map((producto)=>(
                <div key={producto.id} style={{ borderBottom: "1px solid #ccc", marginBottom: "10px" }}>
                    <p>Nombre: {producto.nombre}</p>
                    <p>Descripcion: {producto.descripcion}</p>
                    <p>Precio: {producto.precio}</p>
                    {producto.stock === 0 ? <p style={{color:"red"}}>stock: {producto.stock}</p> : <p>stock: {producto.stock}</p>}
                </div>
            ))}
            
            <hr />
            <h3>Añadir Nuevo Producto</h3>

            <p>Nombre</p>
            <input type="text" value={nombre} onChange={(e)=>setNombre(e.target.value)}></input>
            <p>Descripcion</p>
            <input type="text" value={descripcion} onChange={(e)=>setDescripcion(e.target.value)}></input>
            <p>Precio</p>
            {/* 2. Añadido step="0.01" para permitir decimales en el input */}
            <input type="number" step="0.01" value={precio} onChange={(e)=>setPrecio(e.target.value)}></input>
            <p>Stock</p>
            <input type="number" value={stock} onChange={(e)=>setStock(e.target.value)}></input>
            <br /><br />
            <button onClick={()=>enviarProducto()}>Añadir</button>
        </div>
    )
}