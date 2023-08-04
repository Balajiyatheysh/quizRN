import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { TextInput, Button } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { ScreenParamTypes } from '../App';
import CustomNavigators from '../components/CustomNavigators';
import { useAppDispatch, useAppSelector } from '../Hooks/hooks';
import { DATA } from '../assets/data'
import { questionAttempted } from '../Features/quizAppFeature/quizAppFeatureSlice';


const Question3 = () => {
    const navigator = useNavigation<NativeStackNavigationProp<ScreenParamTypes, 'Question3'>>()
    const dispatch = useAppDispatch()
    const { preferedLanguage } = useAppSelector(state => state.QuizAppParams)
    const data = DATA[preferedLanguage]
    const [answer, setAnswer] = React.useState('')

    const handleButtonPress=(id:number)=>{
        // console.log(answer)
        dispatch(questionAttempted({idReceived:id, receiveString:answer}))
        navigator.navigate('Question4')
    }

    return (
        <SafeAreaView style={styles.appContainer}>
            <CustomNavigators />
            <Text style={styles.textStyle}>{data.question3.question} </Text>
            <TextInput
                        style={{height:50, width:350}}
                        onChangeText={(e)=>{setAnswer(e)}}
                    />
            <View style={{flex:1, flexDirection:'column', alignItems:'center',alignContent:'center'}}>
                    <Button
                    style={{margin:15, width:200}}
                    mode='contained'
                    disabled={answer.length >7? false: true}
                    onPress={()=>handleButtonPress(data.question3.id)}
                    >Confirm</Button>
            </View>
            
        </SafeAreaView>
    )
}
export default Question3;

const styles = StyleSheet.create({
    appContainer: {
        flex: 1,
        backgroundColor: '#ffffff',
        padding: 5,
        margin: 5,
        alignContent:'center',
    },
    textStyle: {
        textAlign: 'center',
        color: '#000000',
        fontSize: 20,
        padding: 7,
    },
})