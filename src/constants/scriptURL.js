import MAP_JSON from "./map";
const searchURL = {
  GOOGLE_MAP: {
    TEXT_SEARCH: ({ query }) =>
      `${MAP_JSON.api}/place/findplacefromtext/json?input=${query}&inputtype=textquery&fields=photos,formatted_address,name,rating,opening_hours,geometry&key=${MAP_JSON.key}`,
    },
};
const loadScriptURL = {
    initScript : `${MAP_JSON.api}/js?key=${MAP_JSON.key}&libraries=places`
}

export {
    searchURL,
    loadScriptURL,
}


