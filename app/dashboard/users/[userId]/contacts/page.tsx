import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { getContacts } from "@/lib/actions/contact-actions"
import { deleteContact } from "@/lib/actions/contact-actions"
import { Trash2, Mail, Phone } from "lucide-react"
import { format } from "date-fns"

export default async function ContactsPage({ params }: { params: { userId: string } }) {
  const { contacts = [] } = (await getContacts(params.userId)) || {}

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Contact Messages</h1>
      </div>
      <div className="grid gap-6">
        {contacts.length === 0 ? (
          <Card>
            <CardHeader>
              <CardTitle>No messages found</CardTitle>
            </CardHeader>
            <CardContent>
              <p>You haven't received any contact messages yet.</p>
            </CardContent>
          </Card>
        ) : (
          contacts.map((contact) => (
            <Card key={contact.id}>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>{contact.name}</CardTitle>
                <form
                  action={async () => {
                    "use server"
                    await deleteContact(contact.id, params.userId)
                  }}
                >
                  <Button variant="destructive" size="icon" type="submit">
                    <Trash2 className="h-4 w-4" />
                    <span className="sr-only">Delete</span>
                  </Button>
                </form>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <div className="flex items-center">
                      <Mail className="h-4 w-4 mr-2 text-muted-foreground" />
                      <a href={`mailto:${contact.email}`} className="text-sm hover:underline">
                        {contact.email}
                      </a>
                    </div>
                    <div className="flex items-center">
                      <Phone className="h-4 w-4 mr-2 text-muted-foreground" />
                      <a href={`tel:${contact.phoneNumber}`} className="text-sm hover:underline">
                        {contact.phoneNumber}
                      </a>
                    </div>
                  </div>
                  <div className="bg-muted p-3 rounded-md">
                    <p className="text-sm whitespace-pre-wrap">{contact.message}</p>
                  </div>
                  <div className="text-xs text-muted-foreground text-right">
                    Received on {format(new Date(contact.createdAt), "PPP 'at' p")}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
      <div className="flex justify-end">
        <Button variant="outline" asChild>
          <Link href={`/dashboard/users/${params.userId}`}>Back to Profile</Link>
        </Button>
      </div>
    </div>
  )
}
