import { Character } from "types/index";

export const ensureCharacterArray = (input: Character[] | Character | []): Character[] | [] => {
  if (typeof input === 'object' && !Array.isArray(input) && input !== null) {
    // Si input es un objeto, lo convertimos a un arreglo de un solo elemento
    return [input as Character];
  } else if (Array.isArray(input)) {
    // Si input es un arreglo, simplemente lo devolvemos
    return input as Character[];
  } else {
    // Si no es ni un objeto ni un arreglo, devolvemos un arreglo vacío
    return [];
  }
}
