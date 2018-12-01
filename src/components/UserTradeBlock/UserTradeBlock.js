import React, {Component} from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';

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
   
   render(){
      
      console.log(this.props.userReducer);
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
      
      //let matchCard = card => card.trade_block === true;
      // const tradeBlockArr = this.props.portfolioReducer.filter(matchCard);
      let tradeBlockArr = []
      this.props.portfolioReducer.map(card => {
         if(card.trade_block === true){
            tradeBlockArr.push(card);
         }
      })
      console.log(tradeBlockArr);
      let tradeBlockInsert = this.props && this.props.portfolioReducer.length > 0 ?
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
                  <Button color="primary" className={`${classes.customBtn} ${classes.backgroundRed}`}>Remove</Button>
               </TableCell>
            </TableRow>
        ) : <span></span>;
      
      return(
         <div>
         <section>
            <h1 className={classes.alignCenter}>Your Trade Block</h1>
         </section>
         <Table>
            <TableHead>
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
            <TableBody >
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