/* eslint-disable class-methods-use-this */
/* eslint-disable camelcase */
import db from '../db/dbconfig.js';
import { geraHash } from '../utils/senhas.js';

class Usuario {
  constructor({
    id,
    nome,
    senha,
    created_at,
    updated_at,
  }) {
    this.id = null || id;
    this.nome = nome;
    [this.senhaHash, this.salHash] = geraHash(senha);
    this.created_at = created_at || new Date().toISOString();
    this.updated_at = updated_at || new Date().toISOString();
  }

  static async pegarTodos() {
    return db.select('*').from('usuarios');
  }

  static async pegarPeloId(id) {
    const resultado = await db.select('*').from('usuarios').where({ id });
    return resultado[0];
  }

  static async pegarPeloNome(nome) {
    const resultado = await db.select('*').from('usuarios').where({ nome });
    return resultado[0];
  }

  async criar() {
    return db('usuarios').insert(this)
      .then((registroCriado) => db('usuarios')
        .where('id', registroCriado[0]))
      .then((registroSelecionado) => registroSelecionado[0]);
  }

  static async excluir(id) {
    // o del retorna a quantidade de rows deletados
    await db('usuario')
      .where({ id })
      .del();
  }

  async salvar() {
    // verificar se o id existe no banco
    // se não existir é create
    // se existir é update
    if (this.id) {
      return this.atualizar(this.id);
    }
    return this.criar();
  }
}

export default Usuario;
