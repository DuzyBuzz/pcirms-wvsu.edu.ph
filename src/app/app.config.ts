import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getMessaging, provideMessaging } from '@angular/fire/messaging';
import { provideHttpClient } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(),
    provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), provideFirebaseApp(() => initializeApp({ projectId: "pcirm-a4062", appId: "1:482879199226:web:c5c9b0187a76e29ea33643", storageBucket: "pcirm-a4062.firebasestorage.app", apiKey: "AIzaSyAkOLYay1ARwxeeTri3u0rtumbanP0OHc0", authDomain: "pcirm-a4062.firebaseapp.com", messagingSenderId: "482879199226" })), provideAuth(() => getAuth()), provideFirestore(() => getFirestore()), provideMessaging(() => getMessaging())]
};
