import { Component } from '@angular/core';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dash.component.html',
  styleUrls: ['./admin-dash.component.css']
})
export class AdminDashboardComponent {
  isSidebarOpen = false;
  selected: string = 'dashboard';
  pageTitle: string = 'Dashboard';

  select(section: string) {
    this.selected = section;
    this.pageTitle = section.charAt(0).toUpperCase() + section.slice(1);
  }

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  logout() {
    // Implement logout logic here
    console.log('Logout clicked');
  }
}
