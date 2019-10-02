import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../user.interface';
import { UserService } from '../user.service';
import { Observable } from 'rxjs';
import { AuthService } from '../../auth/auth.service';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  user$: Observable<User[]> = this.userService.getCurrentUser();
  userForm: FormGroup;
  userPhoto$;

  constructor(
    private userService: UserService,
    private auth: AuthService,
    private fb: FormBuilder,
  ) { }

  ngOnInit() {
    this.initUserForm();
    this.userPhoto$ = this.user$.pipe(
      switchMap((user) => this.userService.getUserPhoto(user[0].photo))
    );
  }

  initUserForm() {
    this.userForm = this.fb.group({
      uid: '',
      name: ['', [
        Validators.required,
        // Validators.pattern(/[А-я]/)
      ]
      ],
      email: '',
      phone: null,
      photo: ''
    });
  }

  handleSubmit(user: User) {}
}
