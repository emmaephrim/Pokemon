import ColorThief from "colorthief";

export async function getDominantColorFromURL(imageURL) {
  try {
    const response = await fetch(imageURL);
    const blob = await response.blob();

    // Create an image element and load the blob data
    const img = new Image();
    img.src = URL.createObjectURL(blob);

    // Wait for the image to load
    await new Promise((resolve) => {
      img.onload = resolve;
    });

    // Create a ColorThief instance
    const colorThief = new ColorThief();

    // Get the dominant color from the loaded image
    const dominantColor = colorThief.getColor(img);

    return dominantColor;
  } catch (error) {
    console.error("Error fetching image:", error);
    return null;
  }
}
