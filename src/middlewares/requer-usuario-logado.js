import { get as cacheGet } from "../utils/cache.js"

export default async function requerUsuarioLogado(req, res, next) {
  const token = req.cookies['AuthToken']
  let user = await cacheGet(token)

  if (!user) {
    return res.sendStatus(401)
  }

  req.loggedUser = JSON.parse(user)
  next()
}