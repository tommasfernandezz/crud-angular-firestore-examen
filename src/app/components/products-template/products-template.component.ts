import { Component, inject } from '@angular/core';
import { AsyncPipe, CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { Product } from '../../models/product.model';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-products-template',
  standalone: true,
  imports: [CommonModule, FormsModule, AsyncPipe],
  templateUrl: './products-template.component.html',
  styleUrl: './products-template.component.css'
})
export class ProductsTemplateComponent {
  private productService = inject(ProductService);

  products$ = this.productService.getAll();
  editingId: string | null = null;
  errorMessage = '';

  product: Product = this.getEmptyProduct();

  async save(form: NgForm) {
    this.errorMessage = '';

    if (form.invalid) {
      form.control.markAllAsTouched();
      this.errorMessage = 'Revisa los campos obligatorios antes de guardar.';
      return;
    }

    try {
      this.product.price = Number(this.product.price);
      this.product.stock = Number(this.product.stock);

      if (this.editingId) {
        await this.productService.update(this.editingId, this.product);
      } else {
        await this.productService.create(this.product);
      }

      this.cancel(form);
    } catch (error) {
      console.error(error);
      this.errorMessage = 'No se pudo guardar el producto.';
    }
  }

  edit(product: Product) {
    this.editingId = product.id ?? null;
    this.product = { ...product };
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

  cancel(form?: NgForm) {
    this.editingId = null;
    this.product = this.getEmptyProduct();
    form?.resetForm(this.product);
  }

  private getEmptyProduct(): Product {
    return {
      name: '',
      price: 0,
      category: '',
      stock: 0,
      active: true
    };
  }
}
