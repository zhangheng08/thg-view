import {Component, ElementRef, Input, OnInit, ViewChild, Renderer2} from '@angular/core';
import {Member} from '../models/Member';
import {Headers, Http, RequestOptions} from '@angular/http';
import {OktaAuthService} from '@okta/okta-angular';
import {Observable} from 'rxjs/Observable';
import {NgClass, NgStyle} from '@angular/common';
import {FileItem, FileUploader, ParsedResponseHeaders} from 'ng2-file-upload';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {BrowserModule} from '@angular/platform-browser';


@Component({
  selector: 'app-add-profile',
  templateUrl: './add-profile.component.html',
  styleUrls: ['./add-profile.component.css']
})

export class AddProfileComponent implements OnInit {

  //-------------------------------modify
  @ViewChild('uploadAvaInput')
  avaInput: ElementRef;
  @ViewChild('imgAva')
  imgAva: ElementRef;
  @ViewChild('pdfUploadInput')
  pdfUpload: ElementRef;
  @ViewChild('sliderUploadInput')
  sliderUpload: ElementRef;
  @ViewChild('pdfUploadBtn')
  pdfUploadBtn: ElementRef;
  @ViewChild('sliderUploadBtn')
  sliderUploadBtn: ElementRef;

  private serverApi = 'http://localhost:3001';
  private MemberObj: Member;
  private existArr: Array<Member>;
  private pdfPath: Array<string> = ['empty', 'empty'];//-------------------------------modify
  private bibtexInput: string = '';

  //-------------------------------modify
  private renderer2: Renderer2;

  public uploader: FileUploader = new FileUploader({
    url: 'http://localhost:3001/upload'
  });
  public hasBaseDropZoneOver: boolean = false;
  public hasAnotherDropZoneOver: boolean = false;

