1. Project Definition
A sandbox ecosystem built with Genetic Algorithms (GA). Critters move, consume food (plants), reproduce, and evolve over time. Plants grow based on a simulation of seed scattering.

2. Environment
Hexagonal Grid:
Includes three tile types:
Land: Default traversable tile.
Water: Plants adjacent to water grow and spawn faster.
Traversing:
Adjacent tiles determined by hexagonal neighbor calculations.
Critters can't traverse on water tiles, or anywhere off-grid.

3. Plants
3.1. Attributes:
Static food source that replenishes energy after consumption.
Adjacent to water: Grow in 15 seconds; otherwise, 30 seconds.
Regrow after consumption.
Regrowth time includes slight variability:
 regrowthTime = baseTime * random(0.8, 1.2)
Depleted plants get their model destroyed.
3.2. Plant Spawns:
3.2.1. Identify Eligible Tiles:
Filter tiles that are land tiles and unoccupied.
3.2.2. Calculate Modifiers:
Water Proximity (M_water):
 M_water = 2 if adjacentToWater(tile) else 1
Seed Dispersal (M_seed):
 M_seed = 1 / (distanceToPlant + 1)
Density Limiter (M_density):
 M_density = max(0.1, 1 - (nearbyPlants(tile, radius=2) / densityThreshold))
3.2.3. Final Probability:
For each eligible tile, calculate:
 P_spawn = P_base * M_water * M_seed * M_density
3.2.4. Spawn Decision:
Generate a random number R between 0 and 1.
If R < P_spawn, spawn a plant on the tile.

4. Critters
Critters spawn with random inheritable genes.
4.1. Inheritable Genes:
4.1.1. Size:
Purpose: Larger critters consume more energy but have higher max energy.
Formulas:
 energyConsumption = baseConsumption * (1 + (size / 100))
maxEnergy = baseEnergy + (size * 2)
4.1.2. Movement Speed:
Purpose: Faster movement consumes more energy.
Formulas:
 movementEnergyCost = baseMoveCost * (1 + (movementSpeed / 100))
Correlation with Size:
 adjustedSpeed = max(baseSpeed * (1 - (size / 200)) + agilityOffset, minSpeed)
Larger critters have reduced movement speed due to increased size.
Example: If baseSpeed = 1, and size = 50, then:
 adjustedSpeed = 1 * (1 - (50 / 200)) = 1 * 0.75 = 0.75
4.1.3. Fertility:
Purpose: Offsets age and energy dependency for reproduction, expanding the range of viable reproduction conditions.
Formulas:
 fertilityThreshold = baseFertility - (fertility / 100) * age
reproductionEnergyCost = 40 - (fertility / 100) * 10
4.1.4. Lifespan:
Purpose: Influences how long a critter can live.
Formulas:
 maxAge = baseLifespan * (1 + (lifespan / 100))
4.1.5. Max Energy:
Purpose: Defines the maximum energy a critter can hold.
Formulas:
 maxEnergy = baseEnergy + (size * 2)
energyReplenished = fixedReplenishmentValue
4.2. Other Traits:
4.2.1. Age:
Purpose: Progresses over time and determines death based on lifespan. Critter models get destroyed on death.
Formulas:
 currentAge = elapsedTime / (lifespan / 20)
ageEnergyModifier = baseEnergy - (age / maxAge) * baseEnergy
Scaled reproduction viability based on lifespan:
 ageReproductionThreshold = maxAge * 0.75
4.2.2. Energy:
Purpose: Central to survival and depletion through movement or time.
Formulas:
 timeEnergyLoss = baseLossRate * elapsedTime
movementEnergyLoss = movementEnergyCost * moves
newEnergy = min(currentEnergy + fixedReplenishmentValue, maxEnergy)
4.3. Behavior:
Random movement unless adjacent to food or a mate.
Prioritizes satisfying the most critical need. If hunger > 50%, prioritize food; otherwise, prioritize reproduction.
Edge Case: If hunger <= 30% and food is available within 2 tiles, prioritize food over reproduction.
Remains stationary if resources are abundant nearby.
Dead critters get their model destroyed.
Fallback for idle critters: If neither food nor mates are detected within range, random movement becomes the default behavior.
4.4. Reproduction:
Triggered when energy is over 30% and age is below ageReproductionThreshold.
Edge Case: If hunger <= 30% and age < ageReproductionThreshold, prioritize reproduction over food.
Offspring inherit averaged genes from parents.
Adaptive mutation rates based on size and movement speed:
 mutationAmount = min(baseMutation * (1 + (size / 100) + (movementSpeed / 100)), maxMutation)
4.5. Visualization:
Spheres with visible status bars for genes and stats toggling on hover.

5. Additional Details and Technicality
Built entirely in JSX React (no TypeScript).
Rendered in 3D using React Three Fiber.
Additional Three Fiber add-ons such as “drei” should be included.
Runs fully client-side in the browser.
Scene should have some simple but nice-looking shaders and lighting.
Colors should be selected from a light pastel color palette.
Hex tiles are drawn with React Three Fiber.
Code should do a check for plant and critter models. If there are models named “plant.glb” and “critter.glb” under the assets folder, those should be used. If none are found, plants should use simple cones, and critters should use simple spheres. Their definitions in the code initially set to scale 1, allowing dynamic adjustment depending on the size gene. Plants should also have a scale parameter, just for visual reasons.
A control panel on the top center of the screen.
Media player-style controls on the control panel: Play, pause, stop, restart, reset, and speed modifier buttons (1x, 10x, 50x, 100x).
Configurable world size, water percentage, initial critters, and initial plants from a menu toggled via a button from the control panel.
Charts menu showing genetic trends and population stats, along with elapsed time (both simulated time and real time) toggled on and off via a button from the control panel.
Individual critters with status bars for genes and stats toggling visible on hover, otherwise invisible.
Separate components for:
Environment (hex grid rendering).
Critters (behavior and traits).
Status bars (dynamic visualization).
Centralized utility functions for movement, reproduction, and mutation logic.
Commenting Guidelines:
Every variable and its definition should have a clear and concise comment.
Every mathematical formula and logic step should be explained in comments for maintainability.
