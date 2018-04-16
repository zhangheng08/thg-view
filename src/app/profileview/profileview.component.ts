import { Component, OnInit } from '@angular/core';
import { ProfileviewService } from '../services/profileview.service';
import { Member } from '../models/Member';

@Component({
  selector: 'app-profileview',
  templateUrl: './profileview.component.html',
  styleUrls: ['./profileview.component.css']
})

export class ProfileviewComponent implements OnInit {

  //lists propoerty which is an array of List type
  private lists: Member[] = [];

  constructor(private PvServ: ProfileviewService) { }

  ngOnInit() {

    //Load all list on init
    this.loadLists();
  }

  public loadLists() {

    //Get all lists from server and update the lists property
    this.PvServ.getAllLists().subscribe(response => this.lists = response);

  }


}
