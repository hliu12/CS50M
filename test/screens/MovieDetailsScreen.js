// MovieDetailsScreen - Contains information about a specific movie
import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';



function MovieDetailsScreen({ navigation }) {
    return (
      <View style={styles.container}>
        <Text>Details Screen</Text>
        <Button
          title="Go to Details... again"
          onPress={() => navigation.push('Movie Details')}
          />
      </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        alignItems: 'center', 
        justifyContent: 'center'
    },
});

export default MovieDetailsScreen;
