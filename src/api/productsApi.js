// Henter ALLE produkter

const BASE_URL = "https://v2.api.noroff.dev/online-shop/";

export async function fetchProducts() {
  try {
    const response = await fetch(BASE_URL);
    const apidata = await response.json();
    return apidata.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
}

// Henter ETT produkt basert på ID
export async function fetchProductById(id) {
  console.log(`🔍 Fetching product with ID:`, id); // ✅ Debugging

  try {
    const response = await fetch(`https://v2.api.noroff.dev/online-shop/${id}`);
    console.log(`🔍 API response status:`, response.status); // ✅ Debugging

    if (!response.ok) {
      throw new Error(
        `❌ API error: ${response.status} ${response.statusText}`
      );
    }

    const apidata = await response.json();
    console.log(`🔍 API response JSON:`, apidata); // ✅ Debugging

    return apidata.data;
  } catch (error) {
    console.error(`❌ Error fetching product with ID ${id}:`, error);
    return null;
  }
}
