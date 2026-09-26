export const getYouTubeEmbedUrl = (videoId: string): string =>
  `https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1`

export const getYouTubeWatchUrl = (videoId: string): string =>
  `https://www.youtube.com/watch?v=${videoId}`

export const withBasePath = (path: string, configuredBase = import.meta.env.BASE_URL): string => {
  if (/^(?:https?:)?\/\//.test(path) || path.startsWith("data:")) {
    return path;
  }

  const base = configuredBase || "/";
  const normalizedBase = base.endsWith("/") ? base : `${base}/`;
  return `${normalizedBase}${path.replace(/^\/+/, "")}`;
}
