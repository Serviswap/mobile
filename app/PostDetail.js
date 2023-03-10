import React, { useState, useEffect } from "react";
import {
  Dimensions,
  StyleSheet,
  View,
  Text,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
} from "react-native";
import Checkbox from "expo-checkbox";
import * as Yup from "yup";
import NavHeader from "../components/PostEdit/NavHeader";
import AppButton from "../components/AppButton";
import {
  AppFormField,
  SubmitButton,
  AppForm,
} from "../components/PostEdit/Forms";
import FormImagePicker from "../components/PostEdit/Forms/FormImagePicker";
import AppFormPicker from "../components/PostEdit/Forms/AppFormPicker";
import UploadScreen from "../components/PostEdit/UploadScreen";
import CategoryPicker from "../components/PostEdit/CategoryPicker";
import { useNavigation } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

const categories = [
  { label: "Food", value: 1, backGroundColor: "red" },
  { label: "Career", value: 2, backGroundColor: "red" },
  { label: "Fun", value: 3, backGroundColor: "red" },
  { label: "Sports", value: 4, backGroundColor: "red" },
  { label: "Academic", value: 5, backGroundColor: "red" },
  { label: "Others", value: 6, backGroundColor: "red" },
];

const loginSchema = Yup.object().shape({
  title: Yup.string().required().min(1).label("Title"),
  content: Yup.string().required().label("Content"),
  images: Yup.array().min(1, "You must select at least one image."),
  category: Yup.object().required().nullable().label("Category"),
});
const windowHeight = Dimensions.get("window").height;

function PostDetailScreen() {
  const [progress, setProgress] = useState(0);
  const [uploadVisible, setUploadVisible] = useState(false);
  const [questionChecked, setQuestionChecked] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    navigation.getParent()?.setOptions({ tabBarStyle: { display: "none" } });
    return () => navigation.getParent()?.setOptions({ tabBarStyle: undefined });
  }, [navigation]);

  const handleSubmit = async () => {
    // mint
  };

  return (
    <SafeAreaView style={styles.background}>
      <UploadScreen
        onDone={() => {
          setUploadVisible(false);
          navigation.navigate("Home");
        }}
        progress={progress}
        visible={uploadVisible}
      />
      <AppForm
        validationSchema={loginSchema}
        initialValues={{
          title: "",
          content: "",
          category: null,
          images: [],
        }}
        onSubmit={handleSubmit}
      >
        <NavHeader />
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <>
            {/* <View style={styles.postInfo}> */}
            <KeyboardAvoidingView style={styles.postInfo} behavior="padding">
              <View style={styles.imagePickerRegion}>
                <FormImagePicker name="images" />
              </View>
              <View style={styles.emailContainer}>
                <AppFormField
                  errorStyle={{ marginTop: 5, width: "100%" }}
                  placeholder="Add a title"
                  style={styles.email}
                  autoCapitalized="none"
                  name="title"
                  maxLength={100}
                  autoCorrect={false}
                />
              </View>
              <View style={styles.bodyTextContainer}>
                <View>
                  <AppFormField
                    name="content"
                    style={styles.description}
                    placeholder="Add text"
                    autoCapitalized="none"
                    autoCorrect={false}
                    maxLength={2000}
                    onDoneButton={true}
                  />
                </View>
                <View style={styles.done}>
                  <View style={styles.question}>
                    <Checkbox
                      style={styles.checkbox}
                      value={questionChecked}
                      onValueChange={setQuestionChecked}
                    />
                    <Text style={styles.paragraph}>Post as a question</Text>
                  </View>
                  <View style={styles.doneButton}>
                    <AppButton
                      name={"Done"}
                      onPress={() => {
                        Keyboard.dismiss();
                      }}
                    />
                  </View>
                </View>
              </View>
            </KeyboardAvoidingView>
            <View style={styles.categoryRegion}>
              <AppFormPicker
                items={categories}
                name="category"
                placeholder="Category"
                PickerItemComponent={CategoryPicker}
                numberOfColumns={3}
              />
            </View>
            <View style={styles.button}>
              <SubmitButton title="Post" />
            </View>
          </>
        </TouchableWithoutFeedback>
      </AppForm>
    </SafeAreaView>
  );
}

const window = Dimensions.get("window");

const styles = StyleSheet.create({
  background: {
    backgroundColor: "white",
    flex: 1
  },
  postInfo: {
    marginTop: 10,
    flex: 0.69,
    justifyContent: "flex-start",
    alignItems: "stretch",
  },
  imagePickerRegion: {
    flex: 0.3,
  },
  emailContainer: {
    justifyContent: "flex-start",
    alignItems: "center",
    marginHorizontal: 20,
    flex: 0.1,
    marginTop: 30,
  },
  email: {
    width: "100%",
    alignSelf: "flex-start",
    justifyContent: "flex-end",
    fontSize: window.height * 0.017,
    fontWeight: "500",
  },
  bodyTextContainer: {
    marginHorizontal: 20,
    flex: 0.6,
    marginTop: 10,
    marginBottom: 140,
  },
  scrollViewContainer: {
    width: "100%",
    height: "100%",
  },
  description: {
    width: "100%",
    alignSelf: "flex-start",
    justifyContent: "flex-end",
    fontSize: window.height * 0.02,
    fontWeight: "300",
    height: "100%",
  },
  categoryRegion: {
    // marginTop: 150,
    flex: 0.31,
  },
  button: {
    flex: 0.1,
    marginTop: 10,
    alignItems: "center",
  },
  done: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  paragraph: {
    color: "gray",
    fontSize: window.height * 0.02,
    marginLeft: 10,
  },
  question: {
    flexDirection: "row",
    marginRight: 55,
  },
});

export default PostDetailScreen;
