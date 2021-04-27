import Head from 'next/head'
import axios from 'axios';
import { useRouter } from 'next/router'

function Anime({anime, error}) {
    if (error) {
      return <div>An error occured: {error.message}</div>;
    }
    return (
    <div className="container">
      <Head>
        <title>NekoWatch - {anime.animeNome}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="anime_container">
        <div className="photoAnime">
          <h1>{ anime.animeNome }</h1>
          <img src={anime.photo}></img>
        </div>
        <div className="episodiosContainer">
          { anime.idEpisode.map((item, i) => 
            <div className="imageEp">
              <a href={`/assistir/${item.episodeId}`}>
                <img src={item.image}/>
              </a>
            </div>
          )}
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
           background: #151515;
        }

        .anime_container{
          position: relative;
        }

        * {
          box-sizing: border-box;
        }

        img{
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .photoAnime{
          width: 200px;
          height: 200px;
        }

        .imageEp{
          width: 200px;
          position: relative;
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