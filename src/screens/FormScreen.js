import React, { useEffect, useState, useContext } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Image,
  ActivityIndicator,
  TouchableOpacity,
  ScrollView,
  ToastAndroid,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import MapView, { Marker } from "react-native-maps";
import Dialog from "react-native-dialog";
import { Ionicons } from "@expo/vector-icons";
import {
  requestLocationPermission,
  getCurrentLocation,
  getAddressFromCoords,
  handleMapPress,
} from "../utils/MapHandler"; // Import fungsi dari MapHandler.js
import DropdownMasalah from "../components/DropdownMasalah";
import { useRoute } from "@react-navigation/native";
import axios from "axios";

// Contoh konteks autentikasi (jika menggunakan konteks untuk menyimpan informasi user)
// import { AuthContext } from "../context/AuthContext";

const FormScreen = ({ navigation }) => {
  const [imageUri, setImageUri] = useState(null);
  const [lokasi, setLokasi] = useState("");
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [masalah, setMasalah] = useState("");
  const [perusahaan, setPerusahaan] = useState("");
  const [pemilik, setPemilik] = useState("");
  const [keterangan, setKeterangan] = useState("");
  const [loadingLocation, setLoadingLocation] = useState(true);
  const [dialogVisible, setDialogVisible] = useState(false);

  // params dari route
  const route = useRoute();
  const { user } = route.params;

  const masalahOptions = [
    { label: "Sampah", value: "sampah" },
    { label: "Limbah B3", value: "limbah_b3" },
    { label: "Pencemaran Air", value: "pencemaran_air" },
    { label: "Perusakan Hutan", value: "perusakan_hutan" },
    { label: "Perdagangan Satwa Dilindungi", value: "perdagangan_satwa" },
    { label: "Lainnya", value: "lainnya" },
  ];

  const apiKey = "H0d2iFKU-KmsvHumuMOglvc7DEjnKw5mhAZ3Hz_DIHw"; // Kunci API HERE Maps Anda

  useEffect(() => {
    (async () => {
      const permissionGranted = await requestLocationPermission();
      if (!permissionGranted) return;

      const location = await getCurrentLocation();
      setLatitude(location.latitude);
      setLongitude(location.longitude);
      const address = await getAddressFromCoords(
        location.latitude,
        location.longitude,
        apiKey
      );
      setLokasi(address);
      setLoadingLocation(false);
    })();
  }, []);

  const handleTakeOrPickImage = () => {
    setDialogVisible(true);
  };

  const handleTakePhoto = async () => {
    setDialogVisible(false);
    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: false,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
    }
  };

  const handlePickImage = async () => {
    setDialogVisible(false);
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: false,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
    }
  };

  const handleSubmit = async () => {
    const data = {
      id_masyarakat: user.id,
      masalah,
      keterangan,
      perusahaan,
      pemilik,
      lokasi,
    };

    console.log("Data to be submitted:", data);

    const formData = new FormData();
    if (imageUri) {
      const uriParts = imageUri.split(".");
      const fileType = uriParts[uriParts.length - 1];
      formData.append("foto", {
        uri: imageUri,
        name: `photo.${fileType}`,
        type: `image/${fileType}`,
      });
    }

    try {
      console.log("Data pengaduan:", data);
      const response = await axios.post(
        "http://192.168.240.210:3000/pengaduan",
        data
      );
      if (response.status === 201) {
        console.log(
          "Pengaduan berhasil ditambahkan dengan ID:",
          response.data.id
        );
        ToastAndroid.show(
          "Pengaduan berhasil ditambahkan!",
          ToastAndroid.SHORT
        );
        // navigation.goBack();
      } else {
        console.error("Error:", response.data);
      }

      const upImg = await axios.post(
        "http://192.168.240.210:3000/bukti_pengaduan",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (upImg.status === 201) {
        console.log(
          "Image uploaded successfully with filename:",
          upImg.data.filename
        );
        ToastAndroid.show(
          "Bukti pengaduan berhasil diunggah!",
          ToastAndroid.SHORT
        );
      } else {
        console.error("Error:", upImg.data);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <Text style={styles.title}>Silahkan Lengkapi Data Pengaduan</Text>
        <View style={styles.imageContainer}>
          {imageUri && (
            <Image source={{ uri: imageUri }} style={styles.image} />
          )}
          <Button title="Upload Bukti" onPress={handleTakeOrPickImage} />
        </View>
        {loadingLocation ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          <MapView
            style={styles.map}
            initialRegion={{
              latitude: latitude,
              longitude: longitude,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
            onPress={(event) =>
              handleMapPress(
                event,
                setLatitude,
                setLongitude,
                apiKey,
                setLokasi
              )
            }
          >
            {latitude && longitude && (
              <Marker coordinate={{ latitude, longitude }} />
            )}
          </MapView>
        )}
        <TextInput
          style={styles.input}
          placeholder="Lokasi"
          value={lokasi}
          onChangeText={setLokasi}
        />
        <DropdownMasalah
          value={masalah}
          onValueChange={setMasalah}
          items={masalahOptions}
          placeholder={{ label: "Pilih Jenis Masalah...", value: null }}
        />
        <TextInput
          style={styles.input}
          placeholder="Perusahaan"
          value={perusahaan}
          onChangeText={setPerusahaan}
        />
        <TextInput
          style={styles.input}
          placeholder="Pemilik"
          value={pemilik}
          onChangeText={setPemilik}
        />
        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Keterangan"
          value={keterangan}
          onChangeText={setKeterangan}
          multiline
          numberOfLines={4}
        />
        <Button title="Submit" onPress={handleSubmit} />
        <Dialog.Container visible={dialogVisible}>
          <Dialog.Title>Pilih Media</Dialog.Title>
          <View style={styles.dialogOptions}>
            <TouchableOpacity
              style={styles.iconContainer}
              onPress={handleTakePhoto}
            >
              <Ionicons name="camera" size={30} color="black" />
              <Text>Kamera</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.iconContainer}
              onPress={handlePickImage}
            >
              <Ionicons name="images" size={30} color="black" />
              <Text>Galeri</Text>
            </TouchableOpacity>
          </View>
          <Dialog.Button
            label="Cancel"
            onPress={() => setDialogVisible(false)}
          />
        </Dialog.Container>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f9f9f9",
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    color: "#333",
    fontWeight: "bold",
  },
  input: {
    width: "90%",
    padding: 10,
    borderWidth: 1,
    marginBottom: 20,
    borderRadius: 5,
    borderColor: "#ddd",
    backgroundColor: "#fff",
  },
  textArea: {
    height: 100,
    textAlignVertical: "top",
  },
  imageContainer: {
    marginBottom: 20,
    alignItems: "center",
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 10,
  },
  map: {
    width: "90%",
    height: 200,
    marginBottom: 20,
  },
  dialogOptions: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  iconContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
});

export default FormScreen;
