const axios = require('axios');

exports.handler = async (event) => {
    try {
        const { placeId, userId } = JSON.parse(event.body);

        // Validate inputs
        if (!placeId || !userId) {
            return {
                statusCode: 400,
                body: JSON.stringify({ error: 'Place ID and User ID are required.' }),
            };
        }

        // Fetch game info
        const gameInfoResponse = await axios.get(`https://games.roblox.com/v1/games/multiplayer/${placeId}`);
        const gameInfo = gameInfoResponse.data;

        // Fetch current game servers
        const serverListResponse = await axios.get(`https://games.roblox.com/v1/games/${placeId}/servers/Public?sortOrder=Desc&limit=10`);
        const serverList = serverListResponse.data.data;

        // Check if the user is in any server
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
        console.error("Error fetching data:", error.message); // Log the error message
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'An error occurred while fetching data.', details: error.message }),
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
                console.error("Error fetching players in server:", error.message);
            }
        }
    }
    return false; // Player not found in any server
}
