class CepModel {
  constructor(cep, estado, cidade, bairro, logradouro){
    this._cep = cep;
    this._estado = estado;
    this._cidade = cidade;
    this._bairro = bairro;
    this._logradouro = logradouro;
  }

  get cep() {
    return this._cep;
  }

  get estado() {
    return this._estado;
  }

  get cidade() {
    return this._cidade;
  }

  get bairro() {
    return this._bairro;
  }

  get logradouro() {
    return this._logradouro;
  }

}