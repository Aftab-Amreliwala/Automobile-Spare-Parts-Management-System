import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-admin-orders',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.css']
})
export class AdminOrdersComponent implements OnInit {

  orders: any[] = [];
  isLoading = true;

  selectedOrderIndex: number | null = null;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.getOrders();
  }

  // 🔹 Fetch orders
  getOrders() {
    this.http.get<any[]>('http://localhost:3000/api/order')
      .subscribe({
        next: (res) => {
          this.orders = res;
          this.isLoading = false;
        },
        error: () => {
          alert('Error loading orders ❌');
          this.isLoading = false;
        }
      });
  }

  // 🔹 Toggle details
  toggleDetails(index: number) {
    this.selectedOrderIndex =
      this.selectedOrderIndex === index ? null : index;
  }
}