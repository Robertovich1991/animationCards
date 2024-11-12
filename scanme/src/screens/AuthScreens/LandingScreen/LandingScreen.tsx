import { useCallback, useEffect, useState } from "react";
import {
  FlatList,
  Image,
  ImageBackground,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

import MainHeader from "../../../components/MainHeader/MainHeader";
import TextInputField from "../../../components/SearchInput/SearchInput";
import PrimaryButton, {
  ButtonTypes,
} from "../../../components/primaryButton/PrimaryButton";
import { pixel } from "../../../utils/pixel";
import Icons from "../../../assets/svgs/index";
import {
  cardActions,
  cardIndividuals,
  cards,
  cardTeams,
  questions,
} from "../../../assets/mocks/mocks";
import {
  GREY_MG,
  LOGIN_INPUT_BG,
  TEXT_COLOR,
} from "../../../assets/colors/colors";
import styles from "./LandingScreen.style";
import { AuthNavigationType } from "../../../navigation/AuthStackNavigation";
import { ICardItem, IEventSizes } from "../../../interfaces/types";
import { Dispatch } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import { getCardById, getContentById } from "../../../store/slices/cardSlice";
import { AUTH } from "../../../enums/enums";
import { getProfiles } from "../../../store/slices/profileSlice";
import { profilesSelector } from "../../../store/selectors/profileSelector";

export default function LandingScreen() {
  const [visible, setVisible] = useState<boolean>(false);
  const [page, setPage] = useState(0);
  const [searchValue, setSearchValue] = useState<string>("");
  const navigation = useNavigation<AuthNavigationType>();
  const dispatch = useDispatch<Dispatch<any>>();
  const profileList = useSelector(profilesSelector);

  const handleOpenProfile = useCallback((el: ICardItem) => {
    dispatch(getCardById({ cardId: el.cardId }));
    dispatch(getContentById({ id: el.id }));
    navigation.navigate(AUTH.USER_PROFILE);
  }, []);
  const setSearch = useCallback((value: string) => {
    setPage(0);
    setSearchValue(value);
    setVisible(true);
  }, []);

  const filter = useCallback(
    (text: string) => {
      if (text) {
        dispatch(
          getProfiles({
            pagination: { page: page, size: 10 },
            search_by: text,
          })
        );
      }
    },
    [page]
  );
  const isCloseToBottom = (sizes: IEventSizes) => {
    const paddingToBottom = 60;
    return (
      sizes.layoutMeasurement.height + sizes.contentOffset.y >=
      sizes.contentSize.height - paddingToBottom
    );
  };

  useEffect(() => {
    const getData = setTimeout(() => {
      filter(searchValue);
    }, 500);
    return () => clearTimeout(getData);
  }, [filter, searchValue]);
  return (
    <View style={styles.container}>
      <View style={{ paddingHorizontal: pixel(20), gap: pixel(24) }}>
        <MainHeader />
        <TextInputField
          placeholder="Registered username"
          handleOnBlur={() => setVisible(false)}
          handleOnFocus={() => {
            setVisible(true);
          }}
          onChangeText={setSearch}
          value={searchValue}
        />
        {visible && profileList && (
          <ScrollView
            onScroll={({ nativeEvent }) => {
              if (isCloseToBottom(nativeEvent)) {
                setPage(page + 1);
              }
            }}
            scrollEventThrottle={400}
            showsVerticalScrollIndicator
            nestedScrollEnabled
            decelerationRate={0.3}
            keyboardShouldPersistTaps={"always"}
            style={styles.profileBoard}
          >
            {profileList?.map((el: any, index: number) => {
              return (
                <TouchableOpacity
                  style={styles.profileEl}
                  onPress={() => handleOpenProfile(el)}
                  key={index}
                >
                  {el.profilePic ? (
                    <Image
                      source={{
                        uri: `https://scanme.am/api/admin/content/getImage?image=${el.profilePic}`,
                      }}
                      style={{
                        width: pixel(30),
                        height: pixel(30),
                        borderRadius: pixel(15),
                      }}
                    />
                  ) : (
                    <Icons.ProfileCard width={30} height={30} />
                  )}
                  <Text style={[styles.input]}>
                    {el.name} {el.surname}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        )}
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ gap: pixel(24), paddingHorizontal: pixel(20) }}
      >
        <View>
          <Text style={styles.digital}>Digital Business Cards</Text>
          <Image
            resizeMode="cover"
            style={styles.image}
            source={require("../../../assets/images/collage.png")}
          />
          <PrimaryButton
            onPress={() => {
              navigation.navigate("LOGIN");
            }}
            type={ButtonTypes.DARK}
            title="Create a card"
          />
        </View>
        <View>
          <Text style={styles.connect}>
            Connect &{"\n"}Transact with{"\n"}Ease
          </Text>
          <Text style={styles.subConnect}>
            Instantly generate your digital business card without any wait, and
            link your wallet for immediate transactions. Compatible with all
            wallet types for your utmost convenience.
          </Text>
        </View>
        <View style={styles.netWorking}>
          <View style={styles.phones}>
            <Image
              resizeMode="contain"
              style={styles.networkImage}
              source={require("../../../assets/images/iphones.png")}
            />
          </View>
          <Text style={styles.netWorkingText}>
            Networking Made{"\n"}Effortless!
          </Text>
          <Text style={styles.subtitle}>
            Download our app from the App Store or Google Play and create a
            professional digital business card in minutes. Share your contact
            details with a single tap, manage connections seamlessly, and stay
            ahead in the digital age!
          </Text>
          <View style={styles.socials}>
            <TouchableOpacity>
              <Icons.AppStore />
            </TouchableOpacity>
            <TouchableOpacity>
              <Icons.GooglePlay />
            </TouchableOpacity>
          </View>
        </View>
        <View>
          <View style={styles.phones}>
            <Text style={styles.netWorkingText}>
              Discover the{"\n"}Power of Digital{"\n"}Handshakes
            </Text>
          </View>
          <Text style={styles.subtitle}>
            Digital business cards are the modern handshake, offering a smart
            and eco-friendly way to exchange contact information. With
            customizable designs, embedded social links, and interactive
            features, they provide a dynamic alternative to traditional paper
            cards. Step into the world of effortless networking with our
            intuitive digital solutions.
          </Text>
          <Image
            resizeMode="contain"
            style={styles.networkImage}
            source={require("../../../assets/images/handshake.png")}
          />
        </View>
        <View>
          <Text style={styles.netWorkingText}>
            Instant Digital {"\n"}Business Cards {"\n"}Connect & Transact {"\n"}
            with Ease
          </Text>
          <FlatList
            nestedScrollEnabled={true}
            contentContainerStyle={{ gap: 10, marginTop: pixel(24) }}
            showsVerticalScrollIndicator={false}
            data={cards}
            keyExtractor={(_, index) => index.toString()}
            renderItem={({ item, index }) => (
              <View style={styles.card} key={index}>
                <Text
                  style={[
                    styles.netWorkingText,
                    { textAlign: "center", fontSize: pixel(28) },
                  ]}
                >
                  {item.title}
                </Text>
                <View style={styles.cardRow}>
                  <Text
                    style={[
                      styles.subtitle,
                      { width: "70%", fontSize: pixel(16) },
                    ]}
                  >
                    {item.description}
                  </Text>
                  {item.icons}
                </View>
              </View>
            )}
          />
        </View>
        <View>
          <Text style={[styles.netWorkingText, { textAlign: "center" }]}>
            Your Digital Business{"\n"}Card Sharing{"\n"}Simplified
          </Text>
          <Text style={[styles.subtitle, { textAlign: "center" }]}>
            Our digital business cards offer a blend of convenience, speed, and
            versatility.{" "}
          </Text>
          <Image
            resizeMode="contain"
            style={styles.networkImage}
            source={require("../../../assets/images/busCard.png")}
          />
          <FlatList
            nestedScrollEnabled={true}
            contentContainerStyle={{ gap: pixel(20), marginTop: pixel(24) }}
            showsVerticalScrollIndicator={false}
            data={cardActions}
            keyExtractor={(_, index) => index.toString()}
            renderItem={({ item, index }) => (
              <>
                <View
                  style={[
                    {
                      gap: pixel(24),
                      flexDirection: "row",
                      paddingHorizontal: pixel(20),
                    },
                  ]}
                  key={index}
                >
                  {item.icons}
                  <View>
                    <Text
                      style={[
                        styles.netWorkingText,
                        {
                          textAlign: "left",
                          fontSize: pixel(28),
                          lineHeight: pixel(42),
                        },
                      ]}
                    >
                      {item.title}
                    </Text>
                    <Text
                      style={[
                        {
                          textAlign: "left",
                          fontSize: pixel(16),
                          color: GREY_MG,
                          fontWeight: "400",
                          lineHeight: pixel(24),
                        },
                      ]}
                    >
                      {item.description}
                    </Text>
                  </View>
                </View>
              </>
            )}
          />
        </View>
        <View>
          <Text style={[styles.netWorkingText, { textAlign: "center" }]}>
            Choose Your Digital{"\n"}Business Card
          </Text>
          <Text style={[styles.subtitle, { textAlign: "center" }]}>
            Maximize your networking potential with{"\n"}our customizable
            digital business cards.{"\n"}Whether you’re an individual or a team,
            {"\n"}
            our cards are designed to suit{"\n"}your specific needs
          </Text>
        </View>
        <View>
          <Image
            resizeMode="contain"
            style={[styles.networkImage, { marginBottom: pixel(15) }]}
            source={require("../../../assets/images/girlCollage.png")}
          />
          <Text style={styles.netWorkingText}>For Individuals</Text>
          <FlatList
            nestedScrollEnabled={true}
            contentContainerStyle={{ gap: 10, marginTop: pixel(24) }}
            showsVerticalScrollIndicator={false}
            data={cardIndividuals}
            keyExtractor={(_, index) => index.toString()}
            renderItem={({ item, index }) => (
              <View style={[styles.check, { gap: pixel(20) }]} key={index}>
                <Icons.CheckBlue />
                <Text
                  style={{
                    fontSize: pixel(20),
                    color: GREY_MG,
                    fontWeight: "400",
                    lineHeight: pixel(30),
                  }}
                >
                  {item}
                </Text>
              </View>
            )}
          />
        </View>
        <View>
          <Image
            resizeMode="contain"
            style={[styles.networkImage, { marginBottom: pixel(15) }]}
            source={require("../../../assets/images/people.png")}
          />
          <Text style={styles.netWorkingText}>For Teams</Text>
          <FlatList
            nestedScrollEnabled={true}
            contentContainerStyle={{ gap: 10, marginTop: pixel(24) }}
            showsVerticalScrollIndicator={false}
            data={cardTeams}
            keyExtractor={(_, index) => index.toString()}
            renderItem={({ item, index }) => (
              <View style={[styles.check, { gap: pixel(20) }]} key={index}>
                <Icons.CheckBlue />
                <Text
                  style={{
                    fontSize: pixel(20),
                    color: GREY_MG,
                    fontWeight: "400",
                    lineHeight: pixel(30),
                  }}
                >
                  {item}
                </Text>
              </View>
            )}
          />
        </View>
        <View>
          <ImageBackground
            style={{ width: "100%", height: 570, gap: pixel(20) }}
            resizeMode="stretch"
            source={require("../../../assets/images/contentBackground.png")}
          >
            <Text
              style={[
                styles.netWorkingText,
                { textAlign: "center", marginTop: pixel(40) },
              ]}
            >
              Connect Instantly{"\n"}Your Digital{"\n"}Business Card{"\n"}
              Awaits!
            </Text>
            <Text style={[styles.subtitle, { textAlign: "center" }]}>
              Step into the future of networking{"\n"}with our sleek,
              eco-friendly digital{"\n"}business cards. Tap into new{"\n"}
              opportunities with just a click{"\n"} Get started now!
            </Text>
            <View style={{ gap: pixel(10) }}>
              <PrimaryButton
                title="Create Individual Card"
                type={ButtonTypes.DARK}
              />
              <PrimaryButton
                title="Create Team Card"
                type={ButtonTypes.WHITE}
              />
            </View>
          </ImageBackground>
        </View>
        <View>
          <Image
            resizeMode="contain"
            style={styles.networkImage}
            source={require("../../../assets/images/product.png")}
          />
          <Text style={styles.netWorkingText}>
            Traditional Meets{"\n"}Modern Premium{"\n"}Physical Cards
          </Text>
          <Text style={styles.subtitle}>
            Experience the best of both worlds with{"\n"}our high-quality
            physical business cards.{"\n"}Designed to complement your digital
            {"\n"}presence, these tangible cards are crafted{"\n"}for those who
            appreciate the classic{"\n"}touch. Elevate your professional image
            {"\n"}
            with our customizable designs{"\n"}Order yours today!
          </Text>
          <PrimaryButton title="Order Now" type={ButtonTypes.DARK} />
        </View>
        <View style={{ justifyContent: "center" }}>
          <Image
            resizeMode="stretch"
            style={{ width: "100%", height: 500 }}
            source={require("../../../assets/images/trusting.png")}
          />
        </View>
        <View>
          <Text style={[styles.netWorkingText, { textAlign: "center" }]}>
            Frequently Asked{"\n"}Questions
          </Text>
          <FlatList
            nestedScrollEnabled={true}
            contentContainerStyle={{ gap: 10, marginTop: pixel(24) }}
            showsVerticalScrollIndicator={false}
            data={questions}
            keyExtractor={(_, index) => index.toString()}
            renderItem={({ item, index }) => (
              <View
                style={[
                  styles.check,
                  {
                    backgroundColor: LOGIN_INPUT_BG,
                    paddingVertical: pixel(40),
                    justifyContent: "space-between",
                    borderRadius: pixel(16),
                  },
                ]}
                key={index}
              >
                <Text
                  style={{
                    fontSize: pixel(20),
                    color: TEXT_COLOR,
                    fontWeight: "400",
                    lineHeight: pixel(30),
                  }}
                >
                  {item}
                </Text>
                <Icons.Plus />
              </View>
            )}
          />
        </View>
        <View style={styles.footerContent}>
          <View style={styles.footerRow}>
            <View>
              <Text style={styles.footerTitle}>Product</Text>
              <Text style={styles.footerSubtitle}>
                Digital Business{"\n"}Cards
              </Text>
              <Text style={styles.footerSubtitle}>All products</Text>
            </View>
            <View>
              <Text style={styles.footerTitle}>Company</Text>
              <Text style={styles.footerSubtitle}>About us</Text>
              <Text style={styles.footerSubtitle}>Contact us</Text>
              <Text style={styles.footerSubtitle}>Privacy Policy</Text>
            </View>
          </View>
          <View style={[styles.footerRow]}>
            <View>
              <Text style={styles.footerTitle}>Access</Text>
              <Text style={styles.footerSubtitle}>Login</Text>
              <Text style={styles.footerSubtitle}>Sign up free</Text>
            </View>
            <View>
              <Text style={styles.footerTitle}>Connected</Text>
              <Icons.Media />
            </View>
          </View>
          <View style={[styles.footerRow, { paddingTop: pixel(40) }]}>
            <Icons.AppStore />
            <Icons.GooglePlay />
          </View>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <Icons.Logo />
        <Text>© 2024 All rights reserved</Text>
      </View>
    </View>
  );
}
