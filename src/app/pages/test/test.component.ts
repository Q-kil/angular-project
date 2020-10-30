import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { localDB } from 'src/app/shared/util/storage';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit {
  loginForm: FormGroup;
  isSubmitting = false;

  menus = [];

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

}
