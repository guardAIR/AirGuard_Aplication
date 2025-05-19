function cadastrar() {

    var nomeVar = input_nome.value;
    var sobrenomeVar = input_sobrenome.value;
    var emailVar = input_email.value;
    var senhaVar = input_senha.value;
    var codigoEmpresaVar = input_codigo_empresa.value;

    console.log
        (
            "Nome " + nomeVar + "\n",
            "Sobrenome " + sobrenomeVar + "\n",
            "E-mail " + emailVar + "\n",
            "Senha " + senhaVar + "\n",
            "Código da empresa " + codigoEmpresaVar + "\n"
        )

    if
        (
        nomeVar == "" ||
        sobrenomeVar == "" ||
        emailVar == "" ||
        senhaVar == "" ||
        codigoEmpresaVar == ""
    ) {
        cardErro.style.display = "block";
        mensagem_erro.innerHTML = "(Mensagem de erro para todos os campos em branco)";
        return false;
    } else {
        console.log('sumir mensagem')
    }

    fetch("http://localhost:3333/usuarios/cadastrar", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            nome: nomeVar,
            sobrenome: sobrenomeVar,
            email: emailVar,
            senha: senhaVar,
            codigoEmpresa: codigoEmpresaVar
        }),
    })
        .then(function (resposta) {
            console.log("resposta: ", resposta);

            if (resposta.ok) {               
                window.location = "login.html";
            } else {
                throw "Houve um erro ao tentar realizar o cadastro!";
            }
        })
        .catch(function (resposta) {
            console.log(`#ERRO: ${resposta}`);
            codEmpresaError.innerHTML += 'Insira um código de empresa válido.';
            codEmpresaError.style.color = 'red';
        });

    return false;
}

function sumirMensagem() {
    cardErro.style.display = "none";
}