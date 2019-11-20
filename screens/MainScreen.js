import React from 'react';
import { StyleSheet, Text, View, ScrollView, FlatList,TouchableOpacity} from 'react-native';
import { SafeAreaView } from 'react-navigation';
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { Calendar } from 'react-native-calendars';
import { AsyncStorage } from 'react-native';

export default class  MainScreen extends React.Component {
    static navigationOptions = {
        tabBarIcon: ({ tintColor }) => (
            <MaterialCommunityIcons name="calendar-multiselect" size={30} style={{ color: tintColor }}/>
      ) 
    }
    constructor(props){
        super(props)
        this.state = {
            selectedDate: '',
            Posts: [{
                title: '8월 30일에 쓴 글',
                content: '본문',
                id: 1,
                date: '2019-08-30',
            },
            {
                title: '8월 29일에 쓴 글',
                content: '본문',
                id: 2,
                date: '2019-08-29',
            },
            ]
        }
    }
    _storeData = async () => {
        try {
            await AsyncStorage.setItem('@diary:state', JSON.stringify(this.state));
        } catch (e) {
        }
    }
    _getData = async () => {
        try {
            const mystate = await AsyncStorage.getItem('@diary:state');
            if (mystate !== null) {
                this.setState(JSON.parse(mystate));
            }
        } catch (e) {
        }
    };
componentDidMount(){
    this._getData()
    this.props.navigation.addListener(
        'didFocus',
        payload => {
            newpost = this.props.navigation.getParam('myparam')
            signal = this.props.navigation.getParam('signal')
            if (newpost ) {
                const PrevPosts = [...this.state.Posts]
                this.setState({ Posts: PrevPosts.concat(newpost) }, this._storeData )

                this.props.navigation.navigate('MainScreen',{myparam: false })
            }
            else if(signal){
                const PrevPosts2 = [...this.state.Posts]
                console.log(PrevPosts2)
                deleteIndex = PrevPosts2.findIndex((item) => { return item.id == signal });
                deletePost = PrevPosts2.splice(deleteIndex, 1);
                console.log(deleteIndex)
                console.log(deletePost)
                this.setState({ Posts: PrevPosts2 }, this._storeData)
                this.props.navigation.navigate('MainScreen', { signal: false })
            }
        }
    );
}
    render(){
        return (
            <SafeAreaView style={styles.container}>
                <Calendar
                    onDayPress={(day) => { this.setState(this.state.selectedDate = day)} }
                    current={new Date()}/>
                <ScrollView>
                    <FlatList
                      data ={this.state.Posts.filter(data => { return data.date == this.state.selectedDate.dateString })}
                      renderItem ={({item, index})=>{
                          return (
                              <TouchableOpacity
                                onPress={() => {this.props.navigation.navigate('Detail',{post:item})}}
                                style = {styles.listitem}>
                                  <View>
                                      <Text style = {styles.listtext}>
                                          제목 : {item.title}
                                      </Text>
                                      <Text style={styles.listtext}>
                                          내용 : {item.content}
                                      </Text>
                                  </View>
                              </TouchableOpacity>
                          )
                      }}
                      keyExtractor = {(item, index) => { return item.id }}  />
                </ScrollView>
            </SafeAreaView>
        );
    }
}
const styles = StyleSheet.create({
    listitem:{
        marginLeft:50,
        marginTop:20,
        borderLeftColor: "black",
        borderLeftWidth: 4,
        paddingLeft:30,
    },
    container: {
        flex: 1,
        paddingTop:50,
    },
    textstyle:{
        fontSize:40,
    },
    listtext:{
        fontSize : 20,
    }
});