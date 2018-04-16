import { Injectable } from '@angular/core';
import {Http, Headers, RequestOptions} from '@angular/http';
import { Observable} from 'rxjs/Observable';
import { Member } from '../models/Member';
import { Component, OnInit } from '@angular/core';
import { OktaAuthService } from '@okta/okta-angular';
import 'rxjs/Rx';
import 'rxjs/add/operator/map';

@Injectable()
export class AddProfileService {

  messages: Array<Member> [];

  constructor(private oktaAuth: OktaAuthService, private http: Http) {
    this.messages = [];
  }

  private serverApi = 'http://localhost:3001';

  private MemberObj: Member;

  async findMemberById(id: String, callback) {

    let URI = `${this.serverApi}/thg/findById`;

    let body = JSON.stringify({_id: id});

    console.log(body);

    const accessToken = await this.oktaAuth.getAccessToken();

    const finalStr = 'Bearer ' + accessToken;

    console.log('token is : ' + JSON.stringify(accessToken, null, 2));

    const headers = new Headers({
      Authorization: finalStr
    });

    console.log('token is : ' + finalStr);

    headers.append('Content-Type', 'application/json');

    return this.http.post(URI, body , { headers: headers })
      .map(res => res.json())
      .subscribe(response => {

        this.MemberObj = <Member> response;

      });

/*    return this.http.get(URI)
      .map(res => res.json())
      .map(res => <Member> res.obj);*/

  }

/*  public addList(list: List) {
    let URI = `${this.serverApi}/bucketlist/`;
    let headers = new Headers;
    let body = JSON.stringify({title: list.title, description: list.description, category: list.category});
    console.log(body);
    headers.append('Content-Type', 'application/json');
    return this.http.post(URI, body ,{headers: headers})
      .map(res => res.json());
  }*/

}
