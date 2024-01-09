import {inject} from "@angular/core";
import {ApiEndpointsService} from "../services/api-endpoints.service";
import {Observable} from "rxjs";

// @ts-ignore
export const productsResolver: (route, state) => Observable<Product[]> = (route, state) => {
  return inject(ApiEndpointsService).getProducts();
};
