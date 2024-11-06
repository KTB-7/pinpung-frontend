/* intercept할 API들의 요청과 응답을 작성 */

import { rest } from 'msw';
import { placesNearbyData } from './data/placesNearbyData';
import { placesData } from './data/placesData';

const API_URL = process.env.REACT_APP_API_URL;

// request를 인터셉트하고 response를 핸들링함.
console.log('API_URL:', API_URL); // handlers.js에 추가하여 확인
export const handlers = [
  rest.get(`${API_URL}/api/places/nearby/:x/:y/:radius`, (req, res, ctx) => {
    const { x, y, radius } = req.params;
    console.log(`Captured a "GET /api/places/nearby/${x}/${y}/${radius}" request`);

    return res(ctx.status(200), ctx.json(placesNearbyData));
  }),

  rest.get(`${API_URL}/api/places/:placeId`, (req, res, ctx) => {
    // req.params.placeId로 URL의 placeId 가져옴
    const { placeId } = req.params;
    console.log(`Captured a "GET /api/places/${placeId}" request`);

    return res(ctx.status(200), ctx.json(placesData));
  }),
];
