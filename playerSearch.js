const axios = require('axios');

exports.handler = async (event) => {
    const { placeId, userId } = JSON.parse(event.body);

    try {
        // Fetch game info from Roblox API
        const gameInfoResponse = await axios.get(`https://games.roblox.com/v1/games/multiplayer/${placeId}`);
        const gameInfo = gameInfoResponse.data;

        // Fetch current game servers
        const serverListResponse = await axios.get(`https://games.roblox.com/v1/games/${placeId}/servers/Public?sortOrder=Desc&limit=10`);
        const serverList = serverListResponse.data.data;

        const playerInServer = await checkUserInServers(serverList, userId);

        return {
            statusCode: 200,
            body: JSON.stringify({
                servers: serverList.length,
                totalPlayers: gameInfo.maxPlayers,
                playerInServer,
            }),
        };
    } catch (error) {
        console.error("Error fetching data:", error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'An error occurred while fetching data.' }),
        };
    }
};

async function checkUserInServers(serverList, userId) {
    for (const server of serverList) {
        if (server.playerCount > 0) {
            try {
                const playersInServerResponse = await axios.get(`https://games.roblox.com/v1/servers/${server.id}/players`);
                const playersInServer = playersInServerResponse.data.data;

                if (playersInServer.some(player => player.userId === parseInt(userId))) {
                    return true; // Player found in this server
                }
            } catch (error) {
                console.error("Error fetching players in server:", error);
            }
        }
    }
    return false; // Player not found in any server
}

