import { Injectable } from '@angular/core';
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
} from '@angular/fire/firestore';
import { CabeceraVenta } from '../models/cabeceraVenta';

@Injectable({
  providedIn: 'root',
})
export class VentasService {
  private collectionId = 'ventas';

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

  async create(ventas: CabeceraVenta) {
    return setDoc(
      doc(collection(this.firestore, this.collectionId), ventas.id),
      ventas
    );
  }

  async retrieve(id: string) {
    const docRef = doc(this.firestore, this.collectionId, id);
    const docSnap = await getDoc(docRef);
    return docSnap.data();
  }

  async update(ventas: CabeceraVenta) {
    const docRef = doc(this.firestore, this.collectionId, ventas.id);
    return updateDoc(docRef, { ...ventas });
  }

  async delete(id: string) {
    return deleteDoc(doc(this.firestore, this.collectionId, id));
  }

  async getVentas({
    rucCliente,
    fechaDesde,
    fechaHasta,
    codigoProducto,
  }: {
    rucCliente?: string;
    fechaDesde: Date;
    fechaHasta: Date;
    codigoProducto?: string;
  }): Promise<CabeceraVenta[]> {
    const filters = [];

    if (rucCliente) filters.push(where('cliente.ruc', '==', rucCliente));
    if (fechaDesde) filters.push(where('fecha', '>=', fechaDesde));
    if (fechaHasta) filters.push(where('fecha', '<=', fechaHasta));

    const ventasRef = collection(this.firestore, this.collectionId);

    const querySnapshot = await getDocs(query(ventasRef, ...filters));
    // @ts-ignore
    return querySnapshot.docs
      .map((doc) => {
        const data = doc.data();
        data.id = doc.id;
        return data;
      })
      .filter((doc) => {
        if (!codigoProducto) return true;
        return (
          doc.detalles.find(
            (d: any) => d.producto.codigo === codigoProducto
          ) !== undefined
        );
      });
  }
}
