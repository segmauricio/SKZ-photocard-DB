const SKZControllers = require("../controllers/skz.controller");
const UserController = require("../controllers/user.controllers");
const { upload } = require("../config/multer.config");
const { authenticate, admin } = require("../config/jwt.config");
const express = require("express"); // Importación del paquete express
const nodemailer = require("nodemailer");

module.exports = (app) => {
  //Rutas de photocards
  app.get("/api/straykids", SKZControllers.getSKZpc);
  app.post("/api/straykids", upload.single("file"), SKZControllers.createSKZpc);
  app.put("/api/straykids/:id", SKZControllers.updateSKZpc);
  app.get("/files/:filename", SKZControllers.getFile);
  app.delete("/api/straykids/:id", SKZControllers.deletePhotocard);
  //Controles de Usuario
  app.post("/api/register", UserController.register);
  app.post("/api/login", UserController.login);
  app.get("/api/logout", UserController.logout);
  //Ruta privada
  app.get("/api/users", authenticate, UserController.get_all);
  //Rutas de admin
  app.get("/api/users/all", admin, UserController.get_all);
  app.get("/api/admin", admin, (req, res) => {
    res.status(200).json({});
  });
  //Contact Us form
  app.post("/api/contact", (req, res) => {
    //NODEMAILER
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "mauribox28@gmail.com",
        pass: "azydnvsljdzdknwt",
      },
      tls: {
        // do not fail on invalid certs
        rejectUnauthorized: false
    },
    });

    const mailOptions = {
      from: req.body.email,
      subject: req.body.subject,
      to: "mauribox28@gmail.com",
      text: `From ${req.body.email}\n\n${req.body.message}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
        res.send(error);
      } else {
        console.log("Email sent");
        res.json({ status: "success" });
      }
    });
  });
};
