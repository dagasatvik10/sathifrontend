import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { AppConfig } from '../app.config';
import { Post } from '../_models/index';

@Injectable()
export class PostService {
    constructor(private http: HttpClient, private config: AppConfig) { }

    getAll(): Observable<Post[]> {
        return this.http.get<Post[]>(`${this.config.apiUrl}/posts`, this.jwt());
    }

    getById(id: number) {
        return this.http.get(`${this.config.apiUrl}/posts/${id}`, this.jwt());
    }

    create(post: Post) {
        return this.http.post(`${this.config.apiUrl}/posts`, post, this.jwt());
    }

    update(post: Post) {
        return this.http.put(`${this.config.apiUrl}posts/${post.id}`, post, this.jwt());
    }

    delete(id: number) {
        return this.http.delete(`${this.config.apiUrl}/posts/${id}`, this.jwt());
    }

    private jwt() {
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser && currentUser.token) {
            const headers = new HttpHeaders().set('Authorization', `Bearer ${currentUser.token}`);
            return {headers};
        }
    }
}
