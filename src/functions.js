export const fetchNews = async()=>{
    const res = await fetch('news.json');

    const news = await res.json();
    return news;
}