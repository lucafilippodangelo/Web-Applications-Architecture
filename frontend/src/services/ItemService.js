export async function getAllItems() {

    // const response = await fetch('https://localhost:7256/api/items');
    // return await response.json();

    try {
        console.log( " -- LD 001 -- "  );
        const response = await fetch('https://localhost:7008/api/items', {mode:'cors'});
        const data = await response.json();
        console.log( " -- LD 002 -- " + data );
        return data;
      }
      catch (e) {
        console.log(e)
      }

}