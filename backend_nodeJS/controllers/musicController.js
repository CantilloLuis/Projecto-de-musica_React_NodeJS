const Music = require("../models/music");

//Metodo para llamar autos
exports.getMusic = (req, res) => {
    Music.find().then((musicResult) => {
        res.status(200).json(musicResult);
    });
};

// //Metodo para agregar autos
// exports.addAuto = (req, res) => {
//     const autoAdd = new Auto({

//         //capturando los atributos del front
//         id: req.body.id,
//         nombre: req.body.nombre,
//         cilindraje: req.body.cilindraje,
//         kilometraje: req.body.kilometraje


//     });

//     //se guardan exitosamente en la bd y se envia un mensaje exitoso.
//     autoAdd.save().then((createdAuto) => {
//         console.log(createdAuto);
//         res.status(201).json("Creado satisfactoriamente ");
//     });
// };




// //Metodo para actualizar carros
// exports.updateAuto = async (req, res) => {

//     try {

//         const { id, nombre, cilindraje, kilometraje } = req.body
//         let auto = await Auto.findById(req.params.id)

//         if (!auto) {
//             res.status(404).json({ msg: "No existe el auto en el sistema" })


//         }
//         equipo.id = id
//         equipo.nombre = nombre
//         equipo.cilindraje = cilindraje
//         equipo.kilometraje = kilometraje


//         auto = await Auto.findByIdAndUpdate({ _id: req.params.id }, auto, { new: true })
//         res.json(auto)

//     } catch (error) {

//         console.log(error)
//         res.status(500).send("Error al actualizar el auto registrado")
//     }
// }



// //Metodo para eliminar carros

// exports.deleteAuto = (req, res) => {
//     const id = req.params.id;

//     Auto.findByIdAndDelete(id)
//         .then(data => {
//             if (!data) {
//                 res.status(404).send({ message: `Auto con id no fue eliminado ${id}. el id es incorrecto` })
//             } else {
//                 res.send({
//                     message: "Auto eliminada con exito!"
//                 })
//             }
//         })
// }

const upload = require('../upload');

// Ruta para subir música
exports.uploadMusic = [
    upload.single('audio'),  // Primer middleware
    (req, res) => {         // Segundo middleware (tu controlador)
        if (!req.file) {
            return res.status(400).json({ message: 'No se subió ningún archivo' });
        }

        try {
            // Crear un nuevo documento de música con los datos proporcionados
            const newMusic = new Music({
                titulo: req.body.titulo,
                nombreArtista: req.body.nombreArtista,
                duracion: req.body.duracion,
                urlImagen: req.body.urlImagen,
                contentType: req.file.mimetype,
                fileId: req.file.id,  // o req.file._id dependiendo de tu configuración
            });

            // Guardar en la base de datos
            newMusic.save()
                .then((savedMusic) => {
                    res.status(201).json({
                        message: 'Música subida correctamente',
                        music: savedMusic,
                    });
                })
                .catch((error) => {
                    res.status(500).json({
                        message: 'Error al guardar música',
                        error: error.message
                    });
                });
        } catch (error) {
            res.status(500).json({
                message: 'Error en el proceso de subida',
                error: error.message
            });
        }
    }
];



const mongoose = require('mongoose');
const { ObjectID, GridFSBucket } = require("mongodb");

exports.getAudio = async (req, res) => {
    try {
        // Verificar que la conexión esté establecida
        if (!mongoose.connection.db) {
            throw new Error('No hay conexión a la base de datos');
        }

        // Crear el bucket
        const bucket = new GridFSBucket(mongoose.connection.db, {
            bucketName: 'Music'
        });

        // Convertir el ID a ObjectId
        const fileId = new ObjectID(req.params.fileId);


        // Buscar el archivo primero
        const files = await mongoose.connection.db.collection('Music.files').findOne({ _id: fileId });

        if (!files) {
            return res.status(404).send('Archivo no encontrado');
        }

        // Configurar headers
        res.set('Content-Type', 'audio/mpeg');
        res.set('Accept-Ranges', 'bytes');

        // Crear y enviar el stream
        const downloadStream = bucket.openDownloadStream(fileId);

        downloadStream.on('error', (error) => {
            console.error('Error en downloadStream:', error);
            res.status(500).json({
                message: "Error al transmitir el archivo",
                error: error.message
            });
        });

        // Eliminar o ajustar cualquier código relacionado con setTimeout
        // downloadStream.setTimeout(0); // Eliminar esta línea

        downloadStream.pipe(res);

    } catch (error) {
        console.error('Error en getAudio:', error);
        res.status(500).json({
            message: "Error al obtener el archivo",
            error: error.message
        });
    }
};
