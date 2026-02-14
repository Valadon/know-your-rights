import { qrcode } from '@/lib/qrcode.mjs';

interface QrCodeProps {
  text: string;
  size?: number;
  className?: string;
  label?: string;
}

export default function QrCode({ text, size = 96, className = '', label = 'QR code' }: QrCodeProps) {
  const qr = qrcode(0, 'L');
  qr.addData(text);
  qr.make();

  const moduleCount = qr.getModuleCount();
  const modules: Array<{ x: number; y: number }> = [];

  for (let row = 0; row < moduleCount; row += 1) {
    for (let col = 0; col < moduleCount; col += 1) {
      if (qr.isDark(row, col)) {
        modules.push({ x: col, y: row });
      }
    }
  }

  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox={`0 0 ${moduleCount} ${moduleCount}`}
      role="img"
      aria-label={label}
      shapeRendering="crispEdges"
    >
      <rect width="100%" height="100%" fill="white" />
      {modules.map((module) => (
        <rect key={`${module.x}-${module.y}`} x={module.x} y={module.y} width={1} height={1} fill="black" />
      ))}
    </svg>
  );
}
