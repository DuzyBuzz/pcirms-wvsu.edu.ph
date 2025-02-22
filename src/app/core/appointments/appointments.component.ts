import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FullCalendarModule } from '@fullcalendar/angular'; // Import FullCalendar
import dayGridPlugin from '@fullcalendar/daygrid'; // Import Day Grid View
import interactionPlugin from '@fullcalendar/interaction'; // For event interaction

@Component({
  selector: 'app-appointments',
  imports: [CommonModule, FullCalendarModule],
  templateUrl: './appointments.component.html',
  styleUrl: './appointments.component.css'
})
export class AppointmentsComponent {
  // Define calendar options
  calendarOptions = {
    contentHeight: '93vh', // Ensures it resizes automatically
    initialView: 'dayGridMonth', // Default View (Month)
    plugins: [dayGridPlugin, interactionPlugin], // Use plugins
    events: [
      { title: 'Meeting', name: 'juan de la cruz', date: '2025-02-20' }, // Sample event
      { title: 'Birthday', date: '2025-02-25' }
    ],
    dateClick: this.handleDateClick.bind(this) // Handle date clicks
  };

  // Method to handle date click
  handleDateClick(arg: any) {
    alert('Date clicked: ' + arg.dateStr);
  }
  
}
