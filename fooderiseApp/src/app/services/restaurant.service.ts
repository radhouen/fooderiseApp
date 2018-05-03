import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Response} from '@angular/http';
import {Observable} from 'rxjs';
import 'rxjs/add/operator/map';
import {Restaurant} from '../models/restaurant';

@Injectable()
export class RestaurantService {

  readonly rootUrl = 'https://fooderise.herokuapp.com/api/Restaurants';
  constructor(private http: HttpClient) {}

  registerRestaurant(restaurant: Restaurant) {
    const body: Restaurant = {
      firstName: restaurant.firstName,
      lastName: restaurant.lastName,
      phoneNumber: restaurant.phoneNumber,
      facebookLink: restaurant.facebookLink,
      ville: restaurant.ville,
      codePostal: restaurant.codePostal
      };
    return this.http.post(this.rootUrl, body);
  }

}
