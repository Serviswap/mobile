import React from "react";
import { View, StyleSheet, Modal, Text } from "react-native";
// import * as Progress from "react-native-progress";
import LottieView from "lottie-react-native";

function UploadScreen({ progress = 0, visible = false, onDone }) {
  return (
    <Modal visible={visible}>
      <View style={styles.container}>
        {progress < 1 ? (
          // <Progress.Bar
          //   color={"#6495ed"}
          //   progress={progress}
          //   width={200}
          // />
          null
        ) : (
          <LottieView
            onAnimationFinish={onDone}
            source={require("../../assets/animations/done.json")}
            autoPlay
            loop={false}
            style={styles.animation}
          />
        )}
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  animation: { width: 150 },
  container: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
  },
});

export default UploadScreen;
