import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument
} from '@angular/fire/firestore';
import { User } from 'firebase';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { EspecialistaI } from '../clases/EspecialistaI';
import { PacienteI } from '../clases/PacienteI';
import { UserI } from '../clases/UserI';

@Injectable({
  providedIn: 'root',
})
export class DBService {
  private usersCollection: AngularFirestoreCollection<UserI>;
  private nameCollectionDB = 'users';


  

  public currentUser!: User | null;

  public usuarioType = "";

  constructor(private afAuth: AngularFireAuth, private afs: AngularFirestore) {
    this.usersCollection = afs.collection<UserI>(
      this.nameCollectionDB
    );



    this.afAuth.onAuthStateChanged((user) => {
      this.currentUser = user;
    });

    
  }


/*   loadAllEspecialistas() {
    return this.especialistasCollection.valueChanges() as Observable<EspecialistaI[]>
  }

  loadAllPacientes() {
    return this.pacientesCollection.valueChanges() as Observable<PacienteI[]>
  }
 */

  async addPaciente(nombre: string, apellido: string, edad:number, dni:number, os: string,
    mail:string, image1:string, image2:string) {
    try {
      const paciente: UserI = {
        uid: this.currentUser?.uid,
        nombre: nombre,
        apellido: apellido,
        edad: edad,
        obrasocial: os,
        dni: dni,
        email: mail,
        photoUrl: image1,
        photoUrl2: image2,
        especialidad: '-',
        tipo: 'paciente'
      };
      return await this.usersCollection.add(paciente);
    } catch (error:any) {
      throw new Error(error.message);
    }
  }

  async addEspecialista(nombre: string, apellido: string, edad:number, dni:number, especialidad: string,
    mail:string, image1:string) {
    try {
      const especialista: UserI = {
        uid: this.currentUser?.uid,
        nombre: nombre,
        apellido: apellido,
        edad: edad,
        especialidad: especialidad,
        dni: dni,
        email: mail,
        photoUrl: image1,
        obrasocial: '-',
        tipo: "especialista",
        photoUrl2: '-'
      };
    
      return await this.usersCollection.add(especialista);
    } catch (error:any) {
      throw new Error(error.message);
    }
  }





/*   async addUserCollection(email: string, username:string, photoURL:string, tipo: string) {
    try {
      const user: UserI = {
        uid: this.currentUser?.uid,
        displayName: username,
        email: email,
        photoURL: photoURL,
        tipo: tipo
      };

      return await this.usuariosCollection.add(user);
    } catch (error:any) {
      throw new Error(error.message);
    }
  } */


  async getUserType() {
    try {

      if(this.currentUser){        
        const docs = this.afs.collection<UserI>(
          this.nameCollectionDB).ref.where('email', '==', this.currentUser.email).get();
          (await docs).forEach((doc:any)=>{
            sessionStorage.setItem('tipo', doc.data().tipo); 
            return doc.data();
          });
      }

 
    } catch (error:any) {
      throw new Error(error.message);
    }
  }

  


/*   async findMovies(actorId: string) {
    try {
        console.log(actorId)
        const docs = this.afs.collection<PeliculaI>(
          this.nameCollectionDB_2).ref.where('actorId', '==', actorId).get();
          (await docs).forEach((doc:any)=>{
            console.log(doc.data());
          });

    } catch (error:any) {
      throw new Error(error.message);
    }
  } */

  

  
/* 
  public obtenerUsuarios() {
    return this.usuariosCollection.valueChanges() as Observable<UserI[]>;
  } */
}