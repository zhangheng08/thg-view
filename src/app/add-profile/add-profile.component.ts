import { Component, OnInit } from '@angular/core';
import {Member} from '../models/Member';
import {AddProfileService} from '../services/add-profile.service';
import {Headers, Http} from '@angular/http';
import {OktaAuthService} from '@okta/okta-angular';
import {s} from '@angular/core/src/render3';

@Component({
  selector: 'app-add-profile',
  templateUrl: './add-profile.component.html',
  styleUrls: ['./add-profile.component.css']
})
export class AddProfileComponent implements OnInit {

  private serverApi = 'http://localhost:3001';
  private MemberObj: Member;
  private existArr: Array<Member>;
  private bibtexInput: string = '';

  constructor(private oktaAuth: OktaAuthService, private http: Http) { }

  ngOnInit() {

    this.loadMember();

  }

  public loadMember() {

    // this.MemberObj = this.adpServ.findMemberById('5ac446ba631e3c3890491e97', function(aMember) {
    //
    //   console.log(aMember);
    //   this.MemberObj = aMember;
    //   //this.MemberObj = JSON.stringify(aMember, null, 2);
    //
    // } );//.subscribe(response => this.MemberObj = response);

    //this.findMemberById('5ad014bbb1d7ab6f90ef88b3');

    this.checkExist();

  }

  async findMemberById(id: String) {

    let URI = `http://localhost:3001/thg/findById`;

    let body = JSON.stringify({_id: id});

    console.log(body);

    const accessToken = await this.oktaAuth.getAccessToken();

    const user = await this.oktaAuth.getUser();

    const finalStr = 'Bearer ' + accessToken;

    console.log('token is : ' + JSON.stringify(accessToken, null, 2));
    console.log('user is :' + user.email);

    const headers = new Headers({
      Authorization: finalStr
    });

    console.log('token is : ' + finalStr);

    headers.append('Content-Type', 'application/json');

    return this.http.post(URI, body , { headers: headers })
      .map(res => res.json())
      .subscribe(response => {

        this.MemberObj = <Member> response;
        console.log('member is : ' + JSON.stringify(this.MemberObj, null, 2));

      });

  }

  async checkExist() {

    let URI = `${this.serverApi}/thg/findByEmail`;

    const accessToken = await this.oktaAuth.getAccessToken();

    const user = await this.oktaAuth.getUser();

    let body = JSON.stringify({email: user.email});

    console.log(body);

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

        this.existArr = response;

        if (this.existArr.length === 0) {

          this.autoCreate();

        } else {

          this.MemberObj = this.existArr[0];
        }

      });

  }

  async autoCreate() {

    let URI = `${this.serverApi}/thg/add`;

    const accessToken = await this.oktaAuth.getAccessToken();

    const user = await this.oktaAuth.getUser();

    let body = JSON.stringify(
      {
          active: true,
          address: '',
          avatar: '',
          brief: '',
          chineseName: '',
          cv: '',
          email: user.email,
          enrolledYear: '',
          firstName: '',
          introduction: '',
          lastName: '',
          mobile: '',
          name: '',
          position: '',
          publications: []
        }
      );

    console.log(body);

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

        console.log(JSON.stringify(response, null, 2));

        if ( response.success) {

          this.checkExist();

        }

      });

  }

  async save() {

    let URI = `${this.serverApi}/thg/update`;

    const accessToken = await this.oktaAuth.getAccessToken();

    const user = await this.oktaAuth.getUser();

    let body = JSON.stringify(
      {
        _id: this.MemberObj._id,
        objmod: {
          active: true,
          address: this.MemberObj.address,
          avatar: this.MemberObj.avatar,
          brief: this.MemberObj.brief,
          chineseName: this.MemberObj.chineseName,
          cv: this.MemberObj.cv,
          email: this.MemberObj.email,
          enrolledYear: this.MemberObj.enrolledYear,
          firstName: this.MemberObj.firstName,
          introduction: this.MemberObj.introduction,
          lastName: this.MemberObj.lastName,
          mobile: this.MemberObj.mobile,
          name: this.MemberObj.name,
          position: this.MemberObj.position
        }
      }
    );

    console.log(body);

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

        console.log(JSON.stringify(response, null, 2));

        if ( response.success) {

          this.checkExist();

        }

      });

  }

  public saveClick() {

    console.log(this.MemberObj.firstName);
    this.save();

  }

  public addPubClick() {

    console.log(this.bibtexInput);
    this.addPub();

  }

  public delePubClick(pid) {

    console.log(this.MemberObj.firstName);
    this.deletePub(pid);

  }

  async deletePub(pid) {

    let URI = `${this.serverApi}/thg/deletePublication`;

    const accessToken = await this.oktaAuth.getAccessToken();

    const user = await this.oktaAuth.getUser();

    let body = JSON.stringify(
      {
        _id: this.MemberObj._id,
        pid: pid
      }
    );

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

        console.log(JSON.stringify(response, null, 2));

        if ( response.success) {

          this.checkExist();

        }

      });

  }

  async addPub() {

    if(this.bibtexInput === '') {
      console.log('bibtex is empty!');
      return;
    }

    let URI = `${this.serverApi}/thg/parserbibtex`;

    const accessToken = await this.oktaAuth.getAccessToken();

    const user = await this.oktaAuth.getUser();

    let body = JSON.stringify(
      {
        _id: this.MemberObj._id,
        bibtexStr: this.bibtexInput
      }

    );

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

        console.log(JSON.stringify(response, null, 2));

        if ( response.success) {

          this.checkExist();

        }

      });

  }

}
