import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { ToastService } from '../toast/toast.service';

export interface IBike {
  id: number;
  image: string;
  description: string;
  price: number;
  quantity: number;
}
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  bikes: Array<IBike> = [];
  name: string;
  total: number;
  taxAmount: number;
  subTotal: number;
  constructor(
    private http: Http,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private toastService: ToastService
  ) { }

  async ngOnInit() {
    this.bikes = await this.loadBikes();
  }

  async loadBikes() {
    let bikes = JSON.parse(localStorage.getItem('bikes'));
    if (bikes && bikes.length > 0) {
    } else {
      bikes = await this.loadBikesFromJson()
    }
    this.bikes = bikes;
    return bikes;
  }
  async loadBikesFromJson() {
    const bikes = await this.http.get('assets/inventory.json').toPromise();
    return bikes.json();
  }

  addBike(item: string) {
    console.log('the bike loaded is ', item)
    switch (item) {
      case 'BikeModel1':
        this.bikes.unshift({
          id: 1,
          image: "../../assets/bike1.jpeg",
          description: "Bike Model 1",
          price: 5000,
          quantity: 1
        });
        break;
      case 'BikeModel2':
        this.bikes.unshift({
          id: 2,
          image: "../../assets/bike2.jpeg",
          description: "Bike Model 2",
          price: 4000,
          quantity: 2
        });
        break;
      case 'BikeModel3':
        this.bikes.unshift({
          id: 3,
          image: "../../assets/bike3.jpeg",
          description: "Bike Model 3",
          price: 3000,
          quantity: 3
        });
        break;
    }
  }
  delete(index: number) {
    this.bikes.splice(index, 1);
    this.saveToLocalStorage();
  }

  checkout() {
    const data = this.calculate();
    this.router.navigate(['home', data])
  }

  calculate() {
      let owed = 0;
      for (let i = 0; i < this.bikes.length; i++) {
        owed += this.bikes[i].price * this.bikes[i].quantity;
      }
      return {
        subTotal: owed,
        taxAmount: owed * .1,
        total: owed + (owed * .1)
      };
      }
    
  


  saveToLocalStorage() {
    localStorage.setItem('bikes', JSON.stringify(this.bikes));
  }
}
