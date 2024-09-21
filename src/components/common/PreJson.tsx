'use client'

export default function PreJson({ children }: { children?: React.ReactNode }) {
    return (
        <pre className="max-h-96 overflow-y-auto rounded-md bg-gray-200 p-2 text-xs text-gray-600 dark:bg-gray-800 dark:text-gray-400">
            {children}
        </pre>
    )
}
