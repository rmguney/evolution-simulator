export function spawnPlants(grid, baseSpawnProbability) {
    grid.forEach(tile => {
        if (tile.type === 'land' && !tile.occupied) {
            const M_water = tile.adjacentToWater ? 2 : 1;
            const M_seed = 1 / (tile.distanceToNearestPlant + 1);
            const nearbyPlants = countNearbyPlants(tile, 2);
            const M_density = Math.max(0.1, 1 - (nearbyPlants / densityThreshold));
            const P_spawn = baseSpawnProbability * M_water * M_seed * M_density;

            const R = Math.random();
            if (R < P_spawn) {
                spawnPlant(tile);
            }
        }
    });
}

function countNearbyPlants(tile, radius) {