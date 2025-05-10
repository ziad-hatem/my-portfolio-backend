"use client"

import { useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import { AlertCircle } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export default function AuthErrorPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const error = searchParams.get("error")

  useEffect(() => {
    if (!error) {
      router.push("/auth/login")
    }
  }, [error, router])

  const errorMessages: Record<string, { title: string; message: string }> = {
    default: {
      title: "Authentication Error",
      message: "An error occurred during authentication.",
    },
    configuration: {
      title: "Server Configuration Error",
      message: "There is a problem with the server configuration. Please contact support.",
    },
    accessdenied: {
      title: "Access Denied",
      message: "You do not have permission to access this resource.",
    },
    verification: {
      title: "Verification Failed",
      message: "The verification link may have been used or is invalid.",
    },
    signin: {
      title: "Sign In Failed",
      message: "Try signing in with a different account or method.",
    },
    oauthsignin: {
      title: "OAuth Sign In Error",
      message: "Error in the OAuth sign-in process. Please try again.",
    },
    oauthcallback: {
      title: "OAuth Callback Error",
      message: "Error in the OAuth callback process. Please try again.",
    },
    oauthcreateaccount: {
      title: "Account Creation Failed",
      message: "Could not create an OAuth account. Please try again.",
    },
    emailcreateaccount: {
      title: "Account Creation Failed",
      message: "Could not create an email account. Please try again.",
    },
    callback: {
      title: "Callback Error",
      message: "Error in the callback handler. Please try again.",
    },
    oauthaccountnotlinked: {
      title: "Account Not Linked",
      message: "This email is already associated with another account.",
    },
    emailsignin: {
      title: "Email Sign In Failed",
      message: "The e-mail could not be sent. Please try again.",
    },
    credentialssignin: {
      title: "Invalid Credentials",
      message: "The email or password you entered is incorrect.",
    },
    sessionrequired: {
      title: "Authentication Required",
      message: "You must be signed in to access this page.",
    },
  }

  const errorInfo = error ? errorMessages[error] || errorMessages.default : errorMessages.default

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4">
      <Card className="w-full max-w-md mx-auto">
        <CardHeader>
          <CardTitle>{errorInfo.title}</CardTitle>
          <CardDescription>There was a problem with your authentication</CardDescription>
        </CardHeader>
        <CardContent>
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error: {error}</AlertTitle>
            <AlertDescription>{errorInfo.message}</AlertDescription>
          </Alert>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button asChild>
            <Link href="/auth/login">Return to Login</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
