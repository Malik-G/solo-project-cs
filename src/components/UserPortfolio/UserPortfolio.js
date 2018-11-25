import React, {Component} from 'react';
import { connect } from 'react-redux';


class UserPortfolio extends Component {
   
   componentDidMount(){
      this.props.dispatch({type: "GET_USER_PORTFOLIO", payload: this.props.userReducer.id}); //inside of portfolioSaga
      //this.props.dispatch({type: "GET_COMMUNITY"}); //inside of communitySaga
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
      
      let portfolioArray = this.props && this.props.portfolioReducer.length > 0 ?
        this.props.portfolioReducer.map(card=>
         <div style={inlineBlock}>
            <img style={sizeImg} src={card.image_url}/>
         </div>
        ) : <span></span>;
      
      return(
         <div>
            <section>
               <h1>Your Portfolio</h1>
               <button onClick={this.addCard}>Add Card</button><br/>
            </section>
            {portfolioArray}
            {/* {this.props.portfolioReducer.map( (card) => (
               <div>
                  <img src={card.image_url}/>
               </div>
            ))} */}
         </div>
      );
   }
}

const sizeImg = {
   height: 200,
   width: 200
}

const inlineBlock = {
   display: 'inline-block'
}

const mapStateToProps = state => ({
   portfolioReducer: state.portfolioReducer,
   userReducer: state.userReducer,
   //communityReducer: state.communityReducer
});

// const mapStateToProps = reduxState => ({
//    reduxState
// });

export default connect(mapStateToProps)(UserPortfolio);
