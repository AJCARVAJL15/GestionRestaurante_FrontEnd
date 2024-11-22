import { Injectable } from "@angular/core";
import { HttpClient,HttpHeaders,HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { Sede } from "../models/sede";
import { updateSede } from "../models/updateSede";
import { empleado } from "../models/empleado";
import { updateEmpleado } from "../models/updateEmpleado";

@Injectable({
    providedIn:'root'
})

export class EmpleadoService{
    constructor(private HttClient:HttpClient){}

      
        agregarEmpleados(body:Sede){
            return this.HttClient.post<empleado[]>(`${environment.url}/empleado/add`, body);
        }
        editarEmpleado(id: number, body: updateEmpleado): Observable<any> {
            const url = `${environment.url}/empleado/update/empleado/${id}`; 
            const headers = new HttpHeaders({
                'Content-Type': 'application/json',
              }); 
            return this.HttClient.put(url, body,{ headers });
        }

       
    
}