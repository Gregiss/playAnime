import Head from 'next/head'
import axios from 'axios';
import { useState } from 'react';

const Links = [
  {
    "name": "Início",
    "icon": "fa-home",
    "ativo": true
  }
]

const Home = ({animes, error}) => {
  const [state, setState] = useState([]);
  state: {
    hoverLeft: false
  }
  return (
    <div className="container">
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css" integrity="sha512-iBBXm8fW90+nuLcSKlbmrPcLa0OT92xO1BIsZ+ywDWZCvqsWgccV3gFoRBv0z+8dLJgyAHIhR35VZc2oM/gI1w==" crossorigin="anonymous" />
      <Head>
        <title>NekoWatch</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div 
      onMouseEnter={() => setState({hoverLeft: true})}
      onMouseLeave={() => setState({hoverLeft: false})}
      className={`fixedLeft ${(state.hoverLeft ? `FixadoLeft` : 'dontFixado')}`}>
        <div className="logo">
          <img src={`./logo.png`}></img>
        </div>
        { Links.map((link, i) => 
        <li className={`${(link.ativo ? 'ativo' : '')}`}>
          <span>
            <i className={`fas ${link.icon}`}></i>  <p>{ link.name }</p>
          </span>
        </li>
        ) }
      </div>
      <div className="scrollAnime">
        <h1 className="title">Animes</h1>
        {animes.animes.map(anime => (
          <a href={`/anime/${anime.idAnime}`}>
            <div 
            className="anime" key={anime.name}>
              <div className="photo">
                <img src={anime.photo}/>  
              </div>
            </div>
          </a> ))}
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
          overflow: hidden;
        }

        * {
          box-sizing: border-box;
        }

        .scrollAnime{
          overflow: hidden;
          height: 200px;
          white-space: nowrap;
          z-index: 1;
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

        .scrollAnime{
          width: 8540px;
          height: auto;
          overflow: hidden;
          opacity: 1;
          transform: translate3d(0px, 0px, 0px);
          margin: 10px;
          position: relative;
          left: -40px;
        }

        .scrollAnime h1{
          position: relative;
          left: 185px;
          top: 30px;
        }
        
        .anime{
          width: 22vw;
          height: 22vh;
          display: inline-block;
          overflow: hidden;
          transform: scale(0.8);
          position: relative;
          left: 230px;
          border-radius: 4px;
          cursor: pointer;
          margin-left: -4vw;
        }

        .anime .photo{
          position: absolute;
          overflow: hidden;
          width: 100%;
          height: 100%;
        }

        .anime img{
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

      `}</style>
    </div>
  )
}

Home.getInitialProps = async ctx => {
  try {
    var random = Math.floor(Math.random() * 61);
    const res = await axios.get(`http://localhost:3333/page/${random}`);
    const animes = res.data;
    return { animes };
  } catch (error) {
    return { error };
  }
};

export default Home