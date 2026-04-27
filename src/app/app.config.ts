import { ApplicationConfig } from '@angular/core';
import { provideRouter, Routes } from '@angular/router';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { environment } from '../environments/environment';
import { DoctorsComponent } from './components/doctors/doctors.component';
import { PatientsComponent } from './components/patients/patients.component';

const routes: Routes = [
  { path: '', redirectTo: 'template', pathMatch: 'full' },
  { path: 'doctors', component: DoctorsComponent },
  { path: 'patients', component: PatientsComponent },
  { path: '**', redirectTo: 'Doctors' }
];

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideFirestore(() => getFirestore())
  ]
};