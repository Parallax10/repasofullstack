"use client"
import { useEffect, useState } from "react"

export default function eventos(){
    const[eventos,setEventos]=useState([])
    const[cargando,setCargando]=useState(true)

    const[titulo,setTitulo]=useState("")
    const[descripcion,setDescripcion]=useState("")
    const[fecha,setFecha]=useState("")
    const[asistentes,setAsistentes]=useState("")
    const[ubicacion,setUbicacion]=useState("")
    
    const fetchEventos=async()=>{
        try{
            const response=await fetch("/api/eventos")
            const data= await response.json()
            setEventos(data)
        }catch(error){
            console.error("algo fallor al pedir los eventos")
        }finally{
            setCargando(false)
        }
    }
    
    useEffect(()=>{
        fetchEventos()
    },[])

    const eliminarEvento=async(id)=>{
        try{
            const response=await fetch("/api/eventos",{
                method:"DELETE",
                body:JSON.stringify({id})
            })
            if (response.ok){
                fetchEventos()
                alert("se borro")
            }else{
                alert("Algo fallo")
            }
        }catch{}
    }
    
    const enviarEvento=async(titulo,descripcion,fecha,asistentes,ubicacion)=>{
        try{
            const response=await fetch("/api/eventos",{
                method:"POST",
                body:JSON.stringify({titulo,fecha,descripcion,asistentes,ubicacion})
            })
            if(response.ok){
                const resultado=await response.json()
                fetchEventos()
                alert("Se envio")
            }else{
                alert("fallo el envio")
            }
        }catch{
        }
    }
    if(cargando)return<p>Cargando</p>

    return(
        <div>
            {eventos.map((evento)=>(
                <div key={evento.id}>
                    <p>Titulo:{evento.titulo}</p>
                    <p>Descripcion{evento.descripcion}</p>
                    <p>Fecha:{evento.fecha}</p>
                    <p>Asistentes:{evento.asistentes}</p>
                    <p>Ubicacion:{evento.ubicacion}</p>
                    <button onClick={()=>eliminarEvento(evento.id)}>Borrar</button>
                </div>
            ))}
            <div>
                <p>Titulo</p>
                <input type="text" value={titulo} onChange={(e)=>setTitulo(e.target.value)}></input>
                <p>Descripcion</p>
                <input type="text" value={descripcion} onChange={(e)=>setDescripcion(e.target.value)}></input>
                <p>Fecha</p>
                <input type="date" value={fecha} onChange={(e)=>setFecha(e.target.value)}></input>
                <p>Asistentes</p>
                <input type="number" value={asistentes} onChange={(e)=>setAsistentes(e.target.value)}></input>
                <p>Ubicacion</p>
                <input type="text" value={ubicacion} onChange={(e)=>setUbicacion(e.target.value)}></input>
                <button onClick={()=>enviarEvento(titulo,descripcion,fecha,asistentes,ubicacion)}>ENVIAR</button>
            </div>
        </div>
    )
}