export default (errors) => {
let reseults = {};
  for (const key in errors) {
    reseults[key] = errors[key].message;
  }
  return reseults;
}