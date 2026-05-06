import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

  product = {
    category: '',
    pname: '',
    pdesc: '',
    price: null,
    qty: null,
    date: new Date()
  };

  categories: any[] = [];
  selectedFile: File | null = null;
  successMsg = '';
  errorMsg = '';

  constructor(private http: HttpClient) {}

  ngOnInit() {
    // Load categories for the dropdown
    this.http.get<any>('http://localhost:3000/api/category').subscribe({
      next: (data) => {
        if (Array.isArray(data)) {
          this.categories = data;
        } else if (data && Array.isArray(data.categories)) {
          this.categories = data.categories;
        }
      },
      error: (err) => console.error('Failed to load categories:', err)
    });
  }

  // Called when user picks a file
  onFile(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
    }
  }

  // Save product — builds FormData and POSTs to backend
  save() {
    this.successMsg = '';
    this.errorMsg = '';

    // Basic validation
    if (!this.product.category || !this.product.pname || !this.product.price || !this.product.qty) {
      this.errorMsg = 'Please fill in all required fields.';
      return;
    }

    const formData = new FormData();
    formData.append('category', this.product.category);
    formData.append('pname', this.product.pname);
    formData.append('pdesc', this.product.pdesc);
    formData.append('price', String(this.product.price));
    formData.append('qty', String(this.product.qty));
    formData.append('date', new Date().toISOString());

    if (this.selectedFile) {
      formData.append('photo', this.selectedFile);  // 'photo' must match your multer field name
    }

    this.http.post('http://localhost:3000/api/product', formData).subscribe({
      next: (res) => {
        console.log('Product saved:', res);
        this.successMsg = 'Product added successfully!';
        this.resetForm();
      },
      error: (err) => {
        console.error('Failed to save product:', err);
        this.errorMsg = 'Failed to add product. Please try again.';
      }
    });
  }

  resetForm() {
    this.product = {
      category: '',
      pname: '',
      pdesc: '',
      price: null,
      qty: null,
      date: new Date()
    };
    this.selectedFile = null;
  }
}