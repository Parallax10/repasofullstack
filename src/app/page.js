"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function Home() {
  const [titulo,setTitulo]=useState("")
  const [contenido,setContenido]=useState("")
  const [autor,setAutor]=useState("")
  const [articulos, setArticulos] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    fetchArticulos();
  }, []);

    const fetchArticulos = async () => {
      try {
        const response = await fetch("/api/articulos");
        const data = await response.json();
        setArticulos(data);
      } catch (error) {
        console.error("Error al obtener los artículos:", error);
      } finally {
        setCargando(false);
      }
    };

  const eliminar=async(idart)=>{
    try {
      const response=await fetch("/api/articulos",{
        method:"DELETE",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify({id:idart}),
      });
      if (response.ok){
        const resultado=await response.json()
        fetchArticulos()
        alert("Se borro")
      }else{
        alert("algo fallo")
      }
  }catch(error){

  }
};
  if (cargando) {
    return <div>Cargando artículos...</div>;
  }
  function enviarArticulo(){
    if(titulo===""||contenido===""||autor===""){
      alert("Los campos no pueden estar vacios")
    }
    else{
      const nuevoArticulo={
        titulo,
        contenido,
        autor
      }
      fetch("/api/articulos",{
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify(nuevoArticulo),
      }).then((response)=>{
        if(response.ok){
          return response.json()
        }else{
          throw new Error("Error al enviar el articulo")
        }

      }
      ).then((data)=>{
        setArticulos((prev)=>[...prev,data])
        setTitulo("")
        setAutor("")
        setContenido("")
      }).catch((error)=>{
        alert(error.message)
      })
  }
}
  return (
    <div>
      <h1>Lista de Artículos</h1>
      <ul>
        {articulos.map((articulo) => (
          <li key={articulo.id}>
            <h2>Titulo: {articulo.titulo}</h2>
            <p>Contenido: {articulo.contenido}</p>
            <p>Fecha: {articulo.fecha_publicacion}</p>
            <p>Autor: {articulo.autor}</p>

            <Link href={`/articulos/${articulo.id}`}>
              <button>Ver detalles</button>
            </Link>
            <button onClick={()=>eliminar(articulo.id)}>Eliminar</button>
          </li>
        ))}
      </ul>
      <p>Titulo</p>
      <input type="text" value={titulo} onChange={(e) => setTitulo(e.target.value)}></input>
      <p>Contenido</p>
      <input type="text" value={contenido} onChange={(e) => setContenido(e.target.value)}></input>
      <p>Autor</p>
      <input type="text" value={autor} onChange={(e) => setAutor(e.target.value)}></input>
      <button onClick={()=>enviarArticulo()}>Enviar</button>
    </div>
  );
  
    
  }

