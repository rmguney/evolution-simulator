# Project Definition
A sandbox ecosystem built with Genetic Algorithms (GA). Critters move, consume food (plants), reproduce, and evolve over time. Plants grow based on a simulation of seed scattering.

---

## 1. Environment

### Hexagonal Grid
- **Tile Types:**
  1. **Land**: Default traversable tile.
  2. **Water**: Plants adjacent to water grow and spawn faster.
- **Traversing**:
  - Adjacent tiles are determined by hexagonal neighbor calculations.
  - Critters can't traverse water tiles or go off-grid.

---

## 2. Plants

### 2.1. Attributes
- **Static food source** that replenishes energy after consumption.
- **Growth Timing**:
  - Adjacent to water: 15 seconds.
  - Not adjacent to water: 30 seconds.
- **Regrowth Time Variability**:
  ```
  regrowthTime = baseTime * random(0.8, 1.2)
  ```
- Depleted plants are visually removed from the environment.

### 2.2. Plant Spawns

#### 2.2.1. Identify Eligible Tiles
- Filter tiles that are land tiles and unoccupied.

#### 2.2.2. Calculate Modifiers
1. **Water Proximity (M_water):**
   ```
   M_water = 2 if adjacentToWater(tile) else 1
   ```
2. **Seed Dispersal (M_seed):**
   ```
   M_seed = 1 / (distanceToPlant + 1)
   ```
3. **Density Limiter (M_density):**
   ```
   M_density = max(0.1, 1 - (nearbyPlants(tile, radius=2) / densityThreshold))
   ```

#### 2.2.3. Final Probability
- For each eligible tile, calculate:
  ```
  P_spawn = P_base * M_water * M_seed * M_density
  ```

#### 2.2.4. Spawn Decision
- Generate a random number `R` between 0 and 1.
- If `R < P_spawn`, spawn a plant on the tile.

---

## 3. Critters

### 3.1. Inheritable Genes

#### 3.1.1. Size
- **Purpose**: Larger critters consume more energy but have higher max energy.
- **Formulas**:
  ```
  energyConsumption = baseConsumption * (1 + (size / 100))
  maxEnergy = baseEnergy + (size * 2)
  ```

#### 3.1.2. Movement Speed
- **Purpose**: Faster movement consumes more energy.
- **Formulas**:
  ```
  movementEnergyCost = baseMoveCost * (1 + (movementSpeed / 100))
  ```
- **Size Correlation**:
  ```
  adjustedSpeed = max(baseSpeed * (1 - (size / 200)) + agilityOffset, minSpeed)
  ```

#### 3.1.3. Fertility
- **Purpose**: Modulates reproduction conditions.
- **Formulas**:
  ```
  fertilityThreshold = baseFertility - (fertility / 100) * age
  reproductionEnergyCost = 40 - (fertility / 100) * 10
  ```

#### 3.1.4. Lifespan
- **Purpose**: Determines critter longevity.
- **Formulas**:
  ```
  maxAge = baseLifespan * (1 + (lifespan / 100))
  ```

#### 3.1.5. Max Energy
- **Purpose**: Defines maximum energy capacity.
- **Formulas**:
  ```
  maxEnergy = baseEnergy + (size * 2)
  ```

### 3.2. Other Traits

#### 3.2.1. Age
- **Purpose**: Tracks critter lifespan.
- **Formulas**:
  ```
  currentAge = elapsedTime / (lifespan / 20)
  ```

#### 3.2.2. Energy
- **Purpose**: Central to survival.
- **Formulas**:
  ```
  timeEnergyLoss = baseLossRate * elapsedTime
  movementEnergyLoss = movementEnergyCost * moves
  ```

### 3.3. Behavior
- Random movement unless adjacent to food or mates.
- Prioritizes:
  - Hunger > 50% → Food.
  - Hunger <= 30% → Reproduction if conditions are met.

### 3.4. Reproduction
- **Conditions**:
  - Energy > 30%.
  - Age < `ageReproductionThreshold`.
- **Gene Inheritance**:
  - Offspring inherit averaged genes from parents.
  - Mutation influenced by size and movement speed.

### 3.5. Visualization
- Models:
  - Spheres for critters.
  - Status bars toggle on hover.

---

## 4. Technical Details

### Frameworks
- **JSX React** (no TypeScript).
- Rendered with **React Three Fiber**.

### Features
1. Hex grid rendering.
2. Client-side operation.
3. **Control Panel**:
   - Media controls: Play, pause, reset, speed modifiers.
   - Configurable settings for world size, critter/plants count.
4. **Charts**:
   - Genetic trends and population stats.
5. **Dynamic Models**:
   - Plants: Cones (or `plant.glb` if available).
   - Critters: Spheres (or `critter.glb` if available).

### Components
1. **Environment**: Handles hex grid rendering.
2. **Critters**: Behavior and traits.
3. **Status Bars**: Dynamic visualization.
4. **Utility Functions**: Movement, reproduction, mutation logic.

### Commenting Guidelines
- Clear comments for variables and formulas.
- Logic steps must be explained.