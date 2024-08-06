import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  Image,
  ScrollView,
  Touchable,
  TouchableOpacity,
} from "react-native";
import axios from "axios";

const LoginScreen = ({ navigation }) => {
  const [masyarakat, setMasyarakat] = useState([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const response = await axios.post("http://192.168.240.210:3000/login", {
        email,
        password,
      });

      // TEST //
      const user = response.data.user;
      // //// //

      if (response.status === 200) {
        Alert.alert("Login Berhasil", "Anda telah berhasil login");
        setMasyarakat(user);
        navigation.navigate("Home", { user: masyarakat });
      } else {
        Alert.alert("Login Gagal", "Email atau password salah");
      }
    } catch (error) {
      Alert.alert("Login Gagal", "Terjadi kesalahan saat login");
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <Image
          source={require("../../assets/images/logo.png")}
          style={styles.logo}
        />
        <Text style={styles.title}>Login</Text>
        <TextInput
          style={styles.input}
          placeholder="Masukkan Email atau NIK"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <Button title="Login" onPress={handleLogin} />
        <TouchableOpacity onPress={() => navigation.navigate("Registrasi")}>
          <Text style={styles.buatAkun}>Buat akun baru</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    backgroundColor: "#f9f9f9",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  logo: {
    width: 200,
    height: 200,
    resizeMode: "contain",
    alignSelf: "center",
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 24,
    textAlign: "center",
  },
  input: {
    width: "90%",
    padding: 10,
    borderWidth: 1,
    marginBottom: 20,
    borderRadius: 10,
    borderColor: "#ccc",
  },
  buatAkun: {
    marginTop: 25,
    color: "blue",
    textDecorationLine: "underline",
  },
});

export default LoginScreen;
