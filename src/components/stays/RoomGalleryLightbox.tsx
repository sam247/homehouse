"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";

type RoomGalleryLightboxProps = {
  roomName: string;
  images: string[];
};

export function RoomGalleryLightbox({ roomName, images }: RoomGalleryLightboxProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  if (images.length === 0) return null;

  return (
    <>
      <div className="mt-3 grid grid-cols-3 gap-2">
        {images.map((image, index) => (
          <button
            key={image}
            type="button"
            onClick={() => setSelectedImage(image)}
            className="aspect-square overflow-hidden rounded-sm border border-border focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-background"
            aria-label={`Open ${roomName} photo ${index + 1}`}
          >
            <img
              src={image}
              alt={`${roomName} thumbnail ${index + 1}`}
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
            />
          </button>
        ))}
      </div>

      <Dialog open={selectedImage !== null} onOpenChange={(open) => !open && setSelectedImage(null)}>
        <DialogContent className="max-w-5xl border-none bg-transparent p-0 shadow-none">
          <DialogTitle className="sr-only">{roomName} photo gallery</DialogTitle>
          <DialogDescription className="sr-only">Expanded photo view for {roomName}.</DialogDescription>
          {selectedImage ? (
            <div className="overflow-hidden rounded-sm">
              <img src={selectedImage} alt={roomName} className="max-h-[85vh] w-full object-contain" />
            </div>
          ) : null}
        </DialogContent>
      </Dialog>
    </>
  );
}
