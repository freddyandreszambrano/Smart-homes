// src/shared/components/EnergyChart.jsx
import {CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis} from 'recharts';

export const EnergyChart = ({data}) => {
    return (
        <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Consumo de Energía (Últimas 24 horas)
            </h3>
            <ResponsiveContainer width="100%" height={300}>
                <LineChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0"/>
                    <XAxis
                        dataKey="time"
                        stroke="#6b7280"
                        style={{fontSize: '12px'}}
                    />
                    <YAxis
                        stroke="#6b7280"
                        style={{fontSize: '12px'}}
                        label={{value: 'kWh', angle: -90, position: 'insideLeft'}}
                    />
                    <Tooltip
                        contentStyle={{
                            backgroundColor: '#fff',
                            border: '1px solid #e5e7eb',
                            borderRadius: '8px',
                            padding: '12px'
                        }}
                    />
                    <Legend/>
                    <Line
                        type="monotone"
                        dataKey="consumption"
                        stroke="#3b82f6"
                        strokeWidth={2}
                        name="Consumo (kWh)"
                        dot={{fill: '#3b82f6', r: 4}}
                        activeDot={{r: 6}}
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};