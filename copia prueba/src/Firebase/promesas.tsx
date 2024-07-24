import { addDoc, collection, getDocs,doc,deleteDoc,updateDoc } from "firebase/firestore";
import { db } from './firebase'
import { Persona } from "@/interfaces/iPersonas";
import { Jugador } from "@/interfaces/iJugador";


export const registrarPersona =async(personas:Persona)=>{
    const docRef= await addDoc(collection(db,'personas'), personas)
}

export const registrarJugador = async (jugadores:Jugador) =>{
    const docRef= await addDoc(collection(db,'jugadores'), jugadores)
}

export const obtenerPersonas = async()=>{
    let personas:Persona[] = []
    const querySnapshot = await getDocs(collection(db, 'personas'));
    querySnapshot.forEach((doc)=>{
        
        let persona:Persona={
            id:doc.id,
            nombre:doc.data().nombre,
            apellido:doc.data().apellido,
            edad:doc.data().edad,
            correo: doc.data().correo,
            telefono:doc.data().telefono,
            opciones:doc.data().opciones,
            comentario:doc.data().comentario,
            terminos:doc.data().terminos,
        
        }
        personas.push(persona)
    })
    return personas
}

export const obtenerJugador = async()=>{
    let jugadores:Jugador[] = []
    const querySnapshot = await getDocs(collection(db, 'jugadores'));
    querySnapshot.forEach((doc)=>{
        
        let jugador:Jugador={
            id:doc.id,
            nombre:doc.data().nombre,
            apellido:doc.data().apellido,
            posicion:doc.data().posicion,
            altura: doc.data().altura,
            equipoFavorito:doc.data().equipoFavorito,
            jugadorFavorito:doc.data().jugadorFavorito,
            
        
        }
        jugadores.push(jugador)
    })
    return jugadores
}

export const actualizarPersona = async (p:Persona) => {
    const ref = doc(db, "personas", p.id);
    await updateDoc(ref,{...p});
    
    
};

export const actualizarJugador = async (p:Jugador) => {
    const ref = doc(db, "jugadores", p.id);
    await updateDoc(ref,{...p});
    
    
};

export const eliminarPersona = async (id:string) => {
    const ref = doc(db, "personas", id);
    await deleteDoc(ref);
    
}

export const eliminarJugador = async (id:string) => {
    const ref = doc(db, "jugadores", id);
    await deleteDoc(ref);
    
}