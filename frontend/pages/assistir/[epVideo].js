import Head from 'next/head'
import axios from 'axios';
import { useRouter } from 'next/router'

function Video({animeVideo, error}) {
    if (error) {
      return <div>An error occured: {error.message}</div>;
    }
    return (
    <div className="container">
      <Head>
        <title>NekoWatch - Assistindo</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1>
       <video 
       control
       autoplay src={animeVideo.file_sd}></video>
      </h1>

      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
        }

        * {
          box-sizing: border-box;
        }
      `}</style>
    </div>
  )
}


Video.getInitialProps = async ({ctx, query}) => {
  try {
    const res = await axios.get(`http://localhost:3333/video/${query.epVideo}`);
    const animeVideo = res.data;
    return { animeVideo };
  } catch (error) {
    return { error };
  }
};

export default Video