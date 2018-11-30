import React, {Component} from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';


const styling = theme => ({
   customBtn: {
      height: 10,
      width: 80,
      fontWeight: 'bold',
      fontSize: 10,
      color: 'white'
   },
   sizeImg: {
      height: 230,
      width: 150
   },
   backgroundBlack: {
      background: 'black'
   },
   backgroundGray: {
      background: 'dimgray'
   },
   backgroundGold: {
      background: 'gold'
   },
   font20: {
      fontSize: 20
   },
   alignCenter: {
      textAlign: 'center'
   },
   marginTop: {
      marginTop: 20
   }

})


class WatchButton extends Component {
   
   // state = {
   //    user: this.props.match.params.id
   // }
   
   componentDidMount () {
      this.props.dispatch({type: 'GET_WATCH_LIST', payload: this.props.userReducer.id})
   }

   // cardInfo = (card) => {
   //    return (event) => {
   //       alert(`Sport: ${card.sport}
   //       \nDetails: ${card.details}`);
   //    }
   // }

   updateWatch = (id) => {
      this.props.dispatch({
         type: 'UPDATE_WATCH_LIST',
         payload: {
            id_of_card: id,
            card_owner: this.state.user
         }
      })
   }
   
   render(){
      
      let watchButton;
      
      // if(this.props.watchListReducer.card_id === this.props.cardId){
         watchButton = <div>
            <Button>Unwatch</Button>
         </div>
      // }
      // else {
      //    watchButton = <div>
      //       <Button>Watch</Button>
      //    </div>
      // }
      
      
      return(
         <div>
            {watchButton}
         </div>
         
      );
   }
}


const mapStateToProps = state => ({
   userReducer: state.userReducer,
   memberUsername: state.portfolioReducer.memberUsernameReducer,
   portfolioReducer: state.portfolioReducer.portfolioReducer,
   watchListReducer: state.watchListReducer
});

// const mapStateToProps = reduxState => ({
//    reduxState
// });

export default connect(mapStateToProps)(withStyles(styling)(WatchButton));