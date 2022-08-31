import express from 'express';
import UsuariosController from '../controllers/usuariosController.js';
import { local } from '../middlewares/autenticacao.js';

const router = express.Router();

router
  .post('/usuario', UsuariosController.cadastrarUsuario)
  .delete('/usuario/:id', local, UsuariosController.excluirUsuario)
  .post('/login', local);

export default router;
