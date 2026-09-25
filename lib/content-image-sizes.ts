// Intrinsic dimensions of the supplied article images in public/media.
// Keep these in sync when an article image is replaced.
export const contentImageSizes: Record<string, { width: number; height: number }> = {
  "/media/prenatal-first-checkups.webp": { width: 1600, height: 1600 },
  "/media/prenatal-first-food.webp": { width: 700, height: 467 },
  "/media/prenatal-second.webp": { width: 600, height: 400 },
  "/media/prenatal-third.webp": { width: 750, height: 267 },
  "/media/nutrition-document.jpg": { width: 1280, height: 720 },
  "/media/family-planning.webp": { width: 960, height: 1440 },
  "/media/health-first.webp": { width: 286, height: 296 },
  "/media/health-second.webp": { width: 242, height: 296 },
  "/media/health-third.webp": { width: 246, height: 296 },
  "/media/emotional-first.webp": { width: 1100, height: 550 },
  "/media/emotional-second.webp": { width: 800, height: 400 },
  "/media/emotional-third.webp": { width: 1100, height: 629 },
  "/media/provider-document.jpg": { width: 1000, height: 741 },
  "/media/community-resources.webp": { width: 1024, height: 579 },
  "/media/record-mother-baby-book.webp": { width: 768, height: 1024 },
  "/media/record-prenatal-visit.webp": { width: 1122, height: 1423 },
  "/media/record-ultrasound.webp": { width: 695, height: 900 },
  "/media/record-referral.webp": { width: 1142, height: 822 },
  "/media/record-lab-results.webp": { width: 768, height: 1024 },
  "/media/record-immunization.webp": { width: 793, height: 531 },
};

export function articleImageWidth({ width, height }: { width: number; height: number }) {
  return Math.round(width * Math.min(1, 850 / width, 520 / height));
}
