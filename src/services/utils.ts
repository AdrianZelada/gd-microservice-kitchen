export function uuidv4() {
  return Math.random().toString(36).substring(2, 15);
  // Math.random().toString(36).substring(2, 15);
  }

export function randomNumber(max: number) {
  return Math.floor(Math.random() * ((max + 1) - 1)) + 1;
}

// const Utils={
//     generateUuid: uuidv4,
//     randomNumber
// }
// export default Utils;