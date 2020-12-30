import {Inject, inject, Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Token} from '../models/token';
import {HttpClient} from '@angular/common/http';
import {API_URL} from '../app-injection-tokens';
import {JwtHelperService} from '@auth0/angular-jwt';
import {Router} from '@angular/router';
import {tap} from 'rxjs/operators';

export const ACCESS_TOKEN_KEY = '';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient,
    @Inject(API_URL) private apiUrl: string,
    private jwtHelper: JwtHelperService,
    private router: Router
  ) { }

  login (email: string, password: string): Observable<Token> {
    return this.http.post<Token>(`${this.apiUrl}api/users/login`, {
      email, password
    }).pipe(
      tap( token => {
        this.setToken(token.access_token);
//        localStorage.setItem(ACCESS_TOKEN_KEY, token.access_token);
      })
    );
  }

  isAuthentificated(): boolean {
    // var token = localStorage.getItem(ACCESS_TOKEN_KEY);
    var token = this.getToken();
    return token && !this.jwtHelper.isTokenExpired(token);
  }

  logout(): void {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
    this.router.navigate(['']);
  }
  setToken(accessToken: string): void {
    localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
  }
  getToken(): string {
    return localStorage.getItem(ACCESS_TOKEN_KEY);
  }
}
