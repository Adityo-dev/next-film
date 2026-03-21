import { Film } from 'lucide-react';

interface ImageNoPreviewProps {
  iconSize?: number;
  className?: string;
}

const ImageNoPreview = ({ iconSize = 48, className = '' }: ImageNoPreviewProps) => {
  return (
    <div
      className={`flex h-full w-full flex-col items-center justify-center gap-3 bg-gray-900/50 text-gray-700 backdrop-blur-sm ${className}`}
    >
      <Film size={iconSize} strokeWidth={0.5} />
      <p className="text-xs font-semibold tracking-widest uppercase opacity-60">No Preview</p>
    </div>
  );
};

export default ImageNoPreview;
