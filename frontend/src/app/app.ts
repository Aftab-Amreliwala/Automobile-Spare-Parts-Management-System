import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { RouteReuseStrategy } from '@angular/router';

// ✅ This forces Angular to ALWAYS destroy and recreate components on navigation
// Without this, Angular reuses the component and ngOnInit doesn't fire again
class NoReuseStrategy implements RouteReuseStrategy {
  shouldDetach() { return false; }
  store() {}
  shouldAttach() { return false; }
  retrieve() { return null; }
  shouldReuseRoute() { return false; } // ← KEY: never reuse, always recreate
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent],
  templateUrl: './app.component.html',
  providers: [
    { provide: RouteReuseStrategy, useClass: NoReuseStrategy } // ✅ registered here
  ]
})
export class AppComponent {}