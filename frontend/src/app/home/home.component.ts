import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { RouterLink } from '@angular/router';
import { HeroComponent } from '../hero/hero.component';
import { CartService } from '../cart/cart.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeroComponent, CommonModule, RouterLink],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  products: any[] = [];
  isLoading = true;
  errorMsg = '';

  constructor(
    private http: HttpClient,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts(): void {
    this.isLoading = true;
    this.errorMsg = '';
    this.products = [];

    this.http.get<any[]>('http://localhost:3000/api/product').subscribe({
      next: (res) => {
        // Filter active products (qty > 0)
        this.products = res.filter(p => p.qty > 0).slice(0, 8); // Top 8 featured
        this.isLoading = false;
      },
      error: (err) => {
        console.error('API error:', err);
        this.errorMsg = 'Could not load products. Is the backend running?';
        this.products = [];
        this.isLoading = false;
      }
    });
  }

  addToCart(product: any): void {
    this.cartService.addToCart(product);
  }
}
