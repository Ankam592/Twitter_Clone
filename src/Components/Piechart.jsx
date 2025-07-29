import { comment } from "postcss";
import React, { useState } from "react";
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';

const Piechart = ({ toxic, NonToxic }) => {
    const [data, setData] = useState(toxic)
    console.log(toxic, NonToxic)
    const COLORS = ["#FF4C4C", "#4CAF50"]
    const data1 = [
        { name: "Toxic", value: toxic },
        { name: "Non-Toxic", value: NonToxic }
    ];


    return (<PieChart width={300} height={200} >
         <Legend></Legend>
        <Pie data={data1}
            cx="50%"
            cy='55%'
            outerRadius={65}
            innerRadius={35}
            label
            dataKey="value"
        >
            {
                data1 && data1.map((tc, idx) => {
                    return <Cell key={`Cell-${idx}`} fill={COLORS[idx % COLORS.length]} />
                })
            }
        </Pie>
        <Tooltip />
       


    </PieChart>


    )

}

export default Piechart;