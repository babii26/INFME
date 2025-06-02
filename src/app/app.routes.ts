import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { PhysicianComponent } from './physician/physician.component';
import { PatientComponent } from './patient/patient.component';
import { QuestionnaireComponent } from './questionnaire/questionnaire.component';
import { AdminComponent } from './admin/admin.component';

export const routes: Routes = [
 { path: '', redirectTo: 'login', pathMatch: 'full' }, //redirect to login
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'physician', component: PhysicianComponent },
  { path: 'patient', component: PatientComponent },
  { path: 'questionnaire', component: QuestionnaireComponent },
  { path: 'admin', component: AdminComponent }
];
