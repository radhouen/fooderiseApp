import { FoodProfile } from './../../models/food-profile';
import { Component, OnInit } from '@angular/core';
import {User} from '../../models/user';
import {ClientService} from '../../services/client.service';
import { DataService } from '../../services/data.service';
import { Router } from '@angular/router';

import {NgForm} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.css']
})
export class InscriptionComponent implements OnInit {
  model = new User('', '', '', '', 1);
  foodProfile = new FoodProfile([], [], []);
  AccountType = [{'id': 1 , 'type' : 'Client'} ,
                 {'id': 2 , 'type' : 'Restaurant'} ];
  submitted = false;
  Error= [];
  token: '';
  message = true ;
  errorsMessage: '';
  modalShow = true ;
  foodGroup = [];
  intolerances = [];
  period = '';
  type: number;
  sportActivitiesHours = [];
 constructor(private userService: ClientService,
    private router: Router,
    private toastr: ToastrService ,
    private data: DataService) {}

/**
 * @returns return void users
 * @param form : User
 */
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
 * @returns foodProfile[{foodGroup},{intolerances},{sportActivitiesHours}]
 * @param form: model users
 */
  onSubmit(form: NgForm) {
    this.Error = [];
    const pattern = new RegExp(/[~`!#$%\^&*+=\-\[\]\\';,/{}|\\":<>\?]/).test(this.model.name);
    if (this.model.name.length < 2 || this.model.name.length > 20 || pattern) {
      this.Error.push('votre nom est invalid');
      }else {
        this.userService.registerClient(this.model)
        .subscribe((data: any) => {
          this.Error.push(data.message)  ;
          if (data.status === 1) {
            this.data.changeMessage(false);
            this.data.saveToken(data.token);
            localStorage.setItem('Token', data.token);
            this.foodProfile.foodGroup = data.foodProfile.foodGroup;
            this.foodProfile.intolerances = data.foodProfile.intolerances;
            this.foodProfile.sportActivitiesHours = data.foodProfile.sportActivitiesHours;
            this.modalShow = false ;
          } else {
            this.Error =  data.Errors[0];
            this.toastr.error(data.Errors[0]);
          }
          }, (Error: any) => {
            switch (Error.error.error.message) {
              case 'EmailExists': {
                this.Error.push(' Cette Email  existe ');
                 break ;
              }
              case 'PhoneNumberExists': {
                this.Error.push(' Cette Numero de telephone  existe ');
                break;
              }
              case 'PhoneNumberNotValid': {
                this.Error.push(' Cette Numero de telephone  est invalid ');
                break;
              }
              default: {
                this.Error.push('Merci de verifier votre donneés');
                 break;
              }
           }
          }
        );
      }
}
  /**
   * @returns return TypeAccount
   * @param args : string
   */
  selectchange(args) {
    this.type = args.target.value;
    console.log(' account type : ', this.type);
    this.model.accountType = this.type ;
    console.log('model' , this.model);
  }
  /**
   * get radio button modification
   */
  onSelectionChange(entry) {
    this.period = entry.id;
    console.log('sportActivityHours', this.period);
}

/**
 * @returns intolerances
 * @param option :string
 * @param event : event
 */
setIntolerances(option, event) {
  if (event.target.checked) {
    this.intolerances.push(option.id);
  } else {
    for (let i = 0 ; i < this.intolerances.length; i++) {
      if (this.intolerances[i] === option.id) {
        this.intolerances.splice(i, 1);
      }
    }
  }
  console.log('intolerances listes : ', this.intolerances);
}
/**
 * @returns array
 * @param option and event
 */

setFoodGroup(option, event) {
  if (event.target.checked) {
    this.foodGroup.push(option.id);
  } else {
    for (let i = 0 ; i < this.foodGroup.length; i++) {
      if (this.foodGroup[i] === option.id) {
        this.foodGroup.splice(i, 1);
      }
    }
  }
  console.log('foodGroup listes : ', this.foodGroup);
}
/**
 * @returns
 */
foodProfileSave() {
const foodProfile = {
 'foodGroup' : this.foodGroup,
 'intolerances': this.intolerances,
 'sportActivitiesHours': this.period
};
const token = localStorage.getItem('Token');
console.log('food profile' , foodProfile);
console.log('Token' , token);
this.userService.saveFoodProfile(token, foodProfile)
.subscribe((data: any) => {
  console.log(data.status);
  if (data.status === 1) {
    this.router.navigateByUrl('client');
  } else {
  }
  }, (Error: any) => {
 console.log('error', Error.error.error.message);
  }
);

}
/**
 * ngOnInit function
 */
  ngOnInit() {
     this.resetForm();
     this.data.currentMessage.subscribe(message => this.message = message);
  }

}
/*
{"status":1,"foodProfile":{"foodGroup":[{"title":"Végétarien","id":"5ad5128b654650042a466741"},{"title":"Végétalien","id":"5ad5129c654650042a466742"}],"intolerances":[{"title":"sans sucre","id":"5ad51367654650042a466746"},{"title":"sans poissons","id":"5ad51372654650042a466747"}],"sportActivitiesHours":{"title":"2 à 5 h/semaine ","id":"5ad51755ff12b50463b6ede6"}}}
*/
