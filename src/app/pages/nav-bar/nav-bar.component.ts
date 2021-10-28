import { Component, OnInit } from '@angular/core';
/* import { AuthenticationService } from 'src/app/servicios/auth.service'; */
/* import { UserI } from 'src/app/clases/UserI'; */
import { AngularFireAuth } from "@angular/fire/auth";
/* import { DBService } from '../../servicios/db.service'; */

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  userDisplayName : any;
/*   public currentUser!: UserI | null; */
  public puntajeUsuario:any

  constructor(/* public authService: AuthenticationService ,*/  private angularFireAuth: AngularFireAuth, /* private DBService: DBService */) {
    this.angularFireAuth.onAuthStateChanged((user) => {
/*       this.currentUser = user;
      this.userDisplayName = this.currentUser?.email; */
    });
   }



  ngOnInit(): void {
  }

/*   signOut() {
    this.authService.SignOut();
  } */

/*   isUserLogged() {
     if(!this.currentUser){
       return false;
     } else{

       return true;
     }
  } */

  
 /*  getUserLogged() {
    return this.currentUser;
  } */

}
