import Head from 'next/head'
import axios from 'axios';
import React from 'react'
import { useState } from 'react';
import { useRouter } from 'next/router'
import Carousel from 'react-elastic-carousel';

class Anime extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      anime: {
        animeNome: null
      }
    };
  }
  componentDidMount(){
    this.getAnimes()
  }
  async getAnimes() {
    const animeID =document.location.pathname.split('/')[2] 
    const react = this
    try {
      const res = await axios.get(`http://localhost:3333/anime/${animeID}`);
      const json = res.data
      react.setState({anime: json})
      console.log(react.state.anime)
    } catch (error) {
      console.log(`error`)
      return { error };
    }
  }
  render() {
    return <div className="container">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css" integrity="sha512-iBBXm8fW90+nuLcSKlbmrPcLa0OT92xO1BIsZ+ywDWZCvqsWgccV3gFoRBv0z+8dLJgyAHIhR35VZc2oM/gI1w==" crossorigin="anonymous" />
    <Head>
      <title>NekoWatch - { this.state.anime.animeNome != null ? this.state.anime.animeNome : 'Carregando anime' }</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <div className="container_anime">
      { this.state.anime.animeNome != null && 
      <div className="anime_container">
        <div className="imgCover">
          <a href="/" className="voltar">
            <i className="fas fa-arrow-left"></i>
          </a>
            <img src={this.state.anime.imageCover}></img>
        </div>
        <div className="photoAnime">
          <h1>{ this.state.anime.animeNome }</h1>
          <p className="sinopse">{ this.state.anime.sinopse }</p>
          <img src={this.state.anime.photo}></img>
        </div>
        <div className="scrollAnime">
        <h1 className="title">Episódios</h1>
        <Carousel 
        itemsToShow={8}>
        {this.state.anime.idEpisode.map(ep => (
          <div>
            <a 
          href={`/assistir/${ep.episodeId}`}>
            <div 
            className="anime" key={ep.episodeId}>
              <div className="photo">
                <div className="transparent"></div>
                <img src={ep.image}/>  
              </div>
              <h1>{ ep.episode }</h1>
            </div>
          </a> 
          </div>
          ))}
        </Carousel>
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

      .scrollAnime{
        transform: scale(0.85);
      }

      .fixedLeft .logo{
        position: absolute;
        width: 100px;
        height: 100px;
        right: 0px;
        float: right;
      }

      .fixedLeft p{
        display: inline-flex;
      }

      .fixedLeft .logo img{
        position: absolute;
        width: 100px;
        transform: rotate(270deg) translateY(53px);
        transition: 0.4s;
      }

      .fixedLeft .logo img:hover{
        transform: rotate(270deg) translateY(0px);
      }

      .FixadoLeft{
        width: 421px !important;
      }

      .fixedLeftNot{
        width: 90px !important;
      }

      .fixedLeft{
        position: fixed;
        top: 0px;
        left: 0px;
        width: 90px;
        height: 100%;
        background: #181818;
        overflow: hidden;
        z-index: 10;
        box-shadow: 1px 2px 1px rgb(47 43 43 / 41%);
      }

      .fixedLeft li{
        list-style: none;
        color: white;
        padding: 10px;
        font-size: 180%;
        position: relative;
        top: 100px;
      }

      .dontFixado li span i{
        position: relative;
        left: -50px !important;
      }

      .dontFixado li p{
        display: none;
      }

      .fixedLeftNot li i{
        display: block;
        position: relative;
        left: 10px !important;
      }

      .fixedLeft li span{
        margin-left: 70px;
      }

      .fixedLeft li span i{
        position: relative;
        left: -20px;
      }

      .fixedLeft .ativo{
        background: white;
        color: #181818;
      }
      
      .title{
        color: #fff;
        position: relative;
        left: 64px;
      }

      .scrollAnime{
        margin-left: -40px;
      }
      
      .anime{
        width: 210px;
        height: 250px;
        display: inline-block;
      }

      .anime .photo{
        position: absolute;
        width: 100%;
        height: 100%;
        left: 0px
      }

      .rec-carousel-item:hover{
        border: 2px solid #fff;
      }

      .anime img{
        width: calc(100% - 4px);
        height: 100%;
        object-fit: cover;
        margin-left: -1px;
      }

      .anime h1{
        position: absolute;
        margin-top: 10em;
        color: #fff;
        left: 10px;
        font-size: 1.2vw;
        text-shadow: 1px 2px rgba(0,0,0,.90);
        max-width: 80%;
        overflow: hidden;
      }

      .rec-carousel-item{
        width: 200px;
        left: 2vw;
        position: relative;
        margin-left: 5px;
        border: 2px solid transparent;
      }

      .rec-arrow-left{
        margin-left: 50px;
      }

      .photoAnime{
        position: relative;
        left: 160px;
        top: -80px;
      }
      .photoAnime img{
         margin: 10px;
         box-shadow: 1px 2px 3px #3f51b594;
      }
      .photoAnime h1{
        color: #fff;
        bottom: -60px;
        position: absolute;
        text-shadow: 1px 1px 2px rgba(0,0,0,.40);
      }
      .photoAnime img{
       width: 170px;
       object-fit: cover;
       height: 220px;
     }
      * {
        box-sizing: border-box;
      }

      .fixedLeft .logo{
        position: absolute;
        width: 100px;
        height: 100px;
        right: 0px;
        float: right;
      }

      .fixedLeft p{
        display: inline-flex;
      }

      .fixedLeft .logo img{
        position: absolute;
        width: 100px;
        transform: rotate(270deg) translateY(53px);
        transition: 0.4s;
      }

      .fixedLeft .logo img:hover{
        transform: rotate(270deg) translateY(0px);
      }

      .FixadoLeft{
        width: 421px !important;
      }

      .fixedLeftNot{
        width: 90px !important;
      }

      .fixedLeft{
        position: fixed;
        top: 0px;
        left: 0px;
        width: 90px;
        height: 100%;
        background: #181818;
        overflow: hidden;
        z-index: 10;
        box-shadow: 1px 2px 1px rgb(47 43 43 / 41%);
      }

      .fixedLeft li{
        list-style: none;
        color: white;
        padding: 10px;
        font-size: 180%;
        position: relative;
        top: 100px;
      }

      .dontFixado li span i{
        position: relative;
        left: -50px !important;
      }

      .dontFixado li p{
        display: none;
      }

      .fixedLeftNot li i{
        display: block;
        position: relative;
        left: 10px !important;
      }

      .fixedLeft li span{
        margin-left: 70px;
      }

      .fixedLeft li span i{
        position: relative;
        left: -20px;
      }

      .fixedLeft .ativo{
        background: white;
        color: #181818;
      }
      
      .title{
        color: #fff;
        position: relative;
        left: 48px;
      }

      .anime .imgCover{
        width: 100%;
        height: 400px;
        position: fixed;
        left: 0px;
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
      .sinopse{
        color: #fff;
        max-width: 40%;
        position: absolute;
        top: 70px;
        left: 200px;
        color: rgba(255,255,255,.80);
        height: 141px;
        overflow: auto;
      }
    `}</style>
  </div>
  }
}

export default Anime