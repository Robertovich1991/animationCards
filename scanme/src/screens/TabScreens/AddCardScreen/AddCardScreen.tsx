import React, { useCallback, useEffect, useState } from "react";
import {
  FlatList,
  KeyboardAvoidingView,
  LayoutAnimation,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { Controller, useForm } from "react-hook-form";
import * as ImagePicker from "expo-image-picker";
import { useTranslation } from "react-i18next";
import { Dispatch } from "@reduxjs/toolkit";
import { userInfoSelector } from "../../../store/selectors/profileSelector";
import { MainNavigationType } from "../../../navigation/MainNavigtion";
import Header from "../../../components/Header/Header";
import Accordion from "../../../components/Accordion/Accordion";
import InputField from "../../../components/InputField/InputField";
import PrimaryButton, {
  ButtonTypes,
} from "../../../components/primaryButton/PrimaryButton";
import ModalComponent from "../../../components/modal/ModalComponent";
import { contentListSelector } from "../../../store/selectors/cardSelector";
import {
  addCard,
  getCardList,
  getContentList,
  setUserCard,
} from "../../../store/slices/cardSlice";
import ContentItem from "../../../components/Content/ContentItem/ContentItem";
import {
  ContentData,
  IAddCard,
  IUserCardContentRequest,
} from "../../../interfaces/types";
import ActiveContentItem from "../../../components/Content/ActiveContentItem/ActiveContentItem";
import { pixel } from "../../../utils/pixel";
import { setError } from "../../../store/slices/administrativSlice";
import AvatarItem from "../../../components/AvatarItem/AvatarItem";
import Icons from "../../../assets/svgs";
import {
  deleteCardPicture,
  editCardPicture,
} from "../../../store/slices/profileSlice";
import FilterTabBar from "../../../components/FilterTabBar/FilterTabBar";
import { tabsData } from "../../../assets/mocks/mocks";
import styles from "./AddCardScreen.style";

type MenuVisibleState = {
  [key: number]: boolean;
};
const AddCardScreen = () => {
  const user = useSelector(userInfoSelector);
  const route = useRoute<any["route"]>();
  const { item } = route.params;
  const navigation = useNavigation<MainNavigationType>();
  const { t } = useTranslation();
  const [image, setImage] = useState<string | null>(null);
  const dispatch = useDispatch<Dispatch<any>>();
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [menuVisible, setMenuVisible] = useState<MenuVisibleState>({});
  const contentSelector = useSelector(contentListSelector);
  const [contents, setContents] = useState(contentSelector);
  const [imageUri, setImageUri] = useState();
  const [cameraModal, setCameraModal] = useState<boolean>(false);
  const [selectedTabId, setSelectedTabId] = useState(tabsData[0]?.id);

  const handleTabPress = (tabId: string) => {
    setSelectedTabId(tabId);
    const filteredContent = contentSelector?.filter(
      (item) => item.contentType === tabId
    );
    setContents(filteredContent);
  };

  const [expandedSections, setExpandedSections] = useState<{
    [key: string]: boolean;
  }>({
    about: true,
    content: true,
  });
  const [savedContentList, setSavedContentList] = useState<
    IUserCardContentRequest[]
  >([]);

  const handlePressAdd = (id: number) => {
    reset({});
    setMenuVisible((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };
  useEffect(() => {
    dispatch(getContentList());
    setContents(
      contentSelector?.filter((item) => item.contentType === tabsData[0]?.id)
    );
  }, []);

  const handleDelete = useCallback(() => {
    setImage("noImage");
  }, []);

  const pickImage = async (picType: string) => {
    setCameraModal(false);
    if (picType === "camera") {
      let result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: false,
        quality: 1,
      });
      if (!result.canceled) {
        //@ts-ignore
        setImageUri(result.assets[0]);
        setImage(result.assets[0].uri);
      }
    } else {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: false,
        quality: 1,
      });
      if (!result.canceled) {
        //@ts-ignore
        setImageUri(result.assets[0]);
        setImage(result.assets[0].uri);
      }
    }
  };

  const toggleAccordion = (section: string) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpandedSections((prevState) => ({
      ...prevState,
      [section]: !prevState[section],
    }));
  };

  const {
    control,
    handleSubmit,
    getValues,
    reset,
    formState: { errors },
  } = useForm<IAddCard>({
    defaultValues: {
      name: user?.name,
      surname: user?.surname,
    },
  });

  const onSubmit = (data: any) => {
    const { name, surname, about, specialization, company, location } = data;
    const payload = {
      name,
      surname,
      about: about || "",
      specialization: specialization || "",
      company: company || "",
      location: location || "",
      userCardContentRequest: savedContentList.map(
        ({ contentInfo, ...rest }) => ({
          action: "CREATED",
          active: true,
          contentIcon: contentInfo?.contentIcon,
          contentId: contentInfo?.id,
          contentName: contentInfo?.name,
          id: null,
          linkTitle: rest.linkTitle,
          placeholder: rest.placeholder,
          type: contentInfo?.contactType,
        })
      ),
      userId: user?.id,
    };
    if (image === "noImage") {
      dispatch(deleteCardPicture({ id: item?.id }));
    }
    dispatch(editCardPicture({ id: item?.id, imageUri: imageUri }));
    dispatch(
      addCard(payload, () => {
        const data = {
          title: "Successful request",
          text: "Card added successfully",
          buttonTitle: "OK",
        };
        dispatch(setError(data));
        navigation.goBack();
        dispatch(getCardList(user?.id));
      })
    );
  };
  const pick = (pick: any) => {
    setCameraModal(false);
    setTimeout(() => {
      pickImage(pick);
    }, 1000);
  };
  const handleSave = (data: IUserCardContentRequest) => {
    setSavedContentList((prevList) => [...prevList, data]);
    setMenuVisible((prev) => ({
      ...prev,
      [data.id]: false,
    }));
    reset({});
  };
  const handlerDeleteContent = (id: number) => {
    setSavedContentList((prevList) =>
      prevList.filter((item) => item?.id !== id)
    );
  };
  useEffect(() => {
    return () => {
      dispatch(setUserCard(undefined));
    };
  }, []);

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? pixel(30) : 0}
        contentContainerStyle={{
          paddingHorizontal: pixel(30),
        }}
      >
        <Header
          onPressArrow={() => {
            navigation.goBack();
            dispatch(setUserCard(undefined));
          }}
          title={"Add new card"}
        />
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{ alignSelf: "center", marginVertical: pixel(20) }}>
            <AvatarItem
              isVisible
              deleteImage={handleDelete}
              image={image}
              pickImage={() => setCameraModal(true)}
              isDisabled
              style={styles.image}
            />
          </View>
          <Accordion
            title="About"
            expanded={expandedSections.about}
            onHeaderPress={() => toggleAccordion("about")}
            content={
              <>
                <Controller
                  control={control}
                  name="name"
                  rules={{
                    required: t("Errors.Required"),
                    pattern: {
                      value: /^.{3,}$/,
                      message: t("Errors.First_name"),
                    },
                  }}
                  render={({ field: { onChange, value } }) => (
                    <InputField
                      label={t("Register.First_name")}
                      placeHolder={t("Register.Firstname_placeholder")}
                      onChange={onChange}
                      value={value}
                      error={errors.name}
                    />
                  )}
                />
                <Controller
                  control={control}
                  name="surname"
                  rules={{
                    required: t("Errors.Required"),
                    pattern: {
                      value: /^.{3,}$/,
                      message: t("Errors.Second_name"),
                    },
                  }}
                  render={({ field: { onChange, value } }) => (
                    <InputField
                      label={t("Register.Second_name")}
                      placeHolder={t("Register.Second_name_placeholder")}
                      onChange={onChange}
                      value={value}
                      error={errors.surname}
                    />
                  )}
                />
                <Controller
                  control={control}
                  name="specialization"
                  render={({ field: { onChange, value } }) => (
                    <InputField
                      label={t("Card.Job")}
                      placeHolder={t("Card.Job")}
                      onChange={onChange}
                      value={value}
                      error={errors.specialization}
                    />
                  )}
                />
                <Controller
                  control={control}
                  name="company"
                  render={({ field: { onChange, value } }) => (
                    <InputField
                      label={t("Card.Company")}
                      placeHolder={t("Card.Company")}
                      onChange={onChange}
                      value={value}
                      error={errors.company}
                    />
                  )}
                />
                <Controller
                  control={control}
                  name="location"
                  render={({ field: { onChange, value } }) => (
                    <InputField
                      label={t("Card.Location")}
                      placeHolder={t("Card.Location")}
                      onChange={onChange}
                      value={value}
                      error={errors.location}
                    />
                  )}
                />
                <Controller
                  control={control}
                  name="about"
                  rules={{
                    pattern: {
                      value: /^.{0,400}$/,
                      message: "Bio must be 400 characters or less",
                    },
                  }}
                  render={({ field: { onChange, value } }) => (
                    <InputField
                      label={t("Card.Bio")}
                      placeHolder={t("Card.Bio")}
                      onChange={onChange}
                      value={value}
                      error={errors.about}
                    />
                  )}
                />
              </>
            }
          />
          <Accordion
            title="Content"
            expanded={expandedSections.content}
            onHeaderPress={() => toggleAccordion("content")}
            content={
              <>
                <PrimaryButton
                  style={{ width: "40%", marginBottom: pixel(15) }}
                  onPress={() => {
                    setModalVisible(true);
                  }}
                  type={ButtonTypes.DARK}
                  title={t(`Card.Add_card`)}
                />
                <FlatList
                  nestedScrollEnabled={true}
                  contentContainerStyle={{ gap: 10 }}
                  showsVerticalScrollIndicator={false}
                  data={savedContentList?.map((item) => {
                    return item.contentInfo;
                  })}
                  keyExtractor={(_, index) => index.toString()}
                  renderItem={({ item, index }) => (
                    <ActiveContentItem
                      handlerDeleteContent={handlerDeleteContent}
                      key={index}
                      data={item}
                    />
                  )}
                />
              </>
            }
          />
          <View style={styles.buttonContainer}>
            <PrimaryButton
              containerStyle={{ width: "30%" }}
              onPress={handleSubmit(onSubmit)}
              type={ButtonTypes.DARK}
              title={t(`Admin.Save`)}
            />
            <PrimaryButton
              containerStyle={{ width: "30%" }}
              onPress={() => {
                navigation.goBack();
              }}
              type={ButtonTypes.WHITE}
              title={t(`Admin.Cancel`)}
            />
          </View>
          <ModalComponent
            containerStyle={styles.modal}
            onClose={() => {
              setModalVisible(false);
            }}
            isVisible={modalVisible}
            content={
              <View style={styles.modalComponent}>
                <FilterTabBar
                  tabs={tabsData}
                  selectedId={selectedTabId}
                  onPress={handleTabPress}
                />
                <FlatList
                  nestedScrollEnabled={true}
                  contentContainerStyle={styles.flatlist}
                  showsVerticalScrollIndicator={false}
                  data={contents}
                  keyExtractor={(item, index) => item?.id + index.toString()}
                  renderItem={({ item, index }) => (
                    <ContentItem
                      getValues={getValues}
                      onPressCancel={() => {
                        setModalVisible(false);
                        reset({});
                      }}
                      onPressSave={handleSave}
                      control={control}
                      key={index}
                      menuVisible={menuVisible[item?.id]}
                      onPressAdd={() => {
                        handlePressAdd(item?.id), reset({});
                      }}
                      onCloseMenu={() => handlePressAdd(item?.id)}
                      data={item as ContentData}
                    />
                  )}
                />
              </View>
            }
          />
        </ScrollView>
        <ModalComponent
          isVisible={cameraModal}
          onClose={() => setCameraModal(false)}
          content={
            <View style={styles.cameraBox}>
              <TouchableOpacity
                style={styles.galery}
                onPress={() => pick("camera")}
              >
                <Icons.CameraPick width={pixel(30)} height={pixel(30)} />
                <Text style={styles.cameraText}>Take a photo</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.galery}
                onPress={() => pick("gallery")}
              >
                <Icons.GalleryPick width={pixel(30)} height={pixel(30)} />
                <Text style={styles.cameraText}>Pick from Galery</Text>
              </TouchableOpacity>
            </View>
          }
        />
      </KeyboardAvoidingView>
    </View>
  );
};

export default AddCardScreen;
