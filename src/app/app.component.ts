import {Component, OnInit} from '@angular/core';
import {AuthService} from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'gpnclient';


  constructor(private authService: AuthService) {
  }

  ngOnInit(): void {
    const localToken = this.authService.getToken();
    if (localToken !== null) {
      this.authService.setToken(localToken);
    }
  }

  public get isLoggedIn(): boolean {
    return this.authService.isAuthentificated();
  }

  logout(): void {
    this.authService.logout();
  }
}
