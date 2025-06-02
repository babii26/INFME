import  HookNextFunction from 'mongoose';
var mongoose = require("mongoose");
var Schema = mongoose.Schema;

  enum accountType {
    paciente = "PACIENTE",
    medico = "MEDICO",
    administ = "ADMIN"
  }

  export interface User {
    _id: string; 
    name: string;
    password: string;
    email: string;
    isAdmin: boolean;
  }

  const userSchema = new Schema({
    name: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true },
    userType: {
      type: String,
      required: false,
      enum: ["PACIENTE", "MEDICO", "ADMIN"] //Valores aceitáveis
    },
    isAdmin: { type: Boolean, default: false, required: false}, //n sei se são precisos admins, portanto por agora fica
    active: { type: Boolean, default: true, required: false},
    });

    userSchema.pre('save', function (this: typeof userSchema, next: any) {
  if (this.userType === "ADMIN") {
    this.isAdmin = true;
  }
  next();
});

const userModelo = mongoose.model('User', userSchema);
module.exports = userModelo;