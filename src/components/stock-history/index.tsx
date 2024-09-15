'use client'

import { useState } from 'react'
import { Line } from 'react-chartjs-2'
import { 
  Chart as ChartJS, 
  CategoryScale, 
  LinearScale, 
  PointElement, 
  LineElement, 
  Title, 
  Tooltip, 
  Legend,
  LogarithmicScale
} from 'chart.js'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  LogarithmicScale
)

// 真实的历史数据（注意：这些是大致的数据，可能不完全准确）
const stockData = [
  { year: 1980, price: 0.10, marketCap: 1.8 },
  { year: 1985, price: 0.11, marketCap: 2.0 },
  { year: 1990, price: 0.39, marketCap: 4.6 },
  { year: 1995, price: 1.33, marketCap: 7.4 },
  { year: 2000, price: 25.75, marketCap: 16.5 },
  { year: 2005, price: 10.36, marketCap: 54.0 },
  { year: 2010, price: 32.20, marketCap: 294.0 },
  { year: 2015, price: 105.26, marketCap: 586.0 },
  { year: 2020, price: 132.69, marketCap: 2252.3 },
  { year: 2024, price: 185.85, marketCap: 2870.0 },
]

export default function StockHistory() {
  const [dataType, setDataType] = useState<'price' | 'marketCap'>('price')

  const chartData = {
    labels: stockData.map(d => d.year.toString()),
    datasets: [
      {
        label: dataType === 'price' ? '股价 (美元)' : '市值 (十亿美元)',
        data: stockData.map(d => dataType === 'price' ? d.price : d.marketCap),
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1
      }
    ]
  }

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: `苹果公司历史${dataType === 'price' ? '股价' : '市值'}`,
      },
    },
    scales: {
      y: {
        type: 'logarithmic' as const,
        title: {
          display: true,
          text: dataType === 'price' ? '股价 (美元，对数刻度)' : '市值 (十亿美元，对数刻度)',
        },
      },
    },
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">苹果公司股票历史（1980-2024）</h1>
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>历史数据图表</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <Select onValueChange={(value) => setDataType(value as 'price' | 'marketCap')}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="选择数据类型" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="price">股价</SelectItem>
                <SelectItem value="marketCap">市值</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="h-[400px]">
            <Line options={options} data={chartData} />
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>历史数据表格</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">年份</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">股价 (美元)</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">市值 (十亿美元)</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {stockData.map((data) => (
                  <tr key={data.year}>
                    <td className="px-6 py-4 whitespace-nowrap">{data.year}</td>
                    <td className="px-6 py-4 whitespace-nowrap">${data.price.toFixed(2)}</td>
                    <td className="px-6 py-4 whitespace-nowrap">${data.marketCap.toFixed(1)}B</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}