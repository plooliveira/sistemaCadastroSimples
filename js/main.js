(function(DOM) {
    'use strict'
    
  function app(){
    //declarando variaveis
    var ajax = new XMLHttpRequest(),
        $img = new DOM('[data-input="img"]'),
        $marcaModelo = new DOM('[data-input="marca/modelo"]'),
        $ano = new DOM('[data-input="ano"]'),
        $placa = new DOM('[data-input="placa"]'),
        $cor = new DOM('[data-input="cor"]'),
        $btnCadastro = new DOM('[data-button="cadastrar"]'),
        $tabelaCarro = new DOM('[data-table="carros"]')

    //Função que verifica se a consulta ajax foi bem sucedida ou não
    function isRequest(){
      return ajax.readyState === 4 && ajax.status === 200;
    }

    //Função que seta o Cabeçalho com as informações consultadas via ajax
    function setHeader(data){
      var $companyName = new DOM('[data-text="companyName"]');
      var $companyTel = new DOM('[data-text="companyTel"]');
      $companyName.get()[0].textContent = data['name'];
      $companyTel.get()[0].textContent = $companyTel.get()[0].textContent + ' ' + data['phone'];
      
    }

    //Função que faz a requisição ajax para obter as informações do cabeçalho
    function initHeader(){
      ajax.open('GET','js/json/company.json' );
      ajax.send();
      ajax.addEventListener('readystatechange', function(){
        if (isRequest()){
          var data = JSON.parse(ajax.responseText);
          setHeader(data);
        }

      })
        
    }

    //Função responssavél por adicionar um novo carro à tabela 
    function addNewCar(car){
      
      var fragment = document.createDocumentFragment();
      var novaLinha = document.createElement('tr');
      var dadosCar = {
        img : document.createElement("img"),
        marca : document.createTextNode(car.marca),
        ano : document.createTextNode(car.ano),
        placa : document.createTextNode(car.placa),
        cor : document.createTextNode(car.cor)
        
      }

      dadosCar.img.setAttribute('src',car.img);
      
      for (const item in dadosCar) {
        var td = document.createElement('td');
        td.appendChild(dadosCar[item]);
        novaLinha.appendChild(td);
      }
      novaLinha.setAttribute('class', 'tabelaLinhas')
      fragment.appendChild(novaLinha);
      $tabelaCarro.get()[0].appendChild(fragment);     
    }
    //função que obtem os valores digitados no form para serem cadastrados
    function getValueForm(){
      $btnCadastro.on('click', function(event){
        event.preventDefault();
        var car = {
            img : $img.get()[0].value,
            marca : $marcaModelo.get()[0].value,
            ano : $ano.get()[0].value,
            placa : $placa.get()[0].value,
            cor : $cor.get()[0].value
        }
            addNewCar(car);
      })
    }
    
    initHeader();
    getValueForm();

  }

  app();

  })(window.dom);
