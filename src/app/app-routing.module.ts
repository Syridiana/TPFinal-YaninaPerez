import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component';


const routes: Routes = [
   { path: 'login', component: LoginComponent },
   { path: 'home', component: HomeComponent },
   { path: '', redirectTo: 'home', pathMatch: 'full' },
   { path: 'signup', component: SignUpComponent },
/*  { path: 'ingreso', component: LoginComponent },
  { path: 'quien-soy', component: QuienSoyComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: BienvenidoComponent },
  { path: 'casa', component: BienvenidoComponent },
  { path: 'ej1', component: Ej1Component },
  { path: 'chat', component: ChatComponent},
  { path: 'juegos', loadChildren: () => import('./juegos/juegos.module').then(m => m.JuegosModule) },
  { path: '**', component: ErrorComponent } */
];
const queryParams = {};

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})



export class AppRoutingModule { }

