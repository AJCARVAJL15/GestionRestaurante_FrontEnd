import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular/standalone'; 
import { IonRow,IonCol,IonGrid,IonLabel,IonInput,IonItem,IonButtons, IonHeader, IonToolbar, IonTitle, IonContent,IonCard,IonCardHeader,IonCardTitle,IonCardSubtitle,IonCardContent,IonButton,IonAlert,IonIcon,IonSelectOption,IonSelect,IonFooter} from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule,Validators } from '@angular/forms';
import { SedeService } from 'src/app/services/sede.services';
import { Sede } from 'src/app/models/sede';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-modal2-form-component',
  templateUrl: './modal2-form-component.page.html',
  styleUrls: ['./modal2-form-component.page.scss'],
  standalone: true,
  imports: [CommonModule,IonIcon, IonRow, IonCol, IonGrid,IonButtons, IonLabel, IonHeader, IonToolbar, IonTitle, IonContent,IonInput,IonItem,IonButton,ReactiveFormsModule,IonCard,IonCardHeader,IonCardTitle,IonCardSubtitle,IonCardContent,IonAlert,IonSelectOption,IonSelect,IonFooter],
})
export class Modal2FormComponentPage implements OnInit {

  @Input() data: any;
  form: FormGroup;
  listadoSedes: Sede[];
  constructor(private modalController: ModalController,
    private formBuilder:FormBuilder,
    private sedeService:SedeService,
    private alertController:AlertController
  ) {
   
   }

   iniciarFormulario(): void{
    this.form=this.formBuilder.group({
      nombreEmpleado: [this.data.nombreEmpleado,Validators.required],
      apellidoEmpleado: [this.data.apellidoEmpleado,Validators.required],
      fecha_contratacion: [this.data.fecha_contratacion, Validators.required],
      salario_empleado: [this.data.salario_empleado,Validators.required],
      idSede: [this.data.sede.id_sede,Validators.required],
      cargo: [this.data.cargo,Validators.required],
    })
}
  ngOnInit() {
    console.log('Datos recibidos en el modal:', this.data);
    console.log(this.data.sede.id_sede)
    this.iniciarFormulario();
    this.cargarDatos();
  }
  async mostrarAlerta(subheader:string) {
    const alert = await this.alertController.create({
      header: "Alerta",
      message: subheader,
      buttons: ['OK']
    });

    await alert.present();
  }
  
  private cargarDatos():void{
    this.sedeService.consultarSedes().subscribe({
      next: (response: Sede[])=>{
        this.listadoSedes=response;
      },
      error:(error:any)=>{
          console.log("error",error)
      }
    });
  }

  dismiss() {
    this.modalController.dismiss();
  }

  // Función para guardar los datos
  save() {
    if (this.form.valid) {
      const formData = this.form.value;
      this.modalController.dismiss(formData); 
      console.log(formData) 
    } else {
      this.mostrarAlerta("Debes completar todos los campos")
    }
  }
}
