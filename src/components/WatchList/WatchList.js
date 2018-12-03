import React, {Component} from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
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
   backgroundRed: {
      background: 'firebrick'
   },
   backgroundGreen: {
      background: 'green'
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

class WatchList extends Component {
   
   state = {
      id_of_card: 0,
      card_owner: this.props.match.params.id
   }
   
   componentDidMount () {
      this.props.dispatch({type: 'GET_WATCH_LIST', payload: this.props.userReducer.id})
   }

   cardInfo = (card) => {
      return (event) => {
         alert(`Sport: ${card.sport}
         \nDetails: ${card.details}`);
      }
   }

   goToPortfolio = (id) => {
      return (event) => {
         this.props.history.push(`/member-portfolio/${id}`)
      }
   }

   goToTradeBlock = (id) => {
      return (event) => {
         this.props.history.push(`/member-trade-block/${id}`)
      }
   }

   removeWatch = (id) => {
      return (event) => {
         this.props.dispatch({
            type: 'REMOVE_WATCH_LIST_ITEM',
            payload: {
               watch_list_owner: this.props.userReducer.id,
               watch_list_id: id,
            }
         })
      }
   }

   render(){

      const {classes} = this.props

      let watchListInsert;
      let tableHeadInfo;
      
      if(this.props.watchListReducer.length === 0){
         tableHeadInfo = <br></br>
         watchListInsert = <p className={classes.alignCenter}>No cards currently being watched...</p>
      }
      else {
         tableHeadInfo =
            <TableHead>
               <TableRow >
                  <TableCell className={classes.alignCenter}>Card</TableCell>
                  <TableCell className={classes.alignCenter}>User</TableCell>
                  <TableCell className={classes.alignCenter}>Price</TableCell>
                  <TableCell className={classes.alignCenter}>Date Posted</TableCell>
                  <TableCell className={classes.alignCenter}>Purchase</TableCell>
                  <TableCell className={classes.alignCenter}>Unwatch</TableCell>
               </TableRow>
            </TableHead>
         
         watchListInsert = this.props && this.props.watchListReducer.length > 0 ?
            this.props.watchListReducer.map(card=>
               <TableRow key={card.id}>
                  <TableCell className={classes.alignCenter}>
                     <img onClick={this.cardInfo(card)} src={card.image_url} className={classes.sizeImg} />
                  </TableCell>
                  <TableCell className={`${classes.font20} ${classes.alignCenter}`}>
                     <div className={classes.marginTop}>
                        {card.card_owner}
                     </div>
                     <div className={classes.marginTop}>
                        {/* user_id refers to the owner of the card being watched */}
                        <Button onClick={this.goToPortfolio(card.user_id)} variant="contained" className={`${classes.customBtn} ${classes.backgroundBlack}`}>Portfolio</Button>
                        <Button onClick={this.goToTradeBlock(card.user_id)} variant="contained" className={`${classes.customBtn} ${classes.backgroundGray}`}>Trade Block</Button>
                     </div>
                  </TableCell>
                  <TableCell className={classes.alignCenter}>{card.price}</TableCell>
                  <TableCell className={classes.alignCenter}>{card.date.substring(0,10)}</TableCell>
                  <TableCell className={classes.alignCenter}>
                     <Button  className={`${classes.customBtn} ${classes.backgroundGreen}`} variant="contained">Add to Cart</Button>
                  </TableCell>
                  <TableCell className={classes.alignCenter}>
                     <Button  onClick={this.removeWatch(card.watch_list_id)} className={`${classes.customBtn} ${classes.backgroundRed}`} variant="contained">UnWatch</Button>
                  </TableCell>
               </TableRow>
         ) : <span></span>;
      }
      
      let headerDisplay =
         <div className={`${classes.alignCenter} ${classes.margin} ${classes.marginTop}`}>
            <h1 className={classes.alignCenter}>Your Watch List</h1>
         </div>
      
      return(
         <div>
            <Nav/>
            <section>
               {headerDisplay}
            </section>
            <Table>
               {tableHeadInfo}
               <TableBody>
                  {watchListInsert}
               </TableBody>
            </Table>
         </div>
         
      );
   }
}


const mapStateToProps = state => ({
   watchListReducer: state.watchListReducer,
   userReducer: state.userReducer,
   memberUsername: state.portfolioReducer.memberUsernameReducer,
   portfolioReducer: state.portfolioReducer.portfolioReducer,
});

// const mapStateToProps = reduxState => ({
//    reduxState
// });

export default connect(mapStateToProps)(withStyles(styling)(WatchList));