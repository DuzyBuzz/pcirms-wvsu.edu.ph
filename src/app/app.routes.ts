import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
import { SidePanelComponent } from './core/side-panel/side-panel.component';
import { AppointmentsComponent } from './core/appointments/appointments.component';
import { ImmunizationComponent } from './core/immunization/immunization.component';

export const routes: Routes = [
  {path: "appointment", component: AppointmentsComponent},
  {path: "immunization", component: ImmunizationComponent}
  ]; 
