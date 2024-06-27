import Chart from 'react-apexcharts';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';

import { agentChatCardStyle } from '../../default/theme';
import { ChartDataObject } from '../../default/types';
import AgentChatCardHeader from '../AgentChatCardHeader';

interface Props {
  data: ChartDataObject;
  date: string;
}

const AgentChartCard: React.FC<Props> = ({ data, date }) => {
  const { chartType, dataLabels, title, colors, series, xAxis, yAxis } = data;
  const options = {
    enableToolbar: false,
    chart: {
      id: chartType,
    },
    xaxis: xAxis,
    yaxis: {
      ...yAxis,
      tickAmount: 5,
    },
    title: {
      text: title.text,

      style: {
        fontSize: '20px',
      }
    },
    colors: colors,
    dataLabels: dataLabels,
  };


  return (
    <Card sx={{
      ...agentChatCardStyle,
      minHeight: '480px',
    }}>
      <AgentChatCardHeader name='Wingman' date={date} />
      <Box sx={{
        display: 'flex',
        justifyContent: 'center',
      }}>
        <Chart
          options={options}
          series={series}
          width="600"
        />
      </Box>
    </Card>
  );
}

export default AgentChartCard;
