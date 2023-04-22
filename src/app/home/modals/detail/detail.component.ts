import { Component, Input, OnInit } from '@angular/core';
import { IContacto } from '../../home.page';
import { AlertController, ModalController } from '@ionic/angular';
import { FormComponent } from '../form/form.component';
import { ApiService } from 'src/app/services/api.service';
import { MessageService } from 'src/app/services/message.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
})
export class DetailComponent implements OnInit {
  @Input() data!: IContacto;

  constructor(
    private modalCtrl: ModalController,
    private alertCtrl: AlertController,
    private _svcDatabase: ApiService,
    private _svcMsg: MessageService) { }

  ngOnInit() { }

  cerrarModal() {
    this.modalCtrl.dismiss();
  }

  async openModalForm() {
    const modal = await this.modalCtrl.create({
      component: FormComponent,
      componentProps: {
        titulo: 'Editar Contacto',
        data: this.data
      }
    });

    modal.present();

    const { data, role } = await modal.onWillDismiss();
    if (role && data && role === 'confirm') {
      this.data = data;
    }
  }

  async alertDelete() {
    const alert = await this.alertCtrl.create({
      header: 'Eliminar Conctacto',
      message: '¡Vas a eliminar este contacto!',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => { console.log('Alert canceled'); }
        },
        {
          text: 'Confirmar',
          role: 'confirm',
          handler: () => {
            console.log('Alert confirmed');
            this.deleteContacto(this.data);
            this.cerrarModal();
          }
        }
      ],
    });

    await alert.present();
  }

  deleteContacto(data: any): void {
    if (data.id) {
      this._svcDatabase.delete(data.id)
        .then(() => {
          this._svcMsg.showToast('Contacto Eliminado!', 'danger');
        })
        .catch(err => console.log(err));
    }
  }
}
