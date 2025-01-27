// ZoomManager.tsx
import React, { useEffect, useState } from 'react';
import { useViewport } from 'reactflow';

interface ZoomManagerProps {
  onZoomChange: (zoom: number) => void;
}

const ZoomManager: React.FC<ZoomManagerProps> = ({ onZoomChange }) => {
  const { zoom } = useViewport();

  useEffect(() => {
    onZoomChange(zoom);
  }, [zoom, onZoomChange]);

  return null;
};

export default ZoomManager;
