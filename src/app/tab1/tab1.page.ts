import { Component } from '@angular/core';
import { IonRow,IonCol,IonGrid,IonLabel,IonInput,IonItem, IonHeader, IonToolbar, IonTitle, IonContent,IonCard,IonCardHeader,IonCardTitle,IonCardSubtitle,IonCardContent,IonButton,IonAlert,IonIcon,IonSelectOption,IonSelect} from '@ionic/angular/standalone';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';
import { Sede } from '../models/sede';
import { SedeService } from '../services/sede.services';
import { CommonModule } from '@angular/common';
import { AlertController } from '@ionic/angular';
import { FormBuilder, FormGroup, ReactiveFormsModule,Validators } from '@angular/forms';
import { ModalFormComponent } from './Modal/modal-form/modal-form.component';
import { ModalController } from '@ionic/angular/standalone';
@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: true,
  imports: [CommonModule,IonIcon, IonRow, IonCol, IonGrid, IonLabel, IonHeader, IonToolbar, IonTitle, IonContent,IonInput,IonItem,IonButton,ReactiveFormsModule,IonCard,IonCardHeader,IonCardTitle,IonCardSubtitle,IonCardContent,IonAlert,IonSelectOption,IonSelect],
})
export class Tab1Page {

  listadoSedes: Sede[];
  form: FormGroup;
 
  constructor(private sedeService:SedeService,
    private formBuilder: FormBuilder,
    private alertController:AlertController,
    private modalController: ModalController
  ) { 
  }

  ngOnInit():void{
    this.iniciarFormulario();
   this.cargarDatos();
  }

  iniciarFormulario(): void{
      this.form=this.formBuilder.group({
        nombre_sede: ['', Validators.required],
        direccion_sede: ['', Validators.required],
        telefono_contacto: ['', Validators.required],
        tipo: [''],
        estado: [''],
      })
  }
  async mostrarAlerta(subheader:string) {
    const alert = await this.alertController.create({
      header: "Alerta",
      message: subheader,
      buttons: ['OK']
    });

    await alert.present();
  }
  submitForm() {
    const values=this.form.value;

    if(this.form.valid){
      this.sedeService.agregarSedes(values).subscribe({
        next: (response: Sede[])=>{
         this.cargarDatos();
        this.form.reset();
        this.mostrarAlerta("Sede agregada con exito")
        },error:(error:any)=>{
          console.log("error",error)
          this.mostrarAlerta("Error al enviar los datos")
      }
      })
    }else{
      this.mostrarAlerta("Debes completar todos los campos")
    }
   
    
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

  async borrarsede(sede: Sede){
    console.log(sede.idSede)
    const alert = await this.alertController.create({
      header: '¡Alerta!',
      message: 'Estas seguro que deseas eliminar la sede.',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log('Acción cancelada');
          },
        },
        {
          text: 'Aceptar',
          handler: () => {
           this.sedeService.eliminarSede(sede.idSede).subscribe({
            next: (response) => {
              console.log('Sede eliminada con éxito:', response);
              this.cargarDatos();
            },
            error: (error) => {
              console.error('Error al eliminar la sede:', error);
            }
           });
          },
        },
      ],
    });

    await alert.present(); 
    
  }

  async showModal(sede:Sede) {
    const modal = await this.modalController.create({
      component: ModalFormComponent,   // Componente modal que será abierto
      componentProps: {
        data: sede     // Aquí estamos pasando los datos
      }
    });

    // Captura el resultado cuando el modal se cierra
    modal.onDidDismiss().then((data) => {
      if (data.data) {
       const updateData={
        "telefono_contacto": data.data.telefono_contacto,
        "tipo": data.data.tipo,
        "estado": data.data.estado
      }
      console.log(updateData)
      this.sedeService.editarSede(sede.idSede,updateData).subscribe({
        next: (response) => {
          console.log('Sede modificada con éxito:', response);
          this.mostrarAlerta("Sede modificada con éxito")
          this.cargarDatos();
        },
        error: (error) => {
          this.mostrarAlerta("Error al modificar la sede")
          console.error('Error al modificar la sede:', error);
        }
       });

      }
    });

    return await modal.present();
   }

}
