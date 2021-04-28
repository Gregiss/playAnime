import Head from 'next/head'
import axios from 'axios';
import { useState } from 'react';
import { useRouter } from 'next/router'

function Anime({anime, error}) {
    const [state, setState] = useState([]);
    state: {
      hoverLeft: false
    }
    if (error) {
      return <div>An error occured: {error.message}</div>;
    }
    return (
    <div className="container">
      <Head>
        <title>NekoWatch - {anime.animeNome}</title>
        <link rel="icon" href="/favicon.ico" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css" integrity="sha512-iBBXm8fW90+nuLcSKlbmrPcLa0OT92xO1BIsZ+ywDWZCvqsWgccV3gFoRBv0z+8dLJgyAHIhR35VZc2oM/gI1w==" crossorigin="anonymous" />
      </Head>

      <div className="anime_container">
        <div className="imgCover">
          <a href="/" className="voltar">
            <i className="fas fa-arrow-left"></i>
          </a>
            <img src={anime.imageCover}></img>
        </div>
        <div className="photoAnime">
          <h1>{ anime.animeNome }</h1>
          <p className="sinopse">{ anime.sinopse }</p>
          <img src={anime.photo}></img>
        </div>
        <div className="scrollAnime">
        <h1 className="title">Episódios</h1>
        {anime.idEpisode.map(ep => (
          <a 
          href={`/assistir/${ep.episodeId}`}>
            <div 
            className="anime" key={ep.name}>
              <div className="photo">
                <img src={ep.image}/>  
              </div>
              <h1>Ep. { ep.episode }</h1>
            </div>
          </a> ))}
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
           overflow: hidden;
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
 
         .scrollAnime{
           overflow: hidden;
           height: 200px;
           white-space: nowrap;
           z-index: 1;
           position: relative;
           top: -60px;
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
           transform: scale(0.8);
           position: relative;
           left: 230px;
           border-radius: 4px;
           cursor: pointer;
           margin-left: -4vw;
         }
 
         .anime .photo{
           position: absolute;
           width: 100%;
           height: 100%;
         }
 
         .anime img{
           width: 100%;
           height: 100%;
           object-fit: cover;
         }

         .anime h1{
           position: absolute;
           margin-top: 4.4em;
           color: #fff;
           left: 0px;
           font-size: 2vw;
           text-shadow: 1px 2px 1px rgba(0,0,0,.40);
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
         }
      `}</style>
    </div>
  )
}

Anime.getInitialProps = async ({ctx, query}) => {
  try {
    const res = await axios.get(`http://localhost:3333/anime/${query.epAnime}`);
    const anime = res.data;
    return { anime };
  } catch (error) {
    return { error };
  }
};

export default Anime