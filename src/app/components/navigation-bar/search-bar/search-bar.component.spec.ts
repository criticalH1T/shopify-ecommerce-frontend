import { ComponentFixture, TestBed, async, fakeAsync, tick } from '@angular/core/testing';
import { SearchBarComponent } from './search-bar.component';
import { FormsModule } from '@angular/forms';

describe('SearchBarComponent', () => {
  let component: SearchBarComponent;
  let fixture: ComponentFixture<SearchBarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SearchBarComponent],
      imports: [FormsModule],
    });
    fixture = TestBed.createComponent(SearchBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should trigger filterProducts when onSearchTextChanged is called', fakeAsync(() => {
    const filterProductsSpy = spyOn(component, 'filterProducts');
    component.setupSearchTextChange();
    component.onSearchTextChanged();
    tick(300);
    fixture.detectChanges();
    expect(filterProductsSpy).toHaveBeenCalled();
  }));

  it('should focus on the search input when focusSearchInput is called', () => {
    const focusSpy = spyOn(document.getElementById('search'), 'focus');
    component.focusSearchInput();
    fixture.detectChanges();
    expect(focusSpy).toHaveBeenCalled();
  });
});
