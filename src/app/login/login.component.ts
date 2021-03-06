import { AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms'
import { Router } from '@angular/router';
import { UsersService } from '../users.service';
import { User } from '../entities/user';
import { NgRedux, select } from '@angular-redux/store';
import { IAppState, INITIAL_STATE } from '../store';
import { FETCH_DATA, LOGIN } from '../actions';
import { HttpClient } from '@angular/common/http';
import { DatabaseService } from '../database.service';

@Component({
  selector: 'app-login',
  styleUrls: ['./login.component.scss'],
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {
  private loginForm: FormGroup;
  private spinner: boolean;

  //Redux
  @select('users') users;

  // DI - Dependency Injection
  constructor(private fb: FormBuilder, private router: Router,
    private authService: AuthService, private usersService: UsersService,
    private database: DatabaseService,
    private ngRedux: NgRedux<IAppState>, private http: HttpClient) {
  }

  onSubmitLogin(loginForm) {
    this.spinner = true;
    // Try to login
    if (loginForm.valid) {
      console.log("Valid form");

      // Update users because this component was loaded before the users were updated     
      let userList = this.ngRedux.getState().users;
      let match: boolean = false;

      for (let i = 0; i < userList.length; i++) {
        let element: User = userList[i];
        if (element.email == loginForm.value.username) {
          if (element.password === loginForm.value.password) {
            match = true;
            this.authService.login(element).subscribe(() => {
              console.log("Now I am logged in!");
              
              // Hacky fix to wait for the redux subject to update
              setTimeout(() => {
                this.spinner = false;
                this.router.navigate(['profile'])}, 1500);
            })
          }
        }
      }
      if (!match) {
        alert("Wrong Credentials!")
      }
    } else {
      // Show errors and not send a request.
      alert("Fill out the fields, moron! ")
    }
  }

  createForm() {
    this.loginForm = this.fb.group({
      username: ['', Validators.compose([Validators.required, Validators.pattern("[^ @]*@[^ @]*")])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(5)])], 
    });
  }  

  //getUsers () {
   // this.usersService.getUsers().subscribe( (result : any[]) => {
    //  this.users = result.filter(user => user.customerId === '123user'); 
    //  console.log(this.users);
    //  console.log("Hello!")
   // });
 // }

  fetchUsers() {
    this.ngRedux.dispatch({type: FETCH_DATA, http: this.http})
  }

  ngOnInit() {
    this.spinner = false;
    this.createForm();
    this.fetchUsers();
  }

}
