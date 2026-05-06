import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  cart: any[] = [];

  user = {
    name: '',
    phone: '',
    address: ''
  };

  isPlacingOrder = false;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadCart();
  }

  // 🔹 Load cart
  loadCart() {
    const data = localStorage.getItem('cart');
    this.cart = data ? JSON.parse(data) : [];
  }

  // 🔹 Total price
  getTotalPrice() {
    return this.cart.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  }

  // 🔹 Place order
  placeOrder() {

    if (!this.user.name || !this.user.phone || !this.user.address) {
      alert('Please fill all details ❗');
      return;
    }

    if (this.cart.length === 0) {
      alert('Cart is empty ❗');
      return;
    }

    this.isPlacingOrder = true;

    const orderData = {
      name: this.user.name,
      phone: this.user.phone,
      address: this.user.address,
      items: this.cart,
      totalAmount: this.getTotalPrice()
    };

    this.http.post('http://localhost:3000/api/order/create', orderData)
      .subscribe({
        next: () => {
          alert('Order placed successfully ✅');

          // clear cart
          localStorage.removeItem('cart');
          this.cart = [];

          // reset form
          this.user = { name: '', phone: '', address: '' };
          this.isPlacingOrder = false;
        },
        error: () => {
          alert('Error placing order ❌');
          this.isPlacingOrder = false;
        }
      });
  }
}