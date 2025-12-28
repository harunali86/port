// 3D Button - Exact Weblyss Style
import { motion } from 'framer-motion';

export default function Button3D({
    children,
    href = "#",
    className = "",
    onClick,
    width = "140px",
    height = "50px"
}) {
    const Component = href ? 'a' : 'button';

    return (
        <Component
            href={href}
            onClick={onClick}
            className={`relative border-none p-0 m-0 cursor-pointer block ${className}`}
            style={{
                width: width,
                height: height,
                background: 'none',
                outline: 'none',
                textDecoration: 'none',
            }}
        >
            {/* Top surface - the clickable part */}
            <motion.div
                className="w-full h-full flex items-center justify-center relative overflow-hidden font-bold text-base"
                style={{
                    background: 'rgb(255, 255, 238)',
                    borderRadius: '25px',
                    border: '2px solid rgb(36, 38, 34)',
                    color: 'rgb(36, 38, 34)',
                    position: 'relative',
                    zIndex: 3,
                }}
                whileHover={{ y: -2 }}
                whileTap={{ y: 8 }}
                transition={{ duration: 0.15 }}
            >
                {/* Shine effect */}
                <motion.div
                    className="absolute h-full bg-black/10"
                    style={{
                        width: '15px',
                        transform: 'skewX(30deg)',
                        left: '-20px',
                    }}
                    whileHover={{ left: '110%' }}
                    transition={{ duration: 0.4 }}
                />
                <span className="relative z-10 px-4">{children}</span>
            </motion.div>

            {/* FIRST DEPTH LINE - Middle shadow layer */}
            <div
                className="absolute w-full h-full left-0"
                style={{
                    top: '8px',
                    background: 'rgb(229, 229, 199)',
                    borderRadius: '25px',
                    border: '2px solid rgb(36, 38, 34)',
                    zIndex: 2,
                }}
            >
                {/* Bottom notches */}
                <div className="absolute w-[2px] h-[7px] bg-[rgb(36,38,34)] bottom-0 left-[15%]" />
                <div className="absolute w-[2px] h-[7px] bg-[rgb(36,38,34)] bottom-0 left-[85%]" />
            </div>

            {/* SECOND DEPTH LINE - Base shadow layer */}
            <div
                className="absolute"
                style={{
                    width: 'calc(100% + 2px)',
                    height: '100%',
                    top: '12px',
                    left: '-1px',
                    background: 'rgb(140, 140, 140)',
                    borderRadius: '25px',
                    border: '2px solid rgb(36, 38, 34)',
                    zIndex: 1,
                }}
            />
        </Component>
    );
}

// Emerald variant of 3D Button
export function Button3DEmerald({
    children,
    href = "#",
    className = "",
    onClick,
    width = "160px",
    height = "50px"
}) {
    const Component = href ? 'a' : 'button';

    return (
        <Component
            href={href}
            onClick={onClick}
            className={`relative border-none p-0 m-0 cursor-pointer block ${className}`}
            style={{
                width: width,
                height: height,
                background: 'none',
                outline: 'none',
                textDecoration: 'none',
            }}
        >
            {/* Top surface */}
            <motion.div
                className="w-full h-full flex items-center justify-center relative overflow-hidden font-bold text-base"
                style={{
                    background: 'linear-gradient(180deg, #34d399 0%, #10b981 100%)',
                    borderRadius: '25px',
                    border: '2px solid #065f46',
                    color: '#022c22',
                    position: 'relative',
                    zIndex: 3,
                    boxShadow: 'inset 0 2px 0 rgba(255,255,255,0.3)',
                }}
                whileHover={{ y: -2 }}
                whileTap={{ y: 8 }}
                transition={{ duration: 0.15 }}
            >
                {/* Shine effect */}
                <motion.div
                    className="absolute h-full"
                    style={{
                        width: '20px',
                        background: 'rgba(255,255,255,0.3)',
                        transform: 'skewX(30deg)',
                        left: '-30px',
                    }}
                    whileHover={{ left: '110%' }}
                    transition={{ duration: 0.4 }}
                />
                <span className="relative z-10 px-4">{children}</span>
            </motion.div>

            {/* Middle shadow layer */}
            <div
                className="absolute w-full h-full left-0"
                style={{
                    top: '6px',
                    background: '#059669',
                    borderRadius: '25px',
                    border: '2px solid #065f46',
                    zIndex: 2,
                }}
            />

            {/* Base shadow layer */}
            <div
                className="absolute"
                style={{
                    width: 'calc(100% + 2px)',
                    height: '100%',
                    top: '10px',
                    left: '-1px',
                    background: '#047857',
                    borderRadius: '25px',
                    border: '2px solid #065f46',
                    zIndex: 1,
                }}
            />
        </Component>
    );
}
