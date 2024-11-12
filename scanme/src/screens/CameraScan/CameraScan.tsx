import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { Dispatch } from "@reduxjs/toolkit";
import { Camera, CameraView } from "expo-camera";
import Icons from "../../assets/svgs/index";
import { pixel } from "../../utils/pixel";
import { getCardById } from "../../store/slices/cardSlice";
import { MainNavigationType } from "../../navigation/MainNavigtion";
import styles from "./CameraScan.style";

export default function CameraScan() {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const navigation = useNavigation<MainNavigationType>();
  const dispatch = useDispatch<Dispatch<any>>();

  useEffect(() => {
    const getCameraPermissions = async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      //@ts-ignore
      setHasPermission(status === "granted");
    };

    getCameraPermissions();
  }, []);

  const handleBarCodeScanned = ({ data }: any) => {
    setScanned(true);
    const cardId = data?.split("/").pop();
    if (cardId) {
      dispatch(getCardById({ cardId }));
      navigation.navigate("CARD_PROFILE");
      setScanned(false);
    }
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <CameraView
        onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
        barcodeScannerSettings={{
          barcodeTypes: ["qr"],
        }}
        style={StyleSheet.absoluteFillObject}
      />
      <TouchableOpacity
        style={styles.close}
        onPress={() => {
          navigation.goBack();
        }}
      >
        <Icons.Close />
      </TouchableOpacity>
      {!scanned && (
        <View style={styles.codeWrapper}>
          <Text style={styles.title}>Point QR at a digital card</Text>
          <Icons.Frame width={pixel(350)} height={pixel(350)} />
        </View>
      )}
    </View>
  );
}
