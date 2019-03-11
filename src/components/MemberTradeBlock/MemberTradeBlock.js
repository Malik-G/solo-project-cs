import React, {Component} from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
// import Button from '@material-ui/core/Button';
import WatchButton from './WatchButton';
import Nav from '../Nav/Nav';

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


class MemberTradeBlock extends Component {
   
   state = {
      user: this.props.match.params.id
   }
   
   componentDidMount () {
      this.props.dispatch({type: 'GET_WATCH_LIST', payload: this.props.userReducer.id})
      this.props.dispatch({type: 'GET_USER_PORTFOLIO', payload: this.state.user})
      this.props.dispatch({type: 'GET_USERNAME', payload: this.state.user})
      
   }

   cardInfo = (card) => {
      return (event) => {
         alert(`Sport: ${card.sport}
         \nDetails: ${card.details}`);
      }
   }

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
      const {classes} = this.props
      
      console.log(this.state.user);
      console.log(this.props.memberUsername[0])

      let tradeBlockArr = []
      let tradeBlockInsert;
      let tableHeadInfo;
      
      this.props.portfolioReducer.map(card => {
         if(card.trade_block === true){
            tradeBlockArr.push(card);
         }
      })


      console.log(tradeBlockArr);
      if(tradeBlockArr.length === 0){
         tableHeadInfo = <br></br>
         tradeBlockInsert = <p className={classes.alignCenter}>No cards currently on this user's trade block, but take a look at their porfolio!</p>
      }
      else {
         tableHeadInfo = <TableHead>
            <TableRow >
               <TableCell className={classes.alignCenter}>Image</TableCell>
               <TableCell className={classes.alignCenter}>Athlete</TableCell>
               <TableCell className={classes.alignCenter}>Team</TableCell>
               <TableCell className={classes.alignCenter}>Card Brand</TableCell>
               <TableCell className={classes.alignCenter}>Price</TableCell>
               <TableCell className={classes.alignCenter}>Date Posted</TableCell>
               <TableCell className={classes.alignCenter}>Watch</TableCell>
            </TableRow>
         </TableHead> 
         
         tradeBlockInsert = this.props && this.props.portfolioReducer.length > 0  ?
            tradeBlockArr.map(card=>
               <TableRow key={card.id}>
                  <TableCell className={classes.alignCenter}>
                     <img onClick={this.cardInfo(card)} src={card.image_url} className={classes.sizeImg} />
                  </TableCell>
                  <TableCell className={classes.alignCenter}>{card.athlete}</TableCell>
                  <TableCell className={classes.alignCenter}>{card.team}</TableCell>
                  <TableCell className={classes.alignCenter}>{card.card_brand}</TableCell>
                  <TableCell className={classes.alignCenter}>${card.price}</TableCell>
                  <TableCell className={classes.alignCenter}>{card.date.substring(0,10)}</TableCell>
                  <TableCell className={classes.alignCenter}>
                     <WatchButton cardId={card.card_id} owner={this.props.userReducer.id}/>
                  </TableCell>
               </TableRow>
            ) : <span>Null</span>;
      }
      

        let headerDisplay = this.props && this.props.memberUsername.length > 0 ?
      
       <div className={`${classes.alignCenter} ${classes.margin} ${classes.marginTop}`}>
          <h1 className={classes.alignCenter}>{this.props.memberUsername[0].username}'s Trade Block</h1>
       </div>
      : <span></span>; 
      
      return(
         <div>
            <Nav/>
            <section>
               {headerDisplay}
            </section>
            <Table>
               {tableHeadInfo}
               <TableBody>
                  {tradeBlockInsert}
               </TableBody>
            </Table>
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

export default connect(mapStateToProps)(withStyles(styling)(MemberTradeBlock));