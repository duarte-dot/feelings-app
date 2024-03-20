import React from "react";
import { Text, View } from "react-native";

import { styles } from "./styles";
import { sentiments } from "../../utils/sentiments";

export type SCORE_TAG = "P+" | "P" | "NEU" | "N" | "N+" | "NONE";

type SentimentProps = {
  score: SCORE_TAG;
};

export function Sentiment({ score }: SentimentProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.emoji}>{sentiments[score].emoji}</Text>
      <Text style={styles.sentiment}>{sentiments[score].sentiment}</Text>
    </View>
  );
}
