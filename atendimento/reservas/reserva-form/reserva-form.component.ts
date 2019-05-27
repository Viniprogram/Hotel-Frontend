import { Component, OnInit, AfterContentChecked } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";

import { Hospede } from "../../hospedes/shared/hospede.model";
import { HospedeService } from "../../hospedes/shared/hospede.service";
import { ApartamentoService } from "../../apartamentos/shared/apartamento.service";
import { Apartamento } from "../../apartamentos/shared/apartamento.model";

import { switchMap } from "rxjs/operators";

@Component({
  selector: 'app-reserva-form',
  templateUrl: './reserva-form.component.html',
  styleUrls: ['./reserva-form.component.css']
})
export class ReservaFormComponent implements OnInit, AfterContentChecked {

  reservaForm: FormGroup;
  currentAction: string;  
  pageTitle: string;
  serverErrorMessages: string[] = null;
  submittingForm: boolean = false;
  hospedes: Array<Hospede>;
  apartamento: Apartamento = new Apartamento();

  constructor(
    private apartamentoService: ApartamentoService,
    private hospedeService:
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.loadReserva();
    this.setCurrentAction();
    this.buildReservaForm();
    }

    ngAfterContentChecked(){
      this.setPageTitle();
    }

    submitForm(){
      this.submittingForm = true;
  
      if(this.currentAction == 'new')
        this.createApartamento();
      else // currentAction = "edit"
        this.reservaApartamento();     
    }

    //Métodos privados

    private setCurrentAction(){
      if(this.route.snapshot.url[0].path == "new")
        this.currentAction = "new"
      else
        this.currentAction = "edit" 
    }

    private buildReservaForm(){
      this.reservaForm = this.formBuilder.group({
        id:[null],
        Numero_Apartamento: [null, Validators.compose([Validators.required, Validators.minLength(1), Validators.pattern('[0-9]*')])],
        Codigo_Hospede: [null, Validators.compose([Validators.required])],
        Inicio_Hospedagem: [null, Validators.compose([Validators.required])],
        Fim_Hospedagem: [null, Validators.compose([Validators.required])]       
      });
    }

    private loadReserva(){
      if(this.currentAction == "edit"){
        this.route.paramMap.pipe(
          switchMap(params => this.apartamentoService.getById(+params.get("id")))
        )
        .subscribe(
          (apartamento) => {
            this.apartamento = apartamento;
            this.reservaForm.patchValue(apartamento) // seta os valores
          },
          (error) => alert('Ocorreu um erro no servidor, tente mais tarde.')
        )
      }
    }  

  private loadHospedes(){
    this.hospedeService.getAll().subscribe(
      hospedes => this.hospedes = hospedes
    );
  }   

  private setPageTitle(){
    if(this.currentAction == 'new')
      this.pageTitle = 'Cadastro de Novo Apartamento'
    else{
      const apartamentoNumero= this.apartamento.Numero_Apartamento || ''
      this.pageTitle = 'Reservando Apartamento: ' + apartamentoNumero;
    }  
  }

  private createApartamento(){}

   private reservaApartamento(){
    const apartamento: Apartamento = Object.assign(new Apartamento(), this.reservaForm.value);

    this.apartamentoService.reserva(apartamento)
    .subscribe(
      apartamento => this.actionsForSuccess(apartamento),
      error => this.actionsForError(error)
    )
  } 

  //redirect/reload component page
  private actionsForSuccess(apartamento: Apartamento){
    toastr.success('Solicitação processada com sucesso!')

    this.router.navigateByUrl("apartamentos", {skipLocationChange: true}).then(
      () => this.router.navigate(["apartamentos", apartamento.id, "reserva"])
    )
  }

  private actionsForError(error: any){
    toastr.error("Ocorreu um erro ao processar a sua solicitação!");

    this.submittingForm = false;

    if(error.status === 422)
    try{
      this.serverErrorMessages = JSON.parse(error._body).errors;
    }catch(error){
        console.error("Não é uma resposta JSON");
    }
    else
      this.serverErrorMessages = ["Falha na comunicação com o servidor. Por favor, tente mais tarde."]   
  }


}
