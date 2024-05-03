import bcrypt from "bcrypt";

const salt = bcrypt.genSaltSync(10);

export function hashPassword(password) {
  const hashedPassword = bcrypt.hashSync(password, salt);
  return hashedPassword;
}

export function isMatch(password, hashedPassword) {
  const isMatch = bcrypt.compareSync(password, hashedPassword);
  return isMatch;
}
