import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { User } from '../user.interface';
import { UserService } from '../user.service';
import { Observable } from 'rxjs';
import { AuthService } from '../../auth/auth.service';
import { Validators } from 'angular-reactive-validation';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  user$: Observable<User[]> = this.userService.getCurrentUser();
  userForm: FormGroup;
  userPhoto$: Observable<any>;
  photoToUpload: FileList;
  userPhotoPath = '';
  submitted = false;

  constructor(
    private userService: UserService,
    private auth: AuthService,
    private fb: FormBuilder,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.user$.subscribe((user) => {
      if (user[0].photo) {
        this.userPhoto$ = this.userService.getUserPhoto(user[0].photo);
      }
      this.initUserForm(user[0]);
    });
  }

  initUserForm(user) {
    this.userForm = this.fb.group({
      id: new FormControl(user.id),
      name: new FormControl(user.name, Validators.required('Имя обязательно')),
      email: new FormControl(user.email, [
        Validators.required('Email обязателен'),
        Validators.email('Неправильный формат')
      ]),
      phone: new FormControl(user.phone,
        Validators.minLength(7, minLength => `Минимальная длина ${minLength} цифр`)),
      photo: new FormControl(user.photo),
      uid: new FormControl(user.uid)
    });
  }

  handleSubmit(user: User) {
    this.submitted = true;
    if (this.userForm.invalid) {
      return;
    }
    this.userService.updateUser(user.id, user)
      .then(() => {
        if (user.photo) {
          this.userService.uploadUserPhoto(this.photoToUpload)
            .then(() => this.userService.updateUser(user.id, {photo: this.userPhotoPath}));
        }
      })
      .then(() => this.toastr.success('Данные успешно обновлены', null, {
        timeOut: 3000
      }))
      .catch(error => this.toastr.error(error));
  }

  handlePhotoInput(files: FileList) {
    this.photoToUpload = files;
    this.userPhotoPath = `users/${this.photoToUpload[0].name}`;
  }
}
