export interface Sede
{
 idSede:number;
 nombre_sede?:string;
 direccion_sede:string;
 telefono_contacto:string;
 fecha_apertura:Date;
 tipo?:string;       // Campo de tipo enumerado TipoSede
 estado:string;

}
     