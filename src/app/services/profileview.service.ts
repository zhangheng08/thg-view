import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import {Observable} from 'rxjs/Observable';
import { Member } from '../models/Member';

import 'rxjs/add/operator/map';

@Injectable()
export class ProfileviewService {

  constructor(private http: Http) { }

  private serverApi = 'http://localhost:3001';

  public getAllLists():Observable<Member[]> {

    let URI = `${this.serverApi}/thg/findAll`;

    return this.http.get(URI)
      .map(res => res.json())
      .map(res => <Member[]>res.lists);

  }

  public deleteList(listId : string) {
    let URI = `${this.serverApi}/thg/${listId}`;
    let headers = new Headers;
    headers.append('Content-Type', 'application/json');
    return this.http.delete(URI, {headers})
      .map(res => res.json());
  }
}
