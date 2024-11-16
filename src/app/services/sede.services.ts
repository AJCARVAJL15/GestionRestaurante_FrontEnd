import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { Sede } from "../models/sede";

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
    
}