import { Injectable } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/auth";
import {
  AngularFirestore,
  AngularFirestoreCollection
} from '@angular/fire/firestore';
import { Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';
/* import { UserI } from '../clases/UserI'; */
import { User } from 'firebase';
import Swal from 'sweetalert2';
import { DBService } from './dbservice.service';


@Injectable({
  providedIn: 'root'
})

export class AuthenticationService {
/*   private usersCollection: AngularFirestoreCollection<UserI>; */
  userData: Observable<firebase.User | null>;
  nameCollectionDB = "usuarios";
  email = "";
  public currentUser!: User | null;

  constructor(private angularFireAuth: AngularFireAuth,  private routes: Router,
    private afs: AngularFirestore, private dbService: DBService) {
    this.userData = angularFireAuth.authState;
    this.angularFireAuth.onAuthStateChanged((user) => {
      this.currentUser = user;
    });
/*     this.usersCollection = afs.collection<UserI>(
      this.nameCollectionDB
    ); */
  }

  /* Sign up */
  SignUp(email: string, password: string) {
    this.angularFireAuth.createUserWithEmailAndPassword(email, password)
      .then((res: any) => {
        console.log('You are Successfully signed up!', res);
        this.email = email;
        this.routes.navigate(['/home']);

        Swal.fire({
          icon: 'success',
          title: 'Successful sign up!',
          text: 'Welcome ' + email,
          showConfirmButton: false,
          timer: 1500
        });

      })
      .catch((error: any) => {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: error.message,
          showConfirmButton: false,
          timer: 1500
        });


      });
  }

  /* Sign in */
  SignIn(email: string, password: string) {
    this.angularFireAuth
      .signInWithEmailAndPassword(email, password)
      .then((res: any) => {
        console.log('You are in!');
        this.email = email;
        this.routes.navigate(['/home']);

        Swal.fire({
          icon: 'success',
          title: 'Successful login!',
          text:  'Welcome ' + email,
          showConfirmButton: false,
          timer: 1500
        });
      })
      .catch((error: any) => {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: error.message,
          showConfirmButton: false,
          timer: 1500
        });


      });
  }


  /* Sign out */
  SignOut() {
    this.angularFireAuth
      .signOut();
    this.email = "";

    Swal.fire({
      icon: 'warning',
      title: 'Bye',
      text: 'See you soon !',
      showConfirmButton: false,
      timer: 1500
    });

    setTimeout(() => {
      this.routes.navigate(['/home']);
    }, 1500);
  }

  getIsLoggedIn(){
    return sessionStorage.getItem('loggedUser');
  }


  
}