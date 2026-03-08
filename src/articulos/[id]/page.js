import { useParams } from "next/navigation"
import { useState } from "react"

export default function detallesArticulos({params}){
    const params=useParams()
    const idArticulo=params.id

    const [articulo,setArticulo]=useState([])
    const [cargando,setCargando]=useState(true)

    useEffect(()=>{
        const fetchArticulo=async()=>{
            try{
                const response=await fetch(`/api/articulos/${idArticulo}`)
                if(response.ok){
                    const data=await response.json()
                    setArticulo(data)
                }else{
                    console.error("Error al obtener el registro")
                }
            }catch(error){
                console.error("Error en la solicitud:",error)
            }finally{
                setCargando(false)
            }
        }
        if(idArticulo) fetchArticulo()
    },[idArticulo])
    if(cargando)return<p>Cargando</p>
    return(
        <div>
            <p>Titulo{articulo.titulo}</p>
            <p>Autor{articulo.autor}</p>
            <p>contenido{articulo.contenido}</p>
            <p>Fecha{articulo.fecha_publicacion}</p>
        </div>
    )
}