/* 작성한 핸들러가 브라우저에서 동작할 수 있도록 설정하는 파일 */

import { setupWorker } from 'msw';
import { handlers } from './handlers';

export const worker = setupWorker(...handlers, { onUnhandledRequest: 'bypass' });
