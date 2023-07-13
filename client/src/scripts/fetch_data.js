async function fetchDataAsJSON(url, method, bodyJSON)
{
    let fetchData;

    if(method === "GET")
    {
        fetchData = {method: method}
    }
    else if (method === "POST")
    {
        fetchData = {
            method: method, 
            headers: { 'Content-Type': 'application/json' }, 
            body: JSON.stringify(bodyJSON)
        }
    }

    const res = await fetch(url, fetchData);

    if(!res.ok)
    {
        const error = await res.text();
        throw new Error(error);
    }

    var data;

    if(method === "GET")
        data = await res.json();

    if(method === "POST")
        data = await res.text();


    return data;
}

export default fetchDataAsJSON;