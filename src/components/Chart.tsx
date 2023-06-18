import { ResponsiveLine } from '@nivo/line';
import dayjs from 'dayjs';

export function Chart() {
  console.log(dayjs().format('DD-MM-YYYY').toString());

  const data: any[] = [
    {
      id: 1,
      color: 'hsl(140, 70%, 50%)',
      data: [
        { x: dayjs().format('YYYY-MM-DD HH:MM').toString(), y: 1 },
        {
          x: dayjs().add(1, 'day').format('YYYY-MM-DD HH:MM').toString(),
          y: 1,
        },
        {
          x: dayjs().add(2, 'day').format('YYYY-MM-DD HH:MM').toString(),
          y: 2,
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
        precision: 'day',
      }}
      xFormat="time:%H:%M:%S.%L"
      yScale={{
        type: 'linear',
      }}
      axisBottom={{
        tickValues: 7,
        format: '%b-%d',
      }}
      axisTop={null}
      axisRight={null}
      enableGridX={false}
      lineWidth={2}
      enableArea={true}
      colors={(d) => d.color}
      pointSize={5}
      pointColor={{ theme: 'background' }}
      pointBorderWidth={2}
      pointBorderColor={{ from: 'serieColor' }}
      pointLabelYOffset={-12}
      useMesh
      tooltip={({ point: { data } }) => {
        console.log(data);
        return (
          <div
            style={{
              background: 'white',
              padding: '7px 8px',
              border: '1px solid #ccc',
              fontSize: 12,
            }}
          >
            <div>{data.y}</div>
          </div>
        );
      }}
    />
  );
}
