import axios from 'axios';
import { useEffect, useState } from 'react';
import { Chart } from 'react-google-charts';
import Aos from "aos";
import 'aos/dist/aos.css'

const PieChart = () => {
    const [articles, setArticles] = useState([]);
    const [publishers, setPublishers] = useState([]);
    const [pieChartData, setPieChartData] = useState([['Publisher', 'Number of Articles']]);
    const [barChartData, setBarChartData] = useState([['Type', 'Count']]);
    const [lineChartData, setLineChartData] = useState([['Publisher', 'Total Views']]);

    useEffect(() => {
        axios.get('https://snapnews-server.vercel.app/getArticles')
            .then(response => {
                setArticles(response.data);
            })
            .catch(error => {
                console.error('Error fetching articles:', error);
            });
    }, []);

    useEffect(() => {
        axios.get('https://snapnews-server.vercel.app/getPublishers')
            .then(response => {
                const pubNames = response.data.map(d => d.name);
                setPublishers(pubNames);
            })
            .catch(error => {
                console.error('Error fetching publishers:', error);
            });
    }, []);

    useEffect(() => {
        if (articles.length > 0 && publishers.length > 0) {
            const articleCounts = publishers.map(publisher => {
                const count = articles.filter(article => article.publisher === publisher).length;
                return [publisher, count];
            });

            setPieChartData([['Publisher', 'Number of Articles'], ...articleCounts]);

            const premiumCount = articles.filter(article => article.premium === 'yes').length;
            const nonPremiumCount = articles.filter(article => article.premium === 'no').length;

            setBarChartData([
                ['Type', 'Count'],
                ['Premium', premiumCount],
                ['Non-Premium', nonPremiumCount]
            ]);

            // Calculate total views per publisher
            const viewsData = publishers.map(publisher => {
                const totalViews = articles
                    .filter(article => article.publisher === publisher)
                    .reduce((acc, article) => acc + article.views, 0);
                return [publisher, totalViews];
            });

            setLineChartData([['Publisher', 'Total Views'], ...viewsData]);
        }
    }, [articles, publishers]);


    useEffect(()=>{
        Aos.init();
      },[])

    return (
        <div data-aos="fade-right" className="App lg:w-[1000px] lg:h-[800px] flex">
            <div data-aos="zoom-in" className="chart-container">
                <Chart
                    className='lg:ml-20'
                    width={'800px'}
                    height={'800px'}
                    chartType="PieChart"
                    loader={<div>Loading Chart</div>}
                    data={pieChartData}
                    options={{
                        title: 'Articles by Publisher',
                    }}
                />
            </div>
            <div  data-aos="zoom-in" className="chart-container ">
                <Chart
                    width={'500px'}
                    height={'300px'}
                    chartType="BarChart"
                    loader={<div>Loading Chart</div>}
                    data={barChartData}
                    options={{
                        title: 'Premium vs Non-Premium Articles',
                        chartArea: { width: '50%' },
                        hAxis: {
                            title: 'Total Articles',
                            minValue: 0,
                        },
                        vAxis: {
                            title: 'Type',
                        },
                    }}
                />
                <Chart
                    width={'500px'}
                    height={'300px'}
                    chartType="LineChart"
                    loader={<div>Loading Chart</div>}
                    data={lineChartData}
                    options={{
                        title: 'Total Views per Publisher',
                        hAxis: {
                            title: 'Publisher',
                        },
                        vAxis: {
                            title: 'Total Views',
                        },
                    }}
                />
            </div>
        </div>
    );
};

export default PieChart;
