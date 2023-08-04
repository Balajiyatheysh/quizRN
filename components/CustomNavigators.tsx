import { Text, View, SafeAreaView, StyleSheet, TouchableOpacity } from 'react-native'
import { ScreenParamTypes } from '../App';
import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack';
import { useAppDispatch, useAppSelector } from '../Hooks/hooks';

const CustomNavigators = () => {
    const navigator = useNavigation<StackNavigationProp<ScreenParamTypes>>();
    const { cofq1, cofq2, cofq3, cofq4,cofq5,marksScored,TotalMarks } = useAppSelector(state => state.QuizAppParams)


    return (
        <SafeAreaView style={{height:60, width:'85%', margin:30}}>
            <View style={styles.appContainer}>
                <TouchableOpacity style={{...styles.miniContainers, backgroundColor:cofq1?'red':'grey'}} onPress={()=>{navigator.navigate('Question1')}}>
                    <Text style={styles.textStyle}>1</Text>
                </TouchableOpacity >
                <TouchableOpacity style={{...styles.miniContainers, backgroundColor:cofq2?'red':'grey'}}  onPress={()=>{navigator.navigate('Question2')}}>
                    <Text style={styles.textStyle}>2</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{...styles.miniContainers, backgroundColor:cofq3?'red':'grey'}}  onPress={()=>{navigator.navigate('Question3')}}>
                    <Text style={styles.textStyle}>3</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{...styles.miniContainers, backgroundColor:cofq4?'red':'grey'}}  onPress={()=>{navigator.navigate('Question4')}}>
                    <Text style={styles.textStyle}>4</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{...styles.miniContainers, backgroundColor:cofq5?'red':'grey'}}  onPress={()=>{navigator.navigate('Question5')}}>
                    <Text style={styles.textStyle}>5</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}
export default CustomNavigators

const styles = StyleSheet.create({
    appContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        alignContent: 'center',
        justifyContent:'space-between',
        height:100,
        // borderWidth:0.5
    },
    miniContainers: {
        flex: 0.2,
        alignContent:'center',
        alignItems:'center',
        justifyContent:'center',
        borderWidth:0.45,
        height:50,
        width:50,
        borderRadius:50/2,
        backgroundColor: 'grey',
    },
    textStyle:{
        color:'white'
    }
})

