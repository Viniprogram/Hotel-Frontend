export class Reserva{
    constructor(
        public id?:number,
        public Numero_Apartamento?:number,
        public Numero_Hospede?:number,        
        public Inicio_Hospedagem?:string,
        public Fim_Hospedagem?:string,               
    ){}
}