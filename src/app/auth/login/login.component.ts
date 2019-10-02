import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { Validators } from 'angular-reactive-validation';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  userForm: FormGroup;
  authError: any;
  submitted = false;

  constructor(
    private fb: FormBuilder,
    public auth: AuthService,
    public ngxSmartModalService: NgxSmartModalService
  ) { }

  ngOnInit() {
    this.initUserForm();
  }

  initUserForm() {
    this.userForm = this.fb.group({
      email: new FormControl('', [
      Validators.required('Заполните поле'),
    ]),
      password: new FormControl('', [
        Validators.required('Заполните поле'),
      ])
    });
  }

  login(value) {
    this.submitted = true;
    if (this.userForm.invalid) {
      return;
    }
    this.auth.login(value.email, value.password);
    this.ngxSmartModalService.getModal('login').close();
  }

  logout() {
    this.auth.logout();
  }
}
