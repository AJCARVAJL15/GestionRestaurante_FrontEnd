import { Injectable } from "@angular/core";
import { HttpClient,HttpHeaders,HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { Sede } from "../models/sede";
import { updateSede } from "../models/updateSede";

@Injectable({
    providedIn:'root'
})

export class SedeService{
    constructor(private HttClient:HttpClient){}

        consultarSedes():Observable<Sede[]>{
            return this.HttClient.get<Sede[]>(`${environment.url}/sede/all`);
        }
        agregarSedes(body:Sede){
            return this.HttClient.post<Sede[]>(`${environment.url}/sede/create`, body);
        }
        eliminarSede(id: number): Observable<any> {
            const params = new HttpParams().set('sedeId', id.toString());
            const url = `${environment.url}/sede/delete`;
            return this.HttClient.delete(url,{params});
        }
        editarSede(id: number, body: updateSede): Observable<any> {
            const url = `${environment.url}/sede/update/${id}`; 
            const headers = new HttpHeaders({
                'Content-Type': 'application/json',
                // Otros encabezados si es necesario
              }); 
            return this.HttClient.put(url, body,{ headers });
        }
    
}