const BASE_URL = "http://localhost:3000";
const BASE_API_URL = `${BASE_URL}/characters`;

export const get = id => {
  return fetch(`${BASE_API_URL}/${id}`).then(response => response.json());
};

export const getList = params => {
  const { page = 1, size = 10, sort, isAscOrder, search } = params;

  let queryParams = [];
  if (typeof page !== "undefined") {
    queryParams.push(`_page=${page}`);
  }

  if (typeof size !== "undefined") {
    queryParams.push(`_limit=${size}`);
  }

  if (typeof search !== "undefined") {
    queryParams.push(`q=${encodeURIComponent(search)}`);
  }

  if (typeof sort !== "undefined") {
    queryParams.push(`_sort=${encodeURIComponent(sort)}`);
  }

  if (typeof isAscOrder !== "undefined") {
    queryParams.push(`_order=${isAscOrder ? "asc" : "desc"}`);
  }

  let apiUrl = `${BASE_API_URL}?${queryParams.join("&")}`;

  return fetch(apiUrl).then(response => {
    return response.json().then(data => {
      return {
        data: data,
        totalItems: response.headers.get("X-Total-Count")
      };
    });
  });
};

export const save = character => {
  const { id } = character;
  const toEdit = typeof id !== "undefined" && id !== null;
  return fetch(`${BASE_API_URL}/${toEdit ? id : ""}`, {
    method: toEdit ? "PUT" : "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(character)
  }).then(response => response.json());
};

export const remove = character => {
  const { id } = character;
  return fetch(`${BASE_API_URL}/${id}`, { method: "DELETE" });
};
