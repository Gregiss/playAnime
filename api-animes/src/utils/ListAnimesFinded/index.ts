import {animesRequest} from '../../services/animeflvbr';
import cheerio from 'cheerio';
import animesSection from '../animesSection';
import paginationAnimes from '../paginationAnimes';

async function listAnimesFinded(search: string, page: number) {
  const urlParam = page == 1 ? '?s=' : `page/${page}?s=`;

  const animes = await animesSection(`${urlParam}${search.replace(/ /g, '+')}`, 0);
  
  const body = await animesRequest.get(`${urlParam}${search}`);
  const paginationNumbers = await paginationAnimes(body.data, 4);

  return {
    info: "ANIMES ENCONTRADOS",
    idAnimes: animes.idAnimes,
    imagesAttributes: animes.imagesAttributes,
    title: animes.title,
    paginationNumbers
  };
}

export default listAnimesFinded;