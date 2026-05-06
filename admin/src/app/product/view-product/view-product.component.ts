import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormsModule],
  templateUrl: './view-product.component.html',
  styleUrls: ['./view-product.component.css']
})
export class ViewProductComponent implements OnInit {

  products: any[] = [];
  filteredProducts: any[] = [];

  showEditModal = false;
  editingProduct: any = null;
  selectedFile: File | null = null;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.loadProducts();
  }

  // ─────────────────────────────
  // LOAD PRODUCTS
  // ─────────────────────────────
  loadProducts() {
    this.http.get<any>('http://localhost:3000/api/product')
      .subscribe((data) => {
        this.products = Array.isArray(data) ? data : data.products || [];
        this.filteredProducts = [...this.products];
      });
  }

  // ─────────────────────────────
  // SEARCH
  // ─────────────────────────────
  onSearch(term: string) {
    if (!term.trim()) {
      this.filteredProducts = [...this.products];
      return;
    }

    const lower = term.toLowerCase();
    this.filteredProducts = this.products.filter(p =>
      p.pname?.toLowerCase().includes(lower) ||
      p.category?.toLowerCase().includes(lower) ||
      p.pdesc?.toLowerCase().includes(lower)
    );
  }

  // ─────────────────────────────
  // EDIT
  // ─────────────────────────────
  editProduct(product: any) {
    this.editingProduct = { ...product }; // keep _id
    this.selectedFile = null;
    this.showEditModal = true;
  }

  closeModal() {
    this.showEditModal = false;
    this.editingProduct = null;
    this.selectedFile = null;
  }

  onEditFile(event: any) {
    if (event.target.files.length > 0) {
      this.selectedFile = event.target.files[0];
    }
  }

  // ─────────────────────────────
  // SAVE EDIT (WORKING VERSION)
  // ─────────────────────────────
  saveEdit() {
    if (!this.editingProduct?._id) {
      alert('Invalid product ID');
      return;
    }

    const formData = new FormData();
    formData.append('pname', this.editingProduct.pname);
    formData.append('category', this.editingProduct.category);
    formData.append('pdesc', this.editingProduct.pdesc);
    formData.append('price', this.editingProduct.price);
    formData.append('qty', this.editingProduct.qty);

    if (this.selectedFile) {
      formData.append('photo', this.selectedFile);
    }

    this.http.put(
      `http://localhost:3000/api/product/${this.editingProduct._id}`,
      formData
    ).subscribe({
      next: () => {
        this.closeModal();
        this.loadProducts();
      },
      error: (err) => {
        console.error('Update Error:', err);
        alert(err?.error?.message || 'Update failed');
      }
    });
  }

  // ─────────────────────────────
  // DELETE
  // ─────────────────────────────
  deleteProduct(id: string) {
    if (!confirm('Are you sure you want to delete this product?')) return;

    this.http.delete(`http://localhost:3000/api/product/${id}`)
      .subscribe(() => {
        this.products = this.products.filter(p => p._id !== id);
        this.filteredProducts = this.filteredProducts.filter(p => p._id !== id);
      });
  }
}