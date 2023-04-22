import { Injectable } from '@angular/core';
import { IContacto } from '../home/home.page';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private dbPath = '/contactos';

  tutorialsRef!: AngularFirestoreCollection<IContacto>;

  constructor(private firestore: AngularFirestore) { 
    this.tutorialsRef = this.firestore.collection(this.dbPath);
  }

  getAll(): AngularFirestoreCollection<IContacto> {
    return this.tutorialsRef;
  }

  create(tutorial: IContacto): any {
    return this.tutorialsRef.add({ ...tutorial });
  }

  update(id: string, data: any): Promise<void> {
    return this.tutorialsRef.doc(id).update(data);
  }

  delete(id: string): Promise<void> {
    return this.tutorialsRef.doc(id).delete();
  }
}
