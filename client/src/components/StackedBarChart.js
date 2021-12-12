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
    const yScale = scaleLinear().domain(extent).range([height, 30]);

    const x0Scale = scaleBand()
      .domain(data.map((d) => d.name))
      .range([30, width - 30])
      .padding(0.46);
    const x1Scale = scaleBand()
      .domain(data.map((d) => d.type))
      .rangeRound([0, x0Scale.bandwidth()])
      .padding(0.12);

    const xAix = axisBottom(x0Scale).tickSizeOuter(0);
    const yAix1 = axisRight(yScale).ticks(5);
    const yAix2 = axisLeft(yScale)
      .ticks(5)
      .tickSize(-width + 60, 0, 0);

    svg
      .select('.y-axis1')
      .attr('transform', `translate(${width - 30}, 0 )`)
      .call(yAix1)
      .call((g) => g.select('.domain').remove())
      .call((g) => g.style('color', 'rgb(170, 170, 170, 1)'));
    svg
      .select('.y-axis2')
      .attr('transform', `translate(${30}, 0 )`)
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
      .attr('transform', `translate(0, ${height})`)
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
      .attr('width', x1Scale.bandwidth())
      .attr('y', (sequence) => yScale(sequence[1]))
      .attr('height', (sequence) => yScale(sequence[0]) - yScale(sequence[1]));

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
  }, [data, keys, colors]);

  return (
    <>
      <div
        ref={wrapperRef}
        style={{ width: '100%', height: '400px', marginBottom: '2rem' }}
      >
        <svg ref={svgRef} style={{ width: '100%', height: '110%' }}>
          <g className="x-axis" />
          <g className="y-axis1" />
          <g className="y-axis2" />
        </svg>
      </div>
    </>
  );
};
