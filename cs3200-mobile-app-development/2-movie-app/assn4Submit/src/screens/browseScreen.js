//--------------------------------------------------------------------------------------------
//
//  Browse Page
//  a. Lists genres
//  b. When a user taps a genre, it changes to a screen showing a list of movies within that
//      genre.
//  c. On the list page, there should be a button that allows a user to go back to the genre
//      selection page.
//
//--------------------------------------------------------------------------------------------

import React, { Component } from 'react';
import {
    FlatList,
    TouchableOpacity,
    View
} from 'react-native';

import { Container, Header, Content, Card, CardItem, Body, Footer, FooterTab, Button, Text } from 'native-base';

import styles from './../styles';
import movieService from './../services/movie.service';

class BrowseScreen extends Component {
    static navigationOptions = {
        title: 'Browse'
    }

    constructor(props) {
        super(props);
        this.state = {
            tab1: true,
            tab2: false
          };
    }

    /*** Mounting ***/
    componentWillMount() {
        console.log('Browse: componentWillMount');
    }

    componentDidMount() {
        console.log('Browse: componentDidMount');
        this._getGenres();
    }

    render() {
        return (
            <Container>
                <Header />
                    {this._renderGenres()}
                <Footer>
                   <FooterTab>
                     <Button active={this.state.tab1} onPress={() => { this.props.navigation.navigate('Browse') }}>
                       <Text>Browse</Text>
                     </Button>
                     <Button active={this.state.tab2} onPress={() => { this.props.navigation.navigate('Search') }}>
                       <Text>Search</Text>
                     </Button>
                   </FooterTab>
                </Footer>
            </Container>
        );
    }

    _getGenres() {
        movieService.getGenres()
        .then(results => {
            this.setState({ data: results });
        })
        .catch(error => {
            console.log('Something went wrong!');
        })
    }

    _renderGenres() {
        return (
            <Content>
            <FlatList
                data={this.state.data}
                keyExtractor={(item, index) => item.title}
                renderItem={this._renderItem}
                ListEmptyComponent={this._renderEmptyList}
            />
            
            </Content>
        );
    }

    _renderItem = ({ item }) => {
        return (            
            <Button block large info style={{marginBottom: 20}} onPress={() => { this.props.navigation.navigate('List', { genreId: item.getId() }) }}>
            <Text>
                {item.getName()}
            </Text>
            </Button>
        );
    }

    _renderEmptyList = () => {
        return (
            <Text style={styles.item}>Loading...</Text>
        );
    }
    

    /*** UPDATING ***/
    componentWillReceiveProps(nextProps) {
        console.log('Browse: componentWillReceiveProps (nextProp.custom: ' + nextProps.navigation.getParam('custom') + ')');
    }

    shouldComponentUpdate(nextProps, nextState) {
        console.log('Browse: shouldComponentUpdate');
        return true;
    }

    componentWillUpdate(nextProps, nextState) {
        console.log('Browse: componentWillUpdate');
    }

    //render() is the next step, but is defined already

    componentDidUpdate(prevProps, prevState) {
        console.log('Browse: componentDidUpdate');
    }

    /*** UNMOUNTING ***/
    componentWillUnmount() {
        console.log('Browse: componentWillUnmount');
    }
}

export default BrowseScreen;