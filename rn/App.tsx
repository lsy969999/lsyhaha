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
  NativeEventEmitter,
  Linking
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
import {getUserAgent, getVersion} from 'react-native-device-info'
type SectionProps = PropsWithChildren<{
  title: string;
}>;

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
  const [v, setV] = useState('');

  useEffect(()=>{
    async function myua(){
      const gua = await getUserAgent()
      setUa(gua)
      const v = getVersion()
      setV(v)
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

  return (
    <SafeAreaView style={{flex: 1}}>
      <Text>a</Text>
      <Text>{Config.ENV}</Text>
      <Text>ab</Text>
      <Button onPress={moduleTest} title='moduleTest'></Button>
      <Button onPress={addListernerTest} title='addListener'></Button>
      <Button onPress={removeListernerTest} title='removeListener'></Button>
      <Button onPress={()=>webviewRef.current?.reload()} title='refresh'></Button>
      <WebView
        webviewDebuggingEnabled={true}
        userAgent={`${ua} lsyhaha-${v}`}
        bounces={false}
        ref={webviewRef}
        source={{ uri: `${Config.WV_URL}` }}
        onMessage={async event => {
          console.log('wv event>', event)

          const data = JSON.parse(event.nativeEvent.data)
          
          if(data.callFn === 'moduleTest'){
            const d = await moduleTest()
            data.return = d
            webviewRef.current?.postMessage(JSON.stringify(data))
          }
        }}
        onShouldStartLoadWithRequest={(request) => {
          const {url} = request;
          const tarUrl = url.replace(/\/$/, '');
          const refUrl = (Config.WV_URL ?? '').replace(/\/$/, '');
          if(refUrl !== tarUrl){
            Linking.openURL(url).catch(e=>console.error('Failed to open ' + e))
            return false
          }
          return true
        }}
        onNavigationStateChange={newNavState=>{
          
        }}
        >
        </WebView>
    </SafeAreaView>
  );
}
export default App;
