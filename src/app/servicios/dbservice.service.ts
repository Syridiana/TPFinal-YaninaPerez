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

@Injectable({
  providedIn: 'root',
})
export class DBService {
  private especialistasCollection: AngularFirestoreCollection<EspecialistaI>;
  private nameCollectionDB = 'especialistas';

  private pacientesCollection: AngularFirestoreCollection<PacienteI>;
  private nameCollectionDB_2 = 'pacientes';

  public currentUser!: User | null;
  public listaPacientes: PacienteI[] = [];
  public listaEspecialistas: EspecialistaI[] = [];

  constructor(private afAuth: AngularFireAuth, private afs: AngularFirestore) {
    this.especialistasCollection = afs.collection<EspecialistaI>(
      this.nameCollectionDB
    );

    this.pacientesCollection = afs.collection<PacienteI>(
      this.nameCollectionDB_2
    );

    this.afAuth.onAuthStateChanged((user) => {
      this.currentUser = user;
    });

    
  }


  loadAllEspecialistas() {
    return this.especialistasCollection.valueChanges() as Observable<EspecialistaI[]>
  }

  loadAllPacientes() {
    return this.pacientesCollection.valueChanges() as Observable<PacienteI[]>
  }


  async addPaciente(nombre: string, apellido: string, edad:number, dni:number, os: string,
    mail:string, image1:string, image2:string) {
    try {
      const paciente: PacienteI = {
        uid: this.currentUser?.uid,
        nombre: nombre,
        apellido: apellido,
        edad: edad,
        obrasocial: os,
        dni: dni,
        mail: mail,
        photoUrl: image1,
        photoUrl2: image2
      };

      return await this.pacientesCollection.add(paciente);
    } catch (error:any) {
      throw new Error(error.message);
    }
  }

  async addEspecialista(nombre: string, apellido: string, edad:number, dni:number, especialidad: string,
    mail:string, image1:string) {
    try {
      const especialista: EspecialistaI = {
        uid: this.currentUser?.uid,
        nombre: nombre,
        apellido: apellido,
        edad: edad,
        especialidad: especialidad,
        dni: dni,
        mail: mail,
        photoUrl: image1
      };

      return await this.especialistasCollection.add(especialista);
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


/*   async updatePuntaje(puntaje: number) {
    try {

      if(this.currentUser){
        let nuevoPuntaje=0;
        const docs = this.afs.collection<UserI>(
          this.nameCollectionDB_2).ref.where('email', '==', this.currentUser.email).get();
          (await docs).forEach((doc:any)=>{
            console.log(doc.data().puntaje);
            this.usuarioId = doc.id;
            nuevoPuntaje = doc.data().puntaje + puntaje;
          });
          await this.afs.collection<UserI>(
            this.nameCollectionDB_2).doc(`/${this.usuarioId}`).update({puntaje: nuevoPuntaje});
      }

 
    } catch (error:any) {
      throw new Error(error.message);
    }
  } */

  


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