import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../user.interface';
import { UserService } from '../user.service';
import { Observable } from 'rxjs';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  // uid = this.auth.uid;
  user: Observable<User> = this.userService.getUser();
  userForm: FormGroup;
  constructor(
    private userService: UserService,
    private auth: AuthService,
    private fb: FormBuilder,
  ) { }

  ngOnInit() {
    this.initUserForm();
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
