
export interface GalleryItemData {
  id: string;
  title: string;
  category: string;
  imageUrl: string;
}

export interface GalleryState {
  hoveredIndex: number | null;
}
