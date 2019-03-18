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
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import Slide from '@material-ui/core/Slide';
import Radio from '@material-ui/core/Radio';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane as farPaperPlane} from '@fortawesome/free-regular-svg-icons';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import './Messages.css'

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
   inlineBlock: {
      display: 'inline-block'
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
   },
   largeIcon: {
      width: 150,
      height: 150,
      margin: '25% auto'
   },
   floatRight: {
      float: 'right'
   },
   messageTable: {
      maxWidth: '75%',
      margin: '30px auto'
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

class Outbox extends Component {

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

   sendMessage = () => {
      
   }
   
   
   render(){
      
      const {classes} = this.props

      // Conditional rendering to keep the "Add Card" button disabled until the form is completed
      let addButton = this.state.ready === false ?
      <Button type="submit" variant="contained"  className={classes.customBtn} disabled>Add Card</Button>
      : <Button onClick={this.addCard} variant="contained"  className={`${classes.customBtn} ${classes.backgroundGreen}`}>Add Card</Button>
      
      return(
         <section>
            <FontAwesomeIcon icon={farPaperPlane} size="10x" className={`icon ${classes.largeIcon}`} onClick={this.handleOpenClick}/>
            <Dialog
               fullScreen
               open={this.state.open}
               onClose={this.handleCloseClick}
               aria-labelledby="dialog-title"
            >
            <AppBar className={`${classes.appBar} ${classes.inlineBlock}`}>
               <Toolbar>
               <IconButton color="inherit" onClick={this.handleCloseClick} aria-label="Close">
                  <CloseIcon/>
               </IconButton>
               <Typography variant="h6" color="inherit" className={classes.flex}>
                  Outbox
               </Typography>
               </Toolbar>
            </AppBar>
               <DialogTitle id="dialog-title">Add a New Card</DialogTitle>
               
               <DialogContent>
               <Table className={classes.messageTable}>
                     <TableHead>
                        <TableRow>
                           <TableCell className={classes.alignCenter}>To</TableCell>
                           <TableCell className={classes.alignCenter}>Date</TableCell>
                           <TableCell className={classes.alignCenter}>Message</TableCell>
                        </TableRow>
                     </TableHead>
                     <TableBody>
                        <TableRow>
                           <TableCell></TableCell>
                           <TableCell></TableCell>
                           <TableCell></TableCell>
                        </TableRow>
                     </TableBody>
                  </Table>
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

export default connect(mapStateToProps)(withStyles(styling)(Outbox));