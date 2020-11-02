// MovieDetailsScreen - Contains information about a specific movie
import React from 'react';
import { StyleSheet, Text, View, Button, Image } from 'react-native';
import { fetchById } from '../api';
import {capitalize} from '../Movie'

export default class MovieDetailsScreen extends React.Component { 
    state = {
        movie: {},
    }

    // Without awaiting the result, a fulfilled promise is returned
    // instead of the movie object. WHYY??
    findMovie = async () => {
        const movie = this.props.route.params;
        const result = await fetchById(movie.imdbID);
        this.setState({movie: result});
    }

    componentDidMount() {
        this.findMovie();
    }

    // Testing fuction
    listState = () => {
        console.log(this.state.movie);
    }

    render() { 
        const movie = this.state.movie;
        return (
            <View style={styles.container}>
                <Text style={styles.title}>{movie.Title} ({movie.Year})</Text>
                <Image
                style={styles.poster}
                source={{uri: `${movie.Poster}`}}
                />
                <Text>
                    {capitalize(movie.Type)} | {movie.Genre} | {movie.Rated}
                </Text>

                <Text>{movie.Plot}</Text>
                <Text>{`
                    Director: ${movie.Director} 
                    Starring: ${movie.Actors}
                    Region: ${movie.Country}
                    Language: ${movie.Language}
                    Runtime: ${movie.Runtime}
                `}</Text>
            </View>
          );
    }
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center', 
    }, title: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 30,
    },
    poster: {
        width: 200,
        height: 300,
    }

});

