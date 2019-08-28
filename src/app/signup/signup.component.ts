import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import sha1 from 'sha1';
import { AuthenticationService } from './../authentication.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  pwdHide: boolean = true;
  pwdValidation: boolean = false;
  signupForm: FormGroup;

  constructor(private auth: AuthenticationService,
    private formBuilder: FormBuilder,
    private _snackBar: MatSnackBar) { }

  ngOnInit() {
    this.signupForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      cardName: ['', []],
      cardNumber: ['', []],
      cardExp: ['', []],
      cardCode: ['', []]
    });
  }

  get formData() { return this.signupForm.controls; }

  signUp() {
    console.log(this.signupForm.value.password);

    let hash = sha1(this.signupForm.value.password);
    hash = hash.slice(0, 5);
    this.auth.getData(hash).subscribe(res => {
      if (res) {
        let makeArray = res.split("\n");

        for (let index = 0; index < makeArray.length; index++) {
          makeArray[index] = makeArray[index].split(":").pop();
        }
        makeArray.sort(this.sortNumber);

        if (makeArray[makeArray.length - 1] >= 500) {
          console.log(makeArray[makeArray.length - 1]);
          this._snackBar.open('This password is not Secure. Please choose another one', 'X', {
            duration: 4000,
            horizontalPosition: "right",
            verticalPosition: "top"
          });
          return !this.pwdValidation;
        } else {
          this._snackBar.open('Signup Successfully', 'X', {
            duration: 4000,
            horizontalPosition: "right",
            verticalPosition: "top"
          });
          return this.pwdValidation;
        }
      }
    })
  }

  sortNumber(a: number, b: number): number {
    return a - b;
  }
}
