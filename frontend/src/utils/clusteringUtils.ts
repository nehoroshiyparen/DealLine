type Topic = {
    title: string;
    tasks: { title: string }[];
  };
  
  type Centroid = {
    x: number;
    y: number;
  };
  
  export const kMeansClusteringOptimized = (topics: Topic[], k: number, maxIterations: number = 100) => {
    const tasksCounts = topics.map((topic) => topic.tasks.length);
  
    const centroids = Array.from({ length: k }, (_, i) => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
    }));
  
    const clusters: any[] = Array(k).fill(null).map(() => []);
    let hasChanged = true;
    let iteration = 0;
  
    while (hasChanged && iteration < maxIterations) {
      hasChanged = false;
      iteration++;
  
      clusters.forEach((cluster) => cluster.length = 0);
  
      topics.forEach((topic) => {
        const topicCenter = { x: topic.tasks.length, y: topic.tasks.length };
  
        let closestCentroidIndex = 0;
        let minDistance = Infinity;
  
        centroids.forEach((centroid, centroidIndex) => {
          const distance = Math.sqrt(
            Math.pow(topicCenter.x - centroid.x, 2) + Math.pow(topicCenter.y - centroid.y, 2)
          );
          if (distance < minDistance) {
            minDistance = distance;
            closestCentroidIndex = centroidIndex;
          }
        });
  
        clusters[closestCentroidIndex].push(topic);
      });
  
      const newCentroids = clusters.map((cluster) => {
        if (cluster.length === 0) return { x: 0, y: 0 };
  
        let sumX = 0;
        let sumY = 0;
        cluster.forEach((topic: Topic) => {
          sumX += topic.tasks.length;
          sumY += topic.tasks.length;
        });
  
        return { x: sumX / cluster.length, y: sumY / cluster.length };
      });
  
      hasChanged = !newCentroids.every((val, index) => val.x === centroids[index].x && val.y === centroids[index].y);
  
      centroids.length = 0;
      centroids.push(...newCentroids);
    }
  
    return clusters;
  };
  
  
  export const getClusterPosition = (
    clusterIndex: number,
    k: number,
    SCREEN_WIDTH: number,
    SCREEN_HEIGHT: number
  ): Centroid => {
    const x = (SCREEN_WIDTH / k) * clusterIndex + Math.random() * 10; 
    const y = Math.random() * SCREEN_HEIGHT;
    return { x, y };
  };
  