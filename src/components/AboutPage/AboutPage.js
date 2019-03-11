import React from 'react';
import Nav from '../Nav/Nav';

// This is one of our simplest components
// It doesn't have local state, so it can be a function component.
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is, so it doesn't need 'connect()'

const AboutPage = () => (
  <div>
    <div>
       <Nav/>
      <ul >Technologies Used:
        <li>Javascript</li>
        <li>Node.js</li>
        <li>Express.js</li>
        <li>React w/ Redux and Sagas</li>
        <li>Material-UI</li>
        <li>HTML/CSS</li>
      </ul>
      <ul>Future Verisons:
        <li>Payment system</li>
        <li>Messaging</li>
        <li>Allow users to display their top cards on the Community page</li>
        <li>Additional Styling and animations</li>
      </ul>
      <ul>Fix:
         <li>When putting cards on the trade block, require a .50 minimum listing price </li>
      </ul>
    </div>
  </div>
);

export default AboutPage;
