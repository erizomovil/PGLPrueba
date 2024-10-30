import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { NewProductModalComponent } from '../new-product-modal/new-product-modal.component';

@Component({
  selector: 'app-my-products',
  templateUrl: './my-products.page.html',
  styleUrls: ['./my-products.page.scss'],
})
export class MyProductsPage implements OnInit {
  products: any = [];
  dropdownOpen: boolean = false;
  sortOptions: any[] = [];

  constructor(
    private productService: ProductService,
    private router: Router,
    private modalController: ModalController
  ) {
    this.sortOptions = [
      {
        label: 'Sort by Name',
        property: 'nombre',
        order: 'ascending',
        selected: false,
      },
      {
        label: 'Sort by Price',
        property: 'precio',
        order: 'ascending',
        selected: false,
      },
      {
        label: 'Sort by Creation Date',
        property: 'fechaCreacion',
        order: 'ascending',
        selected: false,
      },
    ];
  }

  ngOnInit() {
    this.getAllProducts();
  }

  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }

  sortProducts(option: any) {
    if (option.selected) {
      option.order = option.order === 'ascending' ? 'descending' : 'ascending';
    } else {
      this.sortOptions.forEach((o) => (o.selected = false));
      option.selected = true;
      option.order = 'ascending';
    }

    this.productService
      .getProductsSorted(option.property, option.order)
      .subscribe(
        (response) => {
          if (Array.isArray(response)) {
            this.products = response;
            this.products.forEach((p: any) => (p.isSelected = false));
          } else {
            console.error('La respuesta no es un array de productos', response);
          }
        },
        (error) => {
          console.error('Error al obtener los productos ordenados', error);
        }
      );

    this.dropdownOpen = false;
  }

  async openNewProductModal() {
    const modal = await this.modalController.create({
      component: NewProductModalComponent,
    });

    modal.onDidDismiss().then((result) => {
      if (result.data) {
        this.addNewProduct(result.data);
      }
    });

    return await modal.present();
  }

  async put(product: any) {
    const modal = await this.modalController.create({
      component: NewProductModalComponent,
      componentProps: {
        product: product,
      },
    });

    modal.onDidDismiss().then((result) => {
      if (result.data) {
        if (result.data.id) {
          this.productService.updateProduct(result.data).subscribe(() => {
            this.getAllProducts();
          });
        } else {
          this.addNewProduct(result.data);
        }
      }
    });

    return await modal.present();
  }

  toggleOptions(product: any) {
    product.isSelected = !product.isSelected;
  }

  gotoHome() {
    this.router.navigateByUrl('/home');
  }

  delete(product: any) {
    console.log('Borrar producto:', product);
    this.productService.deleteProduct(product.id).subscribe(
      (response) => {
        console.log('Producto eliminado con éxito', response);
        this.getAllProducts();
      },
      (error) => {
        console.error('Error al eliminar el producto', error);
      }
    );
  }

  addNewProduct(productData: any) {
    this.productService.addProduct(productData).subscribe(
      (response) => {
        console.log('Producto agregado:', response);
        this.getAllProducts();
      },
      (error) => {
        console.error('Error al agregar el producto', error);
      }
    );
  }

  getAllProducts() {
    this.productService.getProducts().subscribe(
      (response) => {
        if (Array.isArray(response)) {
          this.products = response;
          this.products.forEach((p: any) => (p.isSelected = false));
        } else {
          console.error('La respuesta no es un array de productos', response);
        }
      },
      (error) => {
        console.error('Error al obtener los productos', error);
      }
    );
  }
}
