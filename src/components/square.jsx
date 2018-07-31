import React from 'react';
import ReactDOM from 'react-dom';

// class Square extends React.Component {
//     render() {
//       return (
//         <button className="square" 
//         onClick={() => this.props.onClick()}>
//           {this.props.value}
//         </button>
//       );
//     }
// }

function Square(props) {
    return (
        <button className={`${props.class || ''} square`}
        onClick={props.onClick}>
          {props.value}
        </button>
    );
}

export default Square;