import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductListComponent } from './product-list.component';
import { CartService } from '../services/cart.service';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';

describe('ProductListComponent', () => {
  let component: ProductListComponent;
  let fixture: ComponentFixture<ProductListComponent>;
  let cartService: CartService;

  const mockProducts = [
    { id: 1, name: 'Product 1', price: 100 },
    { id: 2, name: 'Product 2', price: 150 },
    { id: 3, name: 'Product 3', price: 200 }
  ];

  const mockCartItems = [
    { product: mockProducts[0], quantity: 1 },
    { product: mockProducts[1], quantity: 2 }
  ];

  beforeEach(async () => {
    const cartServiceMock = {
      getCartItems: jasmine.createSpy('getCartItems').and.returnValue(of(mockCartItems)),
      addToCart: jasmine.createSpy('addToCart'),
      decrementQuantity: jasmine.createSpy('decrementQuantity')
    };

    await TestBed.configureTestingModule({
      declarations: [ProductListComponent],
      providers: [{ provide: CartService, useValue: cartServiceMock }]
    }).compileComponents();

    fixture = TestBed.createComponent(ProductListComponent);
    component = fixture.componentInstance;
    cartService = TestBed.inject(CartService);

    fixture.detectChanges(); // triggers ngOnInit, data binding
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should display the list of products', () => {
    const productElements = fixture.debugElement.queryAll(By.css('.product-card'));
    expect(productElements.length).toBe(mockProducts.length);
    expect(productElements[0].nativeElement.textContent).toContain('Product 1');
    expect(productElements[1].nativeElement.textContent).toContain('Product 2');
    expect(productElements[2].nativeElement.textContent).toContain('Product 3');
  });

  it('should display the correct quantity for each product', () => {
    const productElements = fixture.debugElement.queryAll(By.css('.product-card'));
    expect(productElements[0].nativeElement.textContent).toContain('Selected: 1');
    expect(productElements[1].nativeElement.textContent).toContain('Selected: 2');
    expect(productElements[2].nativeElement.textContent).toContain('Selected: 0'); // Product 3 is not in cart
  });

  it('should call addToCart when "Add to Cart" button is clicked', () => {
    const addToCartButton = fixture.debugElement.queryAll(By.css('button'))[0]; // First "Add to Cart" button
    addToCartButton.triggerEventHandler('click', null);
    expect(cartService.addToCart).toHaveBeenCalledWith(mockProducts[0]);
  });

  it('should call decrementQuantity when "-" button is clicked', () => {
    const decrementButton = fixture.debugElement.queryAll(By.css('button'))[1]; // First "-" button
    decrementButton.triggerEventHandler('click', null);
    expect(cartService.decrementQuantity).toHaveBeenCalledWith(mockProducts[0].id);
  });
});
