//--------------------------------------------------------------------------------------------
//
//  Detail Pages
//  a. Movie
//      i. All items from list page X
//          1. Poster image X
//          2. Title X
//          3. Popularity X
//          4. Release Date X
//      ii. Genres X
//      iii. Full overview X
//      iv. Budget X
//      v. Revenue X
//      vi. Status X
//      vii. Cast X
//          1. Image X
//          2. Person name X
//          3. Character name X
//  b. Person
//      i. All items from list page
//      ii. Birth date
//      iii. Death date (if applicable)
//      iv. Place of birth
//      v. Biography
//      vi. Credits
//          1. Image
//          2. Title
//          3. Year
//  c. Navigation
//      i. Users should be able to click on any movie, TV show, or person name and
//          navigate to the detail page for that item. The back button should take them to
//          their last viewed page (where they navigated from).
//      ii. From any list page a user can tap a selection and be shown a page that shows all
//          details for the selected item
//
//--------------------------------------------------------------------------------------------

import React, { Component } from 'react';
import {
    FlatList,
    Image,
    TouchableOpacity,
    View
} from 'react-native';

import { Container, Header, Content, Card, CardItem, Thumbnail, Left, Body, Right, Footer, FooterTab, Icon, Button, Text } from 'native-base';

import styles from './../styles';
import movieService from './../services/movie.service';

class DetailScreen extends Component {
    static navigationOptions = {
        title: 'Detail'
    }

    constructor(props) {
        super(props);
        this.state = {
            tab1: false,
            tab2: false,
            context: 0 // 1 MovieDetail, 2 PersonDetail
          };
    }

    /*** Mounting ***/
    componentWillMount() {
        console.log('Detail: componentWillMount');
    }

    componentDidMount() {
        console.log('Detail: componentDidMount');
        this._getContext();
        if (this.state.context === 1){
            this._getDetail();
            this._getGenres();
            this._getCast();
        }
        else {
            this._getPersonDetail();
            this._getPersonCredits();
        }
    }

