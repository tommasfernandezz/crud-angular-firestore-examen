import { Injectable, inject } from '@angular/core';
import {
  Firestore,
  addDoc,
  collection,
  collectionData,
  deleteDoc,
  doc,
  updateDoc
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private firestore = inject(Firestore);
  private collectionName = 'products';
  private productsCollection = collection(this.firestore, this.collectionName);

  getAll(): Observable<Product[]> {
    return collectionData(this.productsCollection, { idField: 'id' }) as Observable<Product[]>;
  }

  create(product: Product) {
    const cleanProduct = this.removeId(product);
    return addDoc(this.productsCollection, cleanProduct);
  }

  private removeId(product: Product): Omit<Product, 'id'> {
    const { id, ...cleanProduct } = product;
    return cleanProduct;
  }

  update(id: string, product: Product) {
    const productDoc = doc(this.firestore, `${this.collectionName}/${id}`);
    const cleanProduct = this.removeId(product);
    return updateDoc(productDoc, { ...cleanProduct });
  }

  delete(id: string) {
    const productDoc = doc(this.firestore, `${this.collectionName}/${id}`);
    return deleteDoc(productDoc);
  }

}
