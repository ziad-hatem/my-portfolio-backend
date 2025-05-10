type ErrorLogLevel = "error" | "warn" | "info"

interface ErrorLogOptions {
  context?: string
  user?: string
  metadata?: Record<string, any>
}

export function logError(error: Error | string, level: ErrorLogLevel = "error", options: ErrorLogOptions = {}) {
  const { context, user, metadata } = options
  const timestamp = new Date().toISOString()
  const errorMessage = typeof error === "string" ? error : error.message
  const errorStack = typeof error === "string" ? undefined : error.stack

  const logData = {
    timestamp,
    level,
    message: errorMessage,
    stack: errorStack,
    context,
    user,
    ...metadata,
  }

  // In a real app, you might send this to a logging service
  // For now, we'll just console log it
  if (level === "error") {
    console.error("ERROR:", logData)
  } else if (level === "warn") {
    console.warn("WARNING:", logData)
  } else {
    console.info("INFO:", logData)
  }

  // In production, you could send this to a service like Sentry, LogRocket, etc.
  if (process.env.NODE_ENV === "production") {
    // Example: sendToErrorService(logData)
  }

  return logData
}
