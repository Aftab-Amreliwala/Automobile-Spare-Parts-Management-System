import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-add-category',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: `./add-category.component.html`
    
})
export class AddCategoryComponent {

  categoryId = '';
  categoryName = '';
  photo!: File;
  message = '';

  constructor(private http: HttpClient) {}

  onFileChange(event: any) {
    this.photo = event.target.files[0];
  }

  addCategory() {
    const formData = new FormData();
    formData.append('categoryId', this.categoryId);
    formData.append('categoryName', this.categoryName);
    formData.append('photo', this.photo);

    this.http.post('http://localhost:3000/api/category', formData)
      .subscribe(() => {
        this.message = 'Category Added Successfully';
        alert(this.message);
        this.categoryId = '';
        this.categoryName = '';
      });
  }
}