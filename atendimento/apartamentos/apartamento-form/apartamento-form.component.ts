import { Component, OnInit, AfterContentChecked } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";

import { Apartamento } from "../shared/apartamento.model";
import { ApartamentoService } from "../shared/apartamento.service";

import { switchMap } from "rxjs/operators";
import * as toastr from "toastr"; 

@Component({
  selector: 'app-apartamento-form',
  templateUrl: './apartamento-form.component.html',
  styleUrls: ['./apartamento-form.component.css']
})
export class ApartamentoFormComponent implements OnInit, AfterContentChecked {

  currentAction: string;
  apartamentoForm: FormGroup;
  reservaForm: FormGroup;
  pageTitle: string;
  serverErrorMessages: string[] = null;
  submittingForm: boolean = false;
  apartamento: Apartamento = new Apartamento();

  imaskConfig = {
    mask: Number,
    scale: 2,
    thousandsSeparator: '',
    padFractionalZeros: true,
    normalizeZeros: true,
    radix: ','
  };

 /* ptBR = {
    firstDayOfWeek: 0,
    dayNames: ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"],
    dayNamesShort: ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sab"],
    dayNamesMin: ["Do","Se","Te","Qu","Qu","Se","Sa"],
    monthNames: [ "Janeiro","Fevereiro","Março","Abril","Maio","Junho","Julho","Agosto","Setembro","Outubro","Novembro","Dezembro" ],
    monthNamesShort: [ "Jan", "Fev", "Mar", "Abr", "Mai", "Jun","Jul", "Ago", "Set", "Out", "Nov", "Dez" ],
    today: 'Hoje',
    clear: 'Limpar'    
  };*/

  constructor(
    private apartamentoService: ApartamentoService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.setCurrentAction();
    this.buildApartamentoForm();
    this.loadApartamento();
  }

  ngAfterContentChecked(){
    this.setPageTitle();
  }

  submitForm(){
    this.submittingForm = true;

    if(this.currentAction == 'new')
      this.createApartamento();
    else // currentAction = "edit"
      this.updateApartamento();     
  }

  //Métodos privados

  private setCurrentAction(){
    if(this.route.snapshot.url[0].path == "new")
      this.currentAction = "new"
    else
      this.currentAction = "edit" 
  }

  private buildApartamentoForm(){
    this.apartamentoForm = this.formBuilder.group({
      id:[null],
      Codigo_Hotel: [null, Validators.compose([Validators.required, Validators.minLength(1), Validators.pattern('[0-9]*')])],
      Numero_Apartamento: [null, Validators.compose([Validators.required, Validators.minLength(1), Validators.pattern('[0-9]*')])],
      Tipo_Apartamento: ['Casal', Validators.compose([Validators.required])],
      Tipo_Acomodacao: ['Standard', Validators.compose([Validators.required])],
      Quantidade_Cama: [null, Validators.compose([Validators.required, Validators.minLength(1)])],
      TV:[null],
      Frigobar:[null],
      Banheira:[null],
      Escrivaninha:[null],
      Ocupado: ['N', Validators.compose([Validators.required])],
    //  Inicio_Hospedagem: [null],
    //  Fim_Hospedagem: [null],
      Valor_Diaria: [null, Validators.compose([Validators.required])],
    //  Codigo_Hospede: [null]
    });
  }

  private loadApartamento(){
    if(this.currentAction == "edit"){
      this.route.paramMap.pipe(
        switchMap(params => this.apartamentoService.getById(+params.get("id")))
      )
      .subscribe(
        (apartamento) => {
          this.apartamento = apartamento;
          this.apartamentoForm.patchValue(apartamento) // seta os valores
        },
        (error) => alert('Ocorreu um erro no servidor, tente mais tarde.')
      )
    }
  }

  private setPageTitle(){
    if(this.currentAction == 'new')
      this.pageTitle = 'Cadastro de Novo Apartamento'
    else{
      const apartamentoNumero= this.apartamento.Numero_Apartamento || ''
      this.pageTitle = 'Editando Apartamento: ' + apartamentoNumero;
    }  
  }

  private createApartamento(){
    const apartamento: Apartamento = Object.assign(new Apartamento(), this.apartamentoForm.value);

    this.apartamentoService.create(apartamento)
      .subscribe(
        apartamento => this.actionsForSuccess(apartamento),
        error => this.actionsForError(error)
      )
  }

  private updateApartamento(){
    const apartamento: Apartamento = Object.assign(new Apartamento(), this.apartamentoForm.value);

    this.apartamentoService.update(apartamento)
    .subscribe(
      apartamento => this.actionsForSuccess(apartamento),
      error => this.actionsForError(error)
    )
  } 

  private reservaApartamento(){
    const apartamento: Apartamento = Object.assign(new Apartamento(), this.reservaForm.value);

    this.apartamentoService.update(apartamento)
    .subscribe(
      apartamento => this.actionsForSuccess(apartamento),
      error => this.actionsForError(error)
    )
  } 

  //redirect/reload component page
  private actionsForSuccess(apartamento: Apartamento){
    toastr.success('Solicitação processada com sucesso!')

    this.router.navigateByUrl("apartamentos", {skipLocationChange: true}).then(
      () => this.router.navigate(["apartamentos", apartamento.id, "edit"])
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
