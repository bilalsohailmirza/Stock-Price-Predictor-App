'use client'  

import { createChart, ColorType, Time, BarData } from 'lightweight-charts';
import React, { useEffect, useRef, useState } from 'react';

const ChartComponent = (props: any) => {
  const {
    data = [{ time: '2018-12-22', value: 32.51 }],
    predData = [{time:'2024-04-05', value: 173.31}],
    colors: {
      backgroundColor = 'white',
      lineColor = '#2962FF',
      textColor = 'black',
      areaTopColor = 'rgba(41, 98, 255, 0.3)',
      areaBottomColor = 'rgba(41, 98, 255, 0.18)',
    } = {},
  } = props;
  const chartContainerRef = useRef<HTMLDivElement>(null);
    const [price, setprice] = useState(0)
    const [charttime, settime] = useState<Time>()
    useEffect(
        () => {
          if(chartContainerRef.current)
          {
            const handleResize = () => {
              if(chartContainerRef.current)
                chart.applyOptions({ width: chartContainerRef.current.clientWidth });
            };
            const chart = createChart(chartContainerRef.current, {
              layout: {
                  background: { type: ColorType.Solid, color: backgroundColor },
                  textColor,
              },
              width: chartContainerRef.current.clientWidth,
              height: (chartContainerRef.current.clientHeight || 200) - 100
            });
            chart.timeScale().fitContent();

            const newSeries = chart.addAreaSeries({ lineColor, topColor: areaTopColor, bottomColor: areaBottomColor });
            const PredSeries = chart.addAreaSeries({ lineColor: '#FF9900', topColor: areaTopColor, bottomColor: areaBottomColor });
            newSeries.setData(data);
            PredSeries.setData(predData)

            window.addEventListener('resize', handleResize);

            chart.subscribeCrosshairMove((param) =>
            {
              let time:string = param.time as string;
              const bar = param.seriesData.get(newSeries)
              const bar2 = param.seriesData.get(PredSeries)

              if(time > '2024-03-27')
              {
                if (bar2)
                  {
                    settime(bar2.time)
                    setprice(bar2.value)
                  }
                  else
                  {
                    settime(PredSeries.dataByIndex(PredSeries.data().length-1)?.time)
                    setprice(PredSeries.dataByIndex(PredSeries.data().length-1)?.value)
                  }
              }
              else
              {
                if (bar)
                  {
                    settime(bar.time)
                    setprice(bar.value)
                  }
                  else
                  {
                    settime(newSeries.dataByIndex(newSeries.data().length-1)?.time)
                    setprice(newSeries.dataByIndex(newSeries.data().length-1)?.value)
                  }
              }
            })
            return () => {
                window.removeEventListener('resize', handleResize);
                chart.remove();
            };
          }
        },
        [data, backgroundColor, lineColor, textColor, areaTopColor, areaBottomColor]
    );
    return (
        <div className={props.className} ref = {chartContainerRef}>
          <div className = 'w-[400px] bg-opacity-100 z-10 absolute m-2'>
            <p className = 'text-3xl font-semibold'>{props.Name}</p>
            <p className = 'text-lg font-semibold'>{price}</p>
            <p className = ''>{charttime?.toString()}</p>
          </div>
        </div>
    );
  }

export default ChartComponent