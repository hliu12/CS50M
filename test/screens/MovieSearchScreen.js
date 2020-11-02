// Movie Search Screen
import React from 'react';
import { StyleSheet, Text, View, Button, TextInput, ScrollView, FlatList} from 'react-native';
import {movie, movee} from '.././mockData.js'
import Movie from '.././Movie.js'
import { fetchMovies } from '../api.js';

export default class MovieSearchScreen extends React.Component { 
    state = {
        movieList: [movie, movee],
        query: '',
    }


    onSelectMovie = movie => {
        this.props.navigation.push('Movie Details', movie);
    }

    // Updates query state when search text changes
    handleTextChange = query => {
        this.setState({
            query: query,
        })
    };

    // Contacts API to update movieList state based on search query
    searchMovies = async () => {
        const movies = await fetchMovies(this.state.query);
        this.setState({movieList: movies});
    }
    
    // Testing function that logs state
    listState = () => {
        console.log(this.state.movieList);
        console.log(this.state.query);
    }

    renderMovie = ({item}) => {
        return <Movie {...item} onSelectMovie={this.onSelectMovie} />
    };

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.searchRow}>
                    <TextInput 
                    style={styles.searchForm}
                    onChangeText={this.handleTextChange}
                    placeholder="Search Movies"
                    />
                    <Button 
                    title="Submit"
                    onPress={this.searchMovies}
                    />
                </View>

                <FlatList 
                keyExtractor={(item) => item.imdbID}
                data={this.state.movieList}
                renderItem={this.renderMovie}
                />
                
                {/* <Button onPress={this.listState}/> */}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }, 
    searchForm: {
        width: 250,
        height: 30,
        textAlign: 'center',
        borderWidth: 2,
        borderRadius: 10,
    },
    searchRow: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        height: 70,
        borderBottomWidth: 2,
        borderColor: 'black',
    }, 
});
