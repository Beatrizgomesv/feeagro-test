'use client'

import {useEffect, useRef, useState} from 'react'

export default function UserMenu() {
    const [open, setOpen] = useState(false)
    const ref = useRef < HTMLDivElement | null > (null)

    useEffect(() => {
        function handleClickOutside(event : MouseEvent) {
            if (ref.current && ! ref.current.contains(event.target as Node)) {
                setOpen(false)
            }
        }

        document.addEventListener('mousedown', handleClickOutside)
        return() => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    return (
        <div className="relative"
            ref={ref}>
            <button onClick={
                    () => setOpen((prev) => !prev)
                }
                className="
                              h-9 w-9 rounded-full bg-green-600
                              text-white text-sm font-semibold
                              flex items-center justify-center
                            ">
                BG
            </button>

            {
            open && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl border shadow-lg z-50">
                    <div className="px-4 py-3 border-b">
                        <p className="text-sm font-medium text-gray-800">
                            Beatriz Gomes
                        </p>
                        <p className="text-xs text-gray-500">
                            Conta pessoal
                        </p>
                    </div>

                    <div className="py-1 text-sm">
                        <button className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-50">
                            Perfil
                        </button>

                        <button className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-50">
                            Configurações
                        </button>

                        <button className="w-full text-left px-4 py-2 text-red-600 hover:bg-gray-50">
                            Sair
                        </button>
                    </div>
                </div>
            )
        } </div>
    )
}

