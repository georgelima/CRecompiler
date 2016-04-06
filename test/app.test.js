'use strict'
const app = require('../app');
const assert = require('assert');

describe('deve compilar o codigo', ()=>{
  it ('passando string', ()=> {
    app('teste.c');
  });
  it ('passando number', ()=> {
    app(123);
  });
  it ('passando object', ()=> {
    app({nome: 'Nome'});
  });
  it ('passando undefined', ()=> {
    app();
  });
})
