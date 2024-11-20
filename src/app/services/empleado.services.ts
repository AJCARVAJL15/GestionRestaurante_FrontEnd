import { Injectable } from "@angular/core";
import { HttpClient,HttpHeaders,HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { Sede } from "../models/sede";
import { updateSede } from "../models/updateSede";
import { empleado } from "../models/empleado";

@Injectable({
    providedIn:'root'
})

export class EmpleadoService{
    constructor(private HttClient:HttpClient){}

      
        agregarEmpleados(body:Sede){
            return this.HttClient.post<empleado[]>(`${environment.url}/empleado/add`, body);
        }
      

       
    
}