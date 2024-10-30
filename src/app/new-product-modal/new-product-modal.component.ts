import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-new-product-modal',
  templateUrl: './new-product-modal.component.html',
  styleUrls: ['./new-product-modal.component.scss'],
})
export class NewProductModalComponent implements OnInit {
  @Input() product: any;
  newProductForm: FormGroup;

  constructor(
    private modalController: ModalController,
    private formBuilder: FormBuilder
  ) {
    this.newProductForm = this.formBuilder.group({
      name: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(0)]],
    });
  }

  ngOnInit() {
    // Si existe un producto, cargamos sus datos en el formulario
    if (this.product) {
      this.newProductForm.patchValue({
        name: this.product.nombre,
        price: this.product.precio,
      });
    }
  }

  // Método para cerrar el modal sin crear el producto
  dismiss() {
    this.modalController.dismiss();
  }

  // Método para cerrar el modal y enviar el nuevo producto
  addProduct() {
    if (this.newProductForm.valid) {
      const productToSave = {
        id: this.product ? this.product.id : null,
        nombre: this.newProductForm.value.name,
        precio: this.newProductForm.value.price,
      };
      this.modalController.dismiss(productToSave);
    }
  }
}
