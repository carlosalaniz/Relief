import { Component } from '@angular/core';
import { AuthenticationService } from '../_services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  constructor(
    private authService: AuthenticationService,
    private router: Router
    ) {}

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

}
