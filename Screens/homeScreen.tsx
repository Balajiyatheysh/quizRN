import * as React from 'react';
import { StyleSheet, SafeAreaView, View, Alert, Keyboard, use } from 'react-native'
import { Button, TextInput, Appbar, RadioButton, Text } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { useAppDispatch } from '../Hooks/hooks';
import { addCandidateInfo } from '../Features/quizAppFeature/quizAppFeatureSlice';
import { ScreenParamTypes } from '../App';


// const validationSchema = Yup.object().shape({
//   firstName: Yup.string()
//     .label('firstName')
//     .required('firstName is required'),
//   lastName: Yup.string()
//     .label('lastName')
//     .required('last name is required'),
//   languageSelector: Yup.string()
//     .label('selectLanguage')
//     .required('Select your preferred language')
// });

const HomeScreen = () => {
  // let res: string= JSON.stringify({DATA.map(e=>{e.question1})})
  // console.log(typeof {DATA} )
  // const [value , setValue] = React.useState()
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [phoneNo, setPhoneNo] = React.useState('');
  const [preferedLanguage, setPreferedLanguage] = React.useState('');

  const navigator = useNavigation<NativeStackNavigationProp<ScreenParamTypes, 'HomeScreen'>>()
  const dispatch = useAppDispatch();


  const QuizHeader = () => {
    return (
      <View style={styles.headerFooterStyle}>
        <Text style={styles.textStyle}>Candidate's Information</Text>
      </View>
    );
  };
  const resetState = () => {
    setName('');
    setEmail('');
    setPhoneNo('');
    setPreferedLanguage('');
  };

  const handleButtonPress = () => {
    if (name && email && phoneNo && preferedLanguage) {
      dispatch(
        addCandidateInfo({
          name: name,
          email: email,
          phoneNo: phoneNo,
          preferedLanguage: preferedLanguage,
        }),
      );
    }
    navigator.navigate('Question1')
    resetState();
  }

  return (
    <SafeAreaView style={styles.appContainer}>

      <View style={styles.container1}>
        <QuizHeader />
        <TextInput label="First Name" onChangeText={text=>{setName(text)}} value={name}/>
        <TextInput label="Email" onChangeText={text=>{setEmail(text)}} value={email} />
        <TextInput label="Phone" keyboardType='numeric'onChangeText={text=>{setPhoneNo(text)}} value={phoneNo}/>
      </View>

      <View style={styles.container2}>
        <Text style={{ fontSize: 18, backgroundColor: 'grey', color: 'white', height: 40, textAlign: 'center',paddingTop:9 }}>Select your preferred language :</Text>
        <RadioButton.Group onValueChange={newValue => setPreferedLanguage(newValue)} value={preferedLanguage}>
          <RadioButton.Item label="English" value="0" />
          <RadioButton.Item label="Kannada" value="1" />
          <RadioButton.Item label="Telugu" value="2" />
          {/* <RadioButton.Item label="Hindi" value="3" /> */}
        </RadioButton.Group>
        {/* <Text>{typeof Number({preferedLanguage})}</Text> */}
      </View>

      <View style={styles.btncontainer}>
        <Button  mode="contained" buttonColor='#e31212' onPress={resetState}>
          RESET
        </Button>
        <Button  mode="contained" buttonColor='green' disabled={ phoneNo  && email && name && preferedLanguage? false: true} onPress={handleButtonPress}>
          SUBMITT
        </Button>
      </View>

    </SafeAreaView>

  )
}

export default HomeScreen;


const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    backgroundColor: '#ffffff',
    padding: 5,
    margin:5
  },
  headerFooterStyle: {
    width: '100%',
    height: 45,
    backgroundColor: '#606070',
  },
  textStyle: {
    textAlign: 'center',
    color: '#fff',
    fontSize: 18,
    padding: 7,
  },
  container1: {
    flex: 0.4,
    justifyContent: 'space-between'
  },
  container2: {
    flex: 0.2,
    marginTop: 10,
    paddingBottom: 15,
  },
  btncontainer: {
    flex: 0.3,
    flexDirection:'row',
    height: 20,
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'space-evenly',
  }
})