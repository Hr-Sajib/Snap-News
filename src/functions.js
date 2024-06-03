export const fetchNews = async()=>{
    const res = await fetch('news.json');

    const news = await res.json();
    return news;
}

export const fetchPublishers = async()=>{
    const res = await fetch('publishers.json');

    const Publishers = await res.json();
    return Publishers;
}