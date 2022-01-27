const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const uniqueValidator = require("mongoose-unique-validator");

let studentSchema = new Schema({
  nombre: {
    type: String,
    required: [true, "El nombre es obligatorio"],
  },
  email: {
    type: String,
    required: [true, "El email es obligatorio"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "La contraseña es obligatoria"],
  },
  domicilio: {
    type: String,
    required: [true, "El domicilio es obligatorio"],
  },
  edad: {
    type: Number,
    required: [true, "La edad es obligatoria"],
  },
  estado: {
    type: Boolean,
    default: true,
  },
});

studentSchema.methods.toJSON = function () {
  let myObject = this;
  let studentObject = myObject.toObject();
  delete studentObject.password;
  delete studentObject.__v;
  return studentObject;
};
studentSchema.plugin(uniqueValidator, { message: "{PATH} debe ser único" });

module.exports = mongoose.model("student", studentSchema);
