import { ApplicationConfig } from '@angular/core';
import { provideRouter, Routes } from '@angular/router';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { environment } from '../environments/environment';
import { ProductsTemplateComponent } from './components/products-template/products-template.component';
import { ProductsReactiveComponent } from './components/products-reactive/products-reactive.component';

const routes: Routes = [
  { path: '', redirectTo: 'template', pathMatch: 'full' },
  { path: 'template', component: ProductsTemplateComponent },
  { path: 'reactive', component: ProductsReactiveComponent },
  { path: '**', redirectTo: 'template' }
];

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideFirestore(() => getFirestore())
  ]
};