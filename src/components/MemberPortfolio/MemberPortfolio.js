import React, {Component} from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
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
   }
})

class MemberPortfolio extends Component {
   
   state = {
      user: this.props.match.params.id
   }
   
   componentDidMount () {
      this.props.dispatch({type: 'GET_USER_PORTFOLIO', payload: this.state.user})
      this.props.dispatch({type: 'GET_USERNAME', payload: this.state.user})
      
   }

   cardInfo = (card) => {
      return (event) => {
         let tbBoolean = ''
         if(card.trade_block === true){
            tbBoolean = 'Yes'
         }
         else {
            tbBoolean = 'No'
         }
         alert(`Sport: ${card.sport}
         \nAthlete: ${card.athlete}
         \nTeam: ${card.team}
         \nCard Brand: ${card.card_brand}
         \nTrade Block: ${tbBoolean}
         \nPrice: $${card.price}
         \nDate Posted (y/m/d): ${card.date.substring(0,10)}
         \nDetails: ${card.details}
         `);
      }
   }
   
   render(){   
      
      const {classes} = this.props
      console.log(this.state.user);
      console.log('')
      
      // Conditional rendering to display each card
      let portfolioArray = this.props && this.props.portfolioReducer.length > 0 && this.props.memberUsername.length > 0 ?
        this.props.portfolioReducer.map(card=>
         <div className={`${classes.inlineBlock} ${classes.alignCenter} ${classes.margin} ${classes.marginTop}`} key={card.id}>
            <img onClick={this.cardInfo(card)} className={classes.sizeImg} src={card.image_url}/>
            <div>
               <p>{card.athlete}</p>
               <p>{card.team}</p>
            </div>
         </div>
        ) : <span></span>;

      let headerDisplay = this.props && this.props.memberUsername.length > 0 ?
      
       <div className={`${classes.alignCenter} ${classes.margin} ${classes.marginTop}`}>
          <h1 className={classes.alignCenter}>{this.props.memberUsername[0].username}'s Portfolio</h1>
       </div>
      : <span></span>; 
      
      return(
         <section>
            {headerDisplay}
            <div style={{margin: 'auto'}} className={classes.alignCenter}>
               {portfolioArray} 
            </div>     
         </section>
      );
   }
}

const mapStateToProps = state => ({
   // have to do portfolioReducer.portfolioReducer because there are two reducers inside of the portfolioReducer from props
   portfolioReducer: state.portfolioReducer.portfolioReducer,
   memberUsername: state.portfolioReducer.memberUsernameReducer,
   userReducer: state.userReducer,
});

export default connect(mapStateToProps)(withStyles(styling)(MemberPortfolio));