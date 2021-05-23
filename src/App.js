import React from 'react';
// import {Route,Switch} from 'react-router-dom';
// import InstagramWidget from './components/instagramWidget/instaWidget';
import SpotifyWidget from './components/spotifyWidget/spotifyWidget';
import YoutubeWidget from './components/youtubeWidget/youtubeWidget';

class App extends React.Component {	
	
	render(){
		return (

			<div className="app">
				<YoutubeWidget channelName="tseries"/>
				<SpotifyWidget/>
				<footer style={{width:"20%",margin:"auto"}}>
					<h3 style={{fontSize:"18px"}}>Created by <a rel="noopener noreferrer" style={{textDecoration:"none",color:"#4f4f4f"}} target="_blank" href="https://github.com/swift1719" >Ayush Pawar</a></h3>
				</footer>
			</div>
			// <Switch>
				// {/* <Route 
				// 	exact path="/" 
				// 	component={()=><InstagramWidget 
				// 	username="leomessi" />}
				// />
				//  */}
				
			// {/* </Switch>						 */}
		);
  	}
}
export default App;
