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
   backgroundRed: {
      background: 'firebrick'
   },
   backgroundBlue: {
      background: 'royalblue'
   },
   blackFont: {
      color: 'black'
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


class MessageButton extends Component {
   
   // componentDidMount = () => {
   //    this.props.dispatch({type: 'GET_WATCH_LIST', payload:this.props.userReducer.id})
   // }

   // cardInfo = (card) => {
   //    return (event) => {
   //       alert(`Sport: ${card.sport}
   //       \nDetails: ${card.details}`);
   //    }
   // }

   messageUser = (id) => {
      return (event) => {
         this.props.dispatch({
            type: 'SEND_MESSAGE',
            payload: {}
         })
      }
   }

   
   render(){
      const {classes} = this.props
      let messageButton;
      
      if(this.props && this.props.communityReducer.length > 0){
         if(this.props.userReducer.id === this.props.member){
            messageButton = <div></div>
         }
         else {
            messageButton = <div>
               <Button onClick={this.messageUser(this.props.member)} color="primary" className={`${classes.customBtn} ${classes.backgroundBlue}`}>Message</Button>
            </div>
         }
      }
      
      return(
         <div>
            {messageButton}
         </div>
      );
   }
}

const mapStateToProps = state => ({
   userReducer: state.userReducer,
   memberUsername: state.portfolioReducer.memberUsernameReducer,
   portfolioReducer: state.portfolioReducer.portfolioReducer,
   watchListReducer: state.watchListReducer,
   communityReducer: state.communityReducer,
});

export default connect(mapStateToProps)(withStyles(styling)(MessageButton));