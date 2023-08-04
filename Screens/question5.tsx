import React from 'react';
import { View, Text, StyleSheet, Button, Pressable, FlatList } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from "@expo/vector-icons";
import CustomNavigators from '../components/CustomNavigators';
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { useNavigation } from '@react-navigation/native'
import { Card } from 'react-native-paper'

import { useAppDispatch, useAppSelector } from '../Hooks/hooks';
import { DATA } from '../assets/data'
import { ScreenParamTypes } from '../App';
import { questionAttempted, updateMarksScored } from '../Features/quizAppFeature/quizAppFeatureSlice';




const Question5 = () => {
    const navigator = useNavigation<NativeStackNavigationProp<ScreenParamTypes, 'Question5'>>()
    const dispatch = useAppDispatch();
    const { preferedLanguage } = useAppSelector(state => state.QuizAppParams)
    const data = DATA[preferedLanguage]
    const [products, setProducts] = React.useState(data.question5.options);

    const handleChange = (id:number, corw:boolean) => {
        let temp = products.map((product) => {
            if (id === product.id) {
                return { ...product, isChecked: !product.isChecked };
            }
            return product;
        });
        setProducts(temp);
        {corw?dispatch(updateMarksScored({idReceived:data.question5.id, receiveString:''}))
        :
        dispatch(questionAttempted({idReceived:data.question5.id, receiveString:''}))}
    };

    let selected = products.filter((product) => product.isChecked);
    // console.log(selected.length)
    // if (selected.length>2 && selected.map) {
        
    // }

    return (
        <SafeAreaView style={styles.appContainer}>
            <CustomNavigators />
            <View style={styles.question}>
                <Text style={styles.textStyle}>{data.question5.question}</Text>
            </View>
            <View style={styles.miniContainer}>
                <View style={{ flex: 1 }}>
                    <FlatList
                        data={data.question5.options}
                        renderItem={({ item }) => (
                            <Card style={{ margin: 5 }}>
                                <View style={styles.card}>
                                    <View
                                        style={{
                                            flexDirection: 'row',
                                            flex: 1,
                                            justifyContent: 'space-between',
                                        }}>
                                        <Pressable onPress={() => handleChange(item.id, item.corw)} >
                                            <MaterialCommunityIcons
                                                name={item.isChecked ? 'checkbox-marked' : 'checkbox-blank-outline'} size={24} color="#000" />
                                        </Pressable>
                                        <Text>{item.answer}</Text>
                                    </View>
                                </View>
                            </Card>
                        )}
                    />
                </View>
                <Text style={styles.textStyle}>Selected </Text>
                <View style={{ flex: 1 }}>
                    <FlatList
                        data={selected}
                        renderItem={({ item }) => (
                            <Card style={{ margin: 5 }}>
                                <View style={styles.card}>
                                    <View
                                        style={{
                                            flexDirection: 'row',
                                            flex: 1,
                                            justifyContent: 'space-between',
                                        }}>
                                        <Pressable>
                                            <MaterialCommunityIcons
                                                name={item.isChecked ? 'checkbox-marked' : 'checkbox-blank-outline'} size={24} color="#000" />
                                        </Pressable>
                                        <Text>{item.answer}</Text>
                                    </View>
                                </View>
                            </Card>
                        )}
                    />
                </View>
            </View>

            <Button
                title='SUBMIT'
                onPress={() => {
                    navigator.navigate('PieResults')
                }} />
        </SafeAreaView>
    )
}
export default Question5;

const styles = StyleSheet.create({
    appContainer: {
        flex: 1,
        backgroundColor: '#ffffff',
        padding: 5,
        // margin: 5
    },
    miniContainer: {
        flex: 0.8,

    },
    question: {
        // flex: 0.3,
        alignItems: 'flex-start'
    },
    textStyle: {
        textAlign: 'center',
        color: '#000000',
        fontSize: 20,
        padding: 7,
    },
    card: {
        padding: 10,
        margin: 5,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
})