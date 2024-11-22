import { Component } from '@angular/core';
import { IonHeader,IonList,IonItem,IonSelect,IonSelectOption, IonToolbar, IonTitle, IonContent,IonCard,IonCardHeader,IonCardTitle,IonCardSubtitle,IonCardContent,IonButton,IonAlert,IonIcon,IonLabel,IonInput,IonDatetime } from '@ionic/angular/standalone';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';
import { Sede } from '../models/sede';
import { SedeService } from '../services/sede.services';
import { EmpleadoService } from '../services/empleado.services';
import { CommonModule } from '@angular/common';
import { AlertController } from '@ionic/angular';
import { FormBuilder, FormControlName, FormGroup, ReactiveFormsModule,Validators } from '@angular/forms';
import { empleado } from '../models/empleado';
import { ModalController } from '@ionic/angular/standalone';
import { Modal2FormComponentPage } from './Modal/modal2-form-component/modal2-form-component.page';


@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  standalone: true,
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, ExploreContainerComponent,IonCard,IonCardHeader,IonCardTitle,IonCardSubtitle,IonCardContent,CommonModule,IonButton,IonAlert,IonIcon,IonList,IonItem,IonSelect,IonSelectOption,IonLabel,IonInput,ReactiveFormsModule,IonDatetime ]
})
export class Tab2Page {

  listadoSedes: Sede[];
  listadoEmpleado: empleado[];
  form1: FormGroup;

  

  constructor(private sedeService:SedeService,
    private formBuilder: FormBuilder,
    private alertController: AlertController,
    private empleadoService: EmpleadoService,
    private modalController:ModalController
  ) { 
  }

  ngOnInit():void{
    this.iniciarFormulario();
   this.cargarDatos();
  }

  iniciarFormulario(): void{
      this.form1=this.formBuilder.group({
        nombreEmpleado: ['', Validators.required],
        apellidoEmpleado: ['', Validators.required],
        fechaContratacion: ['', Validators.required],
        salarioEmpleado: ['', Validators.required],
        idSede: ['', Validators.required],
        cargo: ['', Validators.required],
      })
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

  private async showErrorAlert(errorMessage: string) {
    const alert = await this.alertController.create({
      header: 'Error',
      message: errorMessage,
      buttons: ['Aceptar'],
    });

    await alert.present();
  }



empleadosPorSede(selectedSedeId:number){
  this.sedeService.empleadoSede(selectedSedeId).subscribe({
    next: (response: empleado[])=>{
      this.listadoEmpleado=response;
      console.log(this.listadoEmpleado);
    },
    error:(error:any)=>{
        console.log("error",error)
    }
  });
}

 onSedeChange(event: any) {
    const selectedSedeId = event.detail.value;  
    this.empleadosPorSede(selectedSedeId);

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
    const values=this.form1.value;
    const id=this.form1.value.idSede;
    if(this.form1.valid){
    this.empleadoService.agregarEmpleados(values).subscribe({
      next: (response: empleado[])=>{
      this.form1.reset();
      this.empleadosPorSede(id);
      this.mostrarAlerta("Se agrego emleado con exito")
      },error:(error:any)=>{
        console.log("error",error)
        this.mostrarAlerta("Error al agregar empleado")
    }
    })
  }else{
    this.mostrarAlerta("Debes completar todos los campos")
  }
    //onsole.log(this.form1.value)
  }

  async showModal(Empleado:empleado){

    console.log("click")
    const modal = await this.modalController.create({
      component: Modal2FormComponentPage,   // Componente modal que será abierto
      componentProps: {
        data: Empleado     // Aquí estamos pasando los datos
      }
    });

    modal.onDidDismiss().then((data) => {
      if (data.data) {
       const updateData={
        "nombreEmpleado": data.data.nombreEmpleado,
        "apellidoEmpleado": data.data.apellidoEmpleado,
        "fecha_contratacion": data.data.fecha_contratacion,
        "salario_empleado":data.data.salario_empleado,
        "idSede":data.data.idSede,
        "cargo":data.data.cargo,
      }
      console.log(updateData)
      this.empleadoService.editarEmpleado(Empleado.id_empleado,updateData).subscribe({
        next: (response) => {
          console.log('EMPLEADO modificada con éxito:', response);
          this.mostrarAlerta("Empleado modificado con exito")
          this.cargarDatos();
          this.empleadosPorSede(data.data.idSede);
        },
        error: (error) => {
          console.error('Error al modificar EL EMPLEADO:', error);
          this.mostrarAlerta("Error al modificar emleado")

        }
       });

      }
    });
    return await modal.present();

  }
  
}