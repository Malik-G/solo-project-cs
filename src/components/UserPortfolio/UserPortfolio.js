import React, {Component} from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import AddCardForm from './AddCardForm';
import EditCardForm from './EditCardForm';
import Button from '@material-ui/core/Button';
import swal from 'sweetalert';

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
      margin: 10
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
   }
})

class UserPortfolio extends Component {
   
   componentDidMount(){
      this.props.dispatch({type: "GET_USER_PORTFOLIO", payload: this.props.userReducer.id}); //inside of portfolioSaga
   }
   
   deleteCard = (card) => {
      return (event) => {
         swal({
            title: "Delete Card?",
            text: "There's no going back...",
            icon: "warning",
            buttons: true,
            
          })
         .then((willDelete) => {
            if (willDelete) {
               swal("Successfully deleted!", {
                  icon: "success",
               });
               let deleteInfo = {
                  cardId: card, // identifies which card to delete
                  user: this.props.userReducer.id // identifies the user
               }
               this.props.dispatch({type: 'DELETE_CARD', payload: deleteInfo})
            }
            else {
               swal("No Deletion...");
            }
          });
      }
   }
   
   cardInfo = (card) => {
      return (event) => {
         alert(`Sport: ${card.sport}
         \nAthlete: ${card.athlete}
         \nTeam: ${card.team}
         \nCard Brand: ${card.card_brand}
         \nTrade Block: ${card.trade_block}
         \nPrice: $${card.price}
         \nDate: ${card.date.substring(0,10)}
         \nDetails: ${card.details}
         `);
      }
   }

   render(){
      
      console.log(this.props.portfolioReducer);
      const {classes} = this.props

      // let imagesArray;
      // if(this.props && this.props.portfolioReducer.length > 0 ){
      //    this.props.portfolioReducer.map(card=>
      //       imagesArray = <div>
      //          <img src={card.image_url}/>
      //       </div>
      // )}
      // else { 
      //    imagesArray = <span></span>
      // }
      
      // Conditional rendering to display each card
      let portfolioArray = this.props && this.props.portfolioReducer.length > 0 ?
        this.props.portfolioReducer.map(card=>
         <div className={`${classes.inlineBlock} ${classes.alignCenter} ${classes.margin} ${classes.marginTop}`} key={card.id}>
            <img onClick={this.cardInfo(card)} className={classes.sizeImg} src={card.image_url}/>
            <div>
               <p>{card.athlete}</p>
               <p>{card.team}</p>
            </div>
            <div className={classes.alignCenter}>
               <div className={classes.floatLeft}>
                  <EditCardForm card={card} />
               </div>
               <div className={classes.floatLeft}>
                  <Button onClick={this.deleteCard(card.card_id)} variant="contained" color="default" className={`${classes.customBtn} ${classes.backgroundRed}`}>Delete</Button>
               </div>
            </div>
         </div>
        ) : <span></span>;
      
      return(
         <section>
            <h1 className={classes.alignCenter}>Your Portfolio</h1>
            <AddCardForm/> 
            {portfolioArray}      
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
