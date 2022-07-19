function salvarCliente() {

    let cod = document.getElementById('cod');
    let nome = document.getElementById('nome');
    let celular = document.getElementById('celular');
    let cidade = document.getElementById('cidade');

    console.log(cod.value);
    console.log(nome.value);
    console.log(celular.value);
    console.log(cidade.value);

    guardarNoStorage(cod.value, nome.value, celular.value, cidade.value);
    gerarCodigo(cod.value);

    nome.value = '';
    celular.value = '';
    cidade.value = '';

    exibirDados();

    return false;
}

function guardarNoStorage(cod, nome, celular, cidade) {

    localStorage.cod = cod;
    localStorage.nome = nome;
    localStorage.celular = celular;
    localStorage.cidade = cidade;

}

function exibirDados() {

    let cod = localStorage.cod;
    let nome = localStorage.nome;
    let celular = localStorage.celular;
    let cidade = localStorage.cidade;

    let conteudo = cod+' / ';
    conteudo += nome+' / ';
    conteudo += celular+' / ';
    conteudo += cidade;

    let resultado = document.getElementById('resultado');
    resultado.innerHTML = conteudo;

}

function gerarCodigo(cod) {
    let novoCodigo = parseInt(cod)+1;
    sessionStorage.cod = novoCodigo;
    recuperarCodigo();
}

function recuperarCodigo() {
    let cod = document.getElementById('cod');
    cod.value = sessionStorage.cod;
}