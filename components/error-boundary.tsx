"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { AlertCircle } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"

interface ErrorBoundaryProps {
  children: React.ReactNode
}

export function ErrorBoundary({ children }: ErrorBoundaryProps) {
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const handleError = (error: ErrorEvent) => {
      console.error("Global error caught:", error)
      setError(error.error || new Error("An unknown error occurred"))
    }

    window.addEventListener("error", handleError)
    return () => window.removeEventListener("error", handleError)
  }, [])

  if (error) {
    return (
      <div className="p-4">
        <Alert variant="destructive" className="mb-4">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Something went wrong</AlertTitle>
          <AlertDescription>
            <p className="mb-2">An error occurred in the application.</p>
            <p className="text-xs font-mono mb-4">{error.message}</p>
            <Button onClick={() => setError(null)} variant="outline" size="sm">
              Try Again
            </Button>
            <Button onClick={() => window.location.reload()} className="ml-2" size="sm">
              Reload Page
            </Button>
          </AlertDescription>
        </Alert>
        {process.env.NODE_ENV === "development" && (
          <div className="mt-4 p-4 bg-gray-100 rounded-md">
            <h3 className="text-sm font-bold mb-2">Error Details (Development Only):</h3>
            <pre className="text-xs overflow-auto p-2 bg-gray-200 rounded">
              {error.stack || "No stack trace available"}
            </pre>
          </div>
        )}
      </div>
    )
  }

  return <>{children}</>
}
