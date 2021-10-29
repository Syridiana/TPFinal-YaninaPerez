import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/servicios/authservice.service';
import { DBService } from 'src/app/servicios/dbservice.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  tipoUsuario:any;

  constructor(private auths: AuthenticationService, private DBService: DBService) {
    this.tipoUsuario = "";
   }

  ngOnInit(): void {
  }

  testPaciente(){
    this.auths.SignIn('paciente@test.com', '123123');
    this.DBService.getUserType();
  }

  testEspecialista(){
    this.auths.SignIn('especialista@test.com', '123123');
        this.DBService.getUserType();
  }

}
