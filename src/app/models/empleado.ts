import { Sede } from "./sede";

export interface empleado{
    id_empleado: number,
    nombreEmpleado:string,
    apellidoEmpleado:string,
    fecha_contratacion:Date,
    salario_empleado:number,
    sede:Sede,
    cargo:string
}
