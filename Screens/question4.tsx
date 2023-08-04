import React, { useState } from 'react'
import { StyleSheet, StatusBar, Text, View, ToastAndroid, Alert } from 'react-native'
import { Button } from 'react-native-paper'
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomNavigators from '../components/CustomNavigators';
import { useNavigation } from '@react-navigation/native'
import DragAndDrop from 'volkeno-react-native-drag-drop';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { DATA } from '../assets/data'
import { ScreenParamTypes } from '../App';
import { useAppDispatch, useAppSelector } from '../Hooks/hooks'
import { questionAttempted, updateMarksScored } from '../Features/quizAppFeature/quizAppFeatureSlice';



const Question4 = () => {
    const { preferedLanguage } = useAppSelector(state => state.QuizAppParams)
    const navigator = useNavigation<NativeStackNavigationProp<ScreenParamTypes, 'Question4'>>()
    const data = DATA[preferedLanguage]
    const dispatch = useAppDispatch();
    const selectedAnswer = data.question4.answerGiven

    const [options, setOptions] = useState([
        { id: 1, text: data.question4.options[0] },
        { id: 2, text: data.question4.options[1] },
        { id: 3, text: data.question4.options[2] },
        { id: 4, text: data.question4.options[3] },
    ]);

    type answerZonesType = {
        id: number,
        text: string,
        items: [{ id: number, text: string }] | any[]
    }[]
    const [answerZones, setAnswerZones] = useState<answerZonesType>([
        {
            id: 1,
            text: '1)',
            items: data.question4.answered ? [{ id: 0, text: selectedAnswer[0] }] : [],
        },
        {
            id: 2,
            text: '2)',
            items: data.question4.answered ? [{ id: 1, text: selectedAnswer[1] }] : [],
        },
        {
            id: 3,
            text: '3)',
            items: data.question4.answered ? [{ id: 2, text: selectedAnswer[2] }] : [],
        },
        {
            id: 4,
            text: '4)',
            items: data.question4.answered ? [{ id: 3, text: selectedAnswer[3] }] : [],
        },
    ]);

    const showToast = () => {
        ToastAndroid.show("Answer submitted successfully !", ToastAndroid.SHORT);
    };

    const submitAnswer = () => {
        if (
            answerZones[0].items.length < 1 ||
            answerZones[1].items.length < 1 ||
            answerZones[2].items.length < 1 ||
            answerZones[3].items.length < 1
        ) {
            Alert.alert('You have not answered the question properly !');
        } else {

            let answerArray = answerZones.map((obj) => obj.items[0].text);
            console.log(answerArray)
            dispatch(
                updateMarksScored({ idReceived:data.question4.id, receiveString:'' }),
            );
            showToast();
            navigator.navigate('Question5')
        }
    };

    return (
        <SafeAreaView style={styles.appContainer}>
            <StatusBar />
            <CustomNavigators />
            <Text style={styles.questionText}>{data.question4.question} </Text>
            <DragAndDrop
                style={styles.container}
                contentContainerStyle={styles.contentContainerStyle}
                itemKeyExtractor={item => item.id}
                zoneKeyExtractor={zone => zone.id}
                zones={answerZones}
                items={!selectedAnswer.length ? options : []}
                maxItemsPerZone={1}
                itemsContainerStyle={styles.itemsContainerStyle}
                zonesContainerStyle={styles.zonesContainerStyle}
                onMaj={(answerZones: any, options: any) => {
                    setOptions(options);
                    setAnswerZones(answerZones);
                }}
                itemsInZoneStyle={styles.itemsInZoneStyle}
                renderZone={(zone, children, hover) => {
                    return (
                        <View
                            style={{
                                ...styles.dragZoneStyle,
                                backgroundColor: hover ? '#E2E2E2' : '#FFF',
                            }}>
                            <Text style={styles.dragZoneTextStyle}>
                                {zone.text}
                            </Text>
                            {children}
                        </View>
                    );
                }}
                renderItem={item => {
                    return (
                        <View style={styles.dragItemStyle}>
                            <Text style={styles.dragItemTextStyle}>
                                {item.text}
                            </Text>
                        </View>
                    );
                }}
            />
            <Button
                mode='contained'
                style={styles.customButton}
                onPress={submitAnswer}>Confirm</Button>
        </SafeAreaView>
    )
}
export default Question4;


const styles = StyleSheet.create({
    appContainer: {
        flex: 1,
        backgroundColor: "white",
        padding: 10,
    },
    questionText: {
        color: "black",
        fontSize: 20,
        marginBottom: 4,
    },
    container: {
        flex: 1,
        backgroundColor: "white",
    },
    contentContainerStyle: {
        padding: 10,
    },
    itemsContainerStyle: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    zonesContainerStyle: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    dragZoneStyle: {
        borderColor: '#F39200',
        borderWidth: 1,
        width: '47%',
        padding: 10,
        minHeight: 90,
        marginVertical: 15,
    },
    dragZoneTextStyle: {
        color: "black",
        fontSize: 18,
    },
    dragItemStyle: {
        borderColor: '#F39200',
        borderWidth: 1,
        width: '47%',
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 4,
        backgroundColor: '#F5F5F5',
        padding: 8,
    },
    dragItemTextStyle: {
        color: '#011F3B',
        fontWeight: '700',
        textAlign: 'center',
    },
    itemsInZoneStyle: {
        width: '100%',
    },
    customButton: {
        padding: 6,
        marginTop: 4,
    },
});
