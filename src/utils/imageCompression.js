/**
 * Compresses an image file client-side using HTML5 Canvas.
 * Prevents LocalStorage QuotaExceededError by keeping image data URLs small (<70KB).
 *
 * @param {File} file - The uploaded image file
 * @param {number} maxDimension - Max width or height in pixels (default 360)
 * @param {number} quality - JPEG compression quality 0.0 - 1.0 (default 0.82)
 * @returns {Promise<string>} Base64 Data URL
 */
export function compressImage(file, maxDimension = 360, quality = 0.82) {
  return new Promise((resolve, reject) => {
    if (!file || !file.type.startsWith("image/")) {
      return reject(new Error("Selected file is not an image."));
    }

    const reader = new FileReader();
    reader.onerror = () => reject(new Error("Failed to read image file."));
    reader.onload = (event) => {
      const img = new Image();
      img.onerror = () => reject(new Error("Failed to decode image data."));
      img.onload = () => {
        let width = img.width;
        let height = img.height;

        // Calculate aspect-ratio preserved dimensions
        if (width > height) {
          if (width > maxDimension) {
            height = Math.round((height * maxDimension) / width);
            width = maxDimension;
          }
        } else {
          if (height > maxDimension) {
            width = Math.round((width * maxDimension) / height);
            height = maxDimension;
          }
        }

        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext("2d");
        if (!ctx) {
          return resolve(event.target.result); // Fallback to raw if canvas unsupported
        }

        ctx.drawImage(img, 0, 0, width, height);

        // Export as JPEG with controlled quality
        const compressedDataUrl = canvas.toDataURL("image/jpeg", quality);
        resolve(compressedDataUrl);
      };
      img.src = event.target.result;
    };
    reader.readAsDataURL(file);
  });
}
