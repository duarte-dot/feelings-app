import React from "react";
import {
  ActivityIndicator,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";

import axios from "axios";

import { styles } from "./styles";
import { SCORE_TAG, Sentiment } from "../../components/Sentiment";

export function Home() {
  const [score, setScore] = React.useState<SCORE_TAG | null>(null);
  const [message, setMessage] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);

  async function handleSend() {
    setIsLoading(true);

    try {
      const formData = new FormData();

      formData.append("key", process.env.KEY_MEANING_CLOUD || "");
      formData.append("lang", "pt");
      formData.append("txt", message);

      const response = await axios.post(
        "https://api.meaningcloud.com/sentiment-2.1",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const { score_tag } = response.data;
      setScore(score_tag);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mensagem</Text>

      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Digite a sua mensagem..."
          onChangeText={setMessage}
          multiline
        />

        <TouchableOpacity
          style={styles.button}
          activeOpacity={0.7}
          disabled={isLoading}
          onPress={handleSend}
        >
          {isLoading ? (
            <ActivityIndicator size={24} color="white" />
          ) : (
            <FontAwesome name="send" size={24} color="white" />
          )}
        </TouchableOpacity>
      </View>

      {score && <Sentiment score={score} />}
      {/* {score && (
        <TouchableOpacity
          style={styles.button}
          activeOpacity={0.7}
          onPress={() => setScore(null)}
        >
          <FontAwesome name="trash" size={24} color="white" />
        </TouchableOpacity>
      )} */}
    </View>
  );
}
