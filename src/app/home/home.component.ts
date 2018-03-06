import { Component, OnInit } from '@angular/core';

import { Post, User } from '../_models/index';
import { PostService } from '../_services/index';

@Component({
    moduleId: module.id,
    templateUrl: 'home.component.html'
})
export class HomeComponent implements OnInit {
    currentUser: User;
    posts: Post[] = [];

    constructor(private postService: PostService) {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    }

    ngOnInit() {
        this.loadAllPosts();
    }

    private loadAllPosts() {
        this.postService.getAll().subscribe(posts => { this.posts = posts; });
    }
}
