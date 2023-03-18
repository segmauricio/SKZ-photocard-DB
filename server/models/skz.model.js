const mongoose = require("mongoose");                       // Importando el paquete mongoose

const skzSchema = new mongoose.Schema(
    {
        member_name: {
            type: String,
            required: [true, "El nombre no debe estar vacio"],
            minlenght: [3, "El nombre no puede ser tan corto"],
            maxlenght: [10, "El nombre no puede ser tan largo"]
        },
        album: {
            type: String,
            maxlenght: [30, "El nombre del album no puede ser tan largo"],
        },
        event: {
            type: String,
            maxlenght: [30, "El nombre del evento no puede ser tan largo"],
        },
        album_type: {
            type: String,
            required: [true, "El tipo de album es obligatorio"],
        },
        year: {
            type: Number,
            required: [true, "El año es obligatorio"],
            min: [2017, "El año mínimo es 2017"]
        },
        version: {
            type: String,
            required: [true, "La versión del álbum no puede ser anónima"],
            minlenght: [3, "La versión del álbum no puede ser tan corto"],
            maxlenght: [10, "La versión del álbum no puede ser tan largo"]
        },
        url: {
            type: String,
            required: [true, "Imagen obligatoria"],
        }
    },
    {
        timestamps: true
    }
)


const Skz = mongoose.model("Skz", skzSchema);

module.exports = Skz;