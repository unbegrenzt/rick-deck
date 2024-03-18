export const generateUUIDv4 = () => {
  const chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  const randomBytes = crypto.getRandomValues(new Uint8Array(16));

  let uuid = "";
  for (let i = 0; i < 16; i++) {
    const byte = randomBytes[i];
    uuid += chars[(byte >> 4) & 0xf];
    uuid += chars[byte & 0xf];
  }

  uuid = uuid.replace(/(.{8})(.{4})(.{4})(.{4})(.{12})/, "$1-$2-$3-$4-$5");

  return uuid;
};
