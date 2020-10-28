// Movie Search Screen
import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

export default class MovieSearchScreen extends React.Component {
    static navigationOptions = ({navigation}) => ({
        headerTitle: 'Movie Search',
    })

    render() {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
              <Text>Search Screen</Text>
              {/* <Text>
                  {this.props.screenProps.number}
              </Text> */}
              <Button
                title="Go to Details"
                onPress={() => navigation.push('Movie Details')}
              />
            </View>
          );
    }
}
