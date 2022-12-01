import {
  base_url_image_355_200,
  base_url_image_220_330,
  base_url_image_1920_800,
  base_url_image_300_450,
} from "./config";

export const getUrlImage355x200 = (url?: string) => {
  return `${base_url_image_355_200}${url}`;
};

export const getUrlImage220x330 = (url?: string) => {
  return `${base_url_image_220_330}${url}`;
};

export const getUrlImage300x450 = (url?: string) => {
  return `${base_url_image_300_450}${url}`;
};

export const getUrlImage1920x800 = (url?: string) => {
  return `${base_url_image_1920_800}${url}`;
};
