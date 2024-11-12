import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Dispatch } from "@reduxjs/toolkit";
import AuthNavigationStack from "./src/navigation/AuthStackNavigation";
import { errorSelector } from "./src/store/selectors/administrativSelector";
import InfoMessageModal from "./src/components/infoMessageModal/infoMessageModal";
import { isLoginedSelector } from "./src/store/selectors/authSelector";
import { setError } from "./src/store/slices/administrativSlice";
import { MainNavigation } from "./src/navigation/MainNavigtion";
import { setScanMeApiAuthorization } from "./src/services/instance/MainInstance";
import { setIsLogined } from "./src/store/slices/authSlice";
import { getUserInfo } from "./src/store/slices/profileSlice";

const Main: React.FC = () => {
  const error = useSelector(errorSelector);
  const isLogined = useSelector(isLoginedSelector);
  const dispatch = useDispatch<Dispatch<any>>();

  useEffect(() => {
    const getToken = async () => {
      try {
        const accessToken = await AsyncStorage.getItem("accessToken");
        const email = await AsyncStorage.getItem("userEmail");
        if (accessToken && email) {
          setScanMeApiAuthorization(JSON.parse(accessToken));
          dispatch(setIsLogined(true));
          dispatch(getUserInfo(JSON.parse(email)));
        }
      } catch (err) {
        console.error(err);
      }
    };

    getToken();
  }, [dispatch]);

  const errorMessage = useMemo(() => {
    return error ? (
      <InfoMessageModal
        buttonTitle={error.buttonTitle}
        text={error.text}
        isVisible={true}
        title={error.title}
        onClose={() => {
          dispatch(setError(undefined));
        }}
      />
    ) : null;
  }, [error, isLogined]);
  return (
    <>
      {isLogined ? <MainNavigation /> : <AuthNavigationStack />}
      {errorMessage}
    </>
  );
};
export default Main;
