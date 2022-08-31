import passport from 'passport';
import EstrategiaLocal from 'passport-local';
import EstrategiaJWT from 'passport-jwt';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { validaSenha } from '../utils/senhas.js';
import Usuario from '../models/usuario.js';

const camposCustomizados = {
  usernameField: 'nome',
  passwordField: 'senha',
};

const callbackLocal = (nome, senha, done) => {
  Usuario.pegarPeloNome(nome)
    .then((usuario) => {
      if (!usuario) {
        return done(null, false);
      }

      const ehValido = validaSenha(senha, usuario.senhaHash, usuario.salHash);

      if (ehValido) {
        return done(null, usuario);
      }
      return done(null, false);
    }).catch((erro) => {
      done(erro);
    });
};

// const __dirname = dirname(fileURLToPath(import.meta.url));
// const caminhoDaChave = join(__dirname, '..', 'chaves', 'id_rsa_pub.pem');
// const publicKey = readFileSync(caminhoDaChave, 'utf-8');

// const opcoes = {
//   jwtFromRequest: EstrategiaJWT.ExtractJwt.fromAuthHeaderAsBearerToken(),
//   secretOrKey: publicKey,
//   algorithms: ['RS256'],
// };

// function callbackJWT(payload, done) {
//   Usuario.pegarPeloId(payload.sub)
//     .then((usuario) => {
//       if (usuario) {
//         return done(null, usuario);
//       }
//       return done(null, false);
//     }).catch((erro) => {
//       done(erro, null);
//     });
// }

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((userId, done) => {
  Usuario.pegarPeloId(userId).then((usuario) => {
    done(null, usuario);
  })
    .catch((erro) => done(erro));
});

const estrategiaLocal = new EstrategiaLocal(camposCustomizados, callbackLocal);
// const estrategiaJWT = new EstrategiaJWT(opcoes, callbackJWT);

passport.use(estrategiaLocal);
// passport.use(estrategiaJWT);

export default passport;
