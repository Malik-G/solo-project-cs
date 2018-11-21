import React, {Component} from 'react';
import { connect } from 'react-redux';


class UserPortfolio extends Component {
   
   componentDidMount(){
      console.log(this.props.userReducer.id);
      //this.props.dispatch({type: "GET_USER_PORTFOLIO", payload: this.props.userReducer.id}); //inside of portfolioSaga
   }

   addCard = () => {

   }
   
   render(){
      return(
         <div>
            <button onClick={this.addCard}>Add Card</button>
            <p>Your Portfolio</p>
         </div>
      );
   }
}

const mapStateToProps = state => ({
   userReducer: state.userReducer,
   portfolioReducer: state.portfolioReducer
 });

export default connect(mapStateToProps)(UserPortfolio);
