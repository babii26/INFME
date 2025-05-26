var mongoose = require("mongoose");
var Schema = mongoose.Schema;

  enum accountType {
    paciente = "PACIENTE",
    medico = "MEDICO"
  }

  const userSchema = new Schema({
    name: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true },
    userType: {
      type: String,
      required: false,
      enum: ["PACIENTE", "MEDICO"] //Valores aceitáveis
    },
    isAdmin: { type: Boolean, default: false, required: false}, //n sei se são precisos admins, portanto por agora fica
    active: { type: Boolean, default: true, required: false},
    })

const userModel = mongoose.model('User', userSchema);
module.exports = userModel;