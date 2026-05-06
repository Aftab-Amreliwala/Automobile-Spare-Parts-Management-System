import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-view-category',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './view-category.component.html'
})
export class ViewCategoryComponent implements OnInit {

  categories: any[] = [];
  filteredCategories: any[] = [];
  editId: string | null = null;
  searchText = '';

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.load();
  }

  load() {
    this.http.get<any[]>('http://localhost:3000/api/category')
      .subscribe(res => {
        this.categories = res;
        this.filteredCategories = res;
      });
  }

  search() {
    const text = this.searchText.toLowerCase();
    this.filteredCategories = this.categories.filter(c =>
      c.categoryId.toLowerCase().includes(text) ||
      c.categoryName.toLowerCase().includes(text)
    );
  }

  edit(cat: any) {
    this.editId = cat._id;
  }

  cancel() {
    this.editId = null;
    this.load();
  }

  update(cat: any) {
    this.http.put(`http://localhost:3000/api/category/${cat._id}`, {
      categoryId: cat.categoryId,
      categoryName: cat.categoryName
    }).subscribe(() => {
      alert('Updated successfully');
      this.editId = null;
    });
  }

  delete(id: string) {
    if (confirm('Delete this category?')) {
      this.http.delete(`http://localhost:3000/api/category/${id}`)
        .subscribe(() => this.load());
    }
  }
}