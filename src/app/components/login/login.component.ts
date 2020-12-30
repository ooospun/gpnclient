import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  login(email: string, password: string): void {
//    console.log(email, password);
    this.authService.login(email, password).subscribe(res => {
      this.router.navigate(['/indicator']);
    }, error => {
      alert('Неправильный почтовый адрес или пароль.');
    });
  }
}
