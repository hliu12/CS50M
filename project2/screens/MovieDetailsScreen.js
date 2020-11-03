import React from 'react';
import { StyleSheet, Text, View, Button, Image, ScrollView } from 'react-native';
import { fetchById } from '../api';
import {capitalize} from '../Movie'

export default class MovieDetailsScreen extends React.Component { 
    // It is important to use {} rather than null or undefined
    // since empty object doesn't error in the first render cycle
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

    // Waits for component to mount before fetching movie details
    componentDidMount() {
        this.findMovie();
    }

    // Displays ratings with icons and rating info
    // Rating backgrounds and color are always green because
    // I'm too lazy to actually make them reflect the score
    displayRatings = (rating) => {
        let desc = rating.Source;
        let num = rating.Value;
        let imgURL;
        if (rating.Source == "Internet Movie Database") {
            desc = "IMDB";
            num = num.substring(0, num.length - 3);
            imgURL = "https://m.media-amazon.com/images/G/01/IMDb/BG_icon_iOS._SX350_CR0,0,350,262_AL_.png";
        } else if (rating.Source == "Rotten Tomatoes") {
            desc = "RT";
            num = num.substring(0, num.length - 1);
            imgURL = "https://i.pinimg.com/originals/89/25/3c/89253c3ae2f359af8722f39551c58329.png";
        } else {
            desc = "MC"
            num = num.substring(0, num.length - 4);
            imgURL = "https://upload.wikimedia.org/wikipedia/commons/thumb/2/20/Metacritic.svg/768px-Metacritic.svg.png";
        }
        return(
            // It is important for children of a .map function to have 
            // a key apparently
            <View key={rating.Source} style={styles.ratingBlock}>
                <View style={styles.ratingView}>
                    <Text style={styles.ratingText}>{num}</Text>
                </View>
                <Image
                style={styles.ratingLogo}
                source={{uri: `${imgURL}`}}
                />
                <Text style={{textAlign: 'center'}}>{desc}</Text>
            </View>
        ) 
    }

    // Testing fuction
    listState = () => {
        console.log(this.state.movie);
    }

    render() { 
        const movie = this.state.movie;
        return (
            <ScrollView style={styles.container}>
                <View style={styles.top}>
                    <Text style={styles.title}>{movie.Title} ({movie.Year})</Text>
                    <Image
                    style={styles.poster}
                    source={{uri: `${movie.Poster}`}}
                    />
                    <Text style={styles.movieCaption}>
                        {capitalize(movie.Type)} | {movie.Genre} | {movie.Rated}
                    </Text>
                </View>

                <View style={styles.plot}>
                    <Text >{movie.Plot}</Text>
                </View>

                <View style={styles.bottomSection}>
                    <Text style={styles.movieInfo}>
                        <Text style={{fontWeight: "bold"}}>Director:</Text> {movie.Director} {"\n"}
                        <Text style={{fontWeight: "bold"}}>Starring:</Text> {movie.Actors} {"\n"}
                        <Text style={{fontWeight: "bold"}}>Region:</Text> {movie.Country} {"\n"}
                        <Text style={{fontWeight: "bold"}}>Language:</Text> {movie.Language} {"\n"}
                        <Text style={{fontWeight: "bold"}}>Runtime:</Text> {movie.Runtime} {"\n"}
                    </Text>
                    <View style={styles.ratingFlex}>
                            {movie.Ratings ? movie.Ratings.map(this.displayRatings) : null}
                    </View>
                </View>

            </ScrollView>
          );
    }
}

const styles = StyleSheet.create({
    title: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 30,
        marginBottom: 10,
    },
    top: {
        backgroundColor: 'lightgray',
        alignSelf: 'stretch',
        borderBottomWidth: 2,
        borderBottomColor: 'grey',
        alignItems: 'center',
    },
    poster: {
        width: 300,
        height: 450,
    }, 
    movieCaption: {
        marginTop: 10,
        marginBottom: 10,
        fontWeight: 'bold',
        fontSize: 15,
        textAlign: 'center',
    },
    plot: {
        margin: 10,
        borderBottomColor: 'lightgray',
        borderBottomWidth: 1,
        paddingBottom: 10,
    },
    bottomSection: {
        flex: 1,
        flexDirection: 'row',
    },
    movieInfo: {
        flex: 1,
        textAlign: 'left',
        margin: 10,
    }, 
    ratingBlock: {
        flex: 1,
        alignItems: 'center',
    },
    ratingView: {
        backgroundColor: 'lightgreen',
        alignItems: 'center',
        justifyContent: 'center',
        height: 40,
        width: 40,
        borderWidth: 1,
        borderColor: 'lightgreen',
        borderRadius: 50,
        marginBottom: 10,
    },
    ratingText: {
        color: 'green',
        fontSize: 18,
        fontWeight: 'bold',
    },
    ratingLogo: {
        height: 35,
        width: 35,
        marginBottom: 5,
    },
    ratingFlex: {
        flex: 1,
        flexDirection: 'row',
        margin: 10,
    }

});

