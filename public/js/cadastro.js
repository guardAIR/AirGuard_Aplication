function finalizarAguardar(texto) {
    // var divAguardar = document.getElementById("div_aguardar");
    // divAguardar.style.display = "none";

    // var divErrosLogin = document.getElementById("div_erros_login");
    // if (texto) {
    //     divErrosLogin.style.display = "flex";
    //     divErrosLogin.innerHTML = texto;
    // }
}

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
        // finalizarAguardar();
        return false;
    } else {
        // setInterval(sumirMensagem, 5000);
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
                cardErro.style.display = "block";

                mensagem_erro.innerHTML =
                    "Cadastro realizado com sucesso! Redirecionando para tela de Login...";

                setTimeout(() => {
                    window.location = "login.html";
                }, "2000");

                // limparFormulario();
                // finalizarAguardar();
            } else {
                throw "Houve um erro ao tentar realizar o cadastro!";
            }
        })
        .catch(function (resposta) {
            console.log(`#ERRO: ${resposta}`);
            // finalizarAguardar();
        });

    return false;
}

function sumirMensagem() {
    cardErro.style.display = "none";
}