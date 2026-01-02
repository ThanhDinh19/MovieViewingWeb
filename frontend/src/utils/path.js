export const normalizeThumbnailUrl = (url) => {
  if (!url) return "";

  // Nếu đã là localhost:5001 → giữ nguyên
  if (url.includes("localhost:5001")) return url;

  const fileName = url.split("/thumbnails/")[1];

  if (!fileName) return url;

  return `http://localhost:5001/thumbnails/${fileName}`;
};

export const normalizeVideoUrl = (url) => {
  if (!url) return "";

  if (url.includes("localhost:5001")) return url;

  const fileName = url.split("/films/")[1];

  if (!fileName) return url;

  return `http://localhost:5001/films/${fileName}`;
};