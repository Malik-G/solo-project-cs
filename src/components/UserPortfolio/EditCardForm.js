import React, {Component} from 'react';
import { connect } from 'react-redux';
import {storage} from '../../firebase';
import { withStyles } from '@material-ui/core/styles';
import EditIcon from '@material-ui/icons/Edit';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import Radio from '@material-ui/core/Radio';

const styling = theme => ({
   sizeImg: {
      height: 280,
      width: 200
   },
   styleForm: {
      width: 500,
      background: `white`
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
   backgroundGreen: {
      background: 'green'
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
   margin: {
      margin: 10
   },
   marginTop: {
      marginTop: 100
   },
   marginRight: {
      marginRight: 10
   },
   floatLeft: {
      float: 'left'
   }
})

const newCard = {
   user: 0,
   sport: '',
   athlete: '',
   team:'',
   card_brand:'',
   tradeBlock: false,
   price: '0',
   details: '',
   url:'',
   image: null,
   progress: 0,
   addReady: false,
   uploadReady: false,
   open: false,
   card: 0
}

class EditCardForm extends Component {

   state = newCard;
  
   handleOpenClick = () => {
      this.setState({ 
         user: this.props.userReducer.id,
         sport: this.props.card.sport,
         athlete: this.props.card.athlete,
         team: this.props.card.team,
         card_brand: this.props.card.card_brand,
         tradeBlock: this.props.card.tradeBlock,
         price: this.props.card.price,
         details: this.props.card.details,
         url:this.props.card.image_url,
         image: null,
         progress: 0,
         addReady: false,
         uploadReady: false,
         open: true,
         card: this.props.card.card_id
      });
   };
  
   handleCloseClick = () => {
      this.setState({
         open: false,
         uploadReady: false
      });
   };
   
   handleChange = (event) => {
      this.setState({
         [event.target.name]: event.target.value,
      });
      
   }

   selectImage = (event) => {
      if (event.target.files[0]) {
         const targetImage = event.target.files[0]
         this.setState({
            image: targetImage,
            uploadReady: true
         })
      }
   }
   
   uploadImage = () => {
      console.log(this.state);
      // if(this.state.image === null){
      //    alert(`- Please select an image for the card.
      //          \n- For best quality, frame your image to the size of the card and use good lighting.`);
      //    return
      // }
      //ref has a function called put
      const uploadTask = storage.ref(`images/${this.state.image.name}`).put(this.state.image);
      //uploadTask.on('state_changed', progess, error, complete) //this is the format of the parameters, they are functions;
      uploadTask.on('state_changed',
      (snapshot) => {
         //progress function parameter
         const thisProgess = Math.round((snapshot.bytesTransferred / snapshot.totalBytes * 100)); //snapshot has a property of bytesTransferred
         this.setState({progress: thisProgess});
      },
      (error) => {
         //error function parameter
         console.log(error)
      },
      (complete) => {
         //complete function parameter
         storage.ref('images').child(this.state.image.name).getDownloadURL().then(thisUrl => {
            console.log(thisUrl);
            alert('Image successfully uploaded!');
            this.setState({
               user: this.props.userReducer.id,
               url: thisUrl,
               addReady: true
            });
         })
      });
   }

   confirmUpdate = () => {
      if(this.state.sport === '' || this.state.athlete === '' || this.state.team === ''
         || this.state.cardBrand === '' || this.state.details === '') {
            return alert("Invalid: Missing input(s)");
      }
      else {
         this.props.dispatch({type: 'UPDATE_CARD', payload: this.state}) //inside of 
         this.setState({open: false});
      }
   }
   
   render(){
      
      const {classes} = this.props
      console.log(this.state);
      
      // Conditional rendering to keep the "Add Card" button disabled until the form is completed
      // let addButton = this.state.addReady === false ?
      // <Button variant="contained"  className={classes.customBtn} disabled>Confirm</Button>
      // : <Button onClick={this.updateCard} variant="contained"  className={`${classes.customBtn} ${classes.backgroundGreen}`}>Confirm</Button>
      
      let uploadButton = this.state.uploadReady === false ?
      <Button onClick={this.uploadImage} disabled>Upload Image</Button>
      : <Button onClick={this.uploadImage} >Upload Image</Button>
      
      return(
         <section>
            <div className={classes.alignCenter}>
            
               <Button onClick={this.handleOpenClick} className={ `${classes.customBtn} ${classes.backgroundGray}`}>
                  <EditIcon className={classes.marginRight}/> Edit
               </Button>
            </div>
            <Dialog
               open={this.state.open}
               onClose={this.handleCloseClick}
               aria-labelledby="dialog-title"
            >
               <DialogTitle id="dialog-title">Edit Card</DialogTitle>
               <DialogContent>
                  <DialogContentText>The same image will be used if a new one is not uploaded.</DialogContentText>
                  <form className={`${classes.styleForm} `}>
                     <FormGroup>
                        <FormControl >
                        <TextField
                              id="outlined-sport"
                              label="Sport"
                              name="sport"
                              value={this.state.sport}
                              onChange={this.handleChange}
                              margin="normal"
                              variant="outlined"
                              required
                           />
                           <TextField
                              id="outlined-athlete"
                              label="Athlete"
                              name="athlete"
                              value={this.state.athlete}
                              onChange={this.handleChange}
                              margin="normal"
                              variant="outlined"
                              required
                           />
                           <TextField
                              id="outlined-team"
                              label="Team"
                              name="team"
                              value={this.state.team}
                              onChange={this.handleChange}
                              margin="normal"
                              variant="outlined"
                              required
                           />
                           <TextField
                              id="outlined-cardBrand"
                              label="Card Brand"
                              name="card_brand"
                              value={this.state.card_brand}
                              onChange={this.handleChange}
                              margin="normal"
                              variant="outlined"
                              required
                           />
                           <TextField
                              id="outlined-details"
                              label="Details"
                              name="details"
                              value={this.state.details}
                              onChange={this.handleChange}
                              margin="normal"
                              variant="outlined"
                              multiline
                              required
                           /><br/>
                           {uploadButton}
                           <input  type="file" onChange={this.selectImage}/>
                           <br/>
                           <div>
                              <img src={this.state.url || 'https://via.placeholder.com/280x200'} alt="Upload image" height="280" width="200"></img>
                           </div>
                        </FormControl>
                     </FormGroup>
                  </form>
               </DialogContent>
               <DialogActions>
               <Button onClick={this.confirmUpdate} variant="contained"  className={`${classes.customBtn} ${classes.backgroundGreen}`}>Confirm</Button>
                  <Button onClick={this.handleCloseClick} className={`${classes.customBtn} ${classes.backgroundGray}`} >Cancel</Button>
               </DialogActions>
            </Dialog>
         </section>
      );
   }
}

/* {this.props.portfolioReducer.map( (card) => (
               <div>
                  <img src={card.image_url}/>
               </div>
            ))} */

const mapStateToProps = state => ({
   portfolioReducer: state.portfolioReducer,
   userReducer: state.userReducer,
   //communityReducer: state.communityReducer
});

export default connect(mapStateToProps)(withStyles(styling)(EditCardForm));