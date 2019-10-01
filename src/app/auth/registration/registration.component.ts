import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgxSmartModalService } from 'ngx-smart-modal';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['../login/login.component.scss']
})
export class RegistrationComponent implements OnInit {
  userForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    public ngxSmartModalService: NgxSmartModalService
  ) { }

  ngOnInit() {
    this.initUserForm();
  }

  createUser(value) {
    this.auth.createUser(value);
    this.ngxSmartModalService.getModal('registration').close();
  }

  initUserForm() {
    this.userForm = this.fb.group({
      name: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(20),
      ]),
      email: new FormControl('', [
        Validators.required,
        Validators.email
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(40),
      ]),
    });
  }
}
