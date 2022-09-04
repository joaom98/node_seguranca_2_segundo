import express from 'express';
import UsuariosController from '../controllers/usuariosController.js';

const router = express.Router();

router
  .post('/usuario', UsuariosController.cadastrarUsuario)
  .delete('/usuario/:id', UsuariosController.excluirUsuario)
  .post('/auth/login', UsuariosController.login)
  // .post('/login', UsuariosController.login);

export default router;
