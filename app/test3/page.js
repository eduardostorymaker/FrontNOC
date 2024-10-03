"use client"
import { useEffect, useState, useRef } from "react";
import * as d3 from "d3"

export default function test3 () {
    const svgRef = useRef();
    console.log(d3)
    // useEffect(() => {
    //     // Selecciona el primer párrafo y cambia su texto
    //     d3.select("p").text("Este es el primer párrafo.");
    
    //     // Selecciona todos los párrafos y cambia su color de texto
    //     d3.selectAll("p").style("color", "blue");
    
    //     // Selecciona un círculo SVG y cambia su radio y color
    //     d3.select("circle")
    //       .attr("r", 50)
    //       .style("fill", "red");
    
    //     // Añade un nuevo párrafo al cuerpo del documento
    //     d3.select("body").append("p").text("Nuevo párrafo añadido.");
    
    //     // Elimina todos los párrafos con la clase 'remove'
    //     d3.selectAll("p.remove").remove();
    //   }, []);
    const [data, setData] = useState([10, 20, 30, 40, 50]);

    useEffect(() => {
        const data = [
          { month: 'Jan', value: 30 },
          { month: 'Feb', value: 20 },
          { month: 'Mar', value: 50 },
          { month: 'Apr', value: 40 },
          { month: 'May', value: 70 },
          { month: 'Jun', value: 60 }
        ];

        const margin = {
            top: 30,
            right: 30,
            bottom: 30,
            left: 30
        }

        const width = 500
        const height = 300
        //const ymax = Math.max(...data.map( d => d.value))
        const ymax = d3.max(data, d => d.value)

        const yScale = d3
            .scaleLinear()
            .domain([0, ymax])
            .range([height - margin.bottom, margin.top]);
            
        const xScale = d3
            .scaleBand()
            .domain(data.map(d => d.month))
            .range([margin.left, width - margin.right])
            .padding(0.1);

        const svg = d3
            .select(svgRef.current)
            .attr("width", width)
            .attr("height", height);
    
        const yAxis = g => g.attr("transform", `translate(${margin.left})`).call(d3.axisLeft(yScale)) 
        const xAxis = g => g.attr("transform",`translate(0,${height - margin.bottom})`).call(d3.axisBottom(xScale).tickFormat(d => d.name))
    
        // Añadir barras
        svg.selectAll(".bar")
          .data(data)
          .enter()
          .append("rect")
          .attr("class", "bar")
          .attr("x", d => xScale(d.month))
          .attr("y", d => yScale(d.value))
          .attr("width", xScale.bandwidth())
          .attr("height", d => 300 - yScale(d.value))
          .attr("fill", "blue");
    
        // Añadir línea
        const line = d3.line()
          .x(d => xScale(d.month) + xScale.bandwidth() / 2)
          .y(d => yScale(d.value))
          .curve(d3.curveMonotoneX);
    
        svg.append("path")
          .datum(data)
          .attr("fill", "none")
          .attr("stroke", "orange")
          .attr("stroke-width", 2)
          .attr("d", line);
    
        // Añadir puntos a la línea
        svg.selectAll(".dot")
          .data(data)
          .enter()
          .append("circle")
          .attr("class", "dot")
          .attr("cx", d => xScale(d.month) + xScale.bandwidth() / 2)
          .attr("cy", d => yScale(d.value))
          .attr("r", 5)
          .attr("fill", "orange")
          .on("mouseover", function(event, d) {
            d3.select(this).attr("fill", "red");
            svg.append("text")
              .attr("id", "tooltip")
              .attr("x", xScale(d.month) + xScale.bandwidth() / 2)
              .attr("y", yScale(d.value) - 10)
              .attr("text-anchor", "middle")
              .attr("font-size", "12px")
              .attr("fill", "black")
              .text(d.value);
          })
          .on("mouseout", function() {
            d3.select(this).attr("fill", "orange");
            svg.select("#tooltip").remove();
          });
      }, []);


  return (
    <div>
      <svg ref={svgRef}></svg>

    </div>
  )
}

    