import { useEffect, useRef } from 'react';
import { X, ArrowRight } from 'lucide-react';
import { VIDEO_PROJECT } from '../config/studioConfig';

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onEnquireVideo: () => void;
}

export function VideoModal({ isOpen, onClose, onEnquireVideo }: VideoModalProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (!isOpen && videoRef.current) {
      videoRef.current.pause();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="video-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md"
      onClick={onClose}
    >
      <div
        className="w-full max-w-5xl rounded-2xl bg-[#11131A] border border-white/[0.12] shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between gap-4 px-5 py-4 bg-[#0C0E14] border-b border-white/[0.08]">
          <div className="min-w-0">
            <p className="text-xs text-[#8B7CFF] font-medium">
              {VIDEO_PROJECT.conceptLabel}
            </p>
            <h3
              id="video-modal-title"
              className="font-display text-lg font-semibold text-white truncate"
            >
              {VIDEO_PROJECT.name}
            </h3>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close video player"
            className="w-9 h-9 rounded-lg border border-white/10 bg-[#11131A] hover:border-white/30 text-[#A1A1AA] hover:text-white inline-flex items-center justify-center transition-colors cursor-pointer shrink-0"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Native 16:9 Cinema Video Player */}
        <div className="bg-black">
          <div className="aspect-video w-full">
            <video
              ref={videoRef}
              src={VIDEO_PROJECT.videoSrc}
              controls
              autoPlay
              playsInline
              className="w-full h-full object-contain bg-black"
            />
          </div>
        </div>

        {/* Footer Caption & CTA */}
        <div className="px-5 py-4 bg-[#0C0E14] border-t border-white/[0.08] flex flex-wrap items-center justify-between gap-4">
          <p className="text-xs text-[#A1A1AA] max-w-2xl">
            {VIDEO_PROJECT.description}
          </p>
          <button
            type="button"
            onClick={() => {
              onClose();
              onEnquireVideo();
            }}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#8B7CFF] hover:bg-[#7A69FF] text-white text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap shrink-0"
          >
            <span>Request a Promotional Video</span>
            <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  );
}
