export const encodeImageToBase64 = (xyzArray: number[][][]): string => {
  // Step 1: Flatten the 3D array
  const flattenedArray = xyzArray.flat(2);

  // Step 2: Create a binary buffer from the flattened array
  // Assuming each inner array has 3 elements (R, G, B)
  const buffer = new Uint8Array(flattenedArray.length * 3);
  flattenedArray.forEach((pixel: any, index) => {
    buffer[index * 3] = pixel[0]; // R
    buffer[index * 3 + 1] = pixel[1]; // G
    buffer[index * 3 + 2] = pixel[2]; // B
  });

  // Step 3: Encode the buffer to a Base64 string
  const base64String = Buffer.from(buffer).toString('base64');

  return base64String;
};
