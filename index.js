async function fetchApi() {
    //pega valor do input
    let inputCep = document.getElementById('inputCep').value
    console.log(inputCep)
    //validaçao do input que não foi atribuido valor nenhum
    if(inputCep.length == 0){
        alert('O campo do CEP precisa ser preenchido')
        return 
    }
    //validação do input com menos de oito caracteres
    if(inputCep.length < 8){
        alert(`Um CEP possui 8 caravteres, voce preencheu o campo do CEP com a quantidade de caracteres invalida, voce digitou ${inputCep.length} caracteres`)
        return 
    }
    //coloca o valor do input na url do endpoint
    let url = `https://viacep.com.br/ws/${inputCep}/json/`;
    console.log(url)
    
    //defino uma variavel com a resposta da minha requisicao fetch no endpoint acima
    let resposta = await fetch(url);
    console.log(resposta)

    //formata a resposta
    const formatadaResposta = await resposta.json();
    // validaçao a resposta teve sucesso
    if(resposta.ok){
        console.log("Sucesso", formatadaResposta)
        return exibirResultado()
    }
    //va;idaçào da resposta caso de erro
    if(!resposta.ok){
        console.log('Erro: ', formatadaResposta?.message)
        return 
    }
    function exibirResultado(){
        //selecina um <elemento> pelo id
        let campo_elemento = document.getElementById('divResultado')
        //cria o elemento <p>
        let elemento = document.createElement('p')
        elemento.innerHTML = /*html*/ `
        Rua: ${formatadaResposta.logradouro}<br/>
        Bairro: ${formatadaResposta.bairro}<br/>
        Cidade: ${formatadaResposta.localidade}<br/>
        Estado: ${formatadaResposta.uf}<br/>
        CEP: ${formatadaResposta.cep}<br/>
        `
        //renderiza o elemento <p> no corpo do elemento <div>
        campo_elemento.appendChild(elemento)
    }
}