import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent,IonRow,IonIcon,IonCol,IonGrid,IonLabel,IonInput,IonItem,IonButton } from '@ionic/angular/standalone';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';
import { Sede } from '../models/sede';
import { SedeService } from '../services/sede.services';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule,Validators } from '@angular/forms';
 
@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: true,
  imports: [CommonModule,IonIcon, IonRow, IonCol, IonGrid, IonLabel, IonHeader, IonToolbar, IonTitle, IonContent,IonInput,IonItem,IonButton,ReactiveFormsModule],
})
export class Tab1Page {

  listadoSedes: Sede[];
  form: FormGroup;

  constructor(private sedeService:SedeService,
    private formBuilder: FormBuilder
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
        tipo: ['', Validators.required],
        estado: ['', Validators.required],
      })
  }
  submitForm() {
    const values=this.form.value;
    this.sedeService.agregarSedes(values).subscribe({
      next: (response: Sede[])=>{
       this.cargarDatos();
      },error:(error:any)=>{
        console.log("error",error)
    }
    })
    console.log(this.form.value)
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

}
