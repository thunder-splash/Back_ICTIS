const Router = require ('express')
const router = new Router()
const scontroller = require('../controllers/simplecontroller')

router.get('/', scontroller.getAllTable)
router.get('/:column/:cvalue', scontroller.getFormatizeData)

module.exports = router