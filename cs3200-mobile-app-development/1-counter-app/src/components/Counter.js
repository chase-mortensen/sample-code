import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} from 'react-native';

export default class Counter extends Component {

    //** MOUNTING **/
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        console.log('Orange: componentWillMount');
    }

    render() {
        console.log('Orange: render');

        return (
            
            <View style={{justifyContent: 'space-around', backgroundColor: 'orange', width: 200, height: 200}}>
                <Text style={{alignSelf: 'center', color: 'white', fontSize: 30}}>
                    {this.props.counter}
                </Text>
            </View>
        
        );
    }

    componentDidMount() {
        console.log('Orange: componentDidMount');
    }

    /** UPDATING **/
    componentWillReceiveProps(nextProps) {
        console.log('Orange: componentWillReceiveProps (nextProp.counter: ' + nextProps.counter + ')');
    }

    shouldComponentUpdate(nextProps, nextState) {
        console.log('Orange: shouldComponentUpdate');
        return true;
    }

    componentWillUpdate(nextProps, nextState) {
        console.log('Orange: componentWillUpdate');
    }

    //render() is the next step, but is defined already

    componentDidUpdate(prevProps, prevState) {
        console.log('Orange: componentDidUpdate');
    }

    /** UNMOUNTING **/
    componentWillUnmount() {
        console.log('Orange: componentWillUnmount');
    }
}