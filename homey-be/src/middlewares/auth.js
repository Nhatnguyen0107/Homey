import passport from "passport";

export function jwt(options = { session: false }) {
  return passport.authenticate("jwt", options);
}
