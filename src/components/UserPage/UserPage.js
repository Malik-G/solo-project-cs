import React, {Component} from 'react';
import { connect } from 'react-redux';
import LogOutButton from '../LogOutButton/LogOutButton';
import {storage} from '../../firebase';

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
      
      return (
         <div>
            <h1 id="welcome">
               Welcome, { this.props.user.username }!
            </h1>
            <p>Your ID is: {this.props.user.id}</p>
            <progress value={this.state.progress} max="100"/>
            <br/>
            <input type="file" onChange={this.selectImage}/>
            <button onClick={this.uploadImage}>Upload</button>
            <br/>
            <div>
               <img src={this.state.url || 'https://via.placeholder.com/200x200'} alt="Upload image" height="200" width="200"></img>
            </div>
            <LogOutButton className="log-in" />
         </div>
      );
   }
}

// Instead of taking everything from state, we just want the user info.
// if you wanted you could write this code like this:
// const mapStateToProps = ({user}) => ({ user });
const mapStateToProps = state => ({
  user: state.user,
});

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(UserPage);
