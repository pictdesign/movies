class MoviesApi {
  constructor({baseUrl, headers}) {
    this.baseUrl = baseUrl
    this.headers = headers
  }

  _parseResponse(res) {
    if (res.ok) {
      return res.json();
    }

    return Promise.reject(`Ошибка: ${res.status}`);
  }

  async getMovies() {
    const response = await fetch(this.baseUrl, {
      headers: this.headers
    })
    return this._parseResponse(response)
  }
}

export const moviesApi = new MoviesApi({
  baseUrl: 'https://api.nomoreparties.co/beatfilm-movies',
  headers: {
    'Content-Type': 'application/json',
  },
})
