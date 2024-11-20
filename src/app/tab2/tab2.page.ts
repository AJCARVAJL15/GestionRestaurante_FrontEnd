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
    private empleadoService: EmpleadoService
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

  // async presentAlert() {
  //   const alert = await this.alertController.create({
  //     header: 'Por favor ingresa la información',
  //     inputs: [
  //       {
  //         name: 'nombre_sede',
  //         type: 'text',
  //         placeholder: 'Nombre de la sede',
  //         value: this.form.get('nombre_sede')?.value, 
  //       },
  //       {
  //         name: 'direccion_sede',
  //         type: 'text',
  //         placeholder: 'Dirección de la sede',
  //         value: this.form.get('direccion_sede')?.value,
  //       },
  //       {
  //         name: 'telefono_contacto',
  //         type: 'tel',
  //         placeholder: 'Teléfono de contacto',
  //         value: this.form.get('telefono_contacto')?.value,
  //       },
  //       {
  //         name: 'tipo',
  //         type: 'radio',
  //         label: 'Oficina',  // El primer radio para "Oficina"
  //     value: 'oficina',  // El valor que se asignará si se selecciona
  //       checked: this.form1.get('tipo')?.value === 'oficina'
  //       },
  //       {
  //         name: 'estado',
  //         type: 'text',
  //         placeholder: 'Estado de la sede',
  //         value: this.form.get('estado')?.value,
  //       },
  //     ],
  //     buttons: [
  //       {
  //         text: 'Cancelar',
  //         role: 'cancel',
  //       },
  //       {
  //         text: 'Aceptar',
  //         handler: (data) => {
  //           // Actualizamos el FormGroup con los datos ingresados en el alert
  //           this.form.patchValue({
  //             nombre_sede: data.nombre_sede,
  //             direccion_sede: data.direccion_sede,
  //             telefono_contacto: data.telefono_contacto,
  //             tipo: data.tipo,
  //             estado: data.estado,
  //           });
            
  //           if (this.form.valid) {
  //             this.form.updateValueAndValidity();
  //             console.log('Formulario actualizado:', this.form.value);
  //             this.showErrorAlert('Sede agregada correectamente'); 
  //             const values=this.form.value;
  //             this.sedeService.agregarSedes(values).subscribe({
  //               next: (response: Sede[])=>{
  //                this.cargarDatos();
  //               },error:(error:any)=>{
  //                 this.showErrorAlert('Error'); 
  //             }
              
  //             })

  //             this.form.reset();
  //             return true; // Permite cerrar el alert
  //           } else {
  //             console.log('Formulario no válido');
  //             this.showErrorAlert('Hubo un error al intentar actualizar los datos. Por favor, inténtalo de nuevo.');
  //             return false; // Evita que el alert se cierre
  //           }
  //         },
  //       },
  //     ],
  //   });

  //   await alert.present();
  // }
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

  submitForm() {
    const values=this.form1.value;
    const id=this.form1.value.idSede;
    this.empleadoService.agregarEmpleados(values).subscribe({
      next: (response: empleado[])=>{
      this.form1.reset();
      this.empleadosPorSede(id);
      },error:(error:any)=>{
        console.log("error",error)
    }
    })
    //onsole.log(this.form1.value)
  }
  
}