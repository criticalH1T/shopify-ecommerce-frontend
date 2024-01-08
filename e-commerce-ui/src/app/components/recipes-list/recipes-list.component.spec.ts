import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RecipesListComponent } from './recipes-list.component';
import { HttpClientModule } from '@angular/common/http';
import { ActivatedRoute, Data, convertToParamMap } from '@angular/router';
import { of } from 'rxjs';
import { CommonModule, NgOptimizedImage } from '@angular/common';

describe('RecipesListComponent', () => {
  let component: RecipesListComponent;
  let fixture: ComponentFixture<RecipesListComponent>;

  // Mock resolver data
  const mockResolverData: Data = {
    resolver: [
      {
        id: 2,
        name: 'Apple Cinnamon Toast',
        description: 'This is a challava good breakfast or snack to welcome fall...',
        image_path: '../../../assets/apple-cinnamon-toast.png',
        ingredients: [
          '1 crisp fall apple, sliced',
          'A dab of coconut oil, for sautéing',
          'Juice of ½ a lemon',
          '1 tbsp honey or maple syrup',
          'Generous sprinkling of cinnamon',
        ],
        steps: [
          'In a small skillet, sauté your sliced apple in coconut oil over medium heat.',
          'Stir in lemon juice, honey or maple, and cinnamon, and cook until golden.',
          'Toast your challah, dress it up, and serve immediately.',
        ],
      }
    ],
  };

  const mockActivatedRoute = {
    paramMap: of(convertToParamMap({ id: 2 })), // Adjust the paramMap values as needed
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RecipesListComponent],
      imports: [HttpClientModule, NgOptimizedImage ],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            data: of(mockResolverData),
          },
        },
      ],
    });
    fixture = TestBed.createComponent(RecipesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
