import express from "express";
import passport from 'passport';
import { forwardAuthenticated } from "../middleware/checkAuth";

const router = express.Router(); 

router.get("/login", forwardAuthenticated, (req, res, next) => {
  res.render('login', {messages: req.session.messages});
})

router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/dashboard",
    failureRedirect: "/auth/login",
    failureMessage: true
    /* FIX ME: - done - failureMsg needed when login fails */
  } ) 
);

router.get("/logout", (req, res) => {
  req.logout((err) => {
    if (err) console.log(err);
  });
  res.redirect("/auth/login");
});

export default router;
