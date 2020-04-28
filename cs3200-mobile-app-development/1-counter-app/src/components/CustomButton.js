import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} from 'react-native';

export default class CustomButton extends Component {

    //** MOUNTING **/
    constructor(props) {
        super(props);
    }

    render() {
        console.log('Button: render');

        //onPress={()=>this.setState((prevState) =>{return {counter: prevState.counter + 1}})}
        return (
            <TouchableOpacity style={this.props.name === 'Up' ? {padding: 10} : null} onPress={this.props.onPress}>
                <View style={{justifyContent: 'space-around', backgroundColor: 'black', width: 200, height: 100}}>
                    <Text style={{alignSelf: 'center', color: 'white', fontSize: 50}}>
                        {this.props.name}
                    </Text>
                </View>
            </TouchableOpacity>
        );
    }

    shouldComponentUpdate(nextProps, nextState) {
        return true;
    }
}