// Movie Search Screen
import React from 'react';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';
import { Directions } from 'react-native-gesture-handler';
import {movie} from '.././mockData.js'
import Movie from '.././Movie.js'

export default class MovieSearchScreen extends React.Component { 
    static navigationOptions = ({navigation}) => ({
        headerTitle: 'Movie Search',
    })

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.searchRow}>
                    <TextInput 
                    style = {styles.searchForm}
                    onChangeText= {() => {}}
                    placeholder="Search Movies"
                    />
                    <Button title="Submit"/>
                </View>
 
              <Movie {...movie} />
              <Text>Search Screen</Text>
              <Button
                title="Go to Details"
                onPress={() => this.props.navigation.push('Movie Details')}
              />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    }, 
    searchForm: {
        width: 250,
        height: 30,
        textAlign: 'center',
    },
    searchRow: {
        position: 'absolute',
        top: 10,
        flexDirection: 'row',
    }
});
