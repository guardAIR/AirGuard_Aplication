var empresaModel = require("../models/empresaModel");

function buscarPorCnpj(req, res) {
  var cnpj = req.query.cnpj;

  empresaModel.buscarPorCnpj(cnpj).then((resultado) => {
    res.status(200).json(resultado);
  });
}

function listar(req, res) {
  empresaModel.listar().then((resultado) => {
    res.status(200).json(resultado);
  });
}

function buscarPorId(req, res) {
  var id = req.params.id;

  empresaModel.buscarPorId(id).then((resultado) => {
    res.status(200).json(resultado);
  });
}

function cadastrar(req, res) {
  var cnpj = req.body.cnpj;
  var razaoSocial = req.body.razaoSocial;
  var nomeFantasia = req.body.nomeFantasia;

  const letrasPossiveisCodigo = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

  var codigo = letrasPossiveisCodigo[Math.round(Math.random()*letrasPossiveisCodigo.length)]
  +letrasPossiveisCodigo[Math.round(Math.random()*letrasPossiveisCodigo.length)]+
  Math.round(Math.random()*9)+
  Math.round(Math.random()*9)+
  Math.round(Math.random()*9);

  empresaModel.buscarPorCnpj(cnpj).then((resultado) => {
    if (resultado.length > 0) {
      res
        .status(401)
        .json({ mensagem: `A empresa com o CNPJ: ${cnpj} já existe.` });
    } else {
      empresaModel.cadastrar(razaoSocial, nomeFantasia, cnpj, codigo).then((resultado) => {
        res.status(201).json({mensagem:"Empresa cadastrada com sucesso.", resultado});
      });
    }
  });
}

function obterTodas(req, res){
  empresaModel.obterTodas().then((result) => {
    res.status(200).json(result)
  }).catch((erro) => {
    res.status(400).json({ mensagem: erro })
  });
}

module.exports = {
  buscarPorCnpj,
  buscarPorId,
  cadastrar,
  listar,
  obterTodas
};
