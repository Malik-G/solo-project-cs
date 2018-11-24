import React, {Component} from 'react';
import { connect } from 'react-redux';


class UserPortfolio extends Component {
   
   componentDidMount(){
      this.props.dispatch({type: "GET_USER_PORTFOLIO", payload: this.props.userReducer.id}); //inside of portfolioSaga
   }

   addCard = () => {
      console.log('Yes')
   }
   
   render(){
      
      console.log(this.props.portfolioReducer);

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
      
      let imagesArray = this.props && this.props.portfolioReducer.length > 0 ?
        this.props.portfolioReducer.map(card=>
         <div>
            <img style={sizeImg} src={card.image_url}/>
         </div>
        ) : <span></span>;
      
      return(
         <div>
            <button onClick={this.addCard}>Add Card</button>
            {imagesArray}
            {/* {this.props.portfolioReducer.map( (card) => (
               <div>
                  <img src={card.image_url}/>
               </div>
            ))} */}
            <p>Your Portfolio</p>
         </div>
      );
   }
}

// const mapStateToProps = reduxState => ({
//    reduxState
// });

const sizeImg = {
   height: 200,
   width: 200
}

const mapStateToProps = state => ({
   portfolioReducer: state.portfolioReducer,
   userReducer: state.userReducer,
});

export default connect(mapStateToProps)(UserPortfolio);
