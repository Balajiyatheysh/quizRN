import { PieChart } from 'react-native-svg-charts'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useAppDispatch, useAppSelector } from '../Hooks/hooks';
import {View, Text, StyleSheet} from 'react-native'


const PieResults = () => {
    const { marksScored, TotalMarks } = useAppSelector(state => state.QuizAppParams)

    return (
        <SafeAreaView style={styles.container}>
            <Text style={{flex:0.05, fontSize:25, fontWeight:'bold'}}> RESULTS</Text>
            <PieChart
                style={{ flex:0.7, width: 200, height: 200 }}
                data={
                    [
                        {
                            "key":0,
                            "svg":{"fill":"#f50a19"},
                            "value":((TotalMarks-marksScored)/TotalMarks)*100
                        },
                        {
                            "key":1,
                            "svg":{"fill":"#0af535"},
                           "value":((marksScored/TotalMarks)*100)

                        }
                    ]
                }
            />
            <View style={styles.miniContainer}>
                <View style={{flex:0.25, alignItems:'flex-end', alignContent:'flex-end', justifyContent:'flex-end', backgroundColor:"#f50a19", width:100, height:25}}>
                </View>
                <Text style={{fontSize:18}}>Percentage of Incorrect answers is {Math.floor(((TotalMarks-marksScored)/ TotalMarks)*100)}%</Text>
            </View>
            
            <View style={styles.miniContainer}>
                <View style={{flex:0.25, alignItems:'flex-end', alignContent:'flex-end', justifyContent:'flex-end', backgroundColor:"#0af535", width:100, height:25}}>
                </View>
                <Text style={{fontSize:18}}>Percentage of Correct answers is {Math.floor(((marksScored)/ TotalMarks)*100)}%</Text>
            </View>
        </SafeAreaView>

    )
}
export default PieResults

const styles = StyleSheet.create({
    container:{ flex: 1, alignContent: 'center', alignItems: 'center', justifyContent: 'center' },
    miniContainer:{flex:0.1, flexDirection:'row', alignContent:'space-between', alignItems:'stretch', justifyContent:'space-between', width:'80%'}
})