import React, { Component }  from 'react';
import { connect } from 'react-redux';
import LogOutButton from '../LogOutButton/LogOutButton';
import axios from 'axios'
const BASE_URL = 'http://localhost:5000/';
//import Dashboard from '@uppy/react/lib/Dashboard'
//import { Dashboard } from '@uppy/react'


class UserPage extends Component {
   
   state = {
      images: [],
      imageUrls: [],
      message: ''
   }
      
   selectImages = (event) => {
      let images = []
      for (var i = 0; i < event.target.files.length; i++) {
         //console.log(event.target.files)
         images[i] = event.target.files[i];
      }
      images = images.filter(image => image.name.match(/\.(jpg|jpeg|png|gif)$/))
      let message = `${images.length} valid image(s) selected`
      this.setState({ images, message })
   }
      
   uploadImages = () => {
      const uploaders = this.state.images.map(image => {
      const data = new FormData();
         data.append("image", image, image.name);
         console.log(data);  
         // Make an AJAX upload request using Axios
         return axios.post(BASE_URL + 'upload', data)
         .then(response => {
            this.setState({
               imageUrls: [ response.data.imageUrl, ...this.state.imageUrls ]
            });
         })
      });
      
   // Once all the files are uploaded 
      axios.all(uploaders)
         .then(() => {
            console.log('done');
            console.log(this.state)
         })
         .catch(err => {
            alert(err.message)
         });
   }
      
   render() {
      return (
      <div>
         <br/>
         <div>
            <h1>Image Uploader</h1><hr/>
            <div>
               <input type="file" onChange={this.selectImages} multiple/>
            </div>
            <p>{this.state.message}</p>
            <br/><br/><br/>
            <div>
               <button value="Submit" onClick={this.uploadImages}>Submit</button>
            </div>
         </div>
         <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><hr/><br/>
         <div className="row col-lg-12">
         {this.state.imageUrls.map((url, i) => (
            <div className="col-lg-2" key={i}>
               <p>{BASE_URL + url}</p>
               <img src={BASE_URL + url} className="img-rounded img-responsive" alt="not available"/><br/>
            </div>
         ))
         }
         </div>
      </div>
      );
   } 
}

// Instead of taking everything from state, we just want the user info.
// You could write this code like this as well:
// const mapStateToProps = state => ({
//    user: state.user,
//  });
 const mapStateToProps = ({user}) => ({ user });

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(UserPage);
