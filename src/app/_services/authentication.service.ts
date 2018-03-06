import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { User } from '../_models';
import { AppConfig } from '../app.config';

@Injectable()
export class AuthenticationService {
    constructor(private http: HttpClient, private config: AppConfig) { }

    login(email: string, password: string): Observable<User> {
        const params = new HttpParams().set('email', email).set('password', password);
        return this.http.post<User>(`${this.config.apiUrl}/login`, params.toString(), {
            headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
        })
        .map(user => {

            if (user && user.token) {
                localStorage.setItem('currentUser', JSON.stringify(user));
            }

            return user;
        });
    }

    logout() {

        localStorage.removeItem('currentUser');
    }
}