    render() {
        return (
            <Container>
                <Header />
                {this._renderContent()}
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

    _getContext() {
        const { navigation } = this.props;
        this.state.context = navigation.getParam('context', -1);
    }

    _getDetail() {
        const { navigation } = this.props;
        const movieId = navigation.getParam('movieId', -1);
        console.log("detailScreen: movieID=" + movieId);
        if (movieId !== -1) {
            movieService.getMovieDetails(movieId)
            .then(results => {
                this.setState({
                    data: results
                })
            })
            .catch(error => {
                console.log('Something went wrong! (_getDetail)');
            })
        }
        
    }

    _getGenres() {
        const { navigation } = this.props;
        const movieId = navigation.getParam('movieId', -1);
        if (movieId !== -1) {
            movieService.getGenresOfMovie(movieId)
            .then(results => {
                this.setState({
                    genres: results
                })
            })
            .catch(error => {
                console.log('Something went wrong! (_getGenres)');
            })
        }
    }

    _getCast() {
        const { navigation } = this.props;
        const movieId = navigation.getParam('movieId', -1);
        if (movieId !== -1) {
            movieService.getCastOfMovie(movieId)
            .then(results => {
                this.setState({
                    cast: results
                })
            })
            .catch(error => {
                console.log('Something went wrong! (_getGenres)');
            })
        }
    }

    _getPersonDetail() {
        const { navigation } = this.props;
        const personId = navigation.getParam('personId', -1);
        console.log("detailScreen: personId=" + personId);
        if (personId !== -1) {
            movieService.getPersonDetail(personId)
            .then(results => {
                this.setState({
                    data: results
                })
            })
            .catch(error => {
                console.log('Something went wrong! (_getPersonDetail)');
            })
        }
    }

    _getPersonCredits() {
        const { navigation } = this.props;
        const personId = navigation.getParam('personId', -1);
        console.log("detailScreen: personId=" + personId);
        if (personId !== -1) {
            movieService.getPersonCredits(personId)
            .then(results => {
                this.setState({
                    credits: results
                })
            })
            .catch(error => {
                console.log('Something went wrong! (_getPersonCredits)');
            })
        }
    }

    _renderContent() {
        if (this.state.context === 1) {
            return(
            <Content>
                {this._renderDetail()}
                {this._renderGenres()}
                {this._renderCast()}
            </Content>
            );
        }
        else {
            return(
                <Content>
                    {this._renderPersonDetailContainer()}
                    {this._renderPersonCredits()}
                </Content>
            )
        }
    }
                

    _renderDetail() {
        return (
            <FlatList
                data={this.state.data}
                keyExtractor={(item, index) => item.title}
                renderItem={this._renderItem}
                ListEmptyComponent={this._renderEmptyList}
                extraData={this.state}
                
            />
        );
    }

    _renderGenres() {
        return (
            <Card><CardItem><Body>
                <Text>Genres: </Text>
                <FlatList
                    data={this.state.genres}
                    keyExtractor={(item, index) => item.title}
                    renderItem={this._renderGenre}
                    ListEmptyComponent={this._renderEmptyList}
                    extraData={this.state}
                />
                </Body>
                </CardItem>
            </Card>
        );
    }

    _renderGenre = ({ item }) => {
        return (
            <Text>
                {item.getName()}
            </Text>
        );
    }

    _renderCast() {
        return (
            <Card><CardItem><Body>
            <Text>Cast: </Text>
            </Body>
            </CardItem>
                <FlatList
                    data={this.state.cast}
                    keyExtractor={(item, index) => item.title}
                    renderItem={this._renderPerson}
                    ListEmptyComponent={this._renderEmptyList}
                    extraData={this.state}
                />
            </Card>
        );
    }

    _renderPerson = ({ item }) => {
        return (
            <CardItem>
                <Left>
                <Thumbnail style={{alignSelf: "center"}} large source={{uri: 'https://image.tmdb.org/t/p/w300_and_h450_bestv2' + item.getProfilePath()}} />
                </Left>
                <Body>
                    <Button full info onPress={() => { this.props.navigation.navigate('PersonDetail', { personId: item.getId() }) }}>
                    <Text>
                        {item.getName()}{'\n'}
                    </Text>
                    </Button>
                    <Text>{item.getCharacter()}</Text>
                </Body>
            </CardItem>
        );
    }

    // onPress={() => { this.props.navigation.navigate('Detail', { genreId: item.getId() }) }}
    _renderItem = ({ item }) => {
        return (
                <Card>
                    <CardItem>
                    <Left>
                        <Body>
                        <Button full large info>
                        <Text>
                            {item.getTitle()}
                        </Text>
                        </Button>
                        </Body>
                    </Left>
                    </CardItem>
                    <CardItem cardBody>
                    <Image source={{uri: 'https://image.tmdb.org/t/p/w300_and_h450_bestv2' + item.getPosterPath()}} style={{height: 450, width: 300, flex: 1}}/>
                    </CardItem>
                    <CardItem>
                        <Text>{item.getOverview()}</Text>
                    </CardItem>
                    
                    <CardItem>
                    <Left>
                        <Text>Popularity: {item.getPopularity()}{'\n'}
                            Status: {item.getStatus()}{'\n'}
                            Release Date: {item.getReleaseDate()}</Text>
                    </Left>
                    <Right>
                        <Text>Budget: ${item.getBudget()}</Text>
                        <Text>Revenue: ${item.getRevenue()}</Text>
                    </Right>
                    </CardItem>
                </Card>
            
        );
    }

    _renderPersonDetailContainer() {
        console.log("inside _renderPersonDetailContainer");
        return (
            <Card>
            <FlatList
                data={this.state.data}
                keyExtractor={(item, index) => item.title}
                renderItem={this._renderPersonDetail}
                ListEmptyComponent={this._renderEmptyList}
                extraData={this.state}
            />
            </Card>
        );
    }

//      i. All items from list page
//          i. Name X
//          ii. Popularity X
//          iii. Image X
//      ii. Birth date
//      iii. Death date (if applicable)
//      iv. Place of birth
//      v. Biography

    _renderPersonDetail = ({ item }) =>  {
        console.log("inside _renderPersonDetail... item.getName() = " + item.getName());
        return (
            <CardItem>
                <Body>
                <Thumbnail style={{alignSelf: "center"}} large source={{uri: 'https://image.tmdb.org/t/p/w300_and_h450_bestv2' + item.getProfilePath()}} />
                    <Text>{item.getName()}{'\n'}
                    Life: {item.getBirthday()} - {item.getDeathday()}{'\n'}
                    Born: {item.getPlaceOfBirth()}{'\n'}</Text>               
                <Text>
                    {item.getName()}{'\n'}Popularity: {item.getPopularity()}{'\n'}
                    {item.getBiography()}
                </Text>
                </Body>
            </CardItem>
        );
    }

//      vi. Credits
//          1. Image
//          2. Title
//          3. Year
    _renderPersonCredits() {
        return (
            <Card>
            <FlatList
                data={this.state.credits}
                keyExtractor={(item, index) => item.title}
                renderItem={this._renderCredit}
                ListEmptyComponent={this._renderEmptyList}
                extraData={this.state}
            />
            </Card>
        );
    }

    _renderCredit = ({ item }) => { // TODO
        return (
                <CardItem>
                    <Right>
                    <Thumbnail style={{alignSelf: "center"}} large square source={{uri: 'https://image.tmdb.org/t/p/w300_and_h450_bestv2' + item.getPosterPath()}} />
                    </Right>
                <Left>
                    <Text>
                    {item.getTitle()}{'\n'}
                    {item.getReleaseDate()}
                    {/* {item.getReleaseDate().split('-', 1)[0]} */}
                    </Text>
                </Left>
                </CardItem>
        );
    }

    _renderEmptyList = () => {
        return (
            <Text style={styles.item}>Loading...</Text>
        );
    }

    /*** UPDATING ***/
    componentWillReceiveProps(nextProps) {
        console.log('Detail: componentWillReceiveProps (nextProp.custom: ' + nextProps.navigation.getParam('custom') + ')');
    }

    shouldComponentUpdate(nextProps, nextState) {
        console.log('Detail: shouldComponentUpdate');
        return true;
    }

    componentWillUpdate(nextProps, nextState) {
        console.log('Detail: componentWillUpdate');
    }

    //render() is the next step, but is defined already

    componentDidUpdate(prevProps, prevState) {
        console.log('Detail: componentDidUpdate');
    }

    /*** UNMOUNTING ***/
    componentWillUnmount() {
        console.log('Detail: componentWillUnmount');
    }
}

export default DetailScreen;