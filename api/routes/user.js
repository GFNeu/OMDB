const router = require('express').Router()
const {userController} = require('../controllers/index')

//ESTO ES /api/user

//AGREGAR FAVORITOS
router.post('/:id/favs', userController.addFav)
//REMOVER FAVORITOS
router.delete('/:id/favs/:favId', userController.removeFav)

module.exports = router