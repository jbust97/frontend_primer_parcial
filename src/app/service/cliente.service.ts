import { Injectable } from '@angular/core';
import { Cliente } from '../models/cliente';
import {
  Firestore,
  collection,
  doc,
  setDoc,
  getDoc,
  getDocs,
  deleteDoc,
  updateDoc,
  query,
  where,
  limit,
} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class ClienteService {
  private collectionId = 'clientes';

  constructor(private firestore: Firestore) {}

  async getAll() {
    const querySnapshot = await getDocs(
      collection(this.firestore, this.collectionId)
    );
    return querySnapshot.docs.map((doc) => {
      const data = doc.data();
      data.id = doc.id;
      return data;
    });
  }

  async create(cliente: Cliente) {
    return setDoc(
      doc(collection(this.firestore, this.collectionId), cliente.id),
      cliente
    );
  }

  async retrieve(id: string) {
    const docRef = doc(this.firestore, this.collectionId, id);
    const docSnap = await getDoc(docRef);
    return docSnap.data();
  }

  async update(cliente: Cliente) {
    const docRef = doc(this.firestore, this.collectionId, cliente.id);
    return updateDoc(docRef, { ...cliente });
  }

  async delete(id: string) {
    return deleteDoc(doc(this.firestore, this.collectionId, id));
  }

  async getByNroDocumento(numeroDocumento: string) {
    const clientesRef = collection(this.firestore, this.collectionId);
    return await (
      await getDocs(
        query(clientesRef, where('ruc', '==', numeroDocumento), limit(1))
      )
    ).docs.map((doc) => {
      const data = doc.data();
      data.id = doc.id;
      return data;
    })[0];
  }
}
