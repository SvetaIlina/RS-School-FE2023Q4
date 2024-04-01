import { apiParams, carData, carInfo, CarsResponse, winnerCar, WinnerResponse } from '../type/types';

export async function getCars(parametrs: apiParams): Promise<CarsResponse> {
    const limit = `&_limit=${parametrs.limit}`;
    const page = `?_page=${parametrs.page}`;
    try {
        const response = await fetch(`http://127.0.0.1:3000/garage${page}${limit}`);

        const info: Array<carInfo> = await response.json();

        const membersCount: number | null = Number(response.headers.get('X-Total-Count'));

        return { info, membersCount };
    } catch (error) {
        throw new Error(`${error}`);
    }
}
export async function getAllWinners(parametrs: apiParams): Promise<WinnerResponse> {
    const limit = `&_limit=${parametrs.limit}`;
    const page = `?_page=${parametrs.page}`;
    try {
        const response = await fetch(`http://127.0.0.1:3000/winners${page}${limit}`);

        const info: Array<winnerCar> = await response.json();

        const membersCount: number | null = Number(response.headers.get('X-Total-Count'));

        return { info, membersCount };
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

export async function createWinner(winnerCarinfo: winnerCar) {
    const response = await fetch(`http://127.0.0.1:3000/winners/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(winnerCarinfo),
    });

    if (response.status === 500) {
        const text = await response.text();
        throw new Error(`${text}`);
    }
    const result = await response.json();
    return result;
}
export async function updateWinner(winnerCarinfo: winnerCar) {
    const response = await fetch(`http://127.0.0.1:3000/winners/${winnerCarinfo.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            wins: winnerCarinfo.wins,
            time: winnerCarinfo.time,
        }),
    });

    const result = await response.json();
    return result;
}
export async function getWinner(id: number) {
    const response = await fetch(`http://127.0.0.1:3000/winners/${id}`);
    const winner: winnerCar = await response.json();
    if (response.status === 404) {
        throw new Error(`${response.statusText}`);
    }
    return winner;
}

export async function addWinner(winnerCarinfo: winnerCar) {
    try {
        const winner = await getWinner(winnerCarinfo.id);
        const { id, wins } = winner;
        const { time } = winnerCarinfo;
        updateWinner({
            id,
            wins: wins + 1,
            time,
        });
    } catch (error) {
        console.error(error);
        createWinner(winnerCarinfo);
    }
}
