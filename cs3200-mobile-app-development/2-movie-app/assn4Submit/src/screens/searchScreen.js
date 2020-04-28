//--------------------------------------------------------------------------------------------
//
//  Search Page
//  a. Allow a user to select a search for
//      i. Movies
//      ii. People
//  b. After the search returns, change to a screen showing a listing of the search results.
//  c. There should be a button that allows a user to go back to the genre selection page.
//
//--------------------------------------------------------------------------------------------

import React, { Component } from 'react';
import {
  TouchableOpacity,
  View
} from 'react-native';

import styles from './../styles';

import { Container, Header, Content, Footer, FooterTab, Body, Left, Right, Icon, Input, Item, Button, Text } from 'native-base';


class SearchScreen extends Component {
    static navigationOptions = {
        title: 'Search'
    }

    constructor(props) {
        super(props);
        this.state = {
            tab1: false,
            tab2: true,
            text: ""
          };
    }

    /*** Mounting ***/
    componentWillMount() {
        console.log('Detail: componentWillMount');
    }

    render() {
        return (
            <Container>
                <Header searchBar rounded>
                <Item>
                    <Icon name="ios-search" />
                    <Input onChangeText={(text) => this.setState({text})} id="SearchBar" placeholder="Search" />
                </Item>
                
                </Header>
                <Content>
                <Text></Text>
                <Button info large block onPress={() => { this.props.navigation.navigate('MovieResult', {searchString: encodeURI(this.state.text), searchMovies: true}) }}>
                    <Text>Search Movies</Text>
                </Button>
                <Text></Text>
                <Button info large block onPress={() => { this.props.navigation.navigate('PersonResult', {searchString: encodeURI(this.state.text)}) }}>
                    <Text>Search People</Text>
                </Button>
                </Content>
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

    componentDidMount() {
        console.log('Search: componentDidMount');
    }

    /*** UPDATING ***/
    componentWillReceiveProps(nextProps) {
        console.log('Search: componentWillReceiveProps (nextProp.custom: ' + nextProps.navigation.getParam('custom') + ')');
    }

    shouldComponentUpdate(nextProps, nextState) {
        console.log('Search: shouldComponentUpdate');
        return true;
    }

    componentWillUpdate(nextProps, nextState) {
        console.log('Search: componentWillUpdate');
    }

    //render() is the next step, but is defined already

    componentDidUpdate(prevProps, prevState) {
        console.log('Search: componentDidUpdate');
    }

    /*** UNMOUNTING ***/
    componentWillUnmount() {
        console.log('Search: componentWillUnmount');
    }
}

export default SearchScreen;