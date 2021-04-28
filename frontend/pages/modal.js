import React from 'react'
import axios from 'axios';
import { createStore } from 'redux'
import { useState } from 'react';
import { useRouter } from 'next/router'
import Carousel from 'react-elastic-carousel';

class Modal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    render() {
        return <div className="Modal">
        
        <div className="openAnime">
            { this.props.anime != undefined &&
            <div className="load">
                <div className="imgCover">
                <a onClick={() => this.props.home.setState({vendoModal: false})} className="voltar">
                    <i className="fas fa-arrow-left"></i>
                </a>
                <img src={this.props.anime.imageCover}></img>
                </div>
                <div className="ep">
                <h1>Episódios</h1>
                {this.props.anime.idEpisode.map((ep, index) => (
                <a href={`/assistir/${ep.episodeId}`}>
                    <div
                    className="epe">
                        <div className="left">
                            <h1>{ index + 1}</h1>
                            <div className="photo">
                            <img src={ep.image}/>
                            </div>
                        </div>
                        <div className="right">
                            <h1>{ep.episode}</h1>
                        </div>
                    </div>
                </a>
                ))}
                </div>
            </div> 
            }
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

      .ep a{
          color: white;
          text-decoration: none;
      }

      .Modal{
          position: fixed;
          width: 100%;
          height: 100%;
          top: 0px;
          left: 0px;
          background: rgba(0,0,0,.50);
          z-index: 120;
          overflow: auto;
      }

      .openAnime{
          width: calc(50vw + 100px);
          position: relative;
          height: auto;
          background: #151515;
          top: 10%;
          left: 50%;
          transform: translate(-50%);
          box-shadow: 2px 1px 3px rgba(0,0,0,.40);
          padding-bottom: 4vh;
          animation: 0.4s openModalAnime;
      }

      @keyframes openModalAnime{
          0%{
            transform: translate(-50%) scale(0.5);
          },
          0%{
            transform: translate(-50%) scale(1);
          }
      }
      
      .imgCover{
        width: 100%;
        height: 400px;
        position: relative;
        left: 0px;
        top: 0px;
      }

      .imgCover img{
        width: 100%;
        height: 300px;
        object-fit: cover;
      }

      .voltar{
        position: fixed;
        text-align: center;
        z-index: 100;
        background: #fff;
        color: #181818;
        margin: 40px;
        padding: 10px;
        border-radius: 50%;
        width: 40px;
        height: 40px;
        transform: scale(1.4);
        box-shadow: 1px 2px 1px rgba(0,0,0,.50);
        cursor: pointer;
      }

      .ep{
          margin-top: -100px;
          margin-left: 20px;
          color: #fff;
          font-size: 12px;
      }

      .epe:hover{
        background: rgba(255,255,255,0.1);
      }

      .epe{
          display: flex;
          padding: 4px;
          border-radius: 4px;
          cursor: pointer;
          margin: 10px;
          position: relative;
          left: -15px;
      }

      .epe .left h1{
        position: absolute;
        margin-top: 25px;
        margin-left: 10px;
        font-weight: normal;
      }

      .epe .left .photo{
          margin-left: 30px;
          transform: scale(0.8);
      }

      .epe .right h1{
          margin: 25px 20px;
          font-size: 17px;
      }

      .epe .left img{
          width: 154px;
          height: 89px;
          border-radius: 4px;
          object-fit: cover;
      }
      `}</style>
            </div>
    }
}

export default Modal