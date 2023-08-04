import React from 'react'
import { Text, View, StyleSheet, TouchableOpacity, FlatList } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import { Card } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { ScreenParamTypes } from '../App';
import { useAppDispatch, useAppSelector } from '../Hooks/hooks';
import { DATA } from '../assets/data'
import CustomNavigators from '../components/CustomNavigators';
import { questionAttempted, updateMarksScored } from '../Features/quizAppFeature/quizAppFeatureSlice';

const Question1 = () => {
    const { preferedLanguage } = useAppSelector(state => state.QuizAppParams)
    const navigator = useNavigation<NativeStackNavigationProp<ScreenParamTypes, 'Question1'>>()
    const dispatch = useAppDispatch()
    const data = DATA[preferedLanguage]

    const handlePress = (id: number, corw: boolean) => {
        { corw ? dispatch(updateMarksScored({ idReceived: id, receiveString:'' })) : dispatch(questionAttempted({ idReceived: id , receiveString:''})) }
        navigator.navigate('Question2')
    }

    return (
        <SafeAreaView style={styles.appContainer}>
            <CustomNavigators />
            <View style={{ flex: 1, flexDirection: 'column' }}>
                <View style={styles.question}>
                    <Text style={styles.textStyle}>{data.question1.question}</Text>
                </View>
                <FlatList
                    // style={{flex:0.5}}
                    data={data.question1.options}
                    renderItem={({ item }) => (
                        <Card style={{ margin: 5 }}>
                            <View style={styles.card}>
                                <TouchableOpacity
                                    style={{
                                        flexDirection: 'row',
                                        flex: 1,
                                        justifyContent: 'space-between',
                                    }}
                                    onPress={() => handlePress(data.question1.id, item.corw)}>
                                    <Text style={styles.textStyle}>{item.answer}</Text>
                                </TouchableOpacity>
                            </View>
                        </Card>
                    )}
                />
            </View>
        </SafeAreaView>
    )
}
export default Question1;

const styles = StyleSheet.create({
    appContainer: {
        flex: 1,
        backgroundColor: '#ffffff',
    },
    textStyle: {
        textAlign: 'center',
        color: '#000000',
        fontSize: 20,
        padding: 7,
    },
    question: {
        flex: 0.3,
        alignItems: 'flex-start'
    },
    card: {
        padding: 5,
        margin: 5,
        flexDirection: 'column',
        justifyContent: 'space-between',
    },
})