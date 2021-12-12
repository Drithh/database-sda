import { motion } from 'framer-motion';
import { pageTransition, variants } from './motion';
import * as d3 from 'd3';
import React, { useRef, useEffect, useState } from 'react';

const Home = () => {
  const [data, setData] = useState([
    25, 30, 35, 40, 45, 50, 55, 5, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100,
  ]);
  const svgRef = useRef();
  useEffect(() => {
    const w = 400;
    const h = 100;
    const svg = d3.select(svgRef.current).attr('width', w).attr('height', h);

    // setting the scaling
    const xScale = d3
      .scaleLinear()
      .domain([0, data.length - 1])
      .range([0, w]);

    const yScale = d3.scaleLinear().domain([0, h]).range([h, 0]);

    const generateScleLine = d3
      .line()
      .x((d, i) => xScale(i))
      .y(yScale)
      .curve(d3.curveCardinal);

    const xAxis = d3
      .axisBottom(xScale)
      .ticks(data.length)
      .tickFormat((d) => d + 1);

    const yAxis = d3.axisLeft(yScale).ticks(5);

    svg
      .append('g')
      .call(xAxis)
      .attr('transform', 'translate(' + 0 + ',' + h + ')');
    svg.append('g').call(yAxis);
    svg
      .selectAll('.line')
      .data([data])
      .join('path')
      .attr('d', (d) => generateScleLine(d))
      .attr('fill', 'none')
      .attr('stroke', '#000');
  }, [data]);

  return (
    <motion.div
      initial="init"
      animate="in"
      exit="out"
      variants={variants}
      transition={pageTransition}
    >
      <div className="w-[1024px] m-auto">
        <svg
          className="w-full left-6 relative h-full overflow-visible"
          ref={svgRef}
        ></svg>
      </div>
    </motion.div>
  );
};

export default Home;
