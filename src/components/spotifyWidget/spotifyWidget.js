import React from 'react';
import PlayWidget from 'react-spotify-widgets';

class SpotifyWidget extends React.Component {	
	

	render(){
		return (
			<PlayWidget
          	width={300}
          	height={420}
          	uri='spotify:album:6fyR4wBPwLHKcRtxgd4sGh'
          	viewCoverArt={true}
       		/>
		);
  	}
}

export default SpotifyWidget;
