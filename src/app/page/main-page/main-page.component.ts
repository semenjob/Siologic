import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';


export interface User {
  name: string
  username: string
  email: string
  phone: string
  website: string
  id: number
  address: {
    street: string
    city: string
    zipcode: string
    suite: string
    geo: {
      lat: string
      lng: string
    }
  }
  company: {
    name: string
    bs: string
    catchPhrase: string
  }
}


@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {
  users: User[] = [];
  loading = false
  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.getUser()
  }

  getUser() {
    this.loading = true
    //Пример загрузки 
    // setTimeout(() => {
      this.http.get<User[]>('https://jsonplaceholder.typicode.com/users?_limit=10')
      .subscribe(users => {
         this.users = users
         console.log(users)
         this.loading = false
      })
    // },500)
  }
  sortBy(sortType: string) {
    if (sortType === 'city') {
      this.users = this.users.sort((a, b) => a.address.city > b.address.city ? 1 : -1)
    }

    if(sortType === 'company') {
      this.users = this.users.sort((a, b) => a.company.name > b.company.name ? 1 : -1)
    }
  }
}
