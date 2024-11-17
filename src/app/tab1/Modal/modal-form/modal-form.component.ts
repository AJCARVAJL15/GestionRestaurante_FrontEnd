import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular/standalone'; 
import { IonRow,IonCol,IonGrid,IonLabel,IonInput,IonItem,IonButtons, IonHeader, IonToolbar, IonTitle, IonContent,IonCard,IonCardHeader,IonCardTitle,IonCardSubtitle,IonCardContent,IonButton,IonAlert,IonIcon,IonSelectOption,IonSelect,IonFooter} from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule,Validators } from '@angular/forms';

@Component({
  selector: 'app-modal-form',
  templateUrl: './modal-form.component.html',
  styleUrls: ['./modal-form.component.scss'],
  standalone: true,
  imports: [CommonModule,IonIcon, IonRow, IonCol, IonGrid,IonButtons, IonLabel, IonHeader, IonToolbar, IonTitle, IonContent,IonInput,IonItem,IonButton,ReactiveFormsModule,IonCard,IonCardHeader,IonCardTitle,IonCardSubtitle,IonCardContent,IonAlert,IonSelectOption,IonSelect,IonFooter],
})
export class ModalFormComponent  implements OnInit {
  @Input() data: any;
  form: FormGroup;
  constructor(private modalController: ModalController,
    private formBuilder:FormBuilder
  ) {
   
   }

   iniciarFormulario(): void{
    this.form=this.formBuilder.group({
      nombre_sede: [this.data.nombre_sede],
      direccion_sede: [this.data.direccion_sede],
      telefono_contacto: [this.data.telefono_contacto, Validators.required],
      tipo: [this.data.tipo],
      estado: [this.data.estado],
    })
}
  ngOnInit() {
    console.log('Datos recibidos en el modal:', this.data);
    this.iniciarFormulario();
  }

  dismiss() {
    this.modalController.dismiss();
  }

  // Función para guardar los datos
  save() {
    if (this.form.valid) {
      const formData = this.form.value;
      this.modalController.dismiss(formData);  // Enviar los datos al componente padre (Tab)
    } else {
      console.log('Formulario no válido');
    }
  }
}
