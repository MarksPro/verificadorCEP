(function(DOM){

'use strict';

    function app(){

        var ajax = new XMLHttpRequest();

        var $logradouro = new DOM('[data-js="logradouro"]');
        var $bairro = new DOM('[data-js="bairro"]');
        var $estado = new DOM('[data-js="estado"]');
        var $cidade = new DOM('[data-js="cidade"]');
        var $cep = new DOM('[data-js="cep"]');
        var $status = new DOM('[data-js="status"]');
        var $inputCEP = new DOM('[data-js="cepInput"]');
        var $formCep = new DOM('[data-js="form-cep"]');
        $formCep.on('submit', handleSubmitFormCEP, false);

        function handleSubmitFormCEP(event){
            event.preventDefault();
            var url =  getURL();
            ajax.open('GET', url);
            ajax.send();
            getMessage('loading');
            ajax.addEventListener('readystatechange', handleReadyStateChange)
        };

        function getURL(){
            return cepReplace('http://apps.widenet.com.br/busca-cep/api/cep/[cep].json');
        };

        function clearCEP(){
            return $inputCEP.get()[0].value.replace(/\D/g, '');
        };

        function handleReadyStateChange(){
            if( isRequestOK()){
                getMessage('ok');
                fillCEPFields();
            };
        };

        function isRequestOK(){
            return  ajax.readyState === 4 && ajax.status === 200;
        };

        function fillCEPFields(){

            var data = parseData();

            if(!data){
                getMessage('error2');
                data = clearData();
            };
            if(data.status === 0){
                getMessage('error');
                data = clearData();
            };

            $logradouro.get()[0].textContent = data.address;
            $bairro.get()[0].textContent = data.district;
            $estado.get()[0].textContent = data.state;
            $cidade.get()[0].textContent = data.city;
            $cep.get()[0].textContent = data.code;
        };

        function clearData(){
            return {
                logradouro: '-',
                bairro: '-',
                estado: '-',
                cidade: '-',
                cep: '-'
            };
        };

        function parseData(){
            var result;
            try {
                result = JSON.parse(ajax.responseText);
            }
            catch(e){
                result = null;
            };
            return result;
        };

        function getMessage(type){
            var message = {
                loading: cepReplace(`Buscando informações para o CEP [cep]...`) ,
                ok:  cepReplace(`Endereço referente ao CEP [cep]:`),
                error:  cepReplace(`Não encontramos o endereço para o CEP [cep].`),
                error2: 'Digite um CEP para verificação do endereço:'
            };
            $status.get()[0].textContent = message[type];
        };

        function cepReplace(message){
            return message.replace('[cep]', clearCEP());
        };
    };

    app();

})(window.DOM);
