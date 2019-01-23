import React, {Component} from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TradeIcon from '@material-ui/icons/AttachMoney';
import TradeIconOff from '@material-ui/icons/MoneyOff';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import swal from 'sweetalert';

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
   backgroundGray: {
      background: 'dimgray'
   },
   backgroundRed: {
      background: 'firebrick'
   },
   backgroundOrange: {
      background: 'orange'
   },
   backgroundGreen: {
      background: 'forestgreen'
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
   },
   floatLeft: {
      float: 'left'
   },
   tradeBlockBtn: {
      width: 40,
      height: 35,
      color: 'black'
   }

})


class TradeBlockButton extends Component {
   
   state = {
      user: this.props.userReducer.id,
      cardId: this.props.card.card_id,
      tbBoolean: this.props.card.trade_block,
      price: this.props.card.price,
      open: false,
   }

   updateTradeBlock = () => {
      if(this.props.card.trade_block === false){
         this.setState({open: true})
      }
      else {
         swal({
            title: "Remove from Trade Block?",
            icon: "warning",
            buttons: true,
            
          })
         .then((willDelete) => {
            if (willDelete) {
               swal("Card Successfully Removed From Trade Block", {
                  icon: "success",
               });
               console.log(this.state.tbBoolean)
               this.props.dispatch({type: 'UPDATE_TRADE_BLOCK', payload: this.state})
               this.setState({tbBoolean: false})
            }
            else {
               swal("This card will remain on your trade block...");
            }
          });
      }
   }
   
   confirmUpdate = () => {
      console.log(this.state.tbBoolean)
      this.props.dispatch({
         type: 'UPDATE_TRADE_BLOCK',
         payload: this.state
      })
      this.setState({open: false, tbBoolean: true});
   }
   
   handleCloseClick = () => {
      this.setState({open: false});
   };

   
   handleChange = (event) => {
      this.setState({
         [event.target.name]: event.target.value,
      });
   }
   
   // removeFromBlock = (id) => {
   //    return (event) => {
         
   //    }
   // }
   
   render(){
      const {classes} = this.props
      let tradeBlockBtn;
      
      // className={`${classes.customBtn} ${classes.backgroundRed}`}
      // className={`${classes.customBtn} ${classes.backgroundGold}`}
      
      if(this.props && this.props.portfolioReducer.length > 0){
         if(this.props.card.trade_block === false){
            tradeBlockBtn = <div>
               <div className={classes.alignCenter}>
                  <Button onClick={this.updateTradeBlock} style={{minWidth:20}} className={`${classes.tradeBlockBtn} ${classes.floatLeft} ${classes.backgroundGreen}`}>
                     <TradeIcon className={classes.marginRight}/>
                  </Button>
               </div>
               <Dialog
                  open={this.state.open}
                  onClose={this.handleCloseClick}
                  aria-labelledby="dialog-title"
               >
                  <DialogTitle id="dialog-title">Add Card to Trade Block</DialogTitle>
                  <DialogContent>
                     <DialogContentText>Choose your price!</DialogContentText>
                     <form className={`${classes.styleForm} `}>
                        <FormGroup>
                           <FormControl >
                           <TextField
                                 id="outlined-price"
                                 label="Price"
                                 name="price"
                                 value={this.state.price}
                                 onChange={this.handleChange}
                                 margin="normal"
                                 variant="outlined"
                                 required
                              />
                           </FormControl>
                        </FormGroup>
                     </form>
                  </DialogContent>
                  <DialogActions>
                     <Button onClick={this.confirmUpdate} variant="contained"  className={`${classes.customBtn} ${classes.backgroundGreen}`}>Confirm</Button>
                     <Button onClick={this.handleCloseClick} className={`${classes.customBtn} ${classes.backgroundGray}`} >Cancel</Button>
                  </DialogActions>
               </Dialog>
            </div>
            }
            else {
               tradeBlockBtn = <div>
                  <Button onClick={this.updateTradeBlock} style={{minWidth:20, minHeight:20}} className={`${classes.tradeBlockBtn} ${classes.floatLeft} ${classes.backgroundOrange}`}>
                     <TradeIconOff/>
                  </Button>
               </div>
            }
      }
      else {
         tradeBlockBtn = <div></div>
      }
      
      return(
         <div>
            {tradeBlockBtn}
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

export default connect(mapStateToProps)(withStyles(styling)(TradeBlockButton));