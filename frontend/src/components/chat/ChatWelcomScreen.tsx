import { Smile } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { SidebarTrigger } from "../ui/sidebar"

export default function ChatWelcomScreen() {
    return (
        <div className="flex flex-col w-full h-full p-4">
            <SidebarTrigger />
            <div className="flex flex-1 items-center justify-center">
                <Card className="max-w-2xl border-none shadow-none bg-transparent">
                    <CardContent className="flex flex-col items-center text-center gap-6 py-12">
                        {/* Title */}
                        <div className="space-y-2">
                            <div className="space-y-3">
                                <div className="flex justify-center">
                                    <div className="p-4 bg-green-100 dark:bg-green-900/30 rounded-3xl rotate-3 hover:rotate-0 transition-transform duration-300 shadow-sm">
                                        <Smile className="h-12 w-12 text-green-600 dark:text-green-400" />
                                    </div>
                                </div>
                                <h1 className="text-4xl font-extrabold tracking-tight">
                                    Welcome to <span className="text-green-600">Chatty!</span>
                                </h1>
                                <div className="text-muted-foreground text-lg max-w-md mx-auto">
                                    <p>Connect with friends and colleagues.</p>
                                    <p>Start a conversation or create a new group to work more efficiently together.</p>
                                </div>
                            </div>
                        </div>

                        {/* Sub info */}
                        <div className="text-sm text-muted-foreground pt-4">
                            No conversation selected yet
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}