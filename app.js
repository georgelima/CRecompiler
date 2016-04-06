'use strict'
module.exports = function(nome){
  //DEPENDENCIES
  const fs = require('fs');
  const childProcess = require('child_process');
  //NOME DO ARQUIVO PELA LINHA DE COMANDO OU ARGUMENTO
  var nomeArquivo = process.argv[2] || nome;
  //TESTA SE NOME DO ARQUIVO É STRING SE NÃO FOR ATRIBUI UMA STRING VAZIA
  if (typeof nomeArquivo !== 'string'){
    nomeArquivo = '';
    console.log('Nome do arquivo não informado!');
  }
  //GERA O NOME EXECUTAVEL A PARTIR DO VALOR INFORMADO NA LINHA DE COMANDO OU RETIRANDO .C DO NOME DO ARQUIVO
  const nomeExecutavel = process.argv[3] || nomeArquivo.replace('.c', '') || '';
  //INICIA O PROGRAMA
  console.log('==== Recompilador C ====');
  console.log(`==== Assistindo por mudanças no arquivo ${nomeArquivo} ====`);

  //ASSISTE POR MUDANÇAS NO ARQUIVO
  fs.watchFile(nomeArquivo, () => {
      //GERA O SCRIPT
      let query = `gcc -Wall -o ${nomeExecutavel} ${nomeArquivo}`;
      //EXECUTA O GCC COM OS DADOS INFORMADOS
      childProcess.exec(query, (err, stdout, stderr)=> {
        console.log(`Recompilando ${nomeArquivo}`);
        //SE HOUVER ERRO NA COMPILAÇÃO, LANÇA O ERRO!
        if (err){
          throw err;
        }
        //COMPILA O ARQUIVO E LANÇA O SUCESSO!
        console.log('Compilado com Sucesso!', new Date());
        if (stdout){
          console.log(stdout);
        }
      });
  });
}
