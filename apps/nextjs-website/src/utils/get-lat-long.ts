export const getLatLong = async () => {
  const pos: GeolocationPosition = await new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });

  return {
    lat: pos.coords.latitude,
    long: pos.coords.longitude,
  };
};
