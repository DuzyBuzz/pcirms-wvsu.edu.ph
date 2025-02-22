import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { User } from 'firebase/auth';
import { AuthService } from './auth/auth.service';
import { FormsModule } from '@angular/forms';
import { SidePanelComponent } from "./core/side-panel/side-panel.component";

@Component({
  selector: 'app-root',
  imports: [LoginComponent, CommonModule, RouterOutlet, FormsModule, SidePanelComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  user$: Observable<User | null>;
  phoneExists: boolean | null = null; // Track if the phone number exists

  constructor(private authService: AuthService) {
    this.user$ = this.authService.user$;
  }

  async ngOnInit() {
    this.user$.subscribe(async (user) => {
      if (user) {
        this.phoneExists = await this.authService.checkPhoneNumber(user.uid);
      } else {
        this.phoneExists = false; // No user, force login screen
      }
    });
  }
}