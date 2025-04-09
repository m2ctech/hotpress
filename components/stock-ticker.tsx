"use client"

import { useEffect, useState } from "react"
import { TrendingUp, TrendingDown } from "lucide-react"
import { cn } from "@/lib/utils"

// Mock Botswana Stock Exchange (BSE) data
const STOCKS = [
  { symbol: "FNBB", name: "First National Bank Botswana", price: 2.35, change: 0.05, changePercent: 2.17 },
  { symbol: "CHOBE", name: "Chobe Holdings", price: 10.5, change: -0.15, changePercent: -1.41 },
  { symbol: "SECHABA", name: "Sechaba Brewery Holdings", price: 21.75, change: 0.25, changePercent: 1.16 },
  { symbol: "LETLOLE", name: "Letlole La Rona", price: 2.1, change: 0.03, changePercent: 1.45 },
  { symbol: "BTCL", name: "Botswana Telecommunications", price: 0.85, change: -0.02, changePercent: -2.3 },
  { symbol: "CRESTA", name: "Cresta Marakanelo", price: 1.25, change: 0.01, changePercent: 0.81 },
  { symbol: "SEEDCO", name: "Seed Co International", price: 2.9, change: 0.1, changePercent: 3.57 },
  { symbol: "LETSHEGO", name: "Letshego Holdings", price: 0.95, change: -0.01, changePercent: -1.04 },
  { symbol: "ABSA", name: "Absa Bank Botswana", price: 5.4, change: 0.08, changePercent: 1.5 },
  { symbol: "RDCP", name: "RDC Properties", price: 2.15, change: 0.04, changePercent: 1.9 },
]

interface StockTickerProps {
  className?: string
}

export function StockTicker({ className }: StockTickerProps) {
  const [stocks, setStocks] = useState(STOCKS)
  const [isHovered, setIsHovered] = useState(false)

  // Simulate stock price changes
  useEffect(() => {
    if (isHovered) return // Pause animation when hovered

    const interval = setInterval(() => {
      setStocks((prevStocks) =>
        prevStocks.map((stock) => {
          // Random price change between -2% and +2%
          const randomChange = ((Math.random() * 4 - 2) * stock.price) / 100
          const newPrice = Number.parseFloat((stock.price + randomChange).toFixed(2))
          const change = Number.parseFloat((newPrice - stock.price + stock.change).toFixed(2))
          const changePercent = Number.parseFloat(((change / (stock.price - stock.change)) * 100).toFixed(2))

          return {
            ...stock,
            price: newPrice,
            change,
            changePercent,
          }
        }),
      )
    }, 5000) // Update every 5 seconds

    return () => clearInterval(interval)
  }, [isHovered])

  return (
    <div
      className={cn("bg-black text-white py-2 overflow-hidden", className)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="container relative">
        <div className="flex items-center absolute left-0 top-0 bottom-0 bg-black z-10 pr-4">
          <span className="font-bold text-[#FAD440]">BSE</span>
        </div>

        <div className="ticker-container ml-[80px]">
          <div className={`ticker-wrapper flex items-center gap-6 ${isHovered ? "paused" : "animate-ticker"}`}>
            {stocks.map((stock) => (
              <div key={stock.symbol} className="ticker-item flex items-center whitespace-nowrap">
                <span className="font-bold mr-2">{stock.symbol}</span>
                <span className="mr-2">P{stock.price.toFixed(2)}</span>
                <span className={`flex items-center ${stock.change >= 0 ? "text-green-500" : "text-red-500"}`}>
                  {stock.change >= 0 ? (
                    <TrendingUp className="h-3 w-3 mr-1" />
                  ) : (
                    <TrendingDown className="h-3 w-3 mr-1" />
                  )}
                  {stock.change >= 0 ? "+" : ""}
                  {stock.change.toFixed(2)} ({stock.change >= 0 ? "+" : ""}
                  {stock.changePercent.toFixed(2)}%)
                </span>
              </div>
            ))}

            {/* Duplicate stocks for seamless looping */}
            {stocks.map((stock) => (
              <div key={`${stock.symbol}-dup`} className="ticker-item flex items-center whitespace-nowrap">
                <span className="font-bold mr-2">{stock.symbol}</span>
                <span className="mr-2">P{stock.price.toFixed(2)}</span>
                <span className={`flex items-center ${stock.change >= 0 ? "text-green-500" : "text-red-500"}`}>
                  {stock.change >= 0 ? (
                    <TrendingUp className="h-3 w-3 mr-1" />
                  ) : (
                    <TrendingDown className="h-3 w-3 mr-1" />
                  )}
                  {stock.change >= 0 ? "+" : ""}
                  {stock.change.toFixed(2)} ({stock.change >= 0 ? "+" : ""}
                  {stock.changePercent.toFixed(2)}%)
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
