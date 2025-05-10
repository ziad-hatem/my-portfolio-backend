"use client"

import { useEffect } from "react"
import Link from "next/link"
import { AlertCircle } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error("Global app error:", error)
  }, [error])

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4">
      <Card className="w-full max-w-md mx-auto">
        <CardHeader>
          <CardTitle>Something went wrong</CardTitle>
        </CardHeader>
        <CardContent>
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Application Error</AlertTitle>
            <AlertDescription>
              <p className="mb-2">An unexpected error occurred in the application.</p>
              {process.env.NODE_ENV === "development" && <p className="text-xs font-mono mb-4">{error.message}</p>}
            </AlertDescription>
          </Alert>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={reset}>
            Try Again
          </Button>
          <Button asChild>
            <Link href="/">Return Home</Link>
          </Button>
        </CardFooter>
      </Card>
      {process.env.NODE_ENV === "development" && (
        <div className="mt-4 p-4 bg-gray-100 rounded-md max-w-md w-full">
          <h3 className="text-sm font-bold mb-2">Error Details (Development Only):</h3>
          <pre className="text-xs overflow-auto p-2 bg-gray-200 rounded">
            {error.stack || "No stack trace available"}
          </pre>
          {error.digest && (
            <p className="text-xs mt-2">
              <strong>Error ID:</strong> {error.digest}
            </p>
          )}
        </div>
      )}
    </div>
  )
}
