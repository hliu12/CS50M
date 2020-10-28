import React from 'react'
import {TouchableOpacity, StyleSheet, Text, View} from 'react-native'
import PropTypes from 'prop-types'

const styles = StyleSheet.create({
  movie: {padding: 20},
})

const Movie = props => (
  <TouchableOpacity style={styles.movie} onPress={() => props.onSelectMovie(props)}>
    <Text>{props.Title}</Text>
    <Text>{props.Type} {props.Year}</Text>
  </TouchableOpacity>
)

Row.propTypes = {
  Title: PropTypes.string,
  Year: PropTypes.string,
  Type: PropTypes.string,
}

export default Movie;