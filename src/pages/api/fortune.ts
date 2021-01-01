import cheerio from 'cheerio';
import querystring from 'querystring';
import { NextApiRequest, NextApiResponse } from 'next';

const BASE_URL = `https://m.fortune.nate.com/today/todayOriental.nate`;

// type DAY = {
//   '0': 'Today',
//   '1': 'Tommorow',
//   '2': 'Yesterday',
// }

// type ZODIAC_ID = {
//   '00': 'mouse',
//   '01': 'ox',
//   '02': 'tiger',
//   '03': 'rabbit',
//   '04': 'dragon',
//   '05': 'snake',
//   '06': 'hores',
//   '07': 'lamb',
//   '08': 'monkey',
//   '09': 'rooster',
//   '10': 'dog',
//   '11': 'pig'
// }  

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { contsCd = 'CT000136', day = '0', tti = '00' } = req.query;

  const fetchURL = BASE_URL + '?' + querystring.stringify({ contsCd, day, tti });

  try {
    const fetchPromise = await fetch(fetchURL);
    const response = await fetchPromise.text();
    const $ = cheerio.load(response);
    const mainFortuneType = $('.zodiac dt').text();
    const mainFortuneContent = $('.zodiac dd').text();
    const subFortunesTarget = $('.adviceWrap_inner .keyWord');
    const subFortunes = subFortunesTarget.map((_index: number, subFortuneTarget: cheerio.Element) => {
      return {
        title: cheerio(subFortuneTarget).find('dt').text(),
        content: cheerio(subFortuneTarget).find('dd').text()
      }
    }).toArray();

    res.statusCode = 200
    res.setHeader('Content-Type', 'application/json')
    res.json({
      statusCode: 200,
      data: {
        mainFortuneType,
        mainFortuneContent,
        contents: subFortunes
      },
      success: true
    });
  } catch (e) {

    res.statusCode = 400
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify({ errorMessage: e }))
  }
}