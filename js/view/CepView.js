class CepView {
  constructor(){
    this.output = document.querySelector('[data-js="saida"]');
  }

  template(model){
    let className = 'class="item-cep"';
    return (
      `
      <div data-js="lista" class="infor-cep">
        <div ${className}>
          <p>CEP:</p>
          ${model.cep}
        </div>
        <div ${className}>
          <p>ESTADO:</p>
          ${model.estado}
        </div>
        <div ${className}>
            <p>CIDADE:</p>
          ${model.cidade}
        </div>
        <div ${className}>
            <p>BAIRRO:</p>
            ${model.bairro}
        </div>
        <div ${className}>
          <p>LOGRADOURO:</p>
          ${model.logradouro}
        </div>
      </div>
     
      `
    )
    
  }

  updateScreen(model){
    this.output.innerHTML = this.template(model);
  }
}