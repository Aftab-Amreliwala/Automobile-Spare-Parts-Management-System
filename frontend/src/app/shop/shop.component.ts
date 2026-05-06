import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-shop',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {

  products: any[] = [];
  isLoading = true;
  errorMsg = '';
  searchText: string = '';

  cart: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.getProducts();
    this.loadCart();
  }

  // 🔹 Load Cart
  loadCart() {
    const data = localStorage.getItem('cart');
    this.cart = data ? JSON.parse(data) : [];
  }

  // 🔹 Save Cart
  saveCart() {
    localStorage.setItem('cart', JSON.stringify(this.cart));
  }

  // 🔹 API Call
  getProducts(): void {
    this.http.get<any>('http://localhost:3000/api/product').subscribe({
      next: (res) => {
        this.products = Array.isArray(res) ? res : res?.products || [];
        this.isLoading = false;
      },
      error: () => {
        this.errorMsg = 'Could not load products';
        this.isLoading = false;
      }
    });
  }

  // 🔹 Search Filter
  filteredProducts() {
    if (!this.searchText) return this.products;

    return this.products.filter(p =>
      p.pname.toLowerCase().includes(this.searchText.toLowerCase())
    );
  }

  // 🔹 Add to Cart
  addToCart(product: any) {
    const existing = this.cart.find(p => p._id === product._id);

    if (existing) {
      existing.quantity += 1;
    } else {
      this.cart.push({ ...product, quantity: 1 });
    }

    this.saveCart();
    alert('Added to cart ✅');
  }

  // 🔹 Cart Count
  getCartCount() {
    return this.cart.reduce((total, item) => total + item.quantity, 0);
  }
  // 🔹 Popup control
isCartOpen = false;

// 🔹 Open / Close
toggleCart() {
  this.isCartOpen = !this.isCartOpen;
}

// 🔹 Remove item
removeItem(index: number) {
  this.cart.splice(index, 1);
  this.saveCart();
}

// 🔹 Total price
getTotalPrice() {
  return this.cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
}
// 🔹 Increase quantity
increaseQty(item: any) {
  item.quantity += 1;
  this.saveCart();
}

// 🔹 Decrease quantity
decreaseQty(item: any) {
  if (item.quantity > 1) {
    item.quantity -= 1;
  } else {
    this.cart = this.cart.filter(p => p._id !== item._id);
  }
  this.saveCart();
}
}