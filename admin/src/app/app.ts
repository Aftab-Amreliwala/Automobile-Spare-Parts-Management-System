import { Component } from '@angular/core';
import { Router, NavigationEnd, RouterLink, RouterOutlet, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { filter } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterOutlet, RouterLinkActive],
  template: `

    <div class="dashboard">

      <!-- ========================= -->
      <!-- SIDEBAR (HIDE ONLY THIS) -->
      <!-- ========================= -->
      <aside class="sidebar" *ngIf="showSidebar">

        <div class="sidebar-header">
          <div class="logo-icon">A</div>
          <h2>Admin Panel</h2>
        </div>

        <nav>


          <div class="nav-section-label">Management</div>

          <!-- CATEGORY -->
          <div class="menu-group">
            <div class="menu-title" (click)="toggleCategory()">
              📂 Category {{ showCategory ? '▾' : '▸' }}
            </div>

            <div *ngIf="showCategory">
              <a routerLink="/category/add">Add Category</a>
              <a routerLink="/category/view">View Category</a>
            </div>
          </div>

          <!-- PRODUCT -->
          <div class="menu-group">
            <div class="menu-title" (click)="toggleProduct()">
              📦 Product {{ showProduct ? '▾' : '▸' }}
            </div>

            <div *ngIf="showProduct">
              <a routerLink="/product/add">Add Product</a>
              <a routerLink="/product/view">View Product</a>
            </div>
          </div>

          <!-- ORDERS -->
          <div class="menu-group">
            <div class="menu-title" (click)="toggleOrders()">
              📦 Orders {{ showOrders ? '▾' : '▸' }}
            </div>

            <div *ngIf="showOrders">
              <a routerLink="/admin-orders">View Orders</a>
            </div>
          </div>

        </nav>

        <div class="sidebar-footer">
          <strong>Admin User</strong><br>
          Super Admin
        </div>

      </aside>

      <!-- ========================= -->
      <!-- MAIN CONTENT -->
      <!-- ========================= -->
      <main class="main-content">

        <header class="topbar" *ngIf="showSidebar">
          <h2>Dashboard</h2>
          <span>{{ today }}</span>
        </header>

        <section class="content">
          <router-outlet></router-outlet>
        </section>

      </main>

    </div>

  `,
 styles: [`

@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&family=Syne:wght@600;700&display=swap');

:host {
  --sidebar-bg: #0d1117;
  --sidebar-border: #21262d;
  --sidebar-text: #8b949e;
  --sidebar-text-hover: #f0f6fc;
  --accent: #f59e0b;
  --active-bg: rgba(245, 158, 11, 0.15);
  --main-bg: #f6f8fa;
  --topbar-bg: #ffffff;
  --text-primary: #1c2333;
  --text-muted: #6e7681;
  --radius: 10px;
  --font-body: 'DM Sans', sans-serif;
  --font-display: 'Syne', sans-serif;
}

/* MAIN */
.dashboard {
  display: flex;
  height: 100vh;
  font-family: var(--font-body);
  background: var(--main-bg);
}

/* SIDEBAR */
.sidebar {
  width: 260px;
  background: var(--sidebar-bg);
  border-right: 1px solid var(--sidebar-border);
  display: flex;
  flex-direction: column;
}

/* HEADER */
.sidebar-header {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 20px;
  border-bottom: 1px solid var(--sidebar-border);
}

.logo-icon {
  width: 36px;
  height: 36px;
  border-radius: 8px;
  background: linear-gradient(135deg, #f59e0b, #d97706);
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
}

.sidebar h2 {
  margin: 0;
  font-family: var(--font-display);
  color: white;
  font-size: 16px;
}

/* NAV */
nav {
  padding: 15px;
  flex: 1;
}

.nav-section-label {
  font-size: 11px;
  color: #6e7681;
  margin: 15px 0 8px;
  text-transform: uppercase;
}

/* LINKS */
.sidebar a {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px;
  border-radius: var(--radius);
  color: var(--sidebar-text);
  text-decoration: none;
  transition: 0.2s;
}

.sidebar a:hover {
  background: rgba(255,255,255,0.05);
  color: var(--sidebar-text-hover);
}

.sidebar a.active {
  background: var(--active-bg);
  color: var(--accent);
  font-weight: 500;
}

/* MENU */
.menu-title {
  padding: 10px;
  cursor: pointer;
  border-radius: var(--radius);
  display: flex;
  justify-content: space-between;
  color: var(--sidebar-text);
}

.menu-title:hover {
  background: rgba(255,255,255,0.05);
}

/* SUBMENU */
.submenu-wrapper {
  max-height: 0;
  overflow: hidden;
  transition: 0.3s;
}

.submenu-wrapper.visible {
  max-height: 200px;
}

.submenu {
  padding: 8px 25px;
  font-size: 14px;
  color: #6e7681;
}

.submenu:hover {
  color: white;
}

/* FOOTER */
.sidebar-footer {
  padding: 15px;
  border-top: 1px solid var(--sidebar-border);
  font-size: 13px;
  color: #c9d1d9;
}

/* MAIN CONTENT */
.main-content {
  flex: 1;
  display: flex;
  flex-direction: column;
}

/* TOPBAR */
.topbar {
  background: var(--topbar-bg);
  padding: 15px 25px;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #e5e9ef;
}

.topbar h1 {
  margin: 0;
  font-size: 20px;
  font-family: var(--font-display);
}

.topbar-date {
  color: var(--text-muted);
}

/* CONTENT */
.content {
  padding: 25px;
  overflow-y: auto;
}

/* RESPONSIVE */
@media (max-width: 768px) {
  .sidebar {
    display: none;
  }
}

`]
})
export class App {

  today = new Date().toDateString();

  showCategory = false;
  showProduct = false;
  showOrders = false;

  showSidebar = true;

  constructor(private router: Router) {

    const hideRoutes = ['/login', '/register'];

    // initial check
    this.showSidebar = !hideRoutes.some(route =>
      this.router.url.includes(route)
    );

    // route change
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        this.showSidebar = !hideRoutes.some(route =>
          event.url.includes(route)
        );
      });
  }

  toggleCategory() {
    this.showCategory = !this.showCategory;
    this.showProduct = false;
    this.showOrders = false;
  }

  toggleProduct() {
    this.showProduct = !this.showProduct;
    this.showCategory = false;
    this.showOrders = false;
  }

  toggleOrders() {
    this.showOrders = !this.showOrders;
    this.showCategory = false;
    this.showProduct = false;
  }
}