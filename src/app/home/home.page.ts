import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FormComponent } from './modals/form/form.component';
import { DetailComponent } from './modals/detail/detail.component';
import { ApiService } from '../services/api.service';
import { map } from 'rxjs';

export interface IContacto {
  id?: string;
  nombre: string;
  celular: string;
  correo?: string;
  imagen?: string;
}

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  filterValue: string = '';

  data: IContacto[] = [];

  constructor(
    private modalCtrl: ModalController,
    private _svcDatabase: ApiService) { }

  ngOnInit(): void {
    this.getData();
  }

  getData(): void {
    this._svcDatabase.getAll().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ id: c.payload.doc.id, ...c.payload.doc.data() })
        )
      )
    ).subscribe(data => {
      this.data = data;
      this.data = data.map(element => ({ imagen: this.returnImgAvatar(element.nombre), ...element }));
      console.log(this.data);
    });
  }

  returnImgAvatar(nombre: string) {
    return `https://ui-avatars.com/api/?name=${nombre}&background=${this.randomHexColor()}&color=fff&bold=true&length=1`;
  }

  randomHexColor() {
    let letters = '0123456789ABCDEF';
    let color = '';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  async openModalForm() {
    const modal = await this.modalCtrl.create({
      component: FormComponent,
      componentProps: {
        titulo: 'Crear Contacto'
      }
    });

    modal.present();
  }


  async openModalDetail(data: IContacto) {
    const modal = await this.modalCtrl.create({
      component: DetailComponent,
      componentProps: {
        data
      }
    });

    modal.present();
  }
}
