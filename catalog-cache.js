(() => {
  const CACHE_KEY = 'storeamo.catalog.lastKnownGood.v1';
  const CATALOG_MATCH = '/amoedo7/StoreAMO-Catalog/main/catalog.json';
  const nativeFetch = window.fetch.bind(window);

  function isCatalogRequest(input) {
    try {
      const raw = typeof input === 'string' ? input : input.url;
      const url = new URL(raw, location.href);
      return url.hostname === 'raw.githubusercontent.com' && url.pathname.endsWith(CATALOG_MATCH);
    } catch {
      return false;
    }
  }

  function validCatalog(text) {
    try {
      const data = JSON.parse(text);
      return data && data.schema === 'storeamo.catalog.v1' && Array.isArray(data.apps);
    } catch {
      return false;
    }
  }

  window.fetch = async function storeAmoFetch(input, init) {
    if (!isCatalogRequest(input)) return nativeFetch(input, init);

    try {
      const response = await nativeFetch(input, init);
      if (!response.ok) throw new Error(`catalog HTTP ${response.status}`);
      const text = await response.clone().text();
      if (!validCatalog(text)) throw new Error('invalid catalog schema');
      localStorage.setItem(CACHE_KEY, text);
      return response;
    } catch (error) {
      const cached = localStorage.getItem(CACHE_KEY);
      if (cached && validCatalog(cached)) {
        return new Response(cached, {
          status: 200,
          headers: {
            'Content-Type': 'application/json; charset=utf-8',
            'X-StoreAMO-Source': 'last-known-good-cache'
          }
        });
      }
      throw error;
    }
  };
})();
