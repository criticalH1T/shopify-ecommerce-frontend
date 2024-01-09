import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalDataService {

  productCategories: {}[] = [
    {
      'name': 'Boosters',
      'id': 101,
    },
    {
      'name': 'Kombuchas',
      'id': 102
    },
    {
      'name': 'Cold Pressed Juices',
      'id': 103
    },
    {
      'name': 'Lemonades',
      'id': 104
    },
    {
      'name': 'Shakers',
      'id': 105
    },
    {
      'name': 'Bundles',
      'id': 106
    }
  ];

  productImages = [
    {
      'imageName': 'Boosters',
      'imageUrl': '../../../assets/booster.png'
    },
    {
      'imageName': 'Kombuchas',
      'imageUrl': '../../../assets/kombucha.png'
    },
    {
      'imageName': 'Cold Pressed Juices',
      'imageUrl': '../../../assets/cold-pressed-juice.png'
    },
    {
      'imageName': 'Lemonades',
      'imageUrl': '../../../assets/lemonade.png'
    },
    {
      'imageName': 'Shakers',
      'imageUrl': '../../../assets/shake.png'
    },
    {
      'imageName': 'Bundles',
      'imageUrl': '../../../assets/bundle.png'
    },
  ]

  recipeImages = [
    {
      'imageName': 'Grapefruit',
      'imageUrl': '../../../assets/grapefruit-kombucha.png'
    },
    {
      'imageName': 'Apple',
      'imageUrl': '../../../assets/apple-cinnamon-toast.png'
    },
    {
      'imageName': 'Strawberry Lemonade',
      'imageUrl': '../../../assets/strawberry-lemonade.png'
    },
    {
      'imageName': 'Frose',
      'imageUrl': '../../../assets/frose.png'
    }
  ]

  constructor() { }

  getProductCategories() {
    return this.productCategories;
  }

  getProductImages() {
    return this.productImages;
  }

  getRecipeImages() {
    return this.recipeImages;
  }

}
