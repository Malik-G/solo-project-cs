import React, {Component} from 'react';
import { connect } from 'react-redux';
import {storage} from '../../firebase';
import { withStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/AddToQueue';
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
   backgroundGreen: {
      background: 'forestgreen'
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
   }
})

const newCard = {
   user: 0,
   sport: '',
   athlete: '',
   team:'',
   cardBrand:'',
   tradeBlock: false,
   price: '0',
   details: '',
   url:'',
   image: null,
   progress: 0,
   ready: false,
   open: false
}

class AddCardForm extends Component {

   state = newCard
  
   handleOpenClick = () => {
      this.setState({ open: true });
   };
  
   handleCloseClick = () => {
      this.setState({ open: false });
   };
   
   handleChange = (event) => {
      this.setState({
         [event.target.name]: event.target.value,
      });
   }

   selectImage = (event) => {
      if (event.target.files[0]) {
         const targetImage = event.target.files[0]
         this.setState({image: targetImage,})
      }
   }
   
   uploadImage = () => {
      console.log(this.state);
      if(this.state.image === null){
         alert(`- Please select an image for the card.
               \n- For best quality, frame your image to the size of the card and use good lighting.
               \n- Images turn out best if scanned or taken with a high resolution camera`);
         return
      }
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
               ready: true
            });
         })
      });
   }

   addCard = () => {
      if(this.state.sport === '' || this.state.athlete === '' || this.state.team === ''
         || this.state.cardBrand === '' || this.state.details === '') {
            return alert("Invalid: Missing input(s)");
      }
      else {
         this.props.dispatch({type: 'ADD_CARD', payload: this.state}) //inside of 
         this.setState(newCard);
      }
   }
   
   render(){
      
      const {classes} = this.props

      // Conditional rendering to keep the "Add Card" button disabled until the form is completed
      let addButton = this.state.ready === false ?
      <Button type="submit" variant="contained"  className={classes.customBtn} disabled>Add Card</Button>
      : <Button onClick={this.addCard} variant="contained"  className={`${classes.customBtn} ${classes.backgroundGreen}`}>Add Card</Button>
      
      return(
         <section>
            <div className={classes.alignCenter}>
            
               <Button onClick={this.handleOpenClick} className={ `${classes.customBtn} ${classes.backgroundGray}`} variant="outlined">
                  <AddIcon className={classes.marginRight}/> Add Card
               </Button>
            </div>
            <Dialog
               open={this.state.open}
               onClose={this.handleCloseClick}
               aria-labelledby="dialog-title"
            >
               <DialogTitle id="dialog-title">Add a New Card</DialogTitle>
               <DialogContent>
                  <DialogContentText>Fill out all of the information below.</DialogContentText>
                  <form className={`${classes.styleForm} `}>
                  {/* <h1 className={classes.alignCenter}>Add a New Card</h1> */}
                     <FormGroup>
                        <FormControl >
                        <TextField
                              id="outlined-athlete"
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
                              name="cardBrand"
                              value={this.state.cardBrand}
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
                           <Button onClick={this.uploadImage} variant="outlined">Upload Image</Button>
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
                  {addButton}
                  <Button onClick={this.handleCloseClick} className={`${classes.customBtn} ${classes.backgroundGray}`} variant="contained">Cancel</Button>
               </DialogActions>
            </Dialog>
         </section>
      );
   }
}


const mapStateToProps = state => ({
   portfolioReducer: state.portfolioReducer,
   userReducer: state.userReducer,
});

export default connect(mapStateToProps)(withStyles(styling)(AddCardForm));