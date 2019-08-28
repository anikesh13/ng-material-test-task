import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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

  signupForm = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.email,
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6)
    ]),
    cardName: new FormControl(''),
    cardNumber: new FormControl(''),
    cardExp: new FormControl(''),
    cardCode: new FormControl('')
  });


  constructor(private auth: AuthenticationService) { }

  ngOnInit() {
  }

  signUp() {
    let hash = sha1(this.signupForm.value.pwdFormControl);
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
          return !this.pwdValidation;
        }
      } else {
        return this.pwdValidation;
      }
    })
  }

  sortNumber(a: number, b: number): number {
    return a - b;
  }
}
