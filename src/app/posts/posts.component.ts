import { HttpClient, HttpClientModule } from '@angular/common/http';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { report } from 'process';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent {
  posts: any[];
  private url = 'http://jsonplaceholder.typicode.com/posts';

  constructor(private http: HttpClient) { 
    http.get(this.url)
      .subscribe(response => {
        this.posts = response as any[];
      });
  }

  createPost(input: HTMLInputElement) {
    let post = { title: input.value };
    this.http.post(this.url, JSON.stringify(post))
      .subscribe(response => {
        post['id'] = input.id;
        this.posts.splice(0, 0, post);
      });
  }

  updatePost(post: HTMLInputElement) {
    this.http.patch(this.url + '/' + post.id, JSON.stringify({ isRead: true}))
      .subscribe(response => {
        console.log(response);
      });
    // this.http.put(this.url, JSON.stringify(post));
  }

  deletePost(post: HTMLInputElement) {
    this.http.delete(this.url + '/' + post.id)
      .subscribe(reponse => {
        let index = this.posts.indexOf(post);
        this.posts.splice(index, 1);
      });
  }
}
