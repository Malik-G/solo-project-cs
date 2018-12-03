import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import {storage} from '../../firebase';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import './UserPage.css'
import Nav from '../Nav/Nav';
import LogOutButton from '../LogOutButton/LogOutButton';

const styling = theme => ({
   customBtn: {
      height: 40,
      width: 80,
      fontWeight: 'bold',
      fontSize: 10,
      color: 'white'
   },
   squares: {
      border: '3px solid black',
      margin: 20,
      height: 200,
      width: 200,
      color: 'black',
      background: 'grey',
      textAlign:'center',
      fontFamily: 'Alegreya Sans SC',
      fontSize: 40
   },
   squareContainer: {
      width: 800,
      margin:'auto'
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
   inlineBlock: {
      display: 'inline-block'
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

class UserPage extends Component { 
  
   state = {
      image: null,
      url:'',
      progress: 0
   }

   toTradeBlock = () => {
      this.props.history.push('/trade-block')
   }

   toPortfolio = () => {
      this.props.history.push('/user-portfolio')
   }

   toWatchlist = () => {
      this.props.history.push('/watch-list')
   }

   toCommunity = () => {
      this.props.history.push('/community')
   }

   toSettings = () => {
      this.props.history.push('/settings')
   }
  
   render(){
      const {classes} = this.props
      let navSquares;
      
      if(this.props.userReducer.id) { 
         navSquares = <div className={` ${classes.squareContainer}`}>
            <Grid container>
               <Grid className="homeSquare" item xs={4}>
                  <div onClick={this.toTradeBlock} className={`${classes.squares} ${classes.inlineBlock}`}>
                     <p>Trade Block</p>
                  </div>
               </Grid>
               <Grid className="homeSquare" item xs = {4}>
                  <div onClick={this.toPortfolio} className={`${classes.squares} ${classes.inlineBlock}`}>
                     <p>Portfolio</p>
                  </div>
               </Grid>
               <Grid className="homeSquare" item xs = {4}>
                  <div onClick={this.toWatchlist} className={`${classes.squares} ${classes.inlineBlock}`}>
                     <p>Watch List</p>
                  </div>
               </Grid>
               <Grid container className={classes.alignCenter}>
                  <Grid className="homeSquare" item xs = {6}>
                     <div onClick={this.toCommunity} className={`${classes.squares} ${classes.inlineBlock}`}>
                        <p>Community</p>
                     </div>
                  </Grid>
                  <Grid className="homeSquare" item xs = {6}>
                     <div onClick={this.toSettings} className={`${classes.squares} ${classes.inlineBlock}`}>
                        <p>Settings</p>
                     </div>
                  </Grid>
               </Grid>
            </Grid>
         </div>
      }
      else {
         navSquares = <div></div>;
      }
      
      return (
         <div >
            <div>
               <h2>cardSwap</h2>
               <LogOutButton className={`${classes.customBtn} ${classes.backgroundRed}`}/>
            </div>
            <div className={classes.alignCenter}>
               <h1>Welcome back, { this.props.userReducer.username }!</h1>
            </div>
            {navSquares}
         </div>
      );
   }
}

// Instead of taking everything from state, we just want the user info.
// if you wanted you could write this code like this:
// const mapStateToProps = ({user}) => ({ user });
const mapStateToProps = state => ({
  userReducer: state.userReducer,
  portfolioReducer: state.portfolioReducer
});

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(withStyles(styling)(UserPage));
