import React from 'react';
import { StyleSheet, Text, View, Button, TextInput, ScrollView, FlatList} from 'react-native';
import Movie from '.././Movie.js'
import { fetchMovies } from '../api.js';
import Ionicons from 'react-native-vector-icons/Ionicons'

export default class MovieSearchScreen extends React.Component { 
    state = {
        movieList: [],
        query: '',
        page: 1,
    }

    // Navigates to Movie Details page when a movie is selected
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
        // Must await this reset before calling API
        await this.setState({
            page: 1,
            movieList: [],
        })
        const movies = await fetchMovies(this.state.query, this.state.page);
        // Updates movieList if a result is found
        movies ?
        this.setState({movieList: movies}) :
        alert("Movies not found: Check your spelling or try a more specific search");
    }

    // Gets more movies when scrolling
    getMoreMovies = async () => {
        // Update page number to get new data, important to await this before 
        // fetching data from API
        await this.setState(prevState => {return {page: prevState.page + 1}})
        const movies = await fetchMovies(this.state.query, this.state.page);
        movies ?
        this.setState({movieList: [...this.state.movieList, ...movies]}) :
        null
    }
    
    // Testing function that logs state
    listState = () => {
        console.log(this.state.movieList);
        console.log(this.state.query);
        console.log(this.state.page)
    }

    // Renders a movie by using custom Movie componenet
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
                
                {this.state.movieList.length > 1 ? 
                    <FlatList 
                    keyExtractor={(item) => item.imdbID}
                    data={this.state.movieList}
                    renderItem={this.renderMovie}
                    onEndReached={this.getMoreMovies}
                    />
                :
                    <View style={styles.center}>
                        <Ionicons
                        name="ios-search"
                        size= {200}
                        color="lightgray"
                        />
                        <Text>Search Movies To See Results</Text>
                    </View>
                }
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
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
});
