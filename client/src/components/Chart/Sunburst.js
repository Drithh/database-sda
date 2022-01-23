import React from 'react';
import * as d3 from 'd3';

const SIZE = 700;
const RADIUS = SIZE / 2;

export const Sunburst = ({ data }) => {
  const svgRef = React.useRef(null);
  const [viewBox, setViewBox] = React.useState('0,0,0,0');

  const partition = (data) =>
    d3.partition().size([2 * Math.PI, RADIUS])(
      d3
        .hierarchy(data)
        .sum((d) => d.value)
        .sort((a, b) => b.value - a.value)
    );

  const color = d3.scaleOrdinal(d3.quantize(d3.interpolateRainbow, 5));

  const format = d3.format(',d');

  const arc = d3
    .arc()
    .startAngle((d) => d.x0)
    .endAngle((d) => d.x1)
    .padAngle((d) => Math.min((d.x1 - d.x0) / 2, 0.005))
    .padRadius(RADIUS / 2)
    .innerRadius((d) => d.y0)
    .outerRadius((d) => d.y1 - 1);

  const getAutoBox = () => {
    if (!svgRef.current) {
      return '';
    }

    const { x, y, width, height } = svgRef.current.getBBox();

    return [x, y, width, height].toString();
  };

  React.useEffect(() => {
    setViewBox(getAutoBox());
  }, []);

  const getColor = (d) => {
    while (d.depth > 1) d = d.parent;
    let colorName;
    if (d.data.name === 'Pertambangan') {
      colorName = 'hsl(182, 47%, 73%)';
    } else if (d.data.name === 'Kehutanan') {
      colorName = 'hsl(10, 19%, 87%)';
    } else if (d.data.name === 'Perkebunan') {
      colorName = 'hsl(155, 41%, 71%)';
    }
    return colorName;
  };

  const getTextTransform = (d) => {
    const x = (((d.x0 + d.x1) / 2) * 180) / Math.PI;
    const y = (d.y0 + d.y1) / 2;
    return `rotate(${x - 90}) translate(${y},0) rotate(${x < 180 ? 0 : 180})`;
  };

  const root = partition(data);

  d3.selectAll('.sunBurstPath')
    .on('mouseenter', (e, d) => {
      d3.select(e.target).style('opacity', '1');
      tooltip.style('display', null);
      let text = e.toElement.querySelector('text').innerHTML.split('/');
      d3.select('#text1').text(text[0]);
      d3.select('#text2').text(text[1]);
    })
    .on('mouseleave', (e) => {
      d3.select(e.target).style('opacity', '0.8');
      tooltip.style('display', 'none');
    });
  var tooltip = d3
    .select('.sunBurst')
    .append('g')
    .attr('class', 'tooltip')
    .style('display', 'none');

  tooltip
    .append('text')
    .attr('id', 'text1')
    .text('')
    .attr('x', '0rem')
    .attr('dy', '-0.8rem')
    .style('text-anchor', 'middle')
    .attr('class', 'text-xl')
    .attr('class', 'font-bold')
    .attr('fill', 'rgb(142,142,142');

  tooltip
    .append('text')
    .attr('id', 'text2')
    .text('')
    .attr('x', '0rem')
    .attr('dy', '0.8rem')
    .style('text-anchor', 'middle')
    .attr('class', 'text-xl')
    .attr('class', 'font-bold')
    .attr('fill', 'rgb(142,142,142');
  return (
    <svg
      className="m-auto my-20 sunBurst"
      width={SIZE}
      height={SIZE}
      viewBox={viewBox}
      ref={svgRef}
    >
      <g fillOpacity={0.8}>
        {root
          .descendants()
          .filter((d) => d.depth)
          .map((d, i) => (
            <path
              className="sunBurstPath"
              key={`${d.data.name}-${i}`}
              fill={getColor(d)}
              d={arc(d)}
              style={{ opacity: 0.8 }}
            >
              <text>
                {d.data.name}/{format(d.value)}
              </text>
            </path>
          ))}
      </g>
      <g
        className="pointer-events-none text-xs font-medium font-Source "
        textAnchor="middle"
        fill="#424242"
      >
        {root
          .descendants()
          .filter((d) => d.depth && ((d.y0 + d.y1) / 2) * (d.x1 - d.x0) > 10)
          .map((d, i) => (
            <text
              className="font-Josefin"
              key={`${d.data.name}-${i}`}
              transform={getTextTransform(d)}
              dy="0.35em"
              fill="rgb(142,142,142"
            >
              {d.data.name}
            </text>
          ))}
      </g>
    </svg>
  );
};
