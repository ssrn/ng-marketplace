import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgxSmartModalService } from 'ngx-smart-modal';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  userForm: FormGroup;
  authError: any;

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
      email: '',
      password: ''
    });
  }

  login(value) {
    this.auth.login(value.email, value.password);
    this.ngxSmartModalService.getModal('login').close();
  }

  logout() {
    this.auth.logout();
  }
}
