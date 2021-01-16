import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { localDB } from 'src/app/shared/util/storage';
import { delay, take } from "rxjs/operators";

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit {
  loginForm: FormGroup;
  isSubmitting = false;

  menus = [];

  cities = [{name: 'New York', code: 'NY'},
  {name: 'Rome', code: 'RM'},
  {name: 'London', code: 'LDN'},
  {name: 'Istanbul', code: 'IST'},
  {name: 'Paris', code: 'PRS'}];

  private tempMsg$: BehaviorSubject<string> = new BehaviorSubject<string>(null);
  tempMsgObserver = this.tempMsg$.asObservable();

  constructor(
    private fb: FormBuilder
  ) {
    this.loginForm = this.fb.group({
      account: ["", Validators.required]
    });

    this.menus = [{ label: "退出", value: "logout" }, { label: "首页", value: "home" }];
  }

  ngOnInit() {
    localDB.set('test', '222');
    const test = localDB.get('test');
    console.log('test', test);
    // localDB.remove('test');
    // localDB.remove('test');
    localDB.clear();

    this.tempMsgObserver.subscribe(mes => {
      console.log('observer', mes);
    })
  }

  submitForm() {
    console.log('this.', this.loginForm.value);
    const { account } = this.loginForm.value;
    console.log('account', account);
    this.signin(account);
  }

  signin(account: string) {
    console.log('}{', { account });
  }

  addTemp(message: string) {
    this.tempMsg$.next(message);
    // this.tempMsg$.pipe(delay(200), take(null));
  }

  mes() {
    this.addTemp('正在自动保存...');
    this.addTemp('');
  }

}
