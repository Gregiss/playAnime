import Head from 'next/head'
import axios from 'axios';
import React from 'react'
import { useRouter } from 'next/router'

class Video extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      anime: null,
      loadingPlayer: false
    };
  }
  componentDidMount(){
    this.getPlayer()
  }
  async getPlayer() {
    const epVideo = document.location.pathname.split('/')[2] 
    const react = this
    try {
      const res = await axios.get(`http://localhost:3333/video/${epVideo}`);
      const json = res.data
      react.setState({anime: json})
    } catch (error) {
      console.log(`error`)
      return { error };
    }
  }
  render() {
    return <div>
      <Head>
      <title>NekoWatch - Assistindo { this.state.anime != null ? this.state.anime.nomeAnime : 'carregando...' }</title>
      <link rel="icon" href="/favicon.ico" />
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css" integrity="sha512-iBBXm8fW90+nuLcSKlbmrPcLa0OT92xO1BIsZ+ywDWZCvqsWgccV3gFoRBv0z+8dLJgyAHIhR35VZc2oM/gI1w==" crossorigin="anonymous" />
    </Head>
      <div>
        <div>
          { !this.state.loadingPlayer && 
          <div className="preview">
            <i className="fas fa-spinner"></i>
          </div> }
          { this.state.anime != null && 
          <div className="player">
            <video
            preload={'auto'}
            autoPlay={'true'}
            controls={'true'}
            onLoadStart={() => this.setState({ loadingPlayer: true })}
            src={this.state.anime.file_sd}>

            </video>
          </div>
          }
        </div>
        
      </div>
    <style jsx global>{`
      html,
      body {
        padding: 0;
        margin: 0;
        font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
          Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
          sans-serif;
        background-color: #181818;
        user-select: none;
        overflow-y: auto;
        overflow-x: hidden;
      }

      * {
        box-sizing: border-box;
      }

      .preview{
        width: 100%;
        height: 100%;
        position: fixed;
        left: 0px;
        top: 0px;
        background: #000;
        z-index: 100;
      }

      .preview i{
        color: #fff;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        position: fixed;
        font-size: 300%;
        animation: 1s spinner infinite;
      }

      @keyframes spinner{
        0%{
          transform: translate(-50%, -50%) rotate(0deg);
        }
        100%{
          transform: translate(-50%, -50%) rotate(360deg);
        }
      }

      .player video{
        position: fixed;
        width: 100%;
        height: 100%;
        z-index: 1000;
      }
    `}</style>
    </div>
  }
}


export default Video