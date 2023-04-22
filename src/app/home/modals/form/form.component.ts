import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { IContacto } from '../../home.page';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { MessageService } from 'src/app/services/message.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit {
  @Input() titulo!: string;
  @Input() data!: IContacto;
  contactForm: FormGroup;

  constructor(private modalCtrl: ModalController, private fb: FormBuilder,
    private _svcDatabase: ApiService, private _svcMsg: MessageService) {
    this.contactForm = this.fb.group({
      nombre: ['', [Validators.required]],
      celular: ['', [Validators.required]],
      correo: [null, [Validators.email]]
    });
  }

  ngOnInit() {
    if (this.data) {
      this.contactForm.patchValue(this.data);
    }
  }

  guardar() {
    if (this.data) {
      this.updateContacto();
    } else {
      this.createContacto();
    }
  }

  createContacto() {
    this._svcDatabase.create(this.contactForm.value).then(() => {
      console.log('Nueva contacto creado!');
      this._svcMsg.showToast('Contacto creado!');
      this.cerrarModal();
    });
  }

  updateContacto() {
    if (this.data.id)
      this._svcDatabase.update(this.data.id, this.contactForm.value)
        .then(() => {
          this._svcMsg.showToast('Contacto actualizado!', 'secondary');
          const update: IContacto = {
            imagen: this.data.imagen,
            ...this.contactForm.value
          }
          this.modalCtrl.dismiss(update, 'confirm');
        })
        .catch(err => console.log(err));
  }

  cerrarModal() {
    this.modalCtrl.dismiss();
  }
}
