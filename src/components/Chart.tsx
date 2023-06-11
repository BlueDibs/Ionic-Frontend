import { ResponsiveLine } from '@nivo/line';
import dayjs from 'dayjs';

export function Chart() {
  console.log(dayjs().format('DD-MM-YYYY').toString());

  const data: any[] = [
    {
      id: 1,
      data: [
        { x: dayjs().format('YYYY-MM-DD HH:MM').toString(), y: 1 },
        {
          x: dayjs().add(1, 'day').format('YYYY-MM-DD HH:MM').toString(),
          y: 2,
        },
        {
          x: dayjs().add(2, 'day').format('YYYY-MM-DD HH:MM').toString(),
          y: 3,
        },
        {
          x: dayjs().add(3, 'day').format('YYYY-MM-DD HH:MM').toString(),
          y: 4,
        },
      ],
    },
  ];
  return (
    <ResponsiveLine
      data={data}
      margin={{ top: 20, right: 40, bottom: 50, left: 60 }}
      xScale={{
        type: 'time',
        format: '%Y-%m-%d %H:%M',
        precision: 'hour',
      }}
      xFormat="time:%Hh"
      yScale={{
        type: 'linear',
      }}
      axisBottom={{
        tickValues: [
          dayjs().format('YYYY-MM-DD HH:MM').toString(),
          dayjs().add(1, 'day').format('YYYY-MM-DD HH:MM').toString(),
        ],
        tickSize: 10,
        tickPadding: 10,
        tickRotation: 0,
        format: '%d-%m',
        legend: 'Time',
        legendOffset: 36,
        legendPosition: 'middle',
      }}
      axisTop={null}
      axisRight={null}
      enableGridX={false}
      lineWidth={1}
      pointSize={5}
      pointColor={{ theme: 'background' }}
      pointBorderWidth={2}
      pointBorderColor={{ from: 'serieColor' }}
      pointLabelYOffset={-12}
      isInteractive={true}
    />
  );
}
