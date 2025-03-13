import { Component, ViewEncapsulation, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class DashboardComponent {

  email: string = '';

  private router = inject(Router);

  navigateToUser() {
    this.router.navigate(['/dashboard/user']);
  }

  setEmail(email: string) {
    this.email = email;
  }
}
