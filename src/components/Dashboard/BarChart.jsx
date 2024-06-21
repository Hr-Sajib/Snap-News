
const BarChart = () => {

    const [data, setData] = useState([
        ['Year', 'Sales'],
        ['2019', 1000],
        ['2020', 1170],
        ['2021', 660],
        ['2022', 1030],
      ]);


    return (
        <div>
            <Chart
                width={'500px'}
                height={'300px'}
                chartType="BarChart"
                loader={<div>Loading Chart</div>}
                data={data}
                // ... other props ...
            />
        </div>
    );
};

export default BarChart;