export const fetchNews = async()=>{
    const res = await fetch('http://localhost:5500/getArticles');

    const news = await res.json();
    return news;
}

export const fetchPublishers = async()=>{
    const res = await fetch('http://localhost:5500/getPublishers');

    const Publishers = await res.json();
    return Publishers;
}