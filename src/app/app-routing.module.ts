import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { PacienteComponent } from './paciente/paciente.component';
import {AdminComponent} from './admin/admin.component';
import {FormularioComponent} from './formulario/formulario.component'
import {MedicoComponent} from './medico/medico.component'
import { HomeComponent } from './home/home.component';


const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'paciente', component: PacienteComponent },
  { path: 'admin', component: AdminComponent },
  { path: 'formulario', component: FormularioComponent },
  { path: 'medico', component: MedicoComponent},
  { path: '', component: HomeComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
