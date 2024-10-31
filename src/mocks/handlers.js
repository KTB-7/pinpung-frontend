import { rest } from 'msw';

export const handlers = [
  rest.get(`${process.env.REACT_APP_API_URL}/places/nearby/:x/:y/:radius`, (req, res, ctx) => {
    const { x, y, radius } = req.params;

    return res(
      ctx.status(200),
      ctx.json({
        count: 15,
        places: [
          {
            placeId: 36,
            hasPung: false,
            imageWithText: null,
            x: '127.027978644718',
            y: '37.5007307950853',
          },
          {
            placeId: 37,
            hasPung: false,
            imageWithText: null,
            x: '127.02796516792077',
            y: '37.50098307994714',
          },
          {
            placeId: 38,
            hasPung: false,
            imageWithText: null,
            x: '127.0264523435014',
            y: '37.501931286572834',
          },
          {
            placeId: 39,
            hasPung: false,
            imageWithText: null,
            x: '127.02531519997575',
            y: '37.50026197173603',
          },
          {
            placeId: 19,
            hasPung: false,
            imageWithText: null,
            x: '127.027458092239',
            y: '37.4998154950733',
          },
          {
            placeId: 41,
            hasPung: false,
            imageWithText: null,
            x: '127.026984456104',
            y: '37.5003940501115',
          },
          {
            placeId: 20,
            hasPung: false,
            imageWithText: null,
            x: '127.030605241506',
            y: '37.4967332799105',
          },
          {
            placeId: 42,
            hasPung: false,
            imageWithText: null,
            x: '127.027074180594',
            y: '37.5014554146078',
          },
          {
            placeId: 44,
            hasPung: false,
            imageWithText: null,
            x: '127.023807097178',
            y: '37.498331428974',
          },
          {
            placeId: 21,
            hasPung: false,
            imageWithText: null,
            x: '127.028443419181',
            y: '37.4976744709989',
          },
          {
            placeId: 22,
            hasPung: false,
            imageWithText: null,
            x: '127.028226866339',
            y: '37.4991954216359',
          },
          {
            placeId: 46,
            hasPung: false,
            imageWithText: null,
            x: '127.02540053176205',
            y: '37.50178014843902',
          },
          {
            placeId: 47,
            hasPung: false,
            imageWithText: null,
            x: '127.02698144077588',
            y: '37.50144282174391',
          },
          {
            placeId: 23,
            hasPung: false,
            imageWithText: null,
            x: '127.031112213726',
            y: '37.497583697643',
          },
          {
            placeId: 24,
            hasPung: false,
            imageWithText: null,
            x: '127.02777433522404',
            y: '37.49871619356776',
          },
        ],
      }),
    );
  }),
  rest.get(`${process.env.REACT_APP_API_URL}/places/:placeId`, (req, res, ctx) => {
    // req.params.placeId로 URL의 placeId 가져옴
    const { placeId } = req.params;

    return res(
      ctx.status(200),
      ctx.json({
        placeName: `Mock Cafe ${placeId}`,
        address: '서울시 강남구 가짜 주소',
        tags: ['커피', '디저트', '편안함'],
        representativePung: {
          imageWithText: 'https://via.placeholder.com/300',
        },
        reviews: {
          reviews: [
            { reviewId: 1, text: '멋진 카페에요!', createdAt: '2023-10-31' },
            { reviewId: 2, text: '커피 맛있고 분위기 좋음!', createdAt: '2023-11-01' },
          ],
        },
      }),
    );
  }),
];
