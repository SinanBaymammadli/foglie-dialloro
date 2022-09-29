import fs from "node:fs/promises";
import Jimp from "jimp";

export function deleteFile(filePath: string) {
  return fs.unlink(filePath);
}

export function deleteFiles(filePaths: Array<string>) {
  return Promise.all(filePaths.map(deleteFile));
}

export async function compressFile(
  filePath: string,
  { quality = 75, resizeWidth = 1000 } = {}
) {
  const img = await Jimp.read(filePath);
  const originalWidth = img.getWidth();
  const img2 = img.quality(quality).write(filePath);

  if (resizeWidth < originalWidth) {
    const height = img.getHeight();
    const aspectRatio = originalWidth / height;
    const resizeHeight = resizeWidth / aspectRatio;

    return img2.resize(resizeWidth, resizeHeight);
  }

  return img2;
}
