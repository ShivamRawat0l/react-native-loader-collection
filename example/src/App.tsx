import * as React from 'react';

import { StyleSheet, View, Text, ScrollView } from 'react-native';
import { Loader1, Loader2, Loader3 } from 'react-native-loader-collection';
import { Canvas, Circle, Group } from '@shopify/react-native-skia';
import Skia from './Components/Skia';
import SimpleLoaders from './Components/SimpleLoaders';

export default function App() {
  const width = 256;
  const height = 256;
  const r = 215;
  return (
    <React.StrictMode>
      <SimpleLoaders />
    </React.StrictMode>
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
