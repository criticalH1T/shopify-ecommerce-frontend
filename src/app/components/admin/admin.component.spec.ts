import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { AdminComponent } from './admin.component';

describe('AdminComponent', () => {
  let component: AdminComponent;
  let fixture: ComponentFixture<AdminComponent>;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminComponent],
      imports: [RouterTestingModule],
    });

    fixture = TestBed.createComponent(AdminComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to the correct component', () => {
    const spy = spyOn(router, 'navigate');
    const card = {
      "componentName": "/roles",
      "iconName": "bi bi-person-badge",
      "title": "Manage user roles",
    };

    component.goToComponent(card);

    const currentUrl = router.url;
    const expectedUrl = currentUrl + card.componentName;

    expect(spy).toHaveBeenCalledWith([expectedUrl]);
  });
});
