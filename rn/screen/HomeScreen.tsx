import { useEffect, useRef, useState } from "react"
import { Button, EmitterSubscription, Linking, NativeEventEmitter, NativeModules, SafeAreaView, Text } from "react-native"
import Config from "react-native-config"
import { getUserAgent, getVersion } from "react-native-device-info"
import WebView from "react-native-webview"
import {NativeStackScreenProps} from "@react-navigation/native-stack"
import { RootStackParamList } from "../App"

export type HomeScreenProps = NativeStackScreenProps<RootStackParamList, 'Home'>

export default function HomeScreen({navigation, route}: HomeScreenProps){
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

    Linking.getInitialURL().then(value=>{
      console.log('getInitialURL,', value)
    })

    Linking.addEventListener('url', (e)=>{
      console.log('addEventListener url', e.url)
    })

    return ()=>{ 
      removeListernerTest()
      Linking.removeAllListeners('url')
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
      <Button title="to Test" onPress={()=>navigation.navigate('Test')}></Button>
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
    )
}