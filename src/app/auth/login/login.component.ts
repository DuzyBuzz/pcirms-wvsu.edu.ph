import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TwilioService } from '../../../../twilio-backend/services/twilio.service';

@Component({
  selector: 'app-login',
  standalone: true, // Use standalone components if not using `app.module.ts`
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'] // Fixed `styleUrls`
})
export class LoginComponent {
  phoneNumber: string = '';
  otp: string = '';
  showOTPInput: boolean = false;
  user$;
  generatedOTP: string | null = null; // Stores OTP temporarily
  otpMessage: string | null = null;
  phoneMessage: string | null = null;
  otpExpirationTime: number | null = null; // Stores OTP expiration timestamp
  timer: number = 60; // Countdown starts at 60 seconds
  isTimerRunning: boolean = false; // Track if the timer is active
  otpExpired: boolean = false; // Track OTP expiration
  interval: any; // Store timer interval reference
  
  constructor(private authService: AuthService, private twilioService: TwilioService) {
    this.user$ = this.authService.user$;
  }

  async login() {
    await this.authService.signInWithGoogle();
  }
  
  ngOnInit() {
    this.authService.user$.subscribe(user => {
      if (!user) {
        this.login(); // Automatically trigger Google Sign-In if user is not logged in
      }
    });
  }
  
  async signOut() {
    await this.authService.signOut();
  }

  validatePhoneNumber(): boolean {
    const phoneRegex = /^\+639\d{9}$/;
    if (!this.phoneNumber.trim()) {
      this.phoneMessage = '❌ Please enter a phone number.';
      return false;
    }
    if (!phoneRegex.test(this.phoneNumber)) {
      this.phoneMessage = '❌ Invalid format';
      return false;
    }
    this.phoneMessage = null; // Clear error if valid
    return true;
  }

  sendOTP() {
    if (!this.validatePhoneNumber()) return;

    this.generatedOTP = this.generateOTP(); // Generate a secure OTP
    this.otpExpirationTime = Date.now() + 60000; // Set OTP expiration (60 sec)
    this.showOTPInput = true; // Show OTP input field
    this.otpExpired = false; // Reset OTP expiration flag
    this.startTimer(); // Start the countdown timer

    this.twilioService.sendOTP(this.phoneNumber, this.generatedOTP).subscribe(
      response => {
        console.log('✅ OTP sent:', response);
        console.log('Generated OTP:', this.generatedOTP); // Debugging
      },
      error => {
        console.error('❌ Error sending OTP:', error);
      }
    );
  }

  verifyOTP() {
    if (!this.generatedOTP || Date.now() > (this.otpExpirationTime || 0)) {
      this.otpMessage = '❌ OTP expired. Please request a new one.';
      this.clearOTP();
      return;
    }

    if (this.otp === this.generatedOTP) {
      this.otpMessage = '✅ Correct OTP!';
      this.clearOTP();
    } else {
      this.otpMessage = '❌ Incorrect OTP. Try again.';
    }
  }

  private generateOTP(): string {
    return Math.floor(100000 + Math.random() * 900000).toString(); // Generate a 6-digit OTP
  }

  startTimer() {
    if (this.isTimerRunning) return; // Prevent multiple timers

    this.timer = 60; // Reset timer to 60 seconds
    this.isTimerRunning = true;
    this.otpExpired = false;

    this.interval = setInterval(() => {
      if (this.timer > 0) {
        this.timer--;
      } else {
        this.clearTimer();
        this.otpExpired = true;
        this.otpMessage = '❌ OTP Expired! Please request a new one.';
      }
    }, 1000);
  }

  clearTimer() {
    clearInterval(this.interval);
    this.isTimerRunning = false;
  }

  clearOTP() {
    this.generatedOTP = null;
    this.otpExpirationTime = null;
    this.clearTimer();
  }
}
