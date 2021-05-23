import React,{Component} from 'react';
import axios from 'axios';
const API_KEY = process.env.REACT_APP_API_KEY;

class YoutubeWidget  extends Component{

    state={
        item:{},
        videos:[],
        videoDetails:[],
        statistics:[]
    }
    componentDidMount(){
            axios.get(`https://www.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&forUsername=${this.props.channelName}&key=${API_KEY}`)
            .then(res=>{
                this.setState({
                    item:res.data.items[0]
                });
                axios.get(`https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${this.state.item.id}&maxResults=50&key=${API_KEY}`)
                .then(response=>{
                    this.setState({
                        videos:response.data.items
                    });
                    this.getStats();
                })
                .catch(err=>{
                    console.log(err);
                })
            })
            .catch(err=>{
                console.log(err);
            })
    }

    getStats=()=>{
        this.state.videos && this.state.videos.forEach((video)=>{
            axios.get(`https://www.googleapis.com/youtube/v3/videos?part=statistics&id=${video.id.videoId}&maxResults=1&key=${API_KEY}`)
            .then(res=>{
                var data={
                    url:`https://www.youtube.com/embed/${video.id.videoId}`,
                    description:video.snippet.description,
                    title:video.snippet.title,
                    id:video.id.videoId,
                    views:res.data.items[0].statistics.viewCount,
                    likes:res.data.items[0].statistics.likeCount,
                    dislikes:res.data.items[0].statistics.dislikeCount
                }
                this.state.statistics.push(data);
                this.setState({
                    videoDetails:this.state.statistics
                })
            })
            .catch(err=>{
                console.log(err);
            });
        });
    }

    render(){
        return (
            <div className="overflow-auto mx-auto" style={{height:"660px",width:"95%",backgroundColor:"#1f2833",border:"2px #ff0000 solid"}} >		  

                <div className="d-flex mx-0 px-2 pt-2 mb-1" style={{width:"76%",position:"fixed",zIndex:"6",backgroundColor:"#6f2232",borderBottom:"3px #e62117 solid"}}>
                    <div className="g-ytsubscribe mx-2 col-sm-4 " width="100%"  data-channel={this.props.channelName} data-layout="full" data-theme="dark" data-count="default" >
                    </div>
                    <div className="media-body">
                        {this.state.videos.length>0?(
                            <h2 className="mt-0 m-3 " style={{color:"#fff"}}> {this.state.videos[0].snippet.channelTitle} </h2>
                        ):(
                            <div style={{height:"82px"}}></div>
                        )}
                    </div>
                </div> 

                <div style={{marginBottom:"90px"}}></div>
                    <div style={{display: "grid",gridTemplateColumns: "auto auto auto",gridGap: "15px",margin:"15px"}}>
                        {
                        this.state.videoDetails?(
                            this.state.videoDetails.map((vid,key)=>(
                                <div className="card" key={key} style={{backgroundColor:"#121111",color:"#fff"}}>
                                    <iframe title={key} width="100%" height="300" src={vid.url} frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                                    <div className="card-body">
                                        <p> <span className="col-sm-6 px-0" style={{textAlign:"left",fontSize:"10"}}>{vid.views} views</span> <span className="col-sm-3" style={{textAlign:"right"}}> <i className="fas fa-thumbs-up"></i> {vid.likes} </span> <span className="col-sm-3" style={{textAlign:"right"}}> <i className="fas fa-thumbs-down"></i> {vid.dislikes} </span></p>
                                        <p className="card-text">{vid.description}</p>
                                    </div>                        
                                </div>
                            ))):('')
                        }
                    </div>     
            </div>
        )
    }
}
export default YoutubeWidget;
