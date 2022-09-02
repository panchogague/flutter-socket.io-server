/*

    path: api/login

*/

const { Router } = require("express");
const router = Router();
const { check } = require("express-validator");
const { createUser, renewToken, loginUser } = require("../controllers/auth");
const { fieldsValidator } = require("../middlewares/fields-validator");
const { validateJwt } = require("../middlewares/validate-jwt");

router.post(
  "/new",
  [
    check("name", "Name is mandatory").not().isEmpty(),
    check("email", "Email is mandatory").isEmail(),
    check("password", "Password should be at least 6 characters").isLength({
      min: 6,
    }),
    fieldsValidator,
  ],
  createUser
);

router.get("/renew", validateJwt, renewToken);

router.post(
  "/",
  [
    check("email", "Email is mandatory").isEmail(),
    check("password", "Password should be at least 6 characters").isLength({
      min: 6,
    }),
    fieldsValidator,
  ],
  loginUser
);

module.exports = router;
