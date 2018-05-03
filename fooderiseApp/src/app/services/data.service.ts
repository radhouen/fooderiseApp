import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class DataService {

  private messageSource = new BehaviorSubject<boolean>(true);
  private token = new BehaviorSubject<string>('');
  private foodGroup = new BehaviorSubject<Array<any>>([]);
  currentMessage = this.messageSource.asObservable();

  constructor() { }

  changeMessage(message: boolean) {
    this.messageSource.next(message);
  }

  changeFoodGroup(foodGroup: Array<any>) {
    this.foodGroup.next(foodGroup);
  }
  saveToken(token: string) {
    this.token.next(token);
  }
  distroyToken() {
    this.token.next('');
  }
  getToken() {
    return this.token;
  }
  getFoodGroup() {
    return this.foodGroup ;
  }

}
