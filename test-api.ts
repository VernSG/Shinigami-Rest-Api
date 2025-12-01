import axios from "axios";

const BASE_URL = "http://localhost:3000/api";

async function testAPI() {
  console.log("🧪 Testing Shinigami REST API\n");

  try {
    // 1. Test Health Check
    console.log("1️⃣  Testing Health Check...");
    const health = await axios.get(`${BASE_URL}/health`);
    console.log("✅ Health:", health.data);
    console.log("");

    // 2. Test Popular Manga
    console.log("2️⃣  Testing Popular Manga...");
    const popular = await axios.get(`${BASE_URL}/manga/popular?page=1`);
    console.log("✅ Popular Manga Count:", popular.data.data.mangas.length);

    if (popular.data.data.mangas.length > 0) {
      const firstManga = popular.data.data.mangas[0];
      console.log("   First Manga:", {
        title: firstManga.title,
        url: firstManga.url,
      });
      console.log("");

      // 3. Test Manga Details (using first popular manga)
      console.log("3️⃣  Testing Manga Details...");
      const mangaId = firstManga.url;
      console.log("   Manga ID:", mangaId);

      try {
        const details = await axios.get(`${BASE_URL}/manga/${mangaId}`);
        console.log("✅ Manga Details:", {
          title: details.data.data.title,
          author: details.data.data.author,
          status: details.data.data.status,
        });
        console.log("");

        // 4. Test Chapter List
        console.log("4️⃣  Testing Chapter List...");
        const chapters = await axios.get(
          `${BASE_URL}/manga/${mangaId}/chapters`
        );
        console.log("✅ Chapters Count:", chapters.data.data.length);

        if (chapters.data.data.length > 0) {
          const firstChapter = chapters.data.data[0];
          console.log("   First Chapter:", {
            name: firstChapter.name,
            url: firstChapter.url,
          });
          console.log("");

          // 5. Test Page List
          console.log("5️⃣  Testing Page List...");
          const chapterId = firstChapter.url;
          const pages = await axios.get(
            `${BASE_URL}/manga/chapter/${chapterId}/pages`
          );
          console.log("✅ Pages Count:", pages.data.data.length);

          if (pages.data.data.length > 0) {
            console.log("   First Page URL:", pages.data.data[0].imageUrl);
          }
          console.log("");
        }
      } catch (error: any) {
        console.log(
          "❌ Error with manga details/chapters:",
          error.response?.data || error.message
        );
        console.log("");
      }
    }

    // 6. Test Search
    console.log("6️⃣  Testing Search...");
    const search = await axios.get(`${BASE_URL}/manga/search?q=naruto&page=1`);
    console.log("✅ Search Results Count:", search.data.data.mangas.length);
    if (search.data.data.mangas.length > 0) {
      console.log("   First Result:", search.data.data.mangas[0].title);
    }
    console.log("");

    // 7. Test Latest Updates
    console.log("7️⃣  Testing Latest Updates...");
    const latest = await axios.get(`${BASE_URL}/manga/latest?page=1`);
    console.log("✅ Latest Updates Count:", latest.data.data.mangas.length);
    console.log("");

    console.log("✅ All tests completed successfully!");
  } catch (error: any) {
    console.error("❌ Test failed:", error.response?.data || error.message);
  }
}

// Run tests
testAPI();
