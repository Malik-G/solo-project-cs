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
   backgroundGold: {
      background: 'gold'
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


class WatchButton extends Component {
   
   // componentDidMount = () => {
   //    this.props.dispatch({type: 'GET_WATCH_LIST', payload:this.props.userReducer.id})
   // }

   updateWatch = (id) => {
      return (event) => {
         this.props.dispatch({
            type: 'UPDATE_WATCH_LIST',
            payload: {
               watch_list_owner: this.props.owner,
               id_of_card: id,
            }
         })
      }
   }

   removeWatch = (id) => {
      return (event) => {
         this.props.dispatch({
            type: 'REMOVE_WATCH_LIST_ITEM',
            payload: {
               watch_list_owner: this.props.owner,
               watch_list_id: id,
            }
         })
      }
   }
   
   render(){
      const {classes} = this.props
      let watchButton;
      
      // className={`${classes.customBtn} ${classes.backgroundRed}`}
      // className={`${classes.customBtn} ${classes.backgroundGold}`}
      
      if(this.props && this.props.watchListReducer.length > 0){
         for(let card of this.props.watchListReducer){
            if(card.card_id === this.props.cardId){
               return watchButton = <div>
                  <Button onClick={this.removeWatch(card.watch_list_id)} className={`${classes.customBtn} ${classes.backgroundRed}`}>Unwatch</Button>
               </div>
            }
         }
         watchButton = <div>
               <Button onClick={this.updateWatch(this.props.cardId)} className={`${classes.blackFont} ${classes.customBtn} ${classes.backgroundGold}`}>Watch</Button>
            </div>
      }
      else {
         watchButton = <div>
               <Button onClick={this.updateWatch(this.props.cardId)} className={`${classes.blackFont} ${classes.customBtn} ${classes.backgroundGold}`}>Watch</Button>
            </div>
      }
      
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