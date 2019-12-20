import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastService } from '../toast/toast.service';
import { Subject } from 'rxjs';

export interface IUser {
  id?: number,
  username: string,
  password: string,
}
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user: IUser = {
    username: null,
    password: null,
  }
  constructor(private router: Router, private toastService: ToastService) {
  }

  ngOnInit() {

  }

  login(user: IUser) {
    
    const defaultUser = { username: 'nik', password: 'nik123' }
    if (this.user.username != null && this.user.password != null &&
      this.user.username !== '' && this.user.password !== '') {
      if (this.user.username === defaultUser.username && this.user.password === defaultUser.password) {
        localStorage.setItem('user', JSON.stringify(this.user));
        this.router.navigate(['cart', this.user])
      } else {
        this.toastService.showToast('danger', 5000, "username and/or password not matching default user credentials");
      }
    } else {
      this.toastService.showToast('warning', 5000, "username and/or password not specified");
    }
    console.log('the user is ', user)
  }

}
