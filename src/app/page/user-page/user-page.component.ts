import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router'
import { HttpClient } from '@angular/common/http';

import { User } from '../main-page/main-page.component';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.scss']
})



export class UserPageComponent implements OnInit {
  userForm!: FormGroup;
  constructor(private route: ActivatedRoute, private http: HttpClient
    ) { }
  ngOnInit(): void {
    this.createUserForm()
  }
  isDisabled = false
  createUserForm() {
    const id = this.route.snapshot.paramMap.get('id');
    console.log(id);
      this.http.get<User>(`https://jsonplaceholder.typicode.com/users/${id}`)
      .subscribe(user => {
        this.userForm = new FormGroup({
          email: new FormControl({ value: user.email, disabled: true},  [
            Validators.email,
            Validators.required,
          ]),
          name: new FormControl({ value: user.name, disabled: true}, [
            Validators.required,
          ]),
          username: new FormControl({ value: user.username, disabled: true}, [
            Validators.required,
          ]),
          phone: new FormControl({ value: user.phone, disabled: true}, [
            Validators.required,
          ]),
          website: new FormControl({ value: user.website, disabled: true}, [
            Validators.required,
          ]),
          comment: new FormControl({ value: '', disabled: true}, [])
          ,
          address: new FormGroup({
            street: new FormControl({ value: user.address.street, disabled: true}, [
              Validators.required,
            ]),
            city: new FormControl({ value: user.address.city, disabled: true}, [
              Validators.required,
            ]),
            zipcode: new FormControl({ value: user.address.zipcode, disabled: true} , [
              Validators.required,
            ]),
          }),
      })
    })
  }
  validForm = false
  editForm() {
    this.userForm.enable()
   this.validForm = !this.validForm
    this.isDisabled = !this.isDisabled
  }
  
  pushForm() {
    console.log(JSON.stringify(this.userForm.value))
  }
}
