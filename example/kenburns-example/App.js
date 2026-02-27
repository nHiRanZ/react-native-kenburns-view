import React from 'react';
import { Dimensions, ScrollView, StyleSheet, Text, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import KenBurnsView from 'react-native-kenburns-view';

const { width } = Dimensions.get('window');
const CARD_HEIGHT = 220;

const IMAGES = [
  require('./assets/images/image1.jpg'),
  require('./assets/images/image2.jpg'),
  require('./assets/images/image3.jpg'),
];
const PLACEHOLDER = require('./assets/images/placeholder.jpg');

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <Text style={styles.title}>Ken Burns Effect</Text>
      <Text style={styles.subtitle}>Zoom + pan animation</Text>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {IMAGES.map((source, index) => (
          <View key={index} style={styles.card}>
            <KenBurnsView
              imageWidth={width}
              imageHeight={CARD_HEIGHT}
              sourceUri={source}
              placeholderSource={PLACEHOLDER}
              duration={15000}
              zoomStart={1}
              zoomEnd={1.2}
              panX={0.08}
              panY={0.08}
            />
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a2e',
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#eee',
    textAlign: 'center',
    marginTop: 60,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: '#888',
    textAlign: 'center',
    marginBottom: 24,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 40,
  },
  card: {
    width,
    height: CARD_HEIGHT,
    marginBottom: 16,
    overflow: 'hidden',
  },
});
