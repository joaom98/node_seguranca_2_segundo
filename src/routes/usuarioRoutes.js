import express from 'express';
import UsuariosController from '../controllers/usuariosController.js';
import estrategia from '../middlewares/autenticacao.js';

const router = express.Router();

router
  .post('/usuario', UsuariosController.cadastrarUsuario)
  .delete('/usuario/:id',,UsuariosController.excluirUsuario)
  .post('/login',, UsuariosController.login);

export default router;
