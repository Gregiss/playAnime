import { Request, Response } from 'express';
import cheerio from 'cheerio';
import {animesRequest} from '../services/animeflvbr';
import { animesCommons, lastEntriesEpisodes, animesList } from '../utils/Home';

class HomeController {

  async index(request: Request, response: Response) {
    const { page = 1 } = request.params;
    const body = await animesRequest.get(`/lista/pagina/${page}`);
    const $ = cheerio.load(body.data);
    const animes = new Array()
    $('.loadscrollleft').find($('.ansArea').find('.item-an')).each(function(i: number, element) {
      const idAnime = $(element).find('.post').find('a').attr('href')?.split('/')[2]
      const photo = `https://www.branitube.net${$(element).find('.post').find('a').find('img').attr('src')}`
      const name = $(element).find('.namean').find('a').text()
      animes.push({
        name: name,
        idAnime: idAnime,
        photo: photo.replace('300','1200')
      })
    })

    return response.json({animes});
  }

}

export default HomeController;

