import { Component, OnInit } from '@angular/core';
/* import { AuthenticationService } from 'src/app/servicios/auth.service'; */
/* import { UserI } from 'src/app/clases/UserI'; */
import { AngularFireAuth } from "@angular/fire/auth";
import { DBService } from 'src/app/servicios/dbservice.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  userDisplayName : any;
/*   public currentUser!: UserI | null; */
  public tipoUsuario:any;

  constructor(/* public authService: AuthenticationService ,*/  private angularFireAuth: AngularFireAuth, private DBService: DBService) {
    this.angularFireAuth.onAuthStateChanged((user) => {
      this.DBService.getUserType().then( data => {
        this.tipoUsuario = sessionStorage.tipo;
      })
      

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
