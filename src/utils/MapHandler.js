import * as Location from 'expo-location';
import axios from 'axios';
import { Alert } from 'react-native';

// Fungsi untuk meminta izin akses lokasi
export const requestLocationPermission = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
        Alert.alert('Permission to access location was denied');
        return false;
    }
    return true;
};

// Fungsi untuk mendapatkan lokasi pengguna saat ini
export const getCurrentLocation = async () => {
    let location = await Location.getCurrentPositionAsync({});
    const { latitude, longitude } = location.coords;
    return { latitude, longitude };
};

// Fungsi untuk mendapatkan alamat dari koordinat
export const getAddressFromCoords = async (latitude, longitude, apiKey) => {
    try {
        const response = await axios.get(
            `https://revgeocode.search.hereapi.com/v1/revgeocode?at=${latitude},${longitude}&lang=en-US&apiKey=${apiKey}`
        );
        const address = response.data.items[0]?.address?.label || 'Unknown location';
        return address;
    } catch (error) {
        console.error(error);
        return 'Unknown location';
    }
};

// Fungsi untuk menangani penekanan peta
export const handleMapPress = async (event, setLatitude, setLongitude, apiKey, setLokasi) => {
    const { latitude, longitude } = event.nativeEvent.coordinate;
    setLatitude(latitude);
    setLongitude(longitude);
    const address = await getAddressFromCoords(latitude, longitude, apiKey);
    setLokasi(address);
};
