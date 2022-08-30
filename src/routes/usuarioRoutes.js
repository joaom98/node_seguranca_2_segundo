import express from 'express';
import UsuariosController from '../controllers/usuariosController.js';

const router = express.Router();

router
  .post('/usuario', UsuariosController.cadastrarUsuario)
  .delete('/usuario/:id', UsuariosController.excluirUsuario);

export default router;
