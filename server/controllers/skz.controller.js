const Skz = require("../models/skz.model");
const path = require("path");

//Obtener skzpc
module.exports.getSKZpc = (req, res) => {
    Skz.find()
        .then(skzpces => {
            res.status(200);
            res.json(skzpces);
        }
        )
        .catch(error => {
            res.status(404);
            res.json(error);
        })

}
//Crear skzpc
module.exports.createSKZpc = (req, res) => {
    let data = JSON.parse(req.body.data);

    console.log(req.file.filename);                          //Implementado lo de upload de files
    console.log(data);
    //const result_upload = upload.single('file');
    data.url = req.file.filename;

    Skz.create(data)
        .then(skzpc => {
            res.status(200);
            res.json(skzpc);
        })
        .catch(error => {
            res.status(500);
            res.json(error);
        })
}

//Actualizar skzpc
module.exports.updateSKZpc = (request, response) => {
    Skz.findOneAndUpdate({ _id: request.params.id }, request.body, { new: true })
        .then(updatedSkz => response.json(updatedSkz))
        .catch(err => response.json(err))
}

module.exports.getFile = (req, res) => {
    const filepath = "./uploads/" + req.params.filename;
    console.log(filepath);
    let absolutePath = path.resolve(filepath);
    res.sendFile(absolutePath);
}

//Borrar photocard
module.exports.deletePhotocard = async (request, response) => {
    try {
        await Skz.deleteOne({ _id: request.params.id })
        response.status(204).json({ message: "Deleted successfully" });
    } catch (error) {
        response.status(400).json(error);
    }
}