"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"

/**
 * Props for SimpleDialog component.
 * @typedef {Object} DialogProps
 * @property {boolean} isOpen - Controls dialog visibility.
 * @property {function(): void} onClose - Callback for closing the dialog.
 * @property {function(): void} onConfirm - Callback for confirmation action.
 * @property {string} title - Dialog title text.
 * @property {string} description - Dialog description text.
 */
interface DialogProps {
    isOpen: boolean
    onClose: () => void
    onConfirm: () => void
    title: string
    description: string
}

export function SimpleDialog({ isOpen, onClose, onConfirm, title, description }: DialogProps) {
    if (!isOpen) return null

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div className="bg-white dark:bg-slate-900 p-6 rounded-lg shadow-xl max-w-md w-full mx-4 space-y-4">
                <h2 className="text-xl font-bold">{title}</h2>
                <p className="text-muted-foreground">{description}</p>
                <div className="flex justify-end gap-3">
                    <Button variant="outline" onClick={onClose}>Cancel</Button>
                    <Button variant="destructive" onClick={onConfirm}>Confirm</Button>
                </div>
            </div>
        </div>
    )
}
