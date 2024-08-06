import React from "react";
import RNPickerSelect from "react-native-picker-select";
import { StyleSheet } from "react-native";

const DropdownMasalah = ({ value, onValueChange, items, placeholder }) => {
  return (
    <RNPickerSelect
      style={pickerSelectStyles}
      value={value}
      onValueChange={onValueChange}
      items={items}
      placeholder={placeholder}
    />
  );
};

const pickerSelectStyles = StyleSheet.create({
  inputAndroid: {
    width: "90%",
    padding: 10,
    borderWidth: 1, // Mengubah borderWidth menjadi 1
    borderColor: "black", // Mengubah warna border menjadi hitam
    marginBottom: 20,
    marginLeft: 30,
    borderRadius: 10,
    backgroundColor: "#f9f9f9",
    color: "black",
  },
});

export default DropdownMasalah;
