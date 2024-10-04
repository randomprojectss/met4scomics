const axios = require('axios');

exports.handler = async (event, context) => {
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
                servers: gameInfo.players,
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

// Function to check if the user is in any server
async function checkUserInServers(serverList, userId) {
    for (const server of serverList) {
        if (server.playerCount > 0) {
            const playersInServerResponse = await axios.get(`https://games.roblox.com/v1/servers/${server.id}/players`);
            const playersInServer = playersInServerResponse.data.data;

            if (playersInServer.some(player => player.userId === parseInt(userId))) {
                return true; // Player found in this server
            }
        }
    }
    return false; // Player not found in any server
}
