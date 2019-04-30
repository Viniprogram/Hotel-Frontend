export class Usuario{
    constructor(
        public id?:number,
        public name?: string,
        public email?: string,
        public Nivel_Acesso?: number,
        public Codigo_Hotel?: number,
    ){}
}