import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {
  invalidLogin: boolean = false;
  errorMessage:any=""
  returnedurl: any;
  loginForm:any = FormGroup;

  constructor(private FB: FormBuilder, private auth: AuthService, private router: Router, private route: ActivatedRoute) {

  }
  ngOnInit(): void {
    this.returnedurl = this.route.snapshot.queryParamMap.get('returnedurl');
    this.loginForm = this.FB.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.required],
    })
  }
  SignIn() {    
    if (this.loginForm.status === 'VALID') {
      this.auth.Login(this.loginForm.value).subscribe(
        {
          next: (res: any) => {
            this.invalidLogin = false;
            console.log(res);
            localStorage.setItem('userID', res.user._id);
            localStorage.setItem('token', res.token);
            this.router.navigate([this.returnedurl || '']);
          },
          error: (err) => {
            console.log(err);
            
            this.invalidLogin = true;
            this.errorMessage=err.error.message;
          
          }
        })
    }

  }
}
