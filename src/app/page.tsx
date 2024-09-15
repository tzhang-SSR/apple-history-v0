'use client'

import { useEffect } from 'react'
import { motion, useAnimation } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

type TimelineEvent = {
  year: number;
  title: string;
  description: string;
}

const events: TimelineEvent[] = [
  { year: 2015, title: "Apple Watch上市", description: "苹果进入可穿戴设备市场，推出了Apple Watch。" },
  { year: 2010, title: "iPad发布", description: "苹果推出了iPad，定义了平板电脑市场。" },
  { year: 2007, title: "iPhone发布", description: "苹果推出了第一代iPhone，开创了智能手机时代。" },
  { year: 2001, title: "iPod问世", description: "苹果发布了iPod，彻底改变了人们听音乐的方式。" },
  { year: 1984, title: "Macintosh发布", description: "苹果推出了革命性的Macintosh个人电脑，配备图形用户界面和鼠标。" },
  { year: 1976, title: "苹果公司成立", description: "史蒂夫·乔布斯、史蒂夫·沃兹尼亚克和罗纳德·韦恩在加利福尼亚州创立了苹果电脑公司。" },
]

function TimelineCard({ event }: { event: TimelineEvent }) {
  const controls = useAnimation()
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  useEffect(() => {
    if (inView) {
      controls.start('visible')
    }
  }, [controls, inView])

  return (
    <motion.div
      ref={ref}
      animate={controls}
      initial="hidden"
      variants={{
        visible: { opacity: 1, y: 0 },
        hidden: { opacity: 0, y: 50 }
      }}
      transition={{ duration: 0.5 }}
      className="mb-8"
    >
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-3xl font-bold mb-4 text-blue-600">{event.year}</h2>
        <h3 className="text-xl font-semibold mb-2">{event.title}</h3>
        <p className="text-gray-600">{event.description}</p>
      </div>
    </motion.div>
  )
}

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-bold mb-12 text-center">苹果公司发展史</h1>
      <div className="max-w-3xl mx-auto">
        {events.map((event, index) => (
          <TimelineCard key={index} event={event} />
        ))}
      </div>
    </main>
  )
}