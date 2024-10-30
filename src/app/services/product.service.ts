import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  endpoint = 'http://localhost:8080/productos';

  constructor(private httpClient: HttpClient) {}

  getProducts(): Observable<any> {
    return this.httpClient.get(this.endpoint);
  }

  getProductsSorted(sortBy: string, order: string): Observable<any> {
    const url = `${this.endpoint}?sortBy=${sortBy}&order=${order}`;
    return this.httpClient.get(url);
  }

  addProduct(product: any): Observable<any> {
    return this.httpClient.post(this.endpoint, product);
  }

  updateProduct(product: any): Observable<any> {
    const url = `${this.endpoint}/${product.id}`;
    return this.httpClient.put(url, product);
  }

  deleteProduct(productId: number): Observable<any> {
    const url = `${this.endpoint}/${productId}`;
    return this.httpClient.delete(url);
  }
}
