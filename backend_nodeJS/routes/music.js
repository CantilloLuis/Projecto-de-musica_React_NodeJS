const express = require("express");
const router = express.Router();

const musicController = require("../controllers/musicController");

//Rutas declaradas para el crud
router.get("/consultarMusic", musicController.getMusic);
router.post("/enviarMusic", musicController.uploadMusic);
router.get('/audio/:fileId', musicController.getAudio);
router.post("/likeMusic/:_id", musicController.addlike);
router.delete("/likeMusic/:_id", musicController.addlike);
// router.put("/:id", musicController.updateMusic);
// router.delete("/:id", musicController.deleteMusic);



module.exports = router;