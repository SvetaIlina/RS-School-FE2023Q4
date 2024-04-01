import { apiParams, carData, carInfo, InfoResponse } from '../type/types';

export async function getInfo(targetPage: string, parametrs: apiParams): Promise<InfoResponse> {
    const limit = `&_limit=${parametrs.limit}`;
    const page = `?_page=${parametrs.page}`;
    try {
        const response = await fetch(`http://127.0.0.1:3000/${targetPage}${page}${limit}`);

        const info: Array<carInfo> = await response.json();

        const carCount: number | null = Number(response.headers.get('X-Total-Count'));

        return { info, carCount };
    } catch (error) {
        throw new Error(`${error}`);
    }
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

export async function updateCar(carParametrs: carData, id: number) {
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

export async function startStopEngine(id: number, status: string) {
    const response = await fetch(`http://127.0.0.1:3000/engine?id=${id}&status=${status}`, {
        method: 'PATCH',
    });
    if (!response.ok) {
        const text = await response.text();

        throw new Error(`${response.status}: ${text}`);
    }
    const result = await response.json();
    return result;
}

export function switchToDriveMode(id: number, status: string): Promise<void> {
    return fetch(`http://127.0.0.1:3000/engine?id=${id}&status=${status}`, {
        method: 'PATCH',
    })
        .then(async (response) => {
            if (!response.ok || response.status !== 200) {
                const text = await response.text();
                throw new Error(`HTTP error! status ${response.status}: ${text}`);
            }
        })
        .catch((error) => {
            throw new Error(`${error}`);
        });
}
