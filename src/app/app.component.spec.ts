import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [AppComponent],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should have a header with navigation links', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;

    // Check if the header contains the navigation links
    expect(compiled.querySelector('nav')?.textContent).toContain('Products');
    expect(compiled.querySelector('nav')?.textContent).toContain('Cart');
    expect(compiled.querySelector('nav')?.textContent).toContain('Checkout');
    expect(compiled.querySelector('nav')?.textContent).toContain('Admin Dashboard');
  });

  it('should render router-outlet', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;

    // Check if the router-outlet element is present in the DOM
    expect(compiled.querySelector('router-outlet')).toBeTruthy();
  });
});
