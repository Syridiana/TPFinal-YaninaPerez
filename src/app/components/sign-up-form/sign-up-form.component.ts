import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { AngularFireAuth } from "@angular/fire/auth";
import { DBService } from 'src/app/servicios/dbservice.service';
import { AuthenticationService } from 'src/app/servicios/authservice.service';
/* import { EspecialistaI } from 'src/app/clases/EspecialistaI';
import { PacienteI } from 'src/app/clases/PacienteI';
import { UserI } from 'src/app/clases/UserI'; */

@Component({
  selector: 'app-sign-up-form',
  templateUrl: './sign-up-form.component.html',
  styleUrls: ['./sign-up-form.component.css']
})
export class SignUpFormComponent implements OnInit {
  @Input() registerType:any;

  public formulario:FormGroup;
/*   public currentUser!: UserI | null; */

  constructor(private fb:FormBuilder, private angularFireAuth: AngularFireAuth, private DBService: DBService,
    private authService:AuthenticationService) {

    this.formulario = fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      edad:[false, [Validators.required, Validators.min(0), Validators.max(120)]],
      dni :[false, [Validators.required, Validators.min(1), Validators.max(10000000)]],
      mail:['', [Validators.required, Validators.email]],
      os:['', ],
      image2:['', ],
      password:['', [Validators.required, Validators.minLength(6)]],
      image1:['', Validators.required],
      especialidad: ['', ]
    });

   }

   aceptarForm(){
     this.authService.SignUp(this.formulario.value.mail, this.formulario.value.password);
     if(this.registerType == "Paciente"){
       console.log(this.formulario.value.os)
      this.DBService.addPaciente(
        this.formulario.value.nombre, 
        this.formulario.value.apellido, 
        this.formulario.value.edad, 
        this.formulario.value.dni,
        this.formulario.value.os,
        this.formulario.value.mail,
        this.formulario.value.image1,
        this.formulario.value.image2 );
     } else 
     {
      this.DBService.addEspecialista(
        this.formulario.value.nombre, 
        this.formulario.value.apellido, 
        this.formulario.value.edad, 
        this.formulario.value.dni,
        this.formulario.value.especialidad,
        this.formulario.value.mail,
        this.formulario.value.image1
       );
     }

  }

  ngOnInit(): void {
  }

}
