
/**
 * Utility functions for extracting colors from images
 */

/**
 * Extract the dominant color from an image URL
 * 
 * This uses a canvas element to read the image data and find
 * the most prevalent color in the image
 * 
 * @param imageUrl URL of the image to analyze
 * @returns Promise that resolves to the dominant color in hex format
 */
export const extractDominantColor = async (imageUrl: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    try {
      const img = new Image();
      img.crossOrigin = "Anonymous"; // Handle CORS for external images
      
      img.onload = () => {
        // Create canvas and draw image
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          resolve('#8B5CF6'); // Fallback to default purple if canvas context not available
          return;
        }
        
        // Set canvas size to a small sample (for performance)
        canvas.width = 50;
        canvas.height = 50;
        
        // Draw image on canvas (scaled down for faster processing)
        ctx.drawImage(img, 0, 0, img.width, img.height, 0, 0, 50, 50);
        
        // Get image data
        const imageData = ctx.getImageData(0, 0, 50, 50).data;
        
        // Process colors
        const colorCounts: Record<string, number> = {};
        let maxCount = 0;
        let dominantColor = '#8B5CF6'; // Default music-primary 
        
        // Sample pixels (every 4th pixel for performance)
        for (let i = 0; i < imageData.length; i += 16) {
          // Get RGB values
          const r = imageData[i];
          const g = imageData[i + 1];
          const b = imageData[i + 2];
          
          // Skip transparent/near-black/near-white pixels
          if (imageData[i + 3] < 128 || (r < 10 && g < 10 && b < 10) || (r > 245 && g > 245 && b > 245)) {
            continue;
          }
          
          // Convert to hex color string
          const hex = `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
          
          // Count occurrences
          colorCounts[hex] = (colorCounts[hex] || 0) + 1;
          
          // Track the most common color
          if (colorCounts[hex] > maxCount) {
            maxCount = colorCounts[hex];
            dominantColor = hex;
          }
        }
        
        // Resolve with the dominant color
        resolve(dominantColor);
      };
      
      img.onerror = () => {
        console.error('Error loading image for color extraction');
        resolve('#8B5CF6'); // Fallback to default purple
      };
      
      img.src = imageUrl;
    } catch (error) {
      console.error('Error extracting color:', error);
      resolve('#8B5CF6'); // Fallback to default purple
    }
  });
};

/**
 * Generate complementary colors based on a base color
 * 
 * @param baseColor Base color in hex format
 * @returns Object containing derived colors
 */
export const generateColorPalette = (baseColor: string) => {
  // Convert hex to RGB
  const r = parseInt(baseColor.slice(1, 3), 16);
  const g = parseInt(baseColor.slice(3, 5), 16);
  const b = parseInt(baseColor.slice(5, 7), 16);
  
  // Calculate brightness
  const brightness = (r * 299 + g * 587 + b * 114) / 1000;
  
  // Generate lighter/darker variants
  const lighten = (color: number, amount: number) => Math.min(255, Math.floor(color + (255 - color) * amount));
  const darken = (color: number, amount: number) => Math.max(0, Math.floor(color * (1 - amount)));
  
  // Create color palette
  return {
    primary: baseColor,
    secondary: `#${((1 << 24) + (darken(r, 0.2) << 16) + (darken(g, 0.2) << 8) + darken(b, 0.2)).toString(16).slice(1)}`,
    accent: `#${((1 << 24) + (lighten(r, 0.4) << 16) + (lighten(g, 0.4) << 8) + lighten(b, 0.4)).toString(16).slice(1)}`,
    text: brightness > 125 ? '#1A1F2C' : '#F6F6F7',
    background: `#${((1 << 24) + (darken(r, 0.8) << 16) + (darken(g, 0.8) << 8) + darken(b, 0.8)).toString(16).slice(1)}`,
    isLight: brightness > 125
  };
};
