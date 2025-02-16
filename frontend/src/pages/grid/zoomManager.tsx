// ZoomManager.tsx
import React, { useEffect } from 'react';
import { useViewport } from 'reactflow';

interface ZoomManagerProps {
  onZoomChange: (zoom: number) => void;
}

const ZoomManager: React.FC<ZoomManagerProps> = ({ onZoomChange }) => {
  const { zoom } = useViewport();

  useEffect(() => {
    onZoomChange(zoom);
  }, [zoom, onZoomChange]);

  useEffect(() => {
    return () => {
      document.documentElement.style.setProperty('--theme-node-opacity', '1');
      document.documentElement.style.setProperty('--task-node-opacity', '0');
    }
  }, [])

  useEffect(() => {
    if (zoom > 1) {
        document.documentElement.style.setProperty('--theme-node-opacity', (1.5 - zoom*0.5).toString());
        document.documentElement.style.setProperty('--task-node-opacity', (zoom-1).toString());
        if (zoom > 1.2) {
            document.documentElement.style.setProperty('--theme-z-index', '0');
            document.documentElement.style.setProperty('--task-z-index', '1');
        }
    } else {
        document.documentElement.style.setProperty('--theme-node-opacity', '1');
        document.documentElement.style.setProperty('--task-node-opacity', '0');
        if (zoom < 1.2) {
            document.documentElement.style.setProperty('--theme-z-index', '1');
            document.documentElement.style.setProperty('--task-z-index', '0');
        }
    }
}, [zoom])

  return null;
};

export default ZoomManager;
