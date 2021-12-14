import React, { useState, useEffect, useRef } from 'react';
import {
  select,
  scaleBand,
  axisBottom,
  axisLeft,
  axisRight,
  scaleLinear,
  stack,
  max,
  pointer,
} from 'd3';

export const StackedBarGraph = ({ datasets, keys, colors }) => {
  const [data, setData] = useState(datasets);
  const svgRef = useRef();
  const wrapperRef = useRef();

  useEffect(() => {
    const svg = select(svgRef.current);
    const { width, height } = wrapperRef.current.getBoundingClientRect();
    const stackGenerator = stack().keys(keys);
    const layers = stackGenerator(data);
    const extent = [
      0,
      max(layers, (layer) => max(layer, (sequence) => sequence[1])),
    ];
    const yScale = scaleLinear()
      .domain(extent)
      .range([height - 30, 30]);

    const x0Scale = scaleBand()
      .domain(data.map((d) => d.name))
      .range([90, width - 90])
      .padding(0.46);
    const x1Scale = scaleBand()
      .domain(data.map((d) => d.type))
      .rangeRound([0, x0Scale.bandwidth()])
      .padding(0.12);

    const xAix = axisBottom(x0Scale).tickSizeOuter(0);
    const yAix1 = axisRight(yScale).ticks(5);
    const yAix2 = axisLeft(yScale)
      .ticks(5)
      .tickSize(-width + 180, 0, 0);

    svg
      .select('.y-axis1')
      .attr('transform', `translate(${width - 90}, 0 )`)
      .call(yAix1)
      .call((g) => g.select('.domain').remove())
      .call((g) => g.style('color', 'rgb(170, 170, 170, 1)'));
    svg
      .select('.y-axis2')
      .attr('transform', `translate(${90}, 0 )`)
      .call(yAix2)
      .call((g) => g.select('.domain').remove())
      .call((g) => g.style('color', 'rgb(170, 170, 170, 0.5)'))
      .call((g) =>
        g
          .selectAll('.tick')
          .select('text')
          .style('color', 'rgb(170, 170, 170, 1)')
      );
    svg
      .select('.x-axis')
      .attr('transform', `translate(0, ${height - 30})`)
      .call(xAix)
      .call((g) => g.style('color', 'rgba(170, 170, 170, 0.5)'))
      .call((g) =>
        g
          .selectAll('.tick')
          .select('text')
          .style('color', 'rgba(170, 170, 170, 1)')
      );
    svg
      .selectAll('.layer')
      .data(layers)
      .join('g')
      .attr('class', 'layer')
      .attr('fill', (layer) => colors[layer.key])
      .selectAll('rect')
      .data((layer) => layer)
      .join('rect')
      .attr(
        'x',
        (sequence) => x0Scale(sequence.data.name) + x1Scale(sequence.data.type)
      )
      .attr('opacity', '0.8')
      .attr('width', x1Scale.bandwidth())
      .attr('y', (sequence) => yScale(sequence[1]))
      .attr('height', (sequence) => {
        if (yScale(sequence[0]) - yScale(sequence[1])) {
          return yScale(sequence[0]) - yScale(sequence[1]);
        }
      });

    svg
      .select('.x-axis')
      .selectAll('.tick')
      .on('click', (e) => {
        const filteredD = data.map((d) => {
          return {
            name: d.name,
            Affiliate: d.name === e ? 0 : d.Affiliate,
            Social: d.name === e ? 0 : d.Social,
            Media: d.name === e ? 0 : d.Media,
          };
        });
        setData(filteredD);
      });

    svg
      .selectAll('rect')
      .on('mouseenter', (e, d) => {
        select(e.target).attr('opacity', '1');
        tooltip.style('display', null);
        tooltip.select('text').text(d[1] - d[0]);
      })
      .on('mouseleave', (e) => {
        select(e.target).attr('opacity', '0.8');
        tooltip.style('display', 'none');
      })
      .on('mousemove', (event, e) => {
        let coordinates = pointer(event);
        tooltip.attr(
          'transform',
          'translate(' + coordinates[0] + ',' + coordinates[1] + ')'
        );
      });

    var tooltip = svg
      .append('g')
      .attr('class', 'tooltip')
      .style('display', 'none');

    tooltip
      .append('text')
      .text('')
      .attr('x', '0rem')
      .attr('dy', '-0.5rem')
      .style('text-anchor', 'middle')
      .attr('class', 'text-xl')
      .attr('class', 'font-bold')
      .attr('fill', 'rgb(142,142,142');
  }, [data, keys, colors]);

  return (
    <>
      <div ref={wrapperRef} className='w-full h-[400px] mb-8"'>
        <svg ref={svgRef} className="w-full h-full ">
          <g className="x-axis" />
          <g className="y-axis1" />
          <g className="y-axis2" />
        </svg>
      </div>
    </>
  );
};
