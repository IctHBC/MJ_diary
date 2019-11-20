import React from 'react';
import { TextInput, StyleSheet, Dimensions, View, Image } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import { MaterialCommunityIcons } from '@expo/vector-icons'
import WriteHeader from '../components/WriteHeader'
import uuid from 'uuid/v1';
const { width, height } = Dimensions.get('window');
export default class WriteScreen extends React.Component {

    static navigationOptions = {
        tabBarIcon: ({ tintColor }) => (
            <MaterialCommunityIcons name='lead-pencil' size={25} style={{ color: tintColor }} />
        ),
        tabBarOnPress: ({ navigation }) => {
            navigation.navigate('Write');
        }
    }
    state = {
        inputtitle :'',
        inputcontent : '',
        imageUrl: '',
    }
    _showTitle = (value) => {
        this.setState({inputtitle:value})
    }
    _showContent = (value) =>{
        this.setState({inputcontent:value})
    }
    _saveText = () =>{
        if(this.state.inputtitle !== ''){
            const id = uuid()
            const date = this._gettoday()
            const newpost = {
                id  : id,
                title: this.state.inputtitle,
                content: this.state.inputcontent,
                date: date,
                imageUrl: this.state.imageUrl,
            }
            this.setState(
                {
                    inputtitle: '',
                    inputcontent: '',
                    imageUrl: '',
                }
            )
            this.props.navigation.navigate('MainScreen',{myparam :newpost})
        }
        else{
            this.props.navigation.navigate('MainScreen')
        }
    }
    _gettoday = () => {
        tyear = (new Date().getFullYear()).toString()
        tmonth = (new Date().getMonth() + 1).toString()
        tday = (new Date().getDate()).toString()
        if (tmonth < 10) {
            tmonth = '0' + tmonth
        }
        if (tday < 10) {
            tday = '0' + tday
        }
        return (tyear + "-" + tmonth + "-" + tday)
    } 
    _selectImage = async() =>{       
            let result = await ImagePicker.launchImageLibraryAsync({
                allowsEditing: true,
            });
        this.setState({ imageUrl: result.uri });
}
    render() {
        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.contentContainer}>
                    <WriteHeader saveProps={this._saveText} selectImage = {this._selectImage}/>
                    <TextInput
                        value = {this.state.inputtitle}
                        onChangeText={this._showTitle}
                        placeholder="제목을 입력하세요"
                        style={styles.title}
                        returnKeyType="done" />
                    {this.state.imageUrl ? <Image source={{ uri: this.state.imageUrl }} style={{ width: 100, height: 100 }} /> : null}
                    <TextInput
                        value={this.state.inputcontent}
                        onChangeText={this._showContent}
                        placeholder="내용을 입력하세요"
                        multiline={true}
                        style={styles.content}
                        returnKeyType="done" />
                </View>
            </SafeAreaView>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        paddingTop:50,
    },
    contentContainer: {
        width: width - 60,
    },
    title: {
        marginVertical: 30,
        fontSize: 30,
        paddingBottom: 12,
        borderBottomWidth: 2,
    },
    content: {
        fontSize: 20,
    },

});