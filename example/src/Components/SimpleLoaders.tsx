import * as React from 'react';

import { StyleSheet, View, Text, ScrollView } from 'react-native';
import {
  Loader1,
  Loader2,
  Loader3,
  Loader4,
} from 'react-native-loader-collection';

export default function SimpleLoaders() {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>react-native-loader-collection</Text>
      <ScrollView>
        <Text style={styles.text}>Loader 1</Text>

        <View style={styles.loaderContainer}>
          <Loader1 color="#F65158" size={16} padding={20} />
        </View>

        <Text style={styles.text}>Loader 2</Text>

        <View style={styles.loaderContainer}>
          <Loader2 color="#F65158" size={16} padding={20} height={50} />
        </View>

        <Text style={styles.text}>Loader 3</Text>

        <View style={styles.loaderContainer}>
          <Loader3 />
        </View>
        <Text style={styles.text}>Loader 4</Text>
        <View style={styles.loaderContainer}>
          <Loader4 />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#28324B',
  },
  box: {
    width: 60,
    height: 60,
    marginVertical: 20,
  },
  text: {
    fontWeight: 'bold',
    fontSize: 30,
    color: '#FBDE44',
  },
  heading: {
    paddingHorizontal: 20,
    fontWeight: 'bold',
    fontSize: 16,
    color: '#FBDE44',
    marginVertical: 20,
  },
  loaderContainer: { height: 100 },
});
