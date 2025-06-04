function obterTodasEmpresas(){
    fetch('/empresas/obterTodas',{
        method: 'GET'
    }).then((result) => result.json())
    .then((data) => {
        const empresas_container = document.getElementById("empresas_container");
        const numero_clientes = document.getElementById('numero_clientes');

        numero_clientes.innerHTML = data.length;

        for(let i=0; i<data.length; i++){
            empresas_container.innerHTML += `
            <div>
                <span><img src="https://st2.depositphotos.com/1157740/5935/i/450/depositphotos_59355045-stock-photo-worker-work-hard-with-welding.jpg"></span>
                <span>${data[i].nome_fantasia}</span>
                <span>${data[i].cnpj}</span>
                <span>${data[i].cep}</span>
                <span>${data[i].data_cadastro}</span>
                <span>${data[i].telefone}</span>
                <span>${data[i].codigo_empresa}</span>
            </div>
            `;
        }
        console.log(data)
    })
}