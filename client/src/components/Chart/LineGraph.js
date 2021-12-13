import React, { useState, useEffect, useRef } from 'react';
import * as d3 from 'd3';

const datas = [
  {
    time: '2016',
    valueA: '2',
    valueB: '5',
    valueC: '13',
  },
  {
    time: '2017',
    valueA: '3',
    valueB: '4',
    valueC: '14',
  },
  {
    time: '2018',
    valueA: '1',
    valueB: '4',
    valueC: '16',
  },
  {
    time: '2019',
    valueA: '7',
    valueB: '4',
    valueC: '12',
  },
  {
    time: '2020',
    valueA: '8',
    valueB: '8',
    valueC: '7',
  },
];

export const LineGraph = () => {
  const [data, setData] = useState(datas);
  const svgRef = useRef();

  var margin = { top: 10, right: 100, bottom: 30, left: 30 },
    width = 1000 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;
  useEffect(() => {
    const svg = d3.select(svgRef.current);

    var allGroup = ['valueA', 'valueB', 'valueC'];

    d3.select('#selectButton')
      .selectAll('myOptions')
      .data(allGroup)
      .enter()
      .append('option')
      .text(function (d) {
        return d;
      })
      .attr('value', function (d) {
        return d;
      });

    var myColor = d3.scaleOrdinal().domain(allGroup).range(d3.schemeSet2);

    var x = d3
      .scaleLinear()
      .domain([2016, 2020])
      .range([60, width - 150]);
    const xAix = d3.axisBottom(x).tickSizeOuter(0).ticks(5);

    svg
      .append('g')
      .attr('transform', 'translate(0,' + height + ')')
      .call(xAix)
      .call((g) => g.style('color', 'rgba(170, 170, 170, 1)'));

    // Add Y axis
    var y1 = d3.scaleLinear().domain([0, 20]).range([height, 30]);

    const yAix1 = d3.axisLeft(y1).tickSizeOuter(0).ticks(5);
    const yAix2 = d3
      .axisRight(y1)
      .tickSizeOuter(0)
      .ticks(5)
      .tickSize(-width + 150, 0, 0);
    svg
      .append('g')
      .attr('transform', 'translate(30,0)')
      .call(yAix1)
      .call((g) => g.select('.domain').remove())
      .call((g) => g.style('color', 'rgb(170, 170, 170, 1)'));
    svg
      .append('g')
      .attr('transform', 'translate(' + (width - 120) + ',0)')
      .call(yAix2)
      .call((g) => g.select('.domain').remove())
      .call((g) => g.style('color', 'rgb(170, 170, 170, 1)'))
      .call((g) =>
        g
          .selectAll('.tick')
          .select('text')
          .style('color', 'rgb(170, 170, 170, 1)')
      );
    // Initialize line with group a
    var line = svg
      .append('g')
      .append('path')
      .datum(data)
      .attr(
        'd',
        d3
          .line()
          .x(function (d) {
            return x(+d.time);
          })
          .y(function (d) {
            return y1(+d.valueA);
          })
      )
      .attr('stroke', function (d) {
        return myColor('valueA');
      })
      .style('stroke-width', 4)
      .style('fill', 'none');

    // A function that update the chart
    function update(selectedGroup) {
      // Create new data with the selection?
      var dataFilter = data.map(function (d) {
        return { time: d.time, value: d[selectedGroup] };
      });

      // Give these new data to update line
      line
        .datum(dataFilter)
        .transition()
        .duration(1000)
        .attr(
          'd',
          d3
            .line()
            .x(function (d) {
              return x(+d.time);
            })
            .y(function (d) {
              return y1(+d.value);
            })
        )
        .attr('stroke', function (d) {
          return myColor(selectedGroup);
        });
    }

    // When the button is changed, run the updateChart function
    d3.select('#selectButton').on('change', function (d) {
      // recover the option that has been chosen
      var selectedOption = d3.select(this).property('value');
      // run the updateChart function with this selected option
      update(selectedOption);
    });
  }, [data]);

  return (
    <>
      <div className="w-[800px] h-[400px] mb-8 m-auto">
        <select id="selectButton"></select>
        <svg ref={svgRef} className="w-full m-auto h-full " />
      </div>
    </>
  );
};
