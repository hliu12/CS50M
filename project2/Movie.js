import React from 'react'
import {TouchableOpacity, StyleSheet, Text, View, Image} from 'react-native'
import PropTypes from 'prop-types'

const Movie = props => (
  <TouchableOpacity style={styles.movie} onPress={() => props.onSelectMovie(props)}>
    <View style={styles.movieRow}>
      <View style={styles.movieText}>
        <Text style={styles.title}>{props.Title}</Text>
        <Text style={styles.secondary}>{capitalize(props.Type)} ({props.Year})</Text>
      </View>
      <Image 
      style={styles.poster}
      source={{uri: `${props.Poster}`}}
      />
    </View>

  </TouchableOpacity>
)

export const capitalize = (str) => {
  if (typeof(str) === 'string') {
    return str.charAt(0).toUpperCase() + str.substring(1);
  }
  else return '';
};

Movie.propTypes = {
  Title: PropTypes.string,
  Year: PropTypes.string,
  Type: PropTypes.string,
}

const styles = StyleSheet.create({
  movie: {
    padding: 20,
    borderBottomWidth: 2,
    borderColor: 'skyblue',
  }, 
  movieRow: {
    flexDirection: 'row',
  }, 
  movieText: {
    width: 270,
  },
  title: {
    fontFamily: 'Helvetica',
    fontWeight: 'bold',
    fontSize: 20,
    marginBottom: 20,
    marginTop: 15,
  }, 
  secondary: {
    fontSize: 16,
  },
  poster: {
    marginLeft: 'auto',
    height: 125,
    width: 85,
  },
})

export default Movie;
