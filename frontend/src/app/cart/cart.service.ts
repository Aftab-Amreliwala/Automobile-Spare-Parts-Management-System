import { Injectable, computed } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

interface CartItem {
  _id: string;
  pname: string;
  price: number;
  photo: string;
  cartQty: number;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems = new BehaviorSubject<CartItem[]>([]);

  constructor() {
    const saved = localStorage.getItem('cartItems');
    if (saved) {
      try {
        this.cartItems.next(JSON.parse(saved));
      } catch (e) {
        console.error('Invalid cart data in localStorage', e);
        localStorage.removeItem('cartItems');
      }
    }
  }

  cart$ = this.cartItems.asObservable();

  cartCount$ = computed(() => {
    return this.cartItems.value.reduce((sum, item) => sum + item.cartQty, 0);
  });

  total$ = computed(() => {
    return this.cartItems.value.reduce((sum, item) => sum + (item.price * item.cartQty), 0);
  });

  private saveToStorage() {
    localStorage.setItem('cartItems', JSON.stringify(this.cartItems.value));
  }

  getCart() {
    return this.cartItems.value;
  }

  addToCart(product: any) {
    const currentCart = [...this.cartItems.value];
    const existingIndex = currentCart.findIndex(p => p._id === product._id);

    if (existingIndex > -1) {
      currentCart[existingIndex].cartQty += 1;
    } else {
      const newItem: CartItem = { 
        ...product, 
        cartQty: 1 
      };
      currentCart.push(newItem);
    }
    this.cartItems.next(currentCart);
    this.saveToStorage();
  }

  removeFromCart(id: string) {
    const currentCart = this.cartItems.value.filter(p => p._id !== id);
    this.cartItems.next(currentCart);
    this.saveToStorage();
  }

  clearCart() {
    this.cartItems.next([]);
    localStorage.removeItem('cartItems');
  }
}