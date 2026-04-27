import { Component, inject } from '@angular/core';
import { AsyncPipe, CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Product } from '../../models/product.model';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-products-reactive',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, AsyncPipe],
  templateUrl: './products-reactive.component.html',
  styleUrl: './products-reactive.component.css'
})
export class ProductsReactiveComponent {
  private fb = inject(FormBuilder);
  private productService = inject(ProductService);

  products$ = this.productService.getAll();
  editingId: string | null = null;
  errorMessage = '';

  productForm = this.fb.nonNullable.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    price: [0, [Validators.required, Validators.min(1)]],
    category: ['', [Validators.required]],
    stock: [0, [Validators.required, Validators.min(0)]],
    active: [true]
  });

  async save() {
    this.errorMessage = '';

    if (this.productForm.invalid) {
      this.productForm.markAllAsTouched();
      this.errorMessage = 'Revisa los campos obligatorios antes de guardar.';
      return;
    }

    const product: Product = {
      ...this.productForm.getRawValue(),
      price: Number(this.productForm.controls.price.value),
      stock: Number(this.productForm.controls.stock.value)
    };

    try {
      if (this.editingId) {
        await this.productService.update(this.editingId, product);
      } else {
        await this.productService.create(product);
      }

      this.cancel();
    } catch (error) {
      console.error(error);
      this.errorMessage = 'No se pudo guardar el producto.';
    }
  }

  edit(product: Product) {
    this.editingId = product.id ?? null;
    this.productForm.patchValue({
      name: product.name,
      price: Number(product.price),
      category: product.category,
      stock: Number(product.stock),
      active: product.active
    });
  }

  async delete(id?: string) {
    if (!id) return;

    const confirmed = confirm('¿Seguro que quieres borrar este producto?');
    if (!confirmed) return;

    try {
      await this.productService.delete(id);
    } catch (error) {
      console.error(error);
      this.errorMessage = 'No se pudo borrar el producto.';
    }
  }

  cancel() {
    this.editingId = null;
    this.productForm.reset({
      name: '',
      price: 0,
      category: '',
      stock: 0,
      active: true
    });
  }

  hasError(controlName: keyof typeof this.productForm.controls, errorName: string): boolean {
    const control = this.productForm.controls[controlName];
    return control.hasError(errorName) && control.touched;
  }
}
