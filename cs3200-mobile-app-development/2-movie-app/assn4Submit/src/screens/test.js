/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
    Platform,
    Text,
    View,
    FlatList
} from 'react-native';

import movieService from '../services/movie.service';
import styles from '../styles';

export default class Test extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: []
        }
    }

    componentDidMount() {
        this._getMovies();
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>
                    The Incredible Movie List 2
                </Text>
                {this._renderMovies()}
            </View>
        );
    }

    _getMovies() {
        movieService.getMovies()
        .then(results => {
            this.setState({ data: results });
        })
        .catch(error => {
            console.log('Something went wrong!');
        })
    }

    _renderMovies() {
        return (
            <FlatList
                data={this.state.data}
                keyExtractor={(item, index) => item.title}
                renderItem={this._renderItem}
                ListEmptyComponent={this._renderEmptyList}
            />
        );
    }

    _renderItem = ({ item }) => {
        return (
            <Text style={styles.item}>
                {item.getTitle()} {item.getYearReleased()}
            </Text>
        );
    }

    _renderEmptyList = () => {
        return (
            <Text>...Just a few more seconds</Text>
        );
    }
}

