/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect } from 'react';
import type {PropsWithChildren} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  NativeModules,
  Button,
  NativeEventEmitter
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import Config from 'react-native-config';
import { WebView } from 'react-native-webview';
import EventEmitter, { EmitterSubscription } from 'react-native/Libraries/vendor/emitter/EventEmitter';

type SectionProps = PropsWithChildren<{
  title: string;
}>;

function Section({children, title}: SectionProps): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
}

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const {SampleModule} = NativeModules

  const onPress = async () => {
    try{
      const data = await SampleModule.sampleMethodCall('test!')
      console.log(data)
    } catch (e) {
      console.error(e)
    }
  }

  useEffect(()=>{
    return ()=>{ 
      removeListernerTest()
    }
  }, [])


  const eventEmitter = new NativeEventEmitter(SampleModule)
  let eventListener: EmitterSubscription | null;
  const addListernerTest = () => {
    if(!eventListener){
      eventListener = eventEmitter.addListener('sampleEventEmitter', event=>{
        console.log(event)
      })
    }
    
  }

  const removeListernerTest = () => {
    if(eventListener){
      eventListener!.remove()
      eventListener = null
    }
  }

  return (
    <SafeAreaView style={{flex: 1}}>
      <View></View>
      <Text>a</Text>
      <Text>{Config.ENV}</Text>
      <Text>a</Text>
      <Button onPress={onPress} title='moduleTest'></Button>
      <Button onPress={addListernerTest} title='addListener'></Button>
      <Button onPress={removeListernerTest} title='removeListener'></Button>
      <WebView source={{ uri: `${Config.WV_URL}` }}></WebView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
