import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxSmartModalService } from 'ngx-smart-modal';

@Component({
  selector: 'app-login-popup',
  templateUrl: './login-dialog.component.html',
  styleUrls: ['./login-dialog.component.scss']
})

export class LoginDialogComponent implements OnInit {
  userForm: FormGroup;
  errorMsg = '';
  private navigationExtras: NavigationExtras;

  constructor(
    private fb: FormBuilder,
    public authService: AuthService,
    public router: Router,
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

  handleSubmit(user): void {
    this.authService.login(user).subscribe(result => {
      if (result.length > 0) {
        this.ngxSmartModalService.getModal('login').close();
        const redirect = this.authService.redirectUrl ? this.router.parseUrl(this.authService.redirectUrl) : '/';
        this.router.navigateByUrl(redirect, this.navigationExtras);
        const key = 'isLoggedIn';
        localStorage.setItem(key, 'true');
        // return this.authService.isLoggedIn = true;
      } else {
        this.errorMsg = 'Ошибка авторизации';
      }
    });
  }
}
