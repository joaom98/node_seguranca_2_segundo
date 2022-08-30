import crypto from 'crypto';

function geraHash(senha) {
  const sal = crypto.randomBytes(32).toString('hex');
  const hash = crypto.pbkdf2Sync(senha, sal, 10000, 64, 'sha512').toString('hex');

  return [hash, sal];
}

function validaSenha(senha, hash, sal) {
  const hashDeVerificacao = crypto.pbkdf2Sync(senha, sal, 10000, 64, 'sha512').toString('hex');

  return hashDeVerificacao === hash;
}

export { validaSenha, geraHash };
