import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'angular-project';

  loginForm = this.fb.group({
    account: ['', Validators.required],
    password: ['', Validators.required]
  });

  // httpOptions = {
  //   headers: new HttpHeaders({
  //     'Content-Type':  'application/json',
  //     TQ: 'test'
  //   })
  // }

  switch = 2;
  old = 18;

  games$ : Observable<any>;

  private headers: Headers;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router
  ){
    this.headers = new Headers();
    this.headers.append('X-Pixelpai-TK', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVjYWFmZDgxZWI4MmE4NmY2YTM0YTJlMiIsInJvbGUiOjAsImNyZWRlbnRpYWwiOiJNb3ppbGxhLzUuMCAoTWFjaW50b3NoOyBJbnRlbCBNYWMgT1MgWCAxMF8xNl8wKSBBcHBsZVdlYktpdC81MzcuMzYgKEtIVE1MLCBsaWtlIEdlY2tvKSBUb29xaW5nU3R1ZGlvLzIuMC4xIENocm9tZS84MC4wLjM5ODcuMTYzIEVsZWN0cm9uLzguMi4xIFNhZmFyaS81MzcuMzYiLCJpYXQiOjE2MzU3MzU5MDAsImV4cCI6MTYzODM2MjQ2MH0.jXhQID0QcRfLSccij1pZgbLaSdw4FAX5-vLjdhMMbJU');
  }

  ngOnInit() {
    console.log('init');
    // this.getAvatars();
        // return this.http.get('/api/game/list?sorts[]=-giftExp&sorts[]=-updatedAt&pageSize=30').pipe(
    //   map((res: any) => {
    //     return res.data;
    //   }))
    this.games$ = this.http.get('/api/game/list?sorts[]=-giftExp&sorts[]=-updatedAt&pageSize=30').pipe(
      map((res: any) => {
        return res.data;
      })
    )
  }

  submitForm(){
    console.log('submit', this.loginForm.value);
  }

  chileSex(e){
    console.log('e', e);
  }

  toHome(){
    this.router.navigate(['home']);
  }

  public getAvatars(){
    return this.http.get('/api/game/list?sorts[]=-giftExp&sorts[]=-updatedAt&pageSize=30').pipe(
      map((res: any) => {
        return res.data;
      })
    )
  }

  test() {
    return '1';
  }

  change() {
    this.old = 20;
  }
}
