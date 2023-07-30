import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { Button, Text, View } from "react-native"
import { RootStackParamList } from "../App"

export type TestScreenProps = NativeStackScreenProps<RootStackParamList, 'Test'>

export default function TestScreen({navigation, route}: TestScreenProps){
    return(
        <View>
            <Text> hi </Text>
            <Button title="to Home" onPress={()=>navigation.navigate('Home')}></Button>
        </View>
    )
}