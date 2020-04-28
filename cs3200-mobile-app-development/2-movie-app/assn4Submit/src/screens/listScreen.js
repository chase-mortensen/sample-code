//--------------------------------------------------------------------------------------------
//
//  List Pages
//  a. Pages should scroll infinitely by retrieving more data when scrolling is near the bottom of
//      the list
//  b. The list pages (search results) should show a summary of each item
//  c. Movie
//      i. Poster image X
//      ii. Title X
//      iii. Popularity X
//      iv. Release Date X
//      v. Overview (Not the entire thing, just the first bit) X
//  d. People
//      i. Name
//      ii. Popularity
//      iii. Image
//
//--------------------------------------------------------------------------------------------

// TODO: Load more than one page...
// also the rest of the assignment

import React, { Component } from 'react';
import {
    FlatList,
} from 'react-native';

import { Container, Header, Content, Card, CardItem, Body, Left, Right, Thumbnail, Footer, FooterTab, Button, Text } from 'native-base';

import styles from './../styles';
import movieService from './../services/movie.service';


class ListScreen extends Component {
    static navigationOptions = {
        title: 'List'
    }

    constructor(props) {
        super(props);
        this.state = {
            tab1: false,
            tab2: false,
            page: 1,
            context: 0 // 1 getSpecificGenre, 2 searchMovies, 3 searchPeople
          };
    }

    /*** Mounting ***/
    componentWillMount() {
        console.log('List: componentWillMount');
    }

    componentDidMount() {
        console.log('List: componentDidMount');
        this._getList();
    }

    render() {
        return (
            <Container>
                <Header />
                    {this._renderList()}
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

    _getList() {
        const { navigation } = this.props;
        const genreId = navigation.getParam('genreId', -1);
        const searchString = navigation.getParam('searchString', "");
        const searchMovies = navigation.getParam('searchMovies', false);

        if (genreId !== -1) {
            this.state.context = 1; // 1 getSpecificGenre, 2 searchMovies, 3 searchPeople
            movieService.getSpecificGenre(this.state.page, genreId)
            .then(results => {
                this.setState(prevState =>{ return {
                    data: results,
                    page: prevState.page + 1
                }}, () => console.log("data: " + this.state.data));
            })
            .catch(error => {
                console.log('Something went wrong #1');
            })
        }
        else if (searchString !== ""){
            console.log("searchString: " + searchString);
            if (searchMovies) {
                this.state.context = 2;
                movieService.searchMovie(searchString)
                .then(results => {
                this.setState(prevState =>{ return {
                    data: results
                    }}, () => console.log("data: " + this.state.data));
                })
                .catch(error => {
                    console.log('Something went wrong #2');
                })
            }
            else {
                this.state.context = 3;
                movieService.searchPeople(searchString)
                .then(results => {
                this.setState(prevState =>{ return {
                    data: results
                    }}, () => console.log("data: " + this.state.data));
                })
                .catch(error => {
                    console.log('Something went wrong #2');
                })
            }
        }
        
    }

    _renderList() {
        return (
            <Content>
            <FlatList
                data={this.state.data}
                keyExtractor={(item, index) => item.title}
                renderItem={this._renderItem}
                ListEmptyComponent={this._renderEmptyList}
                extraData={this.state}
                // onEndReachedThreshold={1}
                // onEndReached={this._getList()}
            />
            </Content>
        );  
    }

    _renderItem = ({ item }) => {
        if (this.state.context === 1) { // 1 getSpecificGenre, 2 searchMovies, 3 searchPeople
        return (
            <Card>
                <CardItem><Body>
                <Button full large info onPress={() => { this.props.navigation.navigate('Detail', { movieId: item.getId(), context: 1 }) }}>
                <Text>
                    {item.getTitle()}
                </Text>
                </Button>
                </Body></CardItem>
                <CardItem>                                              
                <Left>
                <Thumbnail style={{alignSelf: "center"}} square large source={{uri: 'https://image.tmdb.org/t/p/w300_and_h450_bestv2' + item.getPosterPath()}} />
                </Left>
                <Right>  
                <Text>
                    Released: {item.getReleaseDate()}
                </Text>   
                <Text>  
                    Popularity: {item.getPopularity()}
                </Text>
                </Right>
                </CardItem>
                <CardItem>
                <Body>
                    <Text>
                        {item.getOverview().split('.', 1)[0]}{'.'}
                    </Text>
                 </Body>
                </CardItem>
            </Card> 
        );
    }
    if (this.state.context === 2) { // 1 getSpecificGenre, 2 searchMovies, 3 searchPeople
        return (
            <Card>
                <CardItem><Body>
                <Button full large info onPress={() => { this.props.navigation.navigate('MovieDetail', { movieId: item.getId(), context: 1 }) }}>
                <Text>
                    {item.getTitle()}
                </Text>
                </Button>
                </Body></CardItem>
                <CardItem>                                              
                <Left>
                <Thumbnail style={{alignSelf: "center"}} square large source={{uri: 'https://image.tmdb.org/t/p/w300_and_h450_bestv2' + item.getPosterPath()}} />
                </Left>
                <Right>  
                <Text>
                    Released: {item.getReleaseDate()}
                </Text>   
                <Text>  
                    Popularity: {item.getPopularity()}
                </Text>
                </Right>
                </CardItem>
                <CardItem>
                <Body>
                    <Text>
                        {item.getOverview().split('.', 1)[0]}{'.'}
                    </Text>
                 </Body>
                </CardItem>
            </Card> 
        );
    }
    else if (this.state.context === 3) {
        return (
            <Card>
                <CardItem>
                <Left>
                <Thumbnail style={{alignSelf: "center"}} large source={{uri: 'https://image.tmdb.org/t/p/w300_and_h450_bestv2' + item.getProfilePath()}} />
                </Left>
                <Body>
                    <Button info small full onPress={() => { this.props.navigation.navigate('PersonDetail', { personId: item.getId() }) }}>
                        <Text>
                            {item.getName()}
                        </Text>
                    </Button>
                    <Text>Popularity: {item.getPopularity()}</Text>
                </Body>
            </CardItem>
            </Card> 
        );
    }
    
}

    _renderEmptyList = () => {
        return (
            <Text style={styles.item}>Loading...</Text>
        );
    }

    /*** UPDATING ***/
    componentWillReceiveProps(nextProps) {
        console.log('List: componentWillReceiveProps (nextProp.custom: ' + nextProps.navigation.getParam('custom') + ')');
    }

    shouldComponentUpdate(nextProps, nextState) {
        console.log('List: shouldComponentUpdate');
        return true;
    }

    componentWillUpdate(nextProps, nextState) {
        console.log('List: componentWillUpdate');
    }

    //render() is the next step, but is defined already

    componentDidUpdate(prevProps, prevState) {
        console.log('List: componentDidUpdate');
    }

    /*** UNMOUNTING ***/
    componentWillUnmount() {
        console.log('List: componentWillUnmount');
    }
}

export default ListScreen;