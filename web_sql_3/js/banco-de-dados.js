var db = null;

function iniciarBanco() {
    db = openDatabase('senai', '1.0', 'Tarefa sobre banco de dados', 5000000);
    criarTabelas();
}

function criarTabelas() {
    db.transaction((tr)=>{
        let sql = 'create table cliente (cod integer primary key, nome text, celular text, cidade text)';

        tr.executeSql(sql, null, (tr, result)=>{
            console.log(result);
        }, (tr, error)=>{
            console.log(error);
        });

    });
}

function inserir(nome, celular, cidade) {
    return new Promise((fnSucesso, fnErro)=>{

        
        db.transaction((tr)=>{
            let sql = 'insert into cliente (nome, celular, cidade) values (?, ?, ?)';
    
            tr.executeSql(sql, [nome, celular, cidade], (tr, result)=>{
                console.log(result);
                fnSucesso(result);
            }, (tr, error)=>{
                console.log(error);
                fnErro(error);
            });
    
        });
    });
}

async function salvar() {

    let nome = document.getElementById('nome');
    let celular = document.getElementById('celular');
    let cidade = document.getElementById('cidade');

    if(nome.value == ""){
        alert("Campo nome nao pode ser vazio!");
    }
    else{

        await inserir(nome.value, celular.value, cidade.value);
    
        let resultado = document.getElementById('resultado');
        resultado.innerHTML = 'Cliente cadastrado com sucesso!';

        listar();
    }
    limpar();
}

function enviarFormulario() {
    salvar();
    listar();
    return false;
}

function select() {
    return new Promise((fnSucesso,fnErro) => {

        db.transaction((tr)=>{
            let sql = "select * from cliente";
    
            tr.executeSql(sql, null, (tr,result)=>{
                console.log(result)
                fnSucesso(result);
            }, (tr,error) => {
                console.log(error);
                fnErro(result);
            });
        });
        
    })
}

async function listar() {
    let resultados = await select();
    console.log(resultados);

    let resultadoSelect = document.getElementById('resultadoSelect');
    resultadoSelect.innerHTML = '';

    let linha = null;
    for(let i = 0; i < resultados.rows.length; i++) {
        linha = resultados.rows[i];

        resultadoSelect.innerHTML += '<li class="list-group-item">'+linha.cod+' / '+linha.nome+' / '+linha.celular+' / '+linha.cidade+'</li>';
    }
}

async function listar2() {
    let nome = document.getElementById("nome").value;
    let resultados = await resultadoPesquisaNome(nome);
    console.log(resultados);

    let resultadoSelect = document.getElementById('resultadoSelect');
    resultadoSelect.innerHTML = '';

    let linha = null;
    for(let i = 0; i < resultados.rows.length; i++) {
        linha = resultados.rows[i];

        resultadoSelect.innerHTML += '<li class="list-group-item">'+linha.cod+' / '+linha.nome+' / '+linha.celular+' / '+linha.cidade+'</li>';

    }
}

async function buscar() {
    let resultados = await select();
    console.log(resultados);

    let resultadoSelect = document.getElementById('resultadoSelect');
    resultadoSelect.innerHTML = '';

    let linha = null;
    for(let i = 0; i < resultados.rows.length; i++) {
        linha = resultados.rows[i];

        resultadoSelect.innerHTML += '<li class="list-group-item">'+linha.cod+' / '+linha.nome+' / '+linha.celular+' / '+linha.cidade+'</li>';

    }
}

async function apagar(cod) {
    return new Promise((fnSucesso, fnErro)=>{

        db.transaction((tr)=>{
            let sql = 'delete from cliente where cod = ?';
    
            tr.executeSql(sql, [cod], (tr, result)=>{
                console.log(result);
                fnSucesso(result);
            }, (tr, error)=>{
                console.log(error);
                fnErro(error);
            });
        });
    });
    
}

function limpar() {

    let cod = document.getElementById('cod');
    let nome = document.getElementById('nome');
    let celular = document.getElementById('celular');
    let cidade = document.getElementById('cidade');

    cod.value = '';
    nome.value = '';
    celular.value = '';
    cidade.value = '';
}

function listarDB() {
    listar();
    resultado.innerHTML="";
}

function excluir() {
    var cod = document.getElementById('cod').value;
    
    if(cod.length > 0){

        if(confirm("Deseja excluir ?")){

            db.transaction(function(tx) {
                tx.executeSql("delete from cliente where cod = ?", [cod]);
            });
        
            resultado.innerHTML="Excluido com SUCESSO!"
            cod.value = "";
            nome.value= "";
            celular.value="";
            cidade.value="";
        }
    }else{
        alert("Nenhum cliente selecionado para excluir!")
    }
    listar();
}

async function mostrar2() {

    let cod = document.getElementById('cod');

    let nome = document.getElementById('nome');
    let celular = document.getElementById('celular');
    let cidade = document.getElementById('cidade');
    let resultados = await resultadoPesquisa(cod.value);
    console.log(resultados);
    
    let resultadoSelect = document.getElementById('resultadoSelect');
    resultadoSelect.innerHTML = '';
    
    for(let i = 0; i < resultados.rows.length; i++) {
            
        cod.value = resultados.rows[i].cod;
        nome.value = resultados.rows[i].nome;
        celular.value = resultados.rows[i].celular;
        cidade.value = resultados.rows[i].cidade;
        
    }
     listar();
}


async function mostrar3() {

    alert("Para editar os campos, apos localizar o cadastro favor informar o COD. do cliente e clicar em Pesquisar! ");
    let cod = document.getElementById('cod');
    let nome = document.getElementById('nome');
    let celular = document.getElementById('celular');
    let cidade = document.getElementById('cidade');

    let resultados = await resultadoPesquisaNome();
    console.log(resultados);

    
    let resultadoSelect = document.getElementById('resultadoSelect');
    resultadoSelect.innerHTML = '';

    for(let i = 0; i < resultados.rows.length; i++) {
        
        cod.value = resultados.rows[i].cod;
        nome.value = resultados.rows[i].nome;
        celular.value = resultados.rows[i].celular;
        cidade.value = resultados.rows[i].cidade;
    }

    listar2();
}






function resultadoPesquisaNome(nome) {
    return new Promise((fnSucesso,fnErro) => {

        db.transaction((tr)=>{
            let sql = "select * from cliente where nome like ?";
    
            tr.executeSql(sql, [nome+'%'], (tr,result)=>{
                console.log(result)
                fnSucesso(result);
            }, (tr,error) => {
                console.log(error);
                fnErro(result);
            });
        });
        
    })
}



function resultadoPesquisa(cod) {
    return new Promise((fnSucesso,fnErro) => {

        db.transaction((tr)=>{
            let sql = "select * from cliente where cod = ?";
    
            tr.executeSql(sql, [cod], (tr,result)=>{
                console.log(result)
                fnSucesso(result);
            }, (tr,error) => {
                console.log(error);
                fnErro(result);
            });
        });
        
    })
}

function editar() {
    var cod = document.getElementById('cod').value;
    var nome = document.getElementById('nome').value;
    var celular = document.getElementById('celular').value;
    var cidade = document.getElementById('cidade').value;
    if(nome.length > 0){
        db.transaction(function(tx) {
            tx.executeSql("update cliente set nome = ?, celular = ?, cidade = ? where cod = ?", [nome, celular, cidade, cod]);
        });
    
        resultado.innerHTML="Alterado com Sucesso!";
        listar();
        limpar();
    }else{
        alert("Nenhum cliente selecionado para alteração!")
    }
}