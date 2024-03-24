import { apiParams, carInfo } from '../type/types';

export default async function getInfo(targetPage: string, parametrs?: apiParams): Promise<Array<carInfo>> {
    let page = '';
    let limit = '';
    if (parametrs) {
        page = `?_page=${parametrs.page}`;
        limit = `&_limit=${parametrs.limit}`;
    }

    const response = await fetch(`http://127.0.0.1:3000/${targetPage}${page}${limit}`);
    const info: Array<carInfo> = await response.json();

    return info;
}
// export async function getWinners(parametrs?: apiParams) {
//     let page = '';
//     let limit = '';
//     if (parametrs) {
//         page = `_page${parametrs.page}`;
//         limit = `_limit${parametrs.limit}`;
//     }

//     const response = await fetch(`http://127.0.0.1:3000/winners${page}${limit}`);
//     const winners = await response.json();
//     return winners;
// }
