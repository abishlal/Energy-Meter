import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
message : string ="";
usererror : string = ""
  constructor( private route: Router) { }
  login = new FormGroup({
    email: new FormControl('',[Validators.required, Validators.email]),
    password: new FormControl('',[Validators.required]),
  })
  ngOnInit(): void {
  }
  submit(){
    const auth = getAuth();
    let email = this.login.value.email;
    let password = this.login.value.password
    signInWithEmailAndPassword(auth, email, password).then((data)=>{
      this.message = "sucessfull",
      this.route.navigate(['/data'])
    }).catch((error)=>{
      this.message = "";
      this.usererror = error;
    })

  }

}
