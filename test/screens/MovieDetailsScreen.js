// MovieDetailsScreen - Contains information about a specific movie
import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

export default class MovieDetailsScreen extends React.Component { 
    // static navigationOptions = ({navigation}) => ({
    //     headerTitle: 'Movie Details',
    // })

    render() {
        this.props.navigation.setOptions({
            headerTitle: "Test Title",
        })
     
        return (
            <View style={styles.container}>
              <Text>Details Screen</Text>
              <Button
                title="Go to Details... again"
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
        justifyContent: 'center'
    },
});

