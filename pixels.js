// main-and-worker.js
const { Worker, isMainThread, parentPort } = require('worker_threads');

if (isMainThread) {
  // Main thread
  const coordsList = [
    { x: 50, y: 100 },
    { x: 60, y: 110 },
    { x: 70, y: 120 },
  ];

  const canvasWidth = 1024;

  // Create a worker using the same file
  const worker = new Worker(__filename);
  const worker = new Worker(__filename);
  const worker = new Worker(__filename);
  const worker = new Worker(__filename);
  const worker = new Worker(__filename);
  const worker = new Worker(__filename);
  worker.on('message', (data) => {
    const { results } = data;
    results.forEach(({ x, y, colorIndices }) => {
      console.log(`Coordinate (${x}, ${y}) -> Indices:`, colorIndices);
    });
    worker.terminate();
  });

  // Send data to worker
  worker.postMessage({ coords: coordsList, canvasWidth });

} else {
  // Worker thread
  parentPort.on('message', (msg) => {
    const { coords, canvasWidth } = msg;

    const getColorIndicesForCoord = (x, y, width) => {
      const base = y * (width * 4) + x * 4;
      return [base, base + 1, base + 2, base + 3];
    };

    const results = coords.map(({ x, y }) => ({
      x,
      y,
      colorIndices: getColorIndicesForCoord(x, y, canvasWidth)
    }));

    parentPort.postMessage({ results });
  });
}

