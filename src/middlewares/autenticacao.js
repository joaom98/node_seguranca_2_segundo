import passport from '../config/passport.js';

function local(req, res, next) {
  passport.authenticate(
    'local',
    { session: false },
    (erro, usuario, info) => {
      if (erro) {
        return next(erro);
      }

      req.user = usuario;
      req.estaAutenticado = true;
      return next();
    },
  )(req, res, next);
}

export {
  local,
};
