import {Injectable} from '@angular/core';
import {HttpClient , HttpHeaders} from '@angular/common/http';
import {Response} from '@angular/http';
import {Observable} from 'rxjs';
import 'rxjs/add/operator/map';
import {User} from '../models/user';

@Injectable()
export class ClientService {
  private _headers = new HttpHeaders().set('Content-Type', 'application/json');
  readonly rootUrl = 'https://fooderise.herokuapp.com/api/user/signup';
  readonly authtUrl = 'https://fooderise.herokuapp.com/api/user/auth';
  readonly profileAlimentaireUrl = 'https://fooderise.herokuapp.com/api/client/saveFoodProfile';
  constructor(private http: HttpClient) {}

  registerClient(client: User) {
    const body: User = {
      name: client.name,
      email: client.email,
      password: client.password,
      phoneNumber: client.phoneNumber,
      accountType: client.accountType
      } ;
    return this.http.post(this.rootUrl, body);
  }

  saveFoodProfile(token: string , body: any) {
    const headers = this._headers.append('Authorization', token);
    return this.http.post(this.profileAlimentaireUrl, body, { headers : headers } );
  }

  registerRestaurant(client: User) {
    const body: User = {
      name: client.name,
      email: client.email,
      password: client.password,
      phoneNumber: client.phoneNumber,
      accountType: client.accountType
      } ;
    return this.http.post(this.rootUrl, body).catch((err) => {
      return Observable.throw(err);
  });
  }


login(email: string, password: string) {
  const body = {
    'email': email,
    'password': password,
    } ;
  return this.http.post(this.authtUrl, body);
}

  }
