import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TwilioService {
  private backendUrl = 'http://localhost:3000'; // Update if your Node.js server URL is different

  constructor(private http: HttpClient) {}

  sendOTP(phoneNumber: string, otp: string): Observable<any> {
    return this.http.post(`${this.backendUrl}/send-otp`, { phoneNumber, otp });
  }
}
