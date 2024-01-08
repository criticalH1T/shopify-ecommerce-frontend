import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminUserRolesComponent } from './admin-user-roles.component';
import { HttpClientModule } from '@angular/common/http';

describe('AdminUserRolesComponent', () => {
  let component: AdminUserRolesComponent;
  let fixture: ComponentFixture<AdminUserRolesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminUserRolesComponent],
      imports: [HttpClientModule]
    });
    fixture = TestBed.createComponent(AdminUserRolesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
