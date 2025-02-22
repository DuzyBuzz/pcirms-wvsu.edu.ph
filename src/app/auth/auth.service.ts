import { Injectable } from '@angular/core';
import { Auth, GoogleAuthProvider, signInWithPopup, signOut, user } from '@angular/fire/auth';
import { Firestore, doc, getDoc, setDoc, updateDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$: Observable<any>; // Holds the current user observable

  constructor(private auth: Auth, private firestore: Firestore) {
    this.user$ = user(auth); // Track authentication state
  }

  async signInWithGoogle() {
    try {
      const provider = new GoogleAuthProvider();
      const credentials = await signInWithPopup(this.auth, provider);
      const user = credentials.user;

      if (user) {
        const userRef = doc(this.firestore, 'users', user.uid);
        const userDoc = await getDoc(userRef);

        if (!userDoc.exists()) {
          await setDoc(userRef, {
            uid: user.uid,
            email: user.email,
            displayName: user.displayName,
            photoURL: user.photoURL,
            phoneNumber: '', // Empty by default
            role: 'parent' // Default role
          });
        }
      }
    } catch (error) {
      console.error('Login Error:', error);
    }
  }
  async checkPhoneNumber(uid: string): Promise<boolean> {
    try {
      const userRef = doc(this.firestore, 'users', uid);
      const userDoc = await getDoc(userRef);
      if (userDoc.exists()) {
        const userData = userDoc.data(); // Returns an object
        return !!userData['phoneNumber']; // Access property safely
      }
      return false;
    } catch (error) {
      console.error('Error checking phone number:', error);
      return false;
    }
  }
  

  async updatePhoneNumber(uid: string, phoneNumber: string) {
    try {
      const userRef = doc(this.firestore, 'users', uid);
      await updateDoc(userRef, { phoneNumber });
      console.log('Phone number updated in Firestore.');
      console.log(uid);
    } catch (error) {
      console.error('Error updating phone number:', error);
    }
  }
  

  async signOut() {
    await signOut(this.auth);
  }
}
