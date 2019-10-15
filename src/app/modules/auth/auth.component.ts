import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { Errors, UserService } from '../core';

@Component({
    selector:'auth',
    templateUrl:'auth.component.html'
})
export class AuthComponent {
  
  authType: String = 'login';
  title: String = 'Login';
  errors: Errors = {errors: {}};
  isSubmitting = false;
  authForm: FormGroup;

  constructor (
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private fb: FormBuilder
  ) {
    // use FormBuilder to create a form group
    this.authForm = this.fb.group({
      'email': ['', Validators.required],
      'password': ['', Validators.required]
    });
  }

  ngOnInit() { 
    // if token expire 
    if(this.userService.isTokenExpired()){
      this.userService.logout();
    }else{
      this.router.navigate(['/dashboard'])
    }
    
  }
  
  
  /**
   * this function toggle the form between login to register 
   * @param loginMode  it will be 'login' or 'register', it depends on which button click on form
   * @param loginMode if it is register than add a new filed in form (username)
   * return void  
   */
  changeMode(loginMode:string):void {
    //change screen
    loginMode == 'login' ? this.authType = 'login' : this.authType = 'register';    
    //change title
    this.title = (loginMode === 'login') ? 'Sign in' : 'Sign up';

    if(loginMode == 'register'){
      // add form control for username if this is the register page
      if (this.authType === 'register') {
        this.authForm.addControl('username', new FormControl());
      } 
    }
  }



  submitForm() {
    this.isSubmitting = true;
    this.errors = {errors: {}};
    
    const credentials = this.authForm.value;    
    this.userService
    .attemptAuth(this.authType, credentials)
    .subscribe(
      data => {   
        console.log(this.userService.getCurrentUser())     
        this.router.navigateByUrl('/dashboard')
        
      },
      err => {
        this.errors = err;
        this.isSubmitting = false;
      }
    );
  }

  
}