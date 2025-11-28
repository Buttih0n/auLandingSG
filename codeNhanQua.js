const token = "Bearer " + document.cookie.match(/vtc-jwt=([^;]+)/)[1];
const apiUrl = 'https://api-gateway.vtcgame.vn/beaupcseagames2025/Event';

const gestList = async (a) => {
	try {
		const response = await fetch(apiUrl, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': token
			},
			body: JSON.stringify({
				"time": 1764340121,
				"fromIP": "",
				"sign": "c6cb12b75c8eb5df60e6f86fe2375db77ddb47a6bb43bc148f3e0cc210b5ae22",
				"makerCode": "AUPC_SeaGame2025",
				"func": "inventory",
				"data": {
					"PageNum": 1,
					"PageSize": 8,
					"EventID": -1,
					"PrizeType": -1,
					"Status": -1,
					"ItemType": a
				}
			}),
		});

		if (!response.ok) {
			throw new Error(`HTTP Error: ${response.status}`);
		}

		return await response.json();
	} catch (error) {
		console.error(`Erreur:`, error.message);
		throw error;
	}
};

const claimPrize = async (i) => {
	try {
		const responseS = await fetch(apiUrl, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': token
			},
			body: JSON.stringify({
				"time": 1764340722,
				"fromIP": "",
				"sign": "52392ba83e2447ce2697d111b793e9c8efd609268a12ce3fa4e8ec7a65ceca5c",
				"makerCode": "AUPC_SeaGame2025",
				"func": "add-item-in-game",
				"data": {
					"AccountReceived": i.AccountName,
					"InGameID": i.InGameID,
					"ItemGender": i.ItemGender,
					"ItemNote": i.ItemNote,
					"LogID": i.LogID,
					"ReceiptType": 1
				}
			})
		});

		if (!responseS.ok) {
			throw new Error(`HTTP Error: ${responseS.status}`);
		}

		return await responseS.json();
	} catch (error) {
		console.error(`Erreur:`, error.message);
		throw error;
	}
};

const processItems = async () => {
	try {
		const response30 = await gestList(30);
		const items30 = response30.data.list;

		for (item of items30) {
			if (!item.AccountReceived) {
				await new Promise(resolve => setTimeout(resolve, 2000));
				const newItemResponse = await claimPrize(item)
				console.log(`${item.ItemName} : newItemResponse.mess`, );
			}
		}
		const response7 = await gestList(7);
		const items7 = response7.data.list;
		for (item of items7) {
			if (!item.AccountReceived) {
				await new Promise(resolve => setTimeout(resolve, 2000));
				const newItemResponse = await claimPrize(item)
				console.log(`${item.ItemName} : newItemResponse.mess`, );
			}
		}
	} catch (error) {
		console.error('Erreur globale:', error.message);
	}
};

processItems();
