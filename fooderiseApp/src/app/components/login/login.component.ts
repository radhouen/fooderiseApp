import {Component, OnInit} from '@angular/core';
import {User} from '../../models/user';
import {ClientService} from '../../services/client.service';
import {NgForm} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { AuthService } from 'angular4-social-login';
import { SocialUser } from 'angular4-social-login';
import { GoogleLoginProvider, FacebookLoginProvider} from 'angular4-social-login';

@Component({selector: 'app-login', templateUrl: './login.component.html', styleUrls: ['./login.component.css']})
export class LoginComponent implements OnInit {
  model = new User('', '', '', '', 0);
  submitted = false;
  errorsMessage= '';
  user: SocialUser;
  constructor(private userService: ClientService,
     private router: Router,
     private authService: AuthService,
     private toastr: ToastrService) {}

  resetForm(form?: NgForm) {
    this.model = {
      name: '',
      email: '',
      password: '',
      phoneNumber: '',
      accountType: 1
    };
  }
/**
 * @returns
 * @param mail: mail , password : text
 * @description auth with mail and password
 */
  onSubmit(form: NgForm) {
    this.userService.login(this.model.email, this.model.password)
      .subscribe((data: any) => {
        console.log(data.status);
        if (data.status === 1) {
          console.log('Token :', data.token);
          console.log('Name :', data.user.name);
          console.log('Email :', data.user.email);
          console.log('PhoneNumber :', data.user.phoneNumber);
          console.log('AccountType :', data.user.accountType);
        } else {
        }
        }, (Error: any) => {
          console.log('Errors ', Error.status);
          console.log('Errors ', Error.statusText);
          if (Error.statusText === 'Unauthorized') {
            this.errorsMessage = 'Merci de vérifier votre informations ' ;
          }
        }
      );
  }
/**
 * @returns
 * @description auth with google
 */
  signInWithGoogle(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }
/**
 * @returns
 * @description auth with facebook
 */
  signInWithFB(): void {
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID);
  }
/**
 * @returns
 * @description logout
 */
  signOut(): void {
    this.authService.signOut();
  }

  // TODO: Remove this when we're done
  get diagnostic() {
    return JSON.stringify(this.model);
  }
  ngOnInit() {
     this.resetForm();
     this.authService.authState.subscribe((user) => {
      this.user = user;
    });
  }

}
