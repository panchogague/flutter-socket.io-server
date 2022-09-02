const { response } = require("express");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const { generateJwt } = require("../helpers/jwt");

const createUser = async (req, res = response) => {
  const { email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        ok: false,
        msg: "This user already exist",
      });
    }
    user = new User(req.body);

    const salt = bcrypt.genSaltSync();
    user.password = bcrypt.hashSync(password, salt);

    await user.save();

    const token = await generateJwt(user.id, user.name);

    res.status(201).json({
      ok: true,
      uid: user.id,
      name: user.name,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Talk with someone else.",
    });
  }
};

const loginUser = async (req, res = response) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    console.log(email);
    if (!user) {
      return res.status(400).json({
        ok: false,
        msg: "User and password is not correct",
      });
    }

    const validPassword = bcrypt.compareSync(password, user.password);

    if (!validPassword) {
      return res.status(400).json({
        ok: false,
        msg: "User and password is not correct",
      });
    }

    const token = await generateJwt(user.id, user.name);

    return res.status(200).json({
      ok: true,
      uid: user.id,
      name: user.name,
      token,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: "Talk with someone else.",
    });
  }
};

const renewToken = async (req, res = response) => {
  const uid = req.uid;
  const name = req.name;

  const token = await generateJwt(uid, name);

  return res.status(201).json({
    ok: true,
    uid,
    name,
    token,
  });
};

module.exports = { createUser, loginUser, renewToken };
