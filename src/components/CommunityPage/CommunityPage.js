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
   sizeBtn: {
      height: 10,
      width: 80
   },
   btnText: {
      fontWeight: 'bold',
      fontSize: 10,
      color: 'white'
   },
   backgroundGreen: {
      background: 'green'
   },
   backgroundOrange: {
      background: 'orange'
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


class CommunityPage extends Component {
   
   componentDidMount(){
      this.props.dispatch({type: "GET_COMMUNITY"}); //inside of communitySaga
   }
   
   render(){
      
      console.log(this.props.userReducer);
      console.log(this.props.portfolioReducer);
      console.log(this.props.communityReducer);

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
      
      let communityInsert = this.props && this.props.communityReducer.length > 0 ?
        this.props.communityReducer.map(member=>
            <TableRow>
               <TableCell className={`${classes.font20} ${classes.alignCenter}`}>
                  <div className={classes.marginTop}>
                     {member.username}
                  </div>
                  <div className={classes.marginTop}>
                     <Button variant="contained" color="default" className={`${classes.sizeBtn} ${classes.backgroundGreen} ${classes.btnText}`}>Portfolio</Button>
                     <Button variant="contained" color="default" className={`${classes.sizeBtn} ${classes.backgroundOrange} ${classes.btnText}`}>Trade Block</Button>
                  </div>
               </TableCell>
               <TableCell className={classes.alignCenter}>{member.count}</TableCell>
               <TableCell className={classes.alignCenter}>Top Card #1</TableCell>
               <TableCell className={classes.alignCenter}>Top Card #2</TableCell>
               <TableCell className={classes.alignCenter}>
                  <Button variant="contained" color="primary" className={classes.sizeBtn}>Message</Button>
               </TableCell>
            </TableRow>
        ) : <span></span>;
      
      return(
         <div>
         <section>
            <h1>Community</h1>
            <button onClick={this.addCard}>Add Card</button>
         </section>
         <Table>
            <TableHead>
               <TableRow >
                  <TableCell className={classes.alignCenter}>User</TableCell>
                  <TableCell className={classes.alignCenter}>Number of Cards</TableCell>
                  <TableCell className={classes.alignCenter}>Top Card #1</TableCell>
                  <TableCell className={classes.alignCenter}>Top Card #2</TableCell>
                  <TableCell className={classes.alignCenter}>Message</TableCell>
               </TableRow>
            </TableHead>
            <TableBody >
               {communityInsert}
            </TableBody>
         </Table>
         </div>
         
      );
   }
}

/* {this.props.portfolioReducer.map( (card) => (
               <div>
                  <img src={card.image_url}/>
               </div>
            ))} */


const mapStateToProps = state => ({
   //portfolioReducer: state.portfolioReducer,
   userReducer: state.userReducer,
   communityReducer: state.communityReducer,
});

// const mapStateToProps = reduxState => ({
//    reduxState
// });

export default connect(mapStateToProps)(withStyles(styling)(CommunityPage));
