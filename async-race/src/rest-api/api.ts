import { apiParams, carInfo } from '../type/types';

export async function getInfo(targetPage: string, parametrs?: apiParams): Promise<Array<carInfo>> {
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

export async function getCar(id: number): Promise<carInfo> {
    const response = await fetch(`http://127.0.0.1:3000/garage/${id}`);
    const car: carInfo = await response.json();

    if (!response.ok) {
        throw new Error(`${response.status}`);
    }
    return car;
}

export async function deleteCar(carId: number) {
    try {
        const response = await fetch(`http://127.0.0.1:3000/garage/${carId}`, {
            method: 'DELETE',
        });

        if (!response.ok) {
            throw new Error(`${response.status}`);
        }
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(`${error.message}`);
        }
    }
}

export async function addCar(carParametrs: { name: string; color: string }) {
    const response = await fetch(`http://127.0.0.1:3000/garage/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(carParametrs),
    });
    const result = await response.json();
    return result;
}

export async function updateCar(carParametrs: { name: string; color: string }, id: number) {
    const response = await fetch(`http://127.0.0.1:3000/garage/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(carParametrs),
    });
    if (!response.ok) {
        throw new Error(`${response.status}`);
    }
    const result = await response.json();
    return result;
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
