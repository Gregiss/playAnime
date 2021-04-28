import Head from 'next/head'
import React from 'react'
import axios from 'axios';
import { createStore } from 'redux'
import { useState } from 'react';
import { useRouter } from 'next/router'
import Carousel from 'react-elastic-carousel';
import Modal from '../modal';

var randomPage = Math.floor(Math.random() * 10) + 1

class Anime extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      animes: null,
      atualSlide: 0,
      animeDestaque: null,
      searchParam: "",
      searchResult: null,
      vendoAnime: null,
      vendoModal: false,
      loadingAnimes: true,
      fakeLoading: [0,0,0,0,0,0,0,0,0,0]
    };
    this.end= this.end.bind(this);
    this.getAnime= this.getAnime.bind(this);
  }
  componentDidMount(){
    const id = document.location.pathname.split("/")[2]
    this.setState({animes: []})
    this.getAnimes()
    this.getAnime(id)
  }
  async getAnimes() {
    const react = this
    try {
      const res = await axios.get(`http://localhost:3333/page/${randomPage}`);
      const json = res.data
      react.setState({animeDestaque: json.animes[Math.floor(Math.random() * json.animes.length)]})
      react.setState({animes: json.animes})
      react.setState({loadingAnimes: false})
    } catch (error) {
      console.log(`error`)
      return { error };
    }
  }
  async end(e){
    if((e.index / 8).toString().includes('.')){
      this.setState({loadingAnimes: true})
      const react = this
      randomPage++
      try {
        const res = await axios.get(`http://localhost:3333/page/${randomPage}`);
        const json = res.data
        var joined = react.state.animes.concat(json.animes);
        react.setState({ animes: joined })
        this.setState({atualSlide: 0})
        react.setState({loadingAnimes: false})
      } catch (error) {
        console.log(`error`)
        react.setState({loadingAnimes: false})
        return { error };
      }
    }
  }
  async submitForm(e){
    e.preventDefault()
    if(this.state.searchParam.trim().length > 0){
      const react = this
      try {
        const res = await axios.get(`http://localhost:3333/search/${react.state.searchParam}`);
        const json = res.data
        react.setState({ searchResult: json })
      } catch (error) {
        console.log(`error`)
        return { error };
      }
    }
  }
  async submitFormDigitar(){
    if(this.state.searchParam.trim().length > 0){
      const react = this
      try {
        const res = await axios.get(`http://localhost:3333/search/${react.state.searchParam}`);
        const json = res.data
        react.setState({ searchResult: json })
      } catch (error) {
        console.log(`error`)
        return { error };
      }
    }
  }
  searchAnime(){
    this.setState({searchParam: document.querySelector("#inputAnime").value})
    this.submitFormDigitar()
  }
  async getAnime(animeID) {
    this.setState({vendoModal: true})
    this.setState({vendoAnime: null})
    const react = this
    try {
      const res = await axios.get(`http://localhost:3333/anime/${animeID}`);
      const json = res.data
      react.setState({vendoAnime: json})
    } catch (error) {
      console.log(`error`)
      return { error };
    }
  }
  sairModal(){
    this.setState({vendoModal: false})
  }
  render() {
    return <div className="container">
    <Head>
      <title>NekoWatch</title>
      <link rel="icon" href="/favicon.ico" />
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css" integrity="sha512-iBBXm8fW90+nuLcSKlbmrPcLa0OT92xO1BIsZ+ywDWZCvqsWgccV3gFoRBv0z+8dLJgyAHIhR35VZc2oM/gI1w==" crossorigin="anonymous" />
    </Head>
    { this.state.vendoModal &&
    <Modal 
    home={this}
    anime={this.state.vendoAnime}></Modal>
    }
    <div className="fixedTop">
      <form onSubmit={(e) => this.submitForm(e)}>
        <input 
        autoComplete={"off"}
        id="inputAnime"
        onKeyUp={() => this.setState({searchParam: document.querySelector("#inputAnime").value})}
        onKeyDown={() => this.searchAnime()}
        type="text" placeholder="Buscar animes..."></input>
        <button></button>
      </form>
    </div>
    <div className="scrollAnime">
    { this.state.searchResult != null && this.state.searchParam.trim().length > 0 &&
      <div>
        <h1 className="title">Resultados para { this.state.searchParam }</h1>
        <div>
          {
          this.state.searchResult != null &&
          <Carousel 
          itemsToShow={8}>
          {this.state.searchResult.map(anime => (
            <div>
              <a
              onClick={() => this.getAnime(anime.idAnime)}>
              <div 
              className="anime" key={anime.name}>
                <div className="photo">
                  <div className="transparent"></div>
                  <img src={anime.photo}/>  
                </div>
                <h1>{ anime.name }</h1>
              </div>
            </a> 
            </div>
            ))}
          </Carousel>
          }
        </div>
      </div>
      }
      <h1 className="title">Animes</h1>
      <div>
        {
        this.state.animes != null &&
        <Carousel 
        itemsToShow={8}
        onNextEnd={this.end}>
        {this.state.animes.map(anime => (
          <div>
            <a
            onClick={() => this.getAnime(anime.idAnime)}>
            <div 
            className="anime" key={anime.name}>
              <div className="photo">
                <div className="transparent"></div>
                <img src={anime.photo}/>  
              </div>
              <h1>{ anime.name }</h1>
            </div>
          </a> 
          </div>
          ))}
          { this.state.loadingAnimes && this.state.fakeLoading .map(anime => (
          <div>
            <a>
            <div 
            className="anime" key={anime.name}>
              <div className="photo fakeLoading">
                <div className="transparent"></div> 
              </div>
              <h1></h1>
            </div>
          </a> 
          </div>
          ))}
        </Carousel>
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
        padding-bottom: 5vh;
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

      .fakeLoading{
        animation: 1.4s loadindFake infinite;
      }

      @keyframes loadindFake{
        0%{
          background: rgba(255,255,255,0.3)
        }
        0%{
          background: rgba(255,255,255,0.5)
        }
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
        cursor: pointer;
      }

      .anime .photo{
        position: absolute;
        width: 100%;
        height: 100%;
        left: 0px;
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
        bottom: 0;
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

      .fixedTop{
        position: fixed;
        right: 60px;
        z-index: 100;
      }

      .fixedTop button{
        display: none;
      }

      .fixedTop input{
        border: none;
        color: #fff;
        padding: 8px;
        border-radius: 4px;
        background: #000;
        font-size: 20px;
        outline: none;
      }

      .fixedTop input:focus{
        border-bottom: 2px solid #673ab7;
      }

      .rec-dot{
        box-shadow: 0 0 1px 2px rgb(255 255 255 / 50%) !important; 
      }

      .rec-dot_active{
        box-shadow: 0 0 1px 3px rgb(103 58 183) !important;
      }

    `}</style>
  </div>
  }
}

export default Anime