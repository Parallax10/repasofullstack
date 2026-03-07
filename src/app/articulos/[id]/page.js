"use client"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"
export default function Articulo(){
    const params=useParams()
    const idArticulo=params.id

    const [articulo,setArticulo]=useState(null)
    const [cargando,setCargando]=useState(true)

    useEffect(()=>{
        const fetchArticulo=async()=>{
            try{
                const response=await fetch(`/api/articulos/${idArticulo}`)
                if(response.ok){
                    const data=await response.json()
                    setArticulo(data)
                }else{
                    console.error("Error al obtener el articulo")
                }
            }catch(error){
                console.error("Error en la solicitud:",error)
            }finally{
                setCargando(false)
            }
        }
        if(idArticulo)fetchArticulo()
    },[idArticulo])
    if(cargando)return<div>Cargando...</div>
    if(!articulo)return<div>No existe wiwi</div>
    return(
        <div>
            <p>Titulo:{articulo.titulo}</p>
            <p>Contenido:{articulo.contenido}</p>
            <p>Autor:{articulo.autor}</p>
            <p>Tiempo:{articulo.fecha_publicacion}</p>
        </div>
    )
}