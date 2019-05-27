import { Component, OnInit, AfterContentChecked } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";

import { Hospede } from "../shared/hospede.model";
import { HospedeService } from "../shared/hospede.service";

import { switchMap } from "rxjs/operators";
import * as toastr from "toastr";

@Component({
  selector: 'app-hospede-form',
  templateUrl: './hospede-form.component.html',
  styleUrls: ['./hospede-form.component.css']
})
export class HospedeFormComponent implements OnInit, AfterContentChecked {

  currentAction: string;
  hospedeForm: FormGroup;
  pageTitle: string;
  serverErrorMessages: string[] = null;
  submittingForm: boolean = false;  
  hospede: Hospede = new Hospede();

  
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
    private HospedeService: HospedeService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.setCurrentAction();
    this.buildHospedeForm();
    this.loadHospede();    
  }

  ngAfterContentChecked(){
    this.setPageTitle();
  }

  submitForm(){
    this.submittingForm = true;

    if(this.currentAction == 'new')
      this.createHospede();
    else // currentAction = "edit"
      this.updateHospede();  
  }

  //Métodos privados

  private setCurrentAction(){
    if(this.route.snapshot.url[0].path == "new")
      this.currentAction = "new"
    else
      this.currentAction = "edit" 
  }

  private buildHospedeForm(){
    this.hospedeForm = this.formBuilder.group({
      id:[null],
      Nome_Hospede: [null, Validators.compose([Validators.required, Validators.minLength(5)])],
      Data_Nascimento: [null, Validators.compose([Validators.required])],
      CPF: [null, Validators.compose([Validators.required])],
      RG: [null, Validators.compose([Validators.required])],
      Endereco: [null, Validators.compose([Validators.required, Validators.minLength(3)])],
      Numero:[null, Validators.compose([Validators.required, Validators.minLength(1), Validators.pattern('[0-9]*')])],
      Complemento:[null],
      Bairro:[null,  Validators.compose([Validators.required])],
      Cidade:[null,  Validators.compose([Validators.required])],
      UF:['Selecione...', Validators.compose([Validators.required])],
      CEP: [null,  Validators.compose([Validators.required])],
      Telefone: [null],
      Celular: [null, Validators.compose([Validators.required])],
      Email:[null, Validators.compose([Validators.required, Validators.email])],
      Empresa: [null]
    });
  }

  private loadHospede(){
    if(this.currentAction == "edit"){
      this.route.paramMap.pipe(
        switchMap(params => this.HospedeService.getById(+params.get("id")))
      )
      .subscribe(
        (hospede) => {
          this.hospede = hospede;
          this.hospedeForm.patchValue(hospede) // seta os valores
        },
        (error) => alert('Ocorreu um erro no servidor, tente mais tarde.')
      )
    }
  }

  private setPageTitle(){
    if(this.currentAction == 'new')
      this.pageTitle = 'Cadastro de Novo Hóspede'
    else{
      const hospedeNome = this.hospede.Nome_Hospede || ''
      this.pageTitle = 'Editando Hóspede: ' + hospedeNome;
    }  
  }

  private createHospede(){
    const hospede: Hospede = Object.assign(new Hospede(), this.hospedeForm.value);

    this.HospedeService.create(hospede)
      .subscribe(
        hospede => this.actionsForSuccess(hospede),
        error => this.actionsForError(error)
      )
  }

  private updateHospede(){
    const hospede: Hospede = Object.assign(new Hospede(), this.hospedeForm.value);

    this.HospedeService.update(hospede)
    .subscribe(
      hospede => this.actionsForSuccess(hospede),
      error => this.actionsForError(error)
    )
  }

  //redirect/reload component page
  private actionsForSuccess(hospede: Hospede){
    toastr.success('Solicitação processada com sucesso!')

    this.router.navigateByUrl("hospedes", {skipLocationChange: true}).then(
      () => this.router.navigate(["hospedes", hospede.id, "edit"])
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
