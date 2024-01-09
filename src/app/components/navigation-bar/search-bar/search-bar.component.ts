import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Product} from "../../../services/api-endpoints.service";
import {BehaviorSubject, debounceTime, Subject} from "rxjs";
import {HelperService} from "../../../services/helper.service";

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss'],
})
export class SearchBarComponent implements OnInit {
  helperService: HelperService;

  constructor(helperService: HelperService) {
    this.helperService = helperService;
  }
  ngOnInit(): void {
      this.focusSearchInput();
      this.setupSearchTextChange();
  }

  @Input()
  isSearchBarOpened: boolean;
  @Output()
  closeSearchBar = new EventEmitter<void>();
  searchText: string = "";
  @Input()
  allProducts: Product[];
  filteredProducts = new BehaviorSubject<any[]>([]);
  private searchTextSubject = new Subject<string>();

  closeSearchBarEmitter() {
    this.closeSearchBar.emit();
  }


  filterProducts() {
    let filteredProducts: any[] = [];
    if(this.searchText) {
      this.allProducts.forEach(product => {
        if(product.name.toLowerCase().includes(this.searchText.toLowerCase())) {
          filteredProducts.push(product);
        }
      });
    }
    this.filteredProducts.next(filteredProducts.slice(0,4));
  }

  setupSearchTextChange() {
    this.searchTextSubject.pipe(debounceTime(300)).subscribe(() => {
      this.filterProducts();
    })
  }

  onSearchTextChanged() {
    this.searchTextSubject.next(this.searchText);
  }

  focusSearchInput() {
    document.getElementById("search").focus();
  }
}
