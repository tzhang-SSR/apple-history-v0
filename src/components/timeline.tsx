'use client'

import { useEffect, useState } from 'react'
import { motion, useAnimation } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { ScrollArea } from "@/components/ui/scroll-area"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

type TimelineEvent = {
  year: number;
  title: string;
  description: string;
  image: string;
}

const events: TimelineEvent[] = [
  { 
    year: 2023, 
    title: "Vision Pro发布", 
    description: "Apple推出了其首款空间计算设备Vision Pro，开创了新的计算平台。",
    image: "/placeholder.svg?height=200&width=300"
  },
  { 
    year: 2020, 
    title: "Apple Silicon发布", 
    description: "Apple宣布从英特尔处理器过渡到自家设计的Apple Silicon芯片。",
    image: "/placeholder.svg?height=200&width=300"
  },
  { 
    year: 2015, 
    title: "Apple Watch上市", 
    description: "Apple进入可穿戴设备市场，推出了Apple Watch。",
    image: "/placeholder.svg?height=200&width=300"
  },
  { 
    year: 2010, 
    title: "iPad发布", 
    description: "Apple推出了iPad，定义了平板电脑市场。",
    image: "/placeholder.svg?height=200&width=300"
  },
  { 
    year: 2007, 
    title: "iPhone发布", 
    description: "Apple推出了第一代iPhone，开创了智能手机时代。",
    image: "/placeholder.svg?height=200&width=300"
  },
  // 可以继续添加更多事件
]

function TimelineCard({ event, index }: { event: TimelineEvent; index: number }) {
  const controls = useAnimation()
  const [ref, inView] = useInView()

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
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>{event.year} - {event.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <img src={event.image} alt={event.title} className="w-full h-48 object-cover mb-4 rounded-md" />
          <p>{event.description}</p>
        </CardContent>
      </Card>
    </motion.div>
  )
}

export function Timeline() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const scrollTop = e.currentTarget.scrollTop
    const cardHeight = e.currentTarget.scrollHeight / events.length
    const newIndex = Math.floor(scrollTop / cardHeight)
    if (newIndex !== currentIndex) {
      setCurrentIndex(newIndex)
    }
  }

  return (
    <ScrollArea className="h-[600px] w-full rounded-md border p-4" onScrollCapture={handleScroll}>
      <div className="space-y-8">
        {events.map((event, index) => (
          <TimelineCard key={index} event={event} index={index} />
        ))}
      </div>
    </ScrollArea>
  )
}