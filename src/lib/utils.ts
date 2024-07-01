import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import Resizer from "react-image-file-resizer";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const resizeFile = (file: Blob): Promise<string> =>
  new Promise((resolve) => {
    Resizer.imageFileResizer(
      file,
      512,
      512,
      "JPEG",
      100,
      0,
      (uri) => {
        if (typeof uri === "string") {
          resolve(uri);
        } else {
          if (uri instanceof Blob) {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result as string);
            reader.readAsDataURL(uri);
          }
        }
      },
      "base64"
    );
  });
