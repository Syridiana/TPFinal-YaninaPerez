import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  tipoSeleccionado = '';

  constructor() { }

  cambiarTipoSeleccionado(tipo:string){
    this.tipoSeleccionado = tipo;
  }

  ngOnInit(): void {
  }

}
