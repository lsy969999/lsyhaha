/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect, useRef, useState } from 'react';
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
import {getUserAgent} from 'react-native-device-info'
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

  const moduleTest = async (): Promise<string> => {
    let data
    try{
      data = await SampleModule.sampleMethodCall('test!')
      console.log(data)
    } catch (e) {
      console.error(e)
    }
    return data
  }

  const [ua, setUa] = useState('');

  useEffect(()=>{
    async function myua(){
      const gua = await getUserAgent()

      setUa(gua)
      console.log('gua: ', gua)
    }
    myua()
    // getUserAgent().then(d=>setUa(d))
    return ()=>{ 
      removeListernerTest()
    }
  }, [])
  const webviewRef = useRef<WebView>(null)

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

  let userAgent = 's'

  const chanegUserAgent = () => {
    userAgent = 'zzz' 
  }

  return (
    <SafeAreaView style={{flex: 1}}>
      <View></View>
      <Text>a</Text>
      <Text>{Config.ENV}</Text>
      <Text>ab</Text>
      <Button onPress={moduleTest} title='moduleTest'></Button>
      <Button onPress={addListernerTest} title='addListener'></Button>
      <Button onPress={removeListernerTest} title='removeListener'></Button>
      <Button onPress={chanegUserAgent} title='chanegUserAgent'></Button>
      <WebView
        webviewDebuggingEnabled={true}
        userAgent={`${ua} lsyhaha`}
        ref={webviewRef}
        source={{ uri: `${Config.WV_URL}` }}
        onMessage={async event => {
          console.log('wv event>', event)

          const data = JSON.parse(event.nativeEvent.data)
          
          if(data.callFn === 'moduleTest'){
            const d = await moduleTest()
            console.log('wv d' + d, webviewRef.current)
            webviewRef.current?.postMessage('data is ' + d)
          }
        }}>
        </WebView>
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
