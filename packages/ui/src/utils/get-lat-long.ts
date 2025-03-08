/**
 * Gets the user's current latitude and longitude using the browser's Geolocation API
 * @returns Promise with lat and long coordinates
 * @throws Error if geolocation is not supported or permission is denied
 */
export const getLatLong = async (): Promise<{lat: number, long: number}> => {
  if (!navigator || !navigator.geolocation) {
    throw new Error('Geolocation is not supported by this browser');
  }

  const pos: GeolocationPosition = await new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      resolve,
      (error) => {
        if (error.code === 1) {
          reject(new Error('Permission denied for geolocation'));
        } else {
          reject(new Error(`Failed to get location: ${error.message}`));
        }
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );
  });

  return {
    lat: pos.coords.latitude,
    long: pos.coords.longitude,
  };
};
