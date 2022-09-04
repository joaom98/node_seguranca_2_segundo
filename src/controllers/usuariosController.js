import Usuario from '../models/usuario.js';
import { validaSenha } from '../utils/senhas.js';

class UsuariosController {
  static cadastrarUsuario = async (req, res) => {
    const { body } = req;
    const usuario = new Usuario(body);
    try {
      if (await Usuario.pegarPeloNome(usuario.nome)) {
        return res.status(409).json({ message: 'Nome de usuário já está em uso' });
      }
      const resposta = await usuario.salvar();
      return res.status(201).json({ message: 'Usuario criado', content: resposta });
    } catch (err) {
      return res.status(500).json(err.message);
    }
  };

  static excluirUsuario = async (req, res) => {
    const { params } = req;
    try {
      await Usuario.excluir(params.id);
      return res.status(200).json({ message: 'Usuario excluído' });
    } catch (err) {
      return res.status(500).json(err.message);
    }
  };

  static login = async (req, res) => {
    try {
      const { nome, senha } = req.body;
      // TODO: validar nome e senha antes de seguir.

      const usuario = await Usuario.pegarPeloNome(nome)
      const loginValido = validaSenha(
        senha,
        usuario.senhaHash,
        usuario.salHash);
      
      if (!loginValido) {
        return res.status(422).json({ message: 'Credenciais inválidas'});
      }

      // TODO: gerar token de sessão.
      

      return res.status(200).json({ message: 'Usuario excluído' });
    } catch (error) {
      return res.status(500).json(err.message);
    }
  }
}

export default UsuariosController;
