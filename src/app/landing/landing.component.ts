import { Component, OnInit } from '@angular/core';
import { UsersService } from '../users.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {

  private isUserLoggedIn : boolean;
  baby: string;
  
  constructor(private usersService: UsersService, private route: ActivatedRoute) { 
    this.baby = route.snapshot.params['baby'];
  }
  
  ngOnInit() {

    if (this.usersService.isUserLoggedIn) {
      this.isUserLoggedIn = true;
    } else {
      this.isUserLoggedIn = false;
    }
    console.log(this.isUserLoggedIn);
  }



}
