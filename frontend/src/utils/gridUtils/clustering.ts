import { Task, Topic } from "../../types";
  
  type Centroid = {
    x: number;
    y: number;
  };
  
  export const kMeansClusteringElements = (
    elements: Topic[] | Task[],
    k: number,
    maxIterations: number = 100
  ) => {
    // Инициализация центроидов
    const centroids = Array.from({ length: k }, (_, i) => ({
      x: (i + 1) * (100 / (k + 1)),
      y: Math.random() * 100,
    }));
  
    const clusters: any[] = Array.from({ length: k }, () => []);
    let hasChanged = true;
    let iteration = 0;
  
    while (hasChanged && iteration < maxIterations) {
      hasChanged = false;
      iteration++;
  
      // Очистка кластеров
      clusters.forEach((cluster) => (cluster.length = 0));
  
      // Назначение элементов к ближайшим центроидам
      elements.forEach((element) => {
        const elementCenter = (element: Topic | Task): { x: number; y: number } => {
          if ("tasks" in element) {
            return {
              x: element.tasks.length,
              y: element.tasks.length,
            };
          } else {
            return {
              x: Math.random() * 10,
              y: Math.random() * 10,
            };
          }
        };
  
        const result = elementCenter(element);
  
        let closestCentroidIndex = 0;
        let minDistance = Infinity;
  
        centroids.forEach((centroid, centroidIndex) => {
          const distance = Math.sqrt(
            Math.pow(result.x - centroid.x, 2) + Math.pow(result.y - centroid.y, 2)
          );
          if (distance < minDistance) {
            minDistance = distance;
            closestCentroidIndex = centroidIndex;
          }
        });
  
        clusters[closestCentroidIndex].push(element);
      });
  
      // Обновление центроидов
      const newCentroids = clusters.map((cluster) => {
        if (cluster.length === 0) {
          return {
            x: Math.random() * 100, // Случайный центроид, если кластер пуст
            y: Math.random() * 100,
          };
        }
  
        let sumX = 0;
        let sumY = 0;
  
        cluster.forEach((element: Topic | Task) => {
          if ("tasks" in element) {
            sumX += element.tasks.length;
            sumY += element.tasks.length;
          } else {
            sumX += Math.random() * elements.length;
            sumY += Math.random() * elements.length;
          }
        });
  
        return { x: sumX / cluster.length, y: sumY / cluster.length };
      });
  
      // Проверка на изменения центроидов
      const epsilon = 0.01;
      hasChanged = !newCentroids.every(
        (val, index) =>
          Math.abs(val.x - centroids[index].x) < epsilon &&
          Math.abs(val.y - centroids[index].y) < epsilon
      );
  
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
  