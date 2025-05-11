const { EARTH_RADIUS_IN_METERS } = require("../constants/general.constant");

function haversineFormula(payload) {
  const {
    deltaLatitude,
    latitude1InRadians,
    latitude2InRadians,
    deltaLongitude,
  } = payload;

  return Math.sin(deltaLatitude / 2) ** 2 +
    Math.cos(latitude1InRadians) *
    Math.cos(latitude2InRadians) *
    Math.sin(deltaLongitude / 2) ** 2;
}

function calculateDistance(coordinate1, coordinate2) {
  // Konversi perbedaan lintang dan bujur dari derajat ke radian
  const deltaLatitude = (coordinate2.latitude - coordinate1.latitude) * (Math.PI / 180);
  const deltaLongitude = (coordinate2.longitude - coordinate1.longitude) * (Math.PI / 180);

  // Konversi titik awal dan akhir ke radian
  const latitude1InRadians = coordinate1.latitude * (Math.PI / 180);
  const latitude2InRadians = coordinate2.latitude * (Math.PI / 180);

  // Rumus Haversine
  const haversineResult = haversineFormula({
    deltaLatitude,
    latitude1InRadians,
    latitude2InRadians,
    deltaLongitude,
  });

  // Menghitung sudut sentral antara dua titik
  const centralAngle = 2 * Math.atan2(
    Math.sqrt(haversineResult),
    Math.sqrt(1 - haversineResult)
  );

  // Hitung jarak berdasarkan sudut sentral dan jari-jari bumi
  const distanceInMeters = EARTH_RADIUS_IN_METERS * centralAngle;

  return distanceInMeters;
}

module.exports = { calculateDistance };
