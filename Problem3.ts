// Represents each neighbour island's distribution paths
type Neighbor = {
    node: string;
    travelTime: number;
    resourceTime: number; // Time taken to plant the resource
  };
  
  // Manages the graph and distribution
  class IslandResourceDistribution {
    private graph: Map<string, Neighbor[]>; // Each island points to an array of Neighbours
    private canoesAvailable: number; // Number of canoes available
    private resourcesDistributed: Set<string>; // Track where resources have been planted
  
    constructor(canoes: number) {
      this.graph = new Map();
      this.canoesAvailable = canoes;
      this.resourcesDistributed = new Set();
    }
  
    // Adds an island and its neighbours to the graph
    addIsland(island: string, neighbors: Neighbor[]): void {
      this.graph.set(island, neighbors);
    }
  
    // Recursive function to manage distribution
    private distributeResource(
      current: string,
      totalTime: number,
      resourceCount: number,
    ): number {
      // If the resource has already been planted, skip
      if (this.resourcesDistributed.has(current)) {
        return resourceCount;
      }
  
      // If not, then plant on the current island
      this.resourcesDistributed.add(current);
      resourceCount++;
  
      const neighbors = this.graph.get(current) || [];
  
      for (const neighbor of neighbors) {
        const { node: nextIsland, travelTime, resourceTime } = neighbor;
  
        // Check if canoe count and time to distribute to the next island
        if (this.canoesAvailable > 0 && totalTime + travelTime + resourceTime < 100) {
          // Simulate the time taken for travelling and planting
          const newTotalTime = totalTime + travelTime + resourceTime;
          this.canoesAvailable--; // Use a canoe
          resourceCount = this.distributeResource(nextIsland, newTotalTime, resourceCount);
          this.canoesAvailable++; // Return the canoe
        }
      }
  
      return resourceCount;
    }
  
    // Initiates distribution from the source island
    distributeFrom(start: string): number {
      this.resourcesDistributed.clear(); // Reset for distribution attempt
      return this.distributeResource(start, 0, 0);
    }
  }