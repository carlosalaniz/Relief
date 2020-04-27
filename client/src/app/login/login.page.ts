import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthenticationService } from '../_services/authentication.service';
import { first } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  form: FormGroup;
  get f() { return this.form.controls; }
  returnUrl: string;
  loading = false;
  error: string;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthenticationService,
    private router: Router,
    private authenticationService: AuthenticationService,
    private route: ActivatedRoute
    ) { 

      if (this.authenticationService.currentUserValue) { 
        this.router.navigate(['/']);
      }
    }

  ngOnInit() {
    this.form = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  submit() {
    this.authService.login(this.f.username.value, this.f.password.value)
    .pipe(first())
    .subscribe(data => {
      this.router.navigate([this.returnUrl])
    },
    error => {
      this.error = error;
      this.loading = false;
    });
  }

}
