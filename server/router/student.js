const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const _ = require("underscore");

const Student = require("../model/student");

router.get("/", async (req, res, next) => {
  try {
    const maxView = req.query.limit || 5;
    const from = req.query.from || 0;

    let students = await Student.find({ estado: true })
      .limit(maxView)
      .skip(from)
      .exec();

    let count = await Student.count({ estado: true });

    res.json({
      ok: true,
      students,
      count,
    });
  } catch (err) {
    err.code = 400;
    next(err);
  }
});

router.post("/", async (req, res, next) => {
  let student = new Student({
    nombre: req.body.nombre,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 10),
    domicilio: req.body.domicilio,
    edad: Number(req.body.edad),
  });

  try {
    let newStudent = await student.save();
    res.json({
      ok: true,
      student: newStudent,
    });
  } catch (err) {
    err.code = 400;
    next(err);
  }
});

router.put("/:id", async (req, res, next) => {
  let body = _.pick(req.body, "nombre", "email", "domicilio", "edad", "estado");
  let id = req.params.id;
  try {
    let modifiedStudent = await Student.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
    });
    res.json({
      ok: true,
      student: modifiedStudent,
    });
  } catch (err) {
    err.code = 400;
    next(err);
  }
});

router.delete("/:id", async (req, res, next) => {
  let id = req.params.id;
  try {
    let modifiedStudent = await Student.findByIdAndUpdate(
      id,
      { estado: false },
      {
        new: true,
        runValidators: true,
      }
    );
    res.json({
      ok: true,
      student: modifiedStudent,
    });
  } catch (err) {
    err.code = 400;
    next(err);
  }
});

module.exports = router;
