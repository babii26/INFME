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
      required: true,
      enum: ["PACIENTE", "MEDICO"] //Valores aceitáveis
    },
    isAdmin: { type: Boolean, default: false }, //n sei se são precisos admins, portanto por agora fica
    })

const userModel = mongoose.model('User', userSchema);
export { userModel as User };

//module.exports = userModel;