export class Apartamento{
    constructor(
        public id?:number,
        public Codigo_Hotel?:number,
        public Numero_Apartamento?:number,
        public Tipo_Apartamento?:string,
        public Tipo_Acomodacao?:string,
        public Quantidade_Cama?:number,
        public TV?:string,
        public Frigobar?:string,
        public Banheira?:string,
        public Escrivaninha?:string,
        public Ocupado?:boolean,
        public Inicio_Hospedagem?:string,
        public Fim_Hospedagem?:string,
        public Valor_Diaria?:string,
        public Codigo_Hospede?:number,
    ){}
}