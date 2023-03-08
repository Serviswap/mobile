import { Button, View } from "react-native";

const Btn = ({
  title,
  onPress,
}: {
  title: string;
  onPress: () => Promise<void>;
}) => {
  return (
    <View style={{ marginVertical: 10 }}>
      <Button title={title} onPress={onPress} />
    </View>
  );
};

export default Btn;
