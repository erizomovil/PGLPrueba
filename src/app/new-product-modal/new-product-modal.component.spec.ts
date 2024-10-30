import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-new-product-modal',
  templateUrl: './new-product-modal.component.html',
  styleUrls: ['./new-product-modal.component.scss'],
})
export class NewProductModalComponent {
  newProductForm: FormGroup;

  constructor(private modalController: ModalController, private formBuilder: FormBuilder) {
    this.newProductForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(0)]],
    });
  }

  // Método para cerrar el modal sin crear el producto
  dismiss() {
    this.modalController.dismiss();
  }

  // Método para cerrar el modal y enviar el nuevo producto
  addProduct() {
    if (this.newProductForm.valid) {
      this.modalController.dismiss(this.newProductForm.value);
    }
  }
}
