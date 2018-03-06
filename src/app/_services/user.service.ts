import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { AppConfig } from '../app.config';
import { User } from '../_models/index';

@Injectable()
export class UserService {
    constructor(private http: HttpClient, private config: AppConfig) { }

    create(user: User): Observable<User> {
        let params = new HttpParams();
        Object.keys(user).forEach(function (key) {
            params = params.append(key, user[key]);
        });

        params = params.append('c_password', user.password);

        return this.http.post<User>(`${this.config.apiUrl}/register`, params.toString(), {
            headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
        });
    }

}
