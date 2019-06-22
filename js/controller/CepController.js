class CepController {
  constructor(){
    this.bgModal = document.querySelector('body');
    this.modal = document.querySelector('[data-js="modal"]');
    this.modalMessage = document.querySelector('[data-js="modalMessage"]');
    this.inputCep = document.querySelector('[data-js="inputCep"]');
    this.ButtonCep = document.querySelector('[data-js="buttonSubmit"]');
    this.view = new CepView();
    this.dadosCep;
    this.getCep();
  }

  getCep(){
    this.ButtonCep.addEventListener('click', (e) => {
      this.handleClick(e) 
    });
  }

  handleClick(event){
    event.preventDefault();
    const cep = this.inputCep.value;
    this.fetchCep(cep);
    this.inputCep.value = '';
  }

  fetchCep(cep){
    console.log();
    if(cep != ''){
      fetch(`http://apps.widenet.com.br/busca-cep/api/cep/${cep}.json`)
      .then(response => response.json())
      .then(objeto => {
        if(objeto.status === 1){
          this.dadosCep = this.createModel(objeto);
          this.view.updateScreen(this.dadosCep);  
          
        }
        else {
          this.view.output.innerHTML = '';
          this.modalMessage.innerHTML = objeto.message;
          this.openModal(this.modal);
        }; 
      });
    };
   
  }

  openModal(el){
    this.bgModal.classList.add('active')
    el.classList.add('active');
  }

  closeModal(){
    this.bgModal.classList.remove('active')
    this.modal.classList.remove('active');
  }

  createModel(objeto){
    return new CepModel(
      objeto.code,
      objeto.state,
      objeto.city,
      objeto.district,
      objeto.address
    );
  }
}