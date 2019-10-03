import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { User } from '../user.interface';
import { UserService } from '../user.service';
import { Observable } from 'rxjs';
import { AuthService } from '../../auth/auth.service';
import { switchMap } from 'rxjs/operators';
import { Validators } from 'angular-reactive-validation';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  user$: Observable<User[]> = this.userService.getCurrentUser();
  userForm: FormGroup;
  userPhoto$: Observable<string>;
  submitted = false;

  constructor(
    private userService: UserService,
    private auth: AuthService,
    private fb: FormBuilder,
  ) { }

  ngOnInit() {
    this.user$.subscribe((user) => {
      if (user[0].photo) {
        this.userPhoto$ = this.userService.getUserPhoto(user[0].photo);
      }
      this.initUserForm(user[0]);
    }
      // switchMap((user) => this.userPhoto$ = this.userService.getUserPhoto(user[0].photo))
    );
  }

  initUserForm(user) {
    this.userForm = this.fb.group({
      uid: new FormControl(user.uid),
      name: new FormControl(user.name, Validators.required('Имя обязательно')),
      email: new FormControl(user.email, Validators.required('Email обязателен')),
      phone: new FormControl(user.phone),
      photo: new FormControl(user.photo)
    });
  }

  handleSubmit(user: User) {
    this.submitted = true;
    if (this.userForm.invalid) {
      return;
    }

  }
}
