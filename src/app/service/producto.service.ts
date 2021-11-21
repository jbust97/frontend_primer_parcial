import { Injectable } from '@angular/core';
import { Firestore, collection, doc, setDoc, getDoc, getDocs, deleteDoc, updateDoc } from '@angular/fire/firestore';
import { Producto } from '../models/producto';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  private collectionId =  'productos';

  constructor(private firestore: Firestore) {}

  async getAll() {
    const querySnapshot = await getDocs(collection(this.firestore, this.collectionId));
    return querySnapshot.docs.map(doc => {
      const data = doc.data()
      data.id = doc.id 
      return data;
    })
  }

  async create(producto: Producto) {
    return setDoc(
      doc(
        collection(this.firestore, this.collectionId), 
        producto.id
      ), 
      producto
    );
  }

  async retrieve(id: string) {
    const docRef = doc(this.firestore, this.collectionId, id);
    const docSnap = await getDoc(docRef);
    return docSnap.data();
  }

  async update(producto: Producto) {
    const docRef = doc(this.firestore, this.collectionId, producto.id);
    return updateDoc(docRef, {...producto});
  }

  async delete(id: string) {
    return deleteDoc(doc(this.firestore, this.collectionId,id));
  }

}

