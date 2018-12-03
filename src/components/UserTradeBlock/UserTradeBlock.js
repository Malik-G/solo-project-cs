import React, {Component} from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import swal from 'sweetalert';
import Nav from '../Nav/Nav';

const styling = theme => ({
   sizeImg: {
      height: 230,
      width: 150
   },
   customBtn: {
      fontWeight: 'bold',
      fontSize: 10,
      color: 'white',
      height: 10,
      width: 80
   },
   backgroundGray: {
      background: 'darkslategray'
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
   marginTop: {
      marginTop: 20
   }

})


class UserTradeBlock extends Component {
   
   componentDidMount(){
      this.props.dispatch({type: "GET_USER_PORTFOLIO", payload: this.props.userReducer.id}); //inside of portfolioSaga
   }

   cardInfo = (card) => {
      return (event) => {
         alert(`Sport: ${card.sport}
         \nDetails: ${card.details}`);
      }
   }

   updateTradeBlock = (card) => {
      return (event) => {
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
               this.props.dispatch({
                  type: 'UPDATE_TRADE_BLOCK',
                  payload: {
                     user: this.props.userReducer.id,
                     cardId: card.card_id,
                     tbBoolean: card.trade_block,
                  }
               })
            }
            else {
               swal("This card will remain on your trade block...");
            }
          });
      }
   }
   
   render(){
      
      console.log(this.props.userReducer);
      console.log(this.props.portfolioReducer);

      const {classes} = this.props

     
      let tradeBlockArr = []
      let tableHeadInfo;
      let tradeBlockInsert;
      this.props.portfolioReducer.map(card => {
         if(card.trade_block === true){
            tradeBlockArr.push(card);
         }
      })
      console.log(tradeBlockArr);
      if(tradeBlockArr.length === 0){
         tableHeadInfo = <br></br>
         tradeBlockInsert = <p className={classes.alignCenter}>You currently have no cards on your trade block...</p>
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
                  <TableCell className={classes.alignCenter}>Remove</TableCell>
               </TableRow>
            </TableHead>
         
         tradeBlockInsert = this.props && this.props.portfolioReducer.length > 0 ?
            tradeBlockArr.map(card=>
               <TableRow key={card.id}>
                  <TableCell className={classes.alignCenter}>
                     <img onClick={this.cardInfo(card)} src={card.image_url} className={classes.sizeImg} />
                  </TableCell>
                  <TableCell className={classes.alignCenter}>{card.athlete}</TableCell>
                  <TableCell className={classes.alignCenter}>{card.team}</TableCell>
                  <TableCell className={classes.alignCenter}>{card.card_brand}</TableCell>
                  <TableCell className={classes.alignCenter}>{card.price}</TableCell>
                  <TableCell className={classes.alignCenter}>{card.date.substring(0,10)}</TableCell>
                  <TableCell className={classes.alignCenter}>
                     <Button onClick={this.updateTradeBlock(card)} color="primary" className={`${classes.customBtn} ${classes.backgroundRed}`}>Remove</Button>
                  </TableCell>
               </TableRow>
         ) : <span></span>;
      }
      
      return(
         // <div>
         // <section>
         //    <h1 className={classes.alignCenter}>Your Trade Block</h1>
         // </section>
         // <Table>
         //    <TableHead>
         //       <TableRow >
         //       <TableCell className={classes.alignCenter}>Image</TableCell>
         //          <TableCell className={classes.alignCenter}>Athlete</TableCell>
         //          <TableCell className={classes.alignCenter}>Team</TableCell>
         //          <TableCell className={classes.alignCenter}>Card Brand</TableCell>
         //          <TableCell className={classes.alignCenter}>Price</TableCell>
         //          <TableCell className={classes.alignCenter}>Date Posted</TableCell>
         //          <TableCell className={classes.alignCenter}>Remove</TableCell>
         //       </TableRow>
         //    </TableHead>
         //    <TableBody >
         //       {tradeBlockInsert}
         //    </TableBody>
         // </Table>
         // </div>

         <div>
            <Nav/>
            <section>
               <h1 className={classes.alignCenter}>Your Trade Block</h1>
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
   portfolioReducer: state.portfolioReducer.portfolioReducer,
});

// const mapStateToProps = reduxState => ({
//    reduxState
// });

export default connect(mapStateToProps)(withStyles(styling)(UserTradeBlock));