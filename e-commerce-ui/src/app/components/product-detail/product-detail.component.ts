import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router} from "@angular/router";
import {Product} from "../../services/api-endpoints.service";
import {HelperService} from "../../services/helper.service";
import {filter} from "rxjs";

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {
  product: Product;
  suggestedProducts: Product[];

  faq: any[] = [
    {
      question: 'What\'s the shelf life?',
      answer: 'Guaranteed 10 days on delivery. See the label for the best before date. Once opened, drink within 5 days. Keep below 4°C.',
      isOpened: false,
      icon: 'bi bi-shop'
    },
    {
      question: 'How much is shipping?',
      answer: 'We offer free shipping on orders over $70 across Canada and the USA. For orders under $70, a flat rate of $10 will be applied.',
      isOpened: false,
      icon: 'bi bi-box-seam'
    },
    {
      question: 'What are the nutrition details?',
      answer: 'Calories 25, Total Fat 0g (0%), Saturated Fat 0 g (0%), Trans Fat 0g , Cholesterol 0 mg (0%), Sodium 0mg (0%), Total Carbohydrate 7g (2%), Dietary Fibre 0g (0%), Sugars 6g, Protein 0g, Vitamin A (0%), Vitamin C (0%), Calcium (0%), Iron (0%)',
      isOpened: false,
      icon: 'bi bi-bookmark-heart'
    }
  ]

  constructor(private activatedRoute: ActivatedRoute,
              public helperService: HelperService,
              private router: Router) {
  }
  ngOnInit(): void {
    this.handleRouteChange();
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
    ).subscribe(() => this.handleRouteChange());
  }

  private handleRouteChange(): void {
    this.listSuggestedProducts();
  }

  listSuggestedProducts() {
    const productId: string = this.activatedRoute.snapshot.paramMap.get('productId');
    const category: string = this.activatedRoute.snapshot.paramMap.get('category');
    this.activatedRoute.data.subscribe(products => {
      this.product = products['resolver'].find(product => product.id == productId);
      this.suggestedProducts = products['resolver']
        .filter(product => this.helperService.transformToRouterString(product.categoryCategoryName) === category && product.id.toString() !== productId)
        .slice(0,4);
    });
  }
  toggleDropdown(question: string) {
    const targetFaq = this.faq.find(item => item.question === question);
    if (targetFaq) {
      targetFaq.isOpened =! targetFaq.isOpened;
    }
  }
}
