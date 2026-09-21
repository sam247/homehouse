"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";

type Photo = {
  src: string;
  alt: string;
};

type StaysPhotoGalleryProps = {
  title?: string;
  photos: Photo[];
};

export function StaysPhotoGallery({ title = "Around the house", photos }: StaysPhotoGalleryProps) {
  const [selected, setSelected] = useState<Photo | null>(null);

  if (photos.length === 0) return null;

  return (
    <div className="reveal mt-16 border-t border-border pt-10">
      <p className="text-xs uppercase tracking-[0.3em] text-accent mb-4">Gallery</p>
      <h2 className="font-serif text-3xl md:text-4xl leading-tight mb-8">{title}</h2>
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        {photos.map((photo) => (
          <button
            key={photo.src}
            type="button"
            onClick={() => setSelected(photo)}
            className="aspect-[4/5] overflow-hidden rounded-sm border border-border focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-background"
            aria-label={`Open ${photo.alt}`}
          >
            <img
              src={photo.src}
              alt={photo.alt}
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
            />
          </button>
        ))}
      </div>

      <Dialog open={selected !== null} onOpenChange={(open) => !open && setSelected(null)}>
        <DialogContent className="max-w-5xl border-none bg-transparent p-0 shadow-none">
          <DialogTitle className="sr-only">{selected?.alt ?? "Photo"}</DialogTitle>
          <DialogDescription className="sr-only">Expanded photo view.</DialogDescription>
          {selected ? (
            <div className="overflow-hidden rounded-sm">
              <img src={selected.src} alt={selected.alt} className="max-h-[85vh] w-full object-contain" />
            </div>
          ) : null}
        </DialogContent>
      </Dialog>
    </div>
  );
}
