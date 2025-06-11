import { useEffect, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import type { CalculationResults } from "@/pages/home";

interface JumpVisualizationProps {
  results: CalculationResults | null;
}

export default function JumpVisualization({ results }: JumpVisualizationProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !results) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * window.devicePixelRatio;
    canvas.height = rect.height * window.devicePixelRatio;
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio);

    // Clear canvas
    ctx.clearRect(0, 0, rect.width, rect.height);

    // Draw visualization
    drawJumpVisualization(ctx, rect.width, rect.height, results);
  }, [results]);

  const drawJumpVisualization = (
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number,
    results: CalculationResults
  ) => {
    const padding = 40;
    const chartWidth = width - 2 * padding;
    const chartHeight = height - 2 * padding;

    // Colors
    const primaryColor = '#FF6B35';
    const secondaryColor = '#2563EB';
    const successColor = '#10B981';
    const gridColor = '#E5E7EB';

    // Draw background
    ctx.fillStyle = '#F9FAFB';
    ctx.fillRect(0, 0, width, height);

    // Draw grid
    ctx.strokeStyle = gridColor;
    ctx.lineWidth = 1;
    
    // Vertical grid lines
    for (let i = 0; i <= 10; i++) {
      const x = padding + (chartWidth / 10) * i;
      ctx.beginPath();
      ctx.moveTo(x, padding);
      ctx.lineTo(x, height - padding);
      ctx.stroke();
    }

    // Horizontal grid lines
    for (let i = 0; i <= 6; i++) {
      const y = padding + (chartHeight / 6) * i;
      ctx.beginPath();
      ctx.moveTo(padding, y);
      ctx.lineTo(width - padding, y);
      ctx.stroke();
    }

    // Calculate jump trajectory
    const maxHeight = Math.max(results.requiredVertical, 36); // At least 36 inches for scale
    const timePoints = 20;
    const totalTime = results.hangTime;
    
    // Draw jump arc
    ctx.strokeStyle = primaryColor;
    ctx.lineWidth = 3;
    ctx.beginPath();

    for (let i = 0; i <= timePoints; i++) {
      const t = (i / timePoints) * totalTime;
      const normalizedTime = t / totalTime;
      
      // Physics: h = v₀t - (1/2)gt²
      // At peak: t = totalTime/2, so we can calculate trajectory
      const peakTime = totalTime / 2;
      let jumpHeight;
      
      if (t <= peakTime) {
        // Going up
        jumpHeight = results.requiredVertical * (t / peakTime);
      } else {
        // Coming down
        jumpHeight = results.requiredVertical * (2 - t / peakTime);
      }
      
      const x = padding + (chartWidth * normalizedTime);
      const y = height - padding - (jumpHeight / maxHeight) * chartHeight;
      
      if (i === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    }
    ctx.stroke();

    // Draw required height line
    const requiredY = height - padding - (results.requiredVertical / maxHeight) * chartHeight;
    ctx.strokeStyle = secondaryColor;
    ctx.lineWidth = 2;
    ctx.setLineDash([5, 5]);
    ctx.beginPath();
    ctx.moveTo(padding, requiredY);
    ctx.lineTo(width - padding, requiredY);
    ctx.stroke();
    ctx.setLineDash([]);

    // Draw rim level (if showing)
    const rimY = height - padding - (30 / maxHeight) * chartHeight; // Assume 30" is typical reach above ground
    ctx.strokeStyle = '#DC2626';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(padding, rimY);
    ctx.lineTo(width - padding, rimY);
    ctx.stroke();

    // Add labels
    ctx.fillStyle = '#374151';
    ctx.font = '12px Inter, system-ui, sans-serif';
    ctx.textAlign = 'left';

    // Required height label
    ctx.fillText(`Required: ${results.requiredVertical.toFixed(1)}"`, padding + 10, requiredY - 5);

    // Rim level label
    ctx.fillText('Rim Level', padding + 10, rimY - 5);

    // Time axis labels
    ctx.textAlign = 'center';
    ctx.fillText('0s', padding, height - 10);
    ctx.fillText(`${(totalTime/2).toFixed(2)}s`, padding + chartWidth/2, height - 10);
    ctx.fillText(`${totalTime.toFixed(2)}s`, width - padding, height - 10);

    // Height axis labels
    ctx.textAlign = 'right';
    ctx.fillText('0"', padding - 10, height - padding);
    ctx.fillText(`${(maxHeight/2).toFixed(0)}"`, padding - 10, padding + chartHeight/2);
    ctx.fillText(`${maxHeight.toFixed(0)}"`, padding - 10, padding);

    // Draw player figure at peak
    const peakX = padding + chartWidth / 2;
    const peakY = height - padding - (results.requiredVertical / maxHeight) * chartHeight;
    
    // Simple stick figure
    ctx.strokeStyle = successColor;
    ctx.lineWidth = 2;
    
    // Head
    ctx.beginPath();
    ctx.arc(peakX, peakY - 20, 6, 0, 2 * Math.PI);
    ctx.stroke();
    
    // Body
    ctx.beginPath();
    ctx.moveTo(peakX, peakY - 14);
    ctx.lineTo(peakX, peakY + 10);
    ctx.stroke();
    
    // Arms (reaching up)
    ctx.beginPath();
    ctx.moveTo(peakX, peakY - 5);
    ctx.lineTo(peakX - 8, peakY - 15);
    ctx.moveTo(peakX, peakY - 5);
    ctx.lineTo(peakX + 8, peakY - 15);
    ctx.stroke();
    
    // Legs
    ctx.beginPath();
    ctx.moveTo(peakX, peakY + 10);
    ctx.lineTo(peakX - 6, peakY + 20);
    ctx.moveTo(peakX, peakY + 10);
    ctx.lineTo(peakX + 6, peakY + 20);
    ctx.stroke();
  };

  if (!results) {
    return (
      <Card className="border-2 border-gray-200 rounded-xl">
        <CardContent className="p-6" style={{ minHeight: '300px' }}>
          <h4 className="text-lg font-semibold mb-4 text-gray-900">Jump Visualization</h4>
          <div className="w-full h-64 bg-gray-50 rounded-lg flex items-center justify-center">
            <div className="text-center text-gray-500">
              <svg className="w-16 h-16 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
              <p className="text-lg">Interactive graph will appear here</p>
              <p className="text-sm">Showing your jump trajectory and requirements</p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-2 border-gray-200 rounded-xl">
      <CardContent className="p-6" style={{ minHeight: '300px' }}>
        <h4 className="text-lg font-semibold mb-4 text-gray-900">Jump Visualization</h4>
        <div className="w-full h-64 relative">
          <canvas
            ref={canvasRef}
            className="w-full h-full rounded-lg border border-gray-200"
            style={{ width: '100%', height: '100%' }}
          />
        </div>
        <div className="mt-4 flex flex-wrap gap-4 text-sm">
          <div className="flex items-center">
            <div className="w-4 h-1 bg-basketball-orange mr-2"></div>
            <span>Jump Trajectory</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-1 bg-court-blue mr-2" style={{ borderStyle: 'dashed' }}></div>
            <span>Required Height</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-1 bg-red-600 mr-2"></div>
            <span>Rim Level</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
