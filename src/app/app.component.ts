import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'angular-project';

  constructor(
    private http: HttpClient
  ) {}
  ngOnInit() {
    this.http.get(`/cdn/5e719a0a68196e416ecf7aad/.config.json?t=1621504450293`).subscribe(res => {
      console.log('res', res);
    });
  }
}
