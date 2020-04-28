import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import { createAppContainer, createStackNavigator } from 'react-navigation';

import BrowseScreen from './screens/browseScreen';
import DetailScreen from './screens/detailScreen';
import ListScreen from './screens/listScreen';
import SearchScreen from './screens/searchScreen';

export default class App extends Component {
    render() {
        return (
            <AppContainer />
        );
    }
}

const Root = createStackNavigator(
    {
        Browse: BrowseScreen,
        Detail: DetailScreen, 
        List: ListScreen,
        Search: SearchScreen,
        MovieResult: ListScreen,
        PersonResult: ListScreen,
        MovieDetail: DetailScreen,
        PersonDetail: DetailScreen
    },
    {
        initialRouteName: 'Browse',
        // headerMode: 'none'
    }
);

const AppContainer = createAppContainer(Root);