export async function SearchGenres() {
	var query = `
        query{
            GenreCollection
        }
    `;
	var url = "https://graphql.anilist.co";

	var options = {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			query: query,
		}),
	};

	const data = await fetch(url, options)
		.then((response) => response.json())
		.then((data) => {
			return data.data.GenreCollection;
		});

	return data;
}

export async function InitialSearch(params) {
	var url = "https://graphql.anilist.co";
	var variables = {
		page: 1,
		perPage: 20,
	};
	Object.assign(variables, params);
	var query = `
        query ($search:String, $page: Int, $perPage: Int, $genre: String) {
        Page (page: $page, perPage: $perPage) {
            pageInfo {
              total
              currentPage
              lastPage
              hasNextPage
              perPage
            }
            media (type: MANGA format:NOVEL sort:POPULARITY_DESC search:$search genre:$genre) {
            id
            title {
                romaji
            }
            coverImage {
                extraLarge
                large
                medium
                color
            }
            }
        }
        }
        `;

	var options = {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			query: query,
			variables: variables,
		}),
	};

	const data = await fetch(url, options)
		.then((response) => response.json())
		.then((data) => {
			return data.data;
		});

	return data.Page;
}

export async function SearchNovels(params) {
	var url = "https://graphql.anilist.co";
	var variables = {
		page: 1,
		perPage: 20,
	};

	Object.assign(variables, params);
	console.log(variables);
	var query = `
        query ($search:String, $page: Int, $perPage: Int, $yearLesser:FuzzyDateInt, $yearGreater: FuzzyDateInt, $genere: String, $status: MediaStatus $sortBy:[MediaSort]) {
        Page (page: $page, perPage: $perPage) {
            pageInfo {
              total
              currentPage
              lastPage
              hasNextPage
              perPage
            }
            media (type: MANGA format:NOVEL search:$search genre:$genere status:$status startDate_greater:$yearGreater startDate_lesser:$yearLesser sort:$sortBy) {
            id
            title {
              romaji
            }
            coverImage {
                extraLarge
                large
                medium
                color
            }
            }
        }
        }
        `;

	var options = {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			query: query,
			variables: variables,
		}),
	};

	const data = await fetch(url, options)
		.then((response) => response.json())
		.then((data) => {
			return data.data;
		});
	console.log(data);
	return data.Page;
}

export async function SearchNovel(params) {
	var url = "https://graphql.anilist.co";
	var variables = {
		id: params,
	};
	console.log(params);
	var query = `
      query ($id:Int) {
        Media (id:$id) {
          id
          description
          genres
          title {
            romaji
          }
          coverImage {
              extraLarge
              large
              medium
              color
          }
        }
      }
        `;

	var options = {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			query: query,
			variables: variables,
		}),
	};

	const data = await fetch(url, options)
		.then((response) => response.json())
		.then((data) => {
			return data.data;
		});
	console.log("holaas");
	console.log(data);
	return data.Media;
}
