import { DataService } from './../data.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormControl } from '@angular/forms';
import { Baby } from '../entities/baby';
import { Sitter } from '../entities/sitter';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from './../auth.service';
import { UsersService } from '../users.service';
import { User, IUser } from '../entities/user';
import { NgRedux } from '@angular-redux/store';
import { IAppState } from '../store';
import { ADD_BABY } from '../actions';

@Component({
  selector: 'app-register',
  styleUrls: ['./register.component.scss'],
  templateUrl: './register.component.html'
})
export class RegisterComponent implements OnInit {
  private registerForm;
  private registerBabyForm;
  private registerSitterForm;
  registrant: string;
  visible: boolean;
  sitterCreated: boolean;
  babyCreated: boolean;
  spinner: boolean;
  selectedValue: string;

  genders = [
    {value: 'Male'},
    {value: 'Female'},
  ];

  constructor(private data: DataService, private fb: FormBuilder, private router: Router, private usersService : UsersService,
    private ngRedux: NgRedux<IAppState>) { }

  ngOnInit() {
    this.babyCreated = false;
    this.sitterCreated = false;
    this.spinner = false; 

    this.registerBabyForm = this.fb.group({
      firstname: ['', Validators.compose([Validators.required, Validators.minLength(3)])],
      postalCode: [''],
      picture: [''],
      age: [''],
      gender: ['']
    });

    this.registerSitterForm = this.fb.group({
      firstname: [''],
      lastname: [''],
      picture: [''],
      age: [''],
      gender: [''],
      yearsOfExperience: [''],
      region: [''],
      phone: [''],
    });
  }

  onSubmit() {
    if (this.registerBabyForm.valid && this.registrant === 'baby') {
      this.spinner = true;
      let baby: Baby = this.registerBabyForm.value;

      // Redux
      this.usersService.createBaby(baby).subscribe(() => {       
        // Add the baby you just saved to the redux state (this is necessary due to auto-generated ID)
        this.usersService.getUsers().subscribe( (result : any[]) => {
          let foundBabies = result.filter(b => b.firstname === baby.firstname);
          this.ngRedux.dispatch({type: ADD_BABY, baby: foundBabies[foundBabies.length-1]});
          //Update UI
          this.spinner = false;        
          this.clearForm();
          this.router.navigate(['userregister']);
        });
      })
    } else if (this.registerSitterForm.valid && this.registrant === 'sitter') {
      this.spinner = true;
      let sitter : Sitter = this.registerSitterForm.value;

      this.usersService.createSitter(sitter).subscribe( x=> {
        // Update UI
        this.spinner = false;
        this.clearForm();
      });
    } else {
      alert("Fill out all fields");
    }
  }

  clearForm() {
    this.registerBabyForm.reset({
      firstname: [''],
      lastname: [''],
      postalCode: [''],
      picture: [''],
      age: [''],
      gender: [''],
      yearsOfExperience: [''],
      region: [''],
      phone: [''],
    });

    this.registerSitterForm.reset({
      firstname: [''],
      lastname: [''],
      postalCode: [''],
      picture: [''],
      age: [''],
      gender: [''],
      yearsOfExperience: [''],
      region: [''],
      phone: [''],
    })
  }
}
