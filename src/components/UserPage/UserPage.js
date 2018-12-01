import React, {Component} from 'react';
import { connect } from 'react-redux';
import {storage} from '../../firebase';
import { withStyles } from '@material-ui/core/styles';
//import LogOutButton from '../LogOutButton/LogOutButton';

const styling = theme => ({
   customBtn: {
      height: 10,
      width: 80,
      fontWeight: 'bold',
      fontSize: 10,
      color: 'white'
   },
   backgroundBlack: {
      background: 'black'
   },
   backgroundGray: {
      background: 'dimgray'
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

   selectImage = (event) => {
      if (event.target.files[0]) {
         const targetImage = event.target.files[0]
         this.setState({image: targetImage})
      }
   }

   uploadImage = () => {
      console.log(this.state);
      //ref has a function called put
      const uploadTask = storage.ref(`images/${this.state.image.name}`).put(this.state.image);
      //uploadTask.on('state_changed', progess, error, complete) //this is the format of the parameters, they are functions;
      uploadTask.on('state_changed',
      (snapshot) => {
         //progress function parameter
         const thisProgess = Math.round((snapshot.bytesTransferred / snapshot.totalBytes * 100)) //snapshot has a property of bytesTransferred
         this.setState({progress: thisProgess})
      },
      (error) => {
         //error function parameter
         console.log(error)
      },
      (complete) => {
         //complete function parameter
         storage.ref('images').child(this.state.image.name).getDownloadURL().then(thisUrl => {
            console.log(thisUrl);
            this.setState({url: thisUrl})
         })
      });
   }
  
   render(){
      const {classes} = this.props
      return (
         <div className={classes.alignCenter}>
            <h1 >
               Welcome back, { this.props.userReducer.username }!</h1>
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
