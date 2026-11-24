import images from '@/data/coastalImages.json';

export function coastalImage(name: keyof typeof images) {
  const { width, height } = images[name];
  const candidates = [320, 640, 960, 1440].filter((value, index, all) => index === 0 || all[index - 1] < width);
  return {
    src: `/images/coastal-v1/${name}-960.webp`,
    srcSet: candidates.map(size => `/images/coastal-v1/${name}-${size}.webp ${Math.min(size, width)}w`).join(', '),
    width,
    height,
  };
}
