import { Request, Response } from 'express';
import cheerio from 'cheerio';
import watchEpisode from '../utils/WatchEpisodeAnime';
import listEpisodes from '../utils/ListEpisodesAnime';

class EpisodesController {
  async index(request: Request, response: Response) {
    const { idAnime } = request.params;
    const episodes = await listEpisodes(idAnime);

    return response.json(episodes);
  }

  async show(request: Request, response: Response) {
    const { idEpisode } = request.params;
    const episode =  await watchEpisode(idEpisode);

    return response.json(episode);
  }
}

export default EpisodesController;