import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Observable, ReplaySubject } from 'rxjs';

@Component({
  selector: 'fs-login-page',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent {
  logged = false;
  loginChange$ = new ReplaySubject<boolean>(1);

  login(loginData): Observable<void>{

  }

}
