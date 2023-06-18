import { ResponsiveLine } from '@nivo/line';

export function Chart({ data }: { data: any[] }) {
  return (
    <ResponsiveLine
      data={data}
      margin={{ top: 20, right: 40, bottom: 20, left: 40 }}
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
      tooltip={({ point: { data: pointData } }) => {
        return (
          <div
            style={{
              background: 'white',
              padding: '7px 8px',
              border: '1px solid #ccc',
              fontSize: 12,
            }}
          >
            <div>{pointData.y}</div>
          </div>
        );
      }}
    />
  );
}
