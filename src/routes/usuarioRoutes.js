import express from 'express';
import UsuariosController from '../controllers/usuariosController.js';
import requerUsuarioLogado from '../middlewares/requer-usuario-logado.js';

const router = express.Router();

router
  .post('/usuario', UsuariosController.cadastrarUsuario)
  .delete('/usuario/:id', UsuariosController.excluirUsuario)
  .post('/auth/login', UsuariosController.login)
  .get('/usuario/perfil', requerUsuarioLogado, UsuariosController.perfil)
  // .post('/login', UsuariosController.login);

export default router;