  public fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }

  public fileOverAnother(e: any): void {
    this.hasAnotherDropZoneOver = e;
  }

  constructor(private renderer: Renderer2, private oktaAuth: OktaAuthService, private http: Http) {

    this.uploader.onSuccessItem = this.successItem.bind(this);

  }
  //-------------------------------modify

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

    const URI = `http://localhost:3001/thg/findById`;//-------------------------------modify

    const body = JSON.stringify({_id: id});//-------------------------------modify

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

    const URI = `${this.serverApi}/thg/findByEmail`;//-------------------------------modify

    const accessToken = await this.oktaAuth.getAccessToken();

    const user = await this.oktaAuth.getUser();

    const body = JSON.stringify({email: user.email});//-------------------------------modify

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
          this.saveBrief(this.MemberObj._id);//-------------------------------modify
          this.imgAva.nativeElement.src = this.MemberObj.avatar;//-------------------------------modify

        }

      });

  }

  async autoCreate() {

    const URI = `${this.serverApi}/thg/add`;//-------------------------------modify

    const accessToken = await this.oktaAuth.getAccessToken();

    const user = await this.oktaAuth.getUser();

    const body = JSON.stringify(//-------------------------------modify
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

    const URI = `${this.serverApi}/thg/update`;//-------------------------------modify

    const accessToken = await this.oktaAuth.getAccessToken();

    const user = await this.oktaAuth.getUser();

    const body = JSON.stringify(//-------------------------------modify
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

  //-------------------------------modify
  async saveBrief(id) {

    const briefURI = `${this.serverApi}/thg/addBrief`;

    const accessToken = await this.oktaAuth.getAccessToken();

    const user = await this.oktaAuth.getUser();

    const body = JSON.stringify(
      {
        memberId: id,
        active: '',
        avatar: '',
        brief: '',
        enrolledYear: '',
        name: '',
        position: ''
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

    return this.http.post(briefURI, body , { headers: headers })
      .map(res => res.json())
      .subscribe(response => {

        console.log(JSON.stringify(response, null, 2));

        if ( response.success) {

          console.log('add memberbrief success.');

        }

      });

  }

  public updateAvatarClick() {

    this.avaInput.nativeElement.click();

  }
  //-------------------------------modify



  public saveClick() {

    console.log(this.MemberObj.firstName);
    this.save();

  }

  public addPubClick() {

    console.log(this.bibtexInput);
    if (this.uploader.queue.length >= 1) this.uploader.queue[0].upload();//-------------------------------modify
    if (this.uploader.queue.length >= 2) this.uploader.queue[1].upload();//-------------------------------modify
    this.addPub();


  }

  //-------------------------------modify
  public delePubClick(pid) {

    console.log(this.MemberObj.firstName);
    this.deconstePub(pid);

  }

  public uploadAvatar(event) {

    this.uploadFile(event);

  }

  public uploadPdfClick() {

    this.pdfUpload.nativeElement.click();

  }

  public uploadPdfOnChange(evt) {

    var fileName: string = '';
    var val = evt.target.value;
    val = val.substr(val.lastIndexOf('\\') + 1);
    this.pdfUploadBtn.nativeElement.innerHTML = val;

    if (this.uploader.queue.length > 1) {

      const lastIndex = this.uploader.queue.length - 1;
      const uid: string = (this.MemberObj._id);
      const afile = this.uploader.queue[lastIndex].file;
      afile.name = uid + 'and' + 0 + 'and' + val;
      fileName = afile.name;
      console.log(fileName);
      this.uploader.queue[0] = this.uploader.queue[lastIndex];
      this.uploader.queue.pop();

    } else {

      const uid: string = (this.MemberObj._id);
      const afile = this.uploader.queue[0].file;
      afile.name = uid + 'and' + 0 + 'and' + val;
      fileName = afile.name;
      console.log(fileName);
      this.uploader.queue[0].withCredentials = false;

    }

    this.pdfPath[0] = fileName;
    console.log(this.uploader.queue.length);

  }

  public uploadSliderClick() {

    this.sliderUpload.nativeElement.click();

  }

  public uploadSliderOnChanger(evt) {

    var fileName: string = '';
    var val = evt.target.value;
    val = val.substr(val.lastIndexOf('\\') + 1);
    this.sliderUploadBtn.nativeElement.innerHTML = val;

    if (this.uploader.queue.length > 2) {

      const lastIndex = this.uploader.queue.length - 1;
      const uid: string = (this.MemberObj._id);
      const afile = this.uploader.queue[lastIndex].file;
      afile.name = uid + 'and' + 1 + 'and' + val;
      fileName = afile.name;
      console.log(fileName);
      this.uploader.queue[1] = this.uploader.queue[lastIndex];
      this.uploader.queue.pop();

    } else {

      const uid: string = (this.MemberObj._id);
      const afile = this.uploader.queue[1].file;
      afile.name = uid + 'and' + 1 + 'and' + val;
      fileName = afile.name;
      console.log(fileName);
      this.uploader.queue[1].withCredentials = false;

    }

    this.pdfPath[1] = fileName;
    console.log(this.uploader.queue.length);

  }

  uploadFile(event) {

    /*const fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      const file: File = fileList[0];
      const formData: FormData = new FormData();
      formData.append('file', file, file.name);
      const headers = new Headers();
      headers.append('Content-Type', 'multipart/form-data');
      headers.append('Accept', 'application/json');
      const options = new RequestOptions({ headers: headers });
      this.http.post(`${this.serverApi}/upload`, formData, options)
        .map(res => res.json())
        .catch(error => Observable.throw(error))
        .subscribe(
          data => console.log('success'),
          error => console.log(error)
        );
    }*/

    const uid: string = (this.MemberObj._id);
    const afile = this.uploader.queue[0].file;
    const prefix: string = afile.name.substr(0, afile.name.lastIndexOf('.'));
    console.log(prefix);
    afile.name = uid + 'and' + afile.name;
    console.log(afile.name);
    this.uploader.queue[0].withCredentials = false;
    this.uploader.queue[0].upload();
    this.uploader.queue.length = 0;

  }

  async deconstePub(pid) {

    const URI = `${this.serverApi}/thg/deletePublication`;

    const accessToken = await this.oktaAuth.getAccessToken();

    const user = await this.oktaAuth.getUser();

    const body = JSON.stringify(
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
  //-------------------------------modify

  async addPub() {

    if (this.bibtexInput === '') {
      console.log('bibtex is empty!');
      return;
    }

    const URI = `${this.serverApi}/thg/parserbibtex`;

    const accessToken = await this.oktaAuth.getAccessToken();

    const user = await this.oktaAuth.getUser();

    const body = JSON.stringify(

      {
        _id: this.MemberObj._id,
        pdf: this.serverApi + '/upload_files/' + this.pdfPath[0],//-------------------------------modify
        slider: this.serverApi + '/upload_files/' + this.pdfPath[1],
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
          this.uploader.clearQueue();//-------------------------------modify
          this.pdfUploadBtn.nativeElement.innerHTML = 'choose <span style="font-weight: bold">pdf</span> to upload';
          this.sliderUploadBtn.nativeElement.innerHTML = 'choose <span style="font-weight: bold">slider</span> to upload';

        }

      });

  }

  public successItem(item: FileItem, response: string, status: number, headers: ParsedResponseHeaders): any {

    if (status === 200) {

      const tempRes = JSON.parse(response);
      console.log(tempRes);
      this.imgAva.nativeElement.src = this.serverApi + tempRes.filePath;
      console.log(this.imgAva.nativeElement.src);
      console.log(this.serverApi + tempRes.filePath + '---' + this.imgAva.nativeElement.src);
      this.saveAvatar(this.serverApi + tempRes.filePath);

    } else {

    }

    console.log(response + ' for ' + item.file.name + ' status ' + status);
  }

  async saveAvatar(avatarPath) {

    const URI = `${this.serverApi}/thg/update`;

    const accessToken = await this.oktaAuth.getAccessToken();

    const user = await this.oktaAuth.getUser();

    const body = JSON.stringify(
      {
        _id: this.MemberObj._id,
        objmod: {
          avatar: avatarPath
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

          //this.checkExist();

          console.log('avatar update success !');//-------------------------------modify

        }

      });

  }

}
