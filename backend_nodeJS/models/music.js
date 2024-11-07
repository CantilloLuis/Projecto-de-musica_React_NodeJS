const mongoose = require("mongoose");
/*const mongooseDateFormat = require('mongoose-date-format');*/

const music = mongoose.Schema({

    // Atributos que se utilizaran y  migraran a la BD

    titulo: { type: String, required: true },
    nombreArtista: { type: String, required: true },
    duracion: { type: String, require: true },
    urlImagen: { type: String, require: true },
    contentType: { type: String, required: true },
    fileId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'MusicFile' }, // ID de archivo en GridFS




});
/*equipo.plugin(mongooseDateFormat);*/
module.exports = mongoose.model("music", music);
