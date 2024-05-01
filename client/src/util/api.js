export async function fetchGet(url) {
  let data; 
  try {
    const response = await fetch(url, { credentials: "include" });
    const result = await response.json();
    data = result.data;

  } catch (error) {
    console.error(error);
  }
  return data;
}

export async function fetchPost(url, body) {
  let data;
  try {
    const response = await fetch(url, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body)
    });

    // if (!response.ok) {
    //   throw new Error(`HTTP error! status: ${response.status}`);
    // }

    const result = await response.json();
    data = result.data;
    
    console.log({
      result,
      response: response.status
    });
    
  } catch(error) {
    console.error("Failed to execute fetch post:", error);
    //throw error
  }
  return data;
}