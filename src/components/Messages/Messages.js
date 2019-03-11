import React, {Component} from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/AddToQueue';
import DraftIcon from '@material-ui/icons/LibraryBooks';
import NewMessageIcon from '@material-ui/icons/Assignment';
import InboxIcon from '@material-ui/icons/Email';
import Button from '@material-ui/core/Button';
import swal from 'sweetalert';
import Nav from '../Nav/Nav';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane as fasPaperPlane} from '@fortawesome/free-solid-svg-icons'
import { faPaperPlane as farPaperPlane} from '@fortawesome/free-regular-svg-icons'

const styling = theme => ({
   sizeImg: {
      height: 280,
      width: 200
   },
   customBtn: {
      fontWeight: 'bold',
      fontSize: 10,
      color: 'white',
      height: 10,
      width: 80
   },
   customRadio: {

   },
   backgroundGray: {
      background: 'dimgray'
   },
   backgroundRed: {
      background: 'firebrick'
   },
   font20: {
      fontSize: 20
   },
   alignCenter: {
      textAlign: 'center'
   },
   margin: {
      margin: '50px auto',
      width: '80%',
      height: 450
   },
   marginTop: {
      marginTop: 50
   },
   inlineBlock: {
      display: 'inline-block'
   },
   styleForm: {
      width: 500,
      background: `gainsboro`
   },
   floatLeft: {
      float: 'left'
   },
   floatRight: {
      float: 'right'
   },
   tradeBlockBtn: {
      width: 40,
      background: 'orange',
      color: 'black'
   },
   largeIcon: {
      width: 150,
      height: 150,
      margin: '25% auto'
      //marginTop: '50%',
      //marginBottom: '50%'
      //position: 'absolute'
   },
   medIcon: {
      width: 100,
      height: 100,
      position: 'absolute',
      margin: 'auto'
      
   },
   iconDiv: {
      width: 300,
      height: 300,
      margin: 3,
      
   },
   borderBlack: {
      border: '2px solid black',
   },
   height150: {
      height: 148
   }
})


class UserPortfolio extends Component {
   
   componentDidMount(){
      this.props.dispatch({type: "GET_USER_PORTFOLIO", payload: this.props.userReducer.id}); //inside of portfolioSaga
   }

   newMessage = () => {

   }

   editDraft = () => {

   }
   
   render(){
      
      console.log(this.props.portfolioReducer);
      const {classes} = this.props
      
      // Conditional rendering to display each card
      let portfolioArray = this.props && this.props.portfolioReducer.length > 0 ?
        <span></span> : <span></span>;
      
      return(
         <section>
            <Nav/>
               <div className={`${classes.margin} ${classes.alignCenter}`}>
                  <div className={`${classes.inlineBlock} ${classes.iconDiv} ${classes.borderBlack} ${classes.floatLeft}`}>
                     <InboxIcon fontSize="large" className={classes.largeIcon}/>
                     {/* <FontAwesomeIcon icon={fasPaperPlane}/> */}
                  </div>
                  <div className={`${classes.inlineBlock} ${classes.iconDiv} ${classes.borderBlack} ${classes.floatLeft}`}>
                     <FontAwesomeIcon icon={farPaperPlane} size="10x" className={classes.largeIcon}/>
                  </div>
                  <div className={`${classes.inlineBlock} ${classes.iconDiv} ${classes.floatLeft}`}>
                     <div onClick={this.newMessage()} className={`${classes.borderBlack} ${classes.height150}`}>
                        <NewMessageIcon className={classes.medIcon} fontSize="large"/>
                     </div>
                     <div onClick={this.editDraft()} size="large" className={`${classes.borderBlack} ${classes.height150}`}>
                        <DraftIcon className={classes.medIcon}/>
                     </div>
                  </div>
               </div>
         </section>
      );
   }
}

const mapStateToProps = state => ({
   portfolioReducer: state.portfolioReducer.portfolioReducer,
   userReducer: state.userReducer,
   //communityReducer: state.communityReducer
});

export default connect(mapStateToProps)(withStyles(styling)(UserPortfolio));