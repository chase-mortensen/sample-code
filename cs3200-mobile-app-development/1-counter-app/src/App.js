import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} from 'react-native';

import Counter from './components/Counter';
import CustomButton from './components/CustomButton';

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      counter: 0,
      up: 'Up',
      down: 'Down'
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={{padding: 10}}>
          Chase Mortensen A01535275
        </Text>

        {this.renderCounter()}
        
        {this.renderUp()}

        {this.renderDown()}

      </View>
    );
  }

  renderCounter() {
    return  (
      <Counter counter={this.state.counter}/>
    );
  }

  renderUp() {
    return (
      <CustomButton onPress={()=>this.setState((prevState) =>{return {counter: prevState.counter + 1}})}
      name={this.state.up}/>
    );
  }

  renderDown() {
    return (
      <CustomButton
          onPress={()=>this.setState((prevState) =>{return {counter: prevState.counter - 1}})}
          name={this.state.down}
        />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  button: {
    backgroundColor: 'lightblue',
    borderRadius: 20,
    padding: 10,
    width: 100,
    alignItems: 'center',
    margin: 5
  }
});

// import React, { Component } from 'react';
// import {
//   StyleSheet,
//   Text,
//   TouchableOpacity,
//   View
// } from 'react-native';

// function FormattedDate(props) {
//   return <Text>It is {props.date.toLocaleTimeString()}.</Text>;
// }

// class Counter extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {date: new Date()};
//   }

//   componentDidMount() {
//     this.timerID = setInterval(
//       () => this.tick(),
//       1000
//     );
//   }

//   componentWillUnmount() {
//     clearInterval(this.timerID);
//   }

//   tick() {
//     this.setState({
//       date: new Date()
//     });
//   }

//   render() {
//     return (
//       <View>
//         <Text style={styles.count}>Hello, world!</Text>
//         <FormattedDate date={this.state.date} />
//       </View>
//     );
//   }
// }

// class Button extends Component {
//   render() {
//     return (
//       <TouchableOpacity
//       style={styles.touchableButton}>
//         <Text style={styles.touchableButtonText}>
//         {this.props.text}
//         </Text>
//       </TouchableOpacity>
//     )
//   }
// }


// export default class App extends Component {
//   render() {
//     return (
//       <View style={styles.container}>

//         <Counter />
        
//         <Button text="Up"
//           onPress={() => this.onUpPress()}>            
//         </Button>

//         <Button text="Down"
//           onPress={() => this.onDownPress()}>            
//         </Button>
//       </View>
//     );
//   }

//   onUpPress() {
//     console.log('Pressed Up');
//   }

//   onDownPress() {
//     console.log('Pressed Down');
//   }
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center'
//   },
//   touchableButton: {
//     backgroundColor: 'lightblue',
//     width: 90,
//     padding: 10,
//     margin: 10,
//     borderRadius: 20,
//     alignItems: 'center'
//   },
//   touchableButtonText: {
//     fontSize: 20
//   },
//   count: {
//     fontSize: 40,
//     padding: 20,
//     color: 'blue',
//     justifyContent: 'center',
//     alignItems: 'center'
//   }
// });