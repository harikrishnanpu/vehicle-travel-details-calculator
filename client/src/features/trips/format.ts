export function formatDistance(meters: number) {
  if (meters >= 1000) {
    return (meters / 1000).toFixed(1) + " KM";
  }

  return Math.round(meters) + " m";
}

export function formatDuration(totalSeconds: number) {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  if (hours > 0) {
    return hours + "Hr " + minutes + " Mins";
  }

  if (minutes > 0) {
    return minutes + " Mins";
  }

  return seconds + "s";
}

export function formatClock(iso: string) {
  return new Date(iso).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
}

export function formatCoord(latitude: number, longitude: number) {
  let latDir = "S";
  let lngDir = "W";

  if (latitude >= 0) {
    latDir = "N";
  }

  if (longitude >= 0) {
    lngDir = "E";
  }

  return Math.abs(latitude).toFixed(4) + "° " + latDir + ", " + Math.abs(longitude).toFixed(4) + "° " + lngDir;
}
