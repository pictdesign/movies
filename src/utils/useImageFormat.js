const isValidURL = (url) => {
  try {
      new URL(url);
  } catch (e) {
      return false;
  }
  return true;
};

export const imageFormat = (image) => {
  const apiUrl = 'https://api.nomoreparties.co/'

  if (isValidURL(image)) {
    return image
  }
  return apiUrl + image.url
}

export const imageThumbnail = (image) => {
  const apiUrl = 'https://api.nomoreparties.co/'
  return apiUrl + image.formats.thumbnail.url
}