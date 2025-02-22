import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TwilioService {

  private apiUrl = 'http://localhost:3000/send-otp'; // Your Node.js backend

  constructor(private http: HttpClient) { }

  sendOTP(phoneNumber: string, otp: string): Observable<any> {
    return this.http.post<any>(this.apiUrl, { phoneNumber, otp });
  }
}
