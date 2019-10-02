import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { Validators } from 'angular-reactive-validation';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['../login/login.component.scss']
})
export class RegistrationComponent implements OnInit {
  userForm: FormGroup;
  submitted = false;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    public ngxSmartModalService: NgxSmartModalService
  ) { }

  ngOnInit() {
    this.initUserForm();
  }

  initUserForm() {
    this.userForm = this.fb.group({
      name: new FormControl('', [
        Validators.required('Имя обязательно'),
        Validators.minLength(3, 'Минимум 3 символа'),
        Validators.maxLength(20, 'Максимум  20 символов'),
      ]),
      email: new FormControl('', [
        Validators.required('Email обязателен'),
        Validators.email('Неправильный формат')
      ]),
      password: new FormControl('', [
        Validators.required('Пароль обязателен'),
        Validators.minLength(6, 'Минимум 6 символов'),
        Validators.maxLength(40, 'Максимум 40 символов'),
      ]),
    });
  }

  createUser(value) {
    this.submitted = true;
    if (this.userForm.invalid) {
      return;
    }
    this.auth.createUser(value);
    this.ngxSmartModalService.getModal('registration').close();
  }
}
