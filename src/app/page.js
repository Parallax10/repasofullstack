"use client"
import Link from "next/link"
import { useEffect, useState } from "react"

export default function home(){
  const[articulos,setArticulos]=useState([])
  const[cargando,setCargando]=useState(true)

  const[titulo,setTitulo]=useState("")
  const[autor,setAutor]=useState("")
  const[contenido,setContenido]=useState("")
  const[fecha,setFecha]=useState("")

  const borrarArticulos=async(id)=>{
    try{
      const response=await fetch("/api/articulos",{
        method:"DELETE",
        body:JSON.stringify({id})
      })
      if(response.ok){
        fetchEventos()
        alert("Se borro")
      }else{
        alert("no se borro")
      }
    }catch{}
  }
  const enviarArticulos=async(titulo,autor,contenido,fecha)=>{
    try{
      const response=await fetch("/api/articulos",{
        method:"POST",
        body:JSON.stringify({titulo,fecha,autor,contenido})
      })
      if(response.ok){
        fetchEventos()
        alert("se enviaronperfe")
      }else{
        alert("no se enviaron")
      }
    }catch{}
  }
  const fetchEventos=async()=>{
      try{
          const response=await fetch("/api/articulos")
          const data= await response.json()
          setArticulos(data)
      }catch(error){
          console.error("algo fallo al pedir los datos")
      }finally{
          setCargando(false)
      }
  }
  
  useEffect(()=>{
    fetchEventos()
  },[])
  if(cargando)return<p>Cargando datos</p>
  return(
    <div>
      {articulos.map((articulo)=>(
        <div key={articulo.id}>
          <p>Titulo:{articulo.titulo}</p>
          <p>contenido{articulo.contenido}</p>
          <p>Autor:{articulo.autor}</p>
          <p>Fecha:{articulo.fecha_publicacion}</p>
          <button onClick={()=>borrarArticulos(articulo.id)}>Borrar</button>
          <Link href={`/articulos/${articulo.id}`}>
            <button>Detalles</button>
          </Link>
          
        </div>
      ))}
      <div>
        <p>Titulo</p>
        <input type="text" value={titulo} onChange={(e)=>setTitulo(e.target.value)}></input>
        <p>contenido</p>
        <input type="text" value={contenido} onChange={(e)=>setContenido(e.target.value)}></input>
        <p>Autor</p>
        <input type="text" value={autor} onChange={(e)=>setAutor(e.target.value)}></input>
        <p>Fecha</p>
        <input type="date" value={fecha} onChange={(e)=>setFecha(e.target.value)}></input>
        <button onClick={()=>enviarArticulos(titulo,contenido,autor,fecha)}>Enviar</button>
      </div>
    </div>
  )
}