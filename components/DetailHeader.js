import React from 'react';
import { View, TouchableOpacity, StyleSheet, Dimensions } from 'react-native'
import { withNavigation } from 'react-navigation'
import { Ionicons } from '@expo/vector-icons';
const { width, height } = Dimensions.get('window')
const DetailHeader = ({ navigation, deleteProp }) => {
    return (
        <View style = {styles.header}>
        <View style={styles.container}>
            <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => { navigation.goBack() }}
                hitSlop={{ top: 32, bottom: 32, left: 32, right: 32 }}>
                <Ionicons name="ios-arrow-back" size={25} color={'#7a7171'}/>
            </TouchableOpacity>
                <TouchableOpacity
                    activeOpacity={0.8}
                    hitSlop={{ top: 2, bottom: 2, left: 2, right: 2 }}
                    onPress={() => { deleteProp()}}>
                    <Ionicons name="ios-close" size={25} color={'#7a7171'}/>
                </TouchableOpacity>
        </View>
        </View>
    );
}
const styles = StyleSheet.create({
    header:{
        alignItems:'center',
    },
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: width - 50,
    },
})
export default withNavigation(DetailHeader);