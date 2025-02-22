import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { trigger, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-side-panel',
  imports: [ CommonModule, FormsModule, RouterOutlet, RouterLink],
  templateUrl: './side-panel.component.html',
  styleUrl: './side-panel.component.css',
  animations: [
    trigger('dropdownAnimation', [
      transition(':enter', [
        style({ height: '0px', opacity: 0 }),
        animate('300ms ease-out', style({ height: '*', opacity: 1 }))
      ]),
      transition(':leave', [
        animate('200ms ease-in', style({ height: '0px', opacity: 0 }))
      ])
    ])
  ]
})

export class SidePanelComponent {
  isOpen: boolean = true; // Sidebar open state
  user$: any;
  isChildImmunizationOpen = false; // Controls dropdown visibility
activeRoute: any;

  constructor(private authService: AuthService,private router: Router) {
    this.user$ = this.authService.user$;
  }

  toggleSidebar() {
    this.isOpen = !this.isOpen; // Toggle sidebar state
  }
  async signOut() {
    await this.authService.signOut();
  }


  toggleChildImmunization() {
    this.isChildImmunizationOpen = !this.isChildImmunizationOpen;
  }

  navigateToChildImmunization() {
    this.router.navigate(['/immunization']);
  }
}
