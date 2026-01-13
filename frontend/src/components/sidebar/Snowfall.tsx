import React, { useEffect, useRef } from "react"

type Props = {
    className?: string
}

const Snowfall: React.FC<Props> = ({ className }) => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null)
    const animRef = useRef<number | null>(null)

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return
        const ctx = canvas.getContext("2d")
        if (!ctx) return

        let width = (canvas.width = canvas.clientWidth)
        let height = (canvas.height = canvas.clientHeight)

        type Flake = { x: number; y: number; r: number; vx: number; vy: number; t: number }
        const flakes: Flake[] = []

        const createFlake = (): Flake => ({
            x: Math.random() * width,
            y: Math.random() * height,
            r: Math.random() * 3 + 1,
            vx: (Math.random() - 0.5) * 0.6,
            vy: Math.random() * 0.6 + 0.4,
            t: Math.random() * Math.PI * 2,
        })

        const initFlakes = () => {
            flakes.length = 0
            const count = Math.max(50, Math.floor(width / 10))
            for (let i = 0; i < count; i++) flakes.push(createFlake())
        }

        const onResize = () => {
            width = canvas.width = canvas.clientWidth
            height = canvas.height = canvas.clientHeight
            initFlakes()
        }

        window.addEventListener("resize", onResize)
        initFlakes()

        const render = () => {
            if (!ctx) return
            ctx.clearRect(0, 0, width, height)
            ctx.fillStyle = "rgba(255,255,255,0.9)"
            for (const f of flakes) {
                f.t += 0.01
                f.x += f.vx + Math.sin(f.t) * 0.5
                f.y += f.vy
                if (f.y > height + 10) {
                    f.y = -10
                    f.x = Math.random() * width
                }
                ctx.beginPath()
                ctx.arc(f.x, f.y, f.r, 0, Math.PI * 2)
                ctx.fill()
            }
            animRef.current = requestAnimationFrame(render)
        }

        render()

        return () => {
            if (animRef.current) cancelAnimationFrame(animRef.current)
            window.removeEventListener("resize", onResize)
        }
    }, [])

    return <canvas ref={canvasRef} className={className} />
}

export default Snowfall
