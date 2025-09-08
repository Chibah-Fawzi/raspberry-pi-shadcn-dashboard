"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter
} from "@/components/ui/dialog"

export function ShutdownButton() {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isShuttingDown, setIsShuttingDown] = useState(false)

  const handleShutdown = async () => {
    setIsShuttingDown(true)

    try {
      const response = await fetch('/api/shutdown', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      const data = await response.json()

      if (response.ok) {
        // Show success message briefly before the page becomes unresponsive
        alert('Raspberry Pi is shutting down...')
      } else {
        alert(`Failed to shutdown: ${data.error || 'Unknown error'}`)
        setIsShuttingDown(false)
        setIsDialogOpen(false)
      }
    } catch (error) {
      console.error('Shutdown error:', error)
      alert('Failed to shutdown: Network error')
      setIsShuttingDown(false)
      setIsDialogOpen(false)
    }
  }

  return (
    <>
      <Button
        variant="destructive"
        size="lg"
        onClick={() => setIsDialogOpen(true)}
        className="px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-200 cursor-pointer"
        disabled={isShuttingDown}
      >
        {isShuttingDown ? (
          <>
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Shutting Down...
          </>
        ) : (
          <>
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
            Shutdown Pi
          </>
        )}
      </Button>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-2">
              <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
              <span>Confirm Shutdown</span>
            </DialogTitle>
            <DialogDescription>
              Are you sure you want to shutdown your Raspberry Pi? This action will immediately power off the device and all running services will be stopped.
            </DialogDescription>
          </DialogHeader>

          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 mb-4">
            <div className="flex items-start space-x-3">
              <svg className="w-5 h-5 text-red-500 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div>
                <h4 className="text-sm font-medium text-red-800 dark:text-red-200">Warning</h4>
                <p className="text-sm text-red-700 dark:text-red-300 mt-1">
                  This action cannot be undone. Make sure you have saved any important work before proceeding.
                </p>
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsDialogOpen(false)}
              disabled={isShuttingDown}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleShutdown}
              disabled={isShuttingDown}
              className="min-w-[120px]"
            >
              {isShuttingDown ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Shutting Down...
                </>
              ) : (
                'Yes, Shutdown'
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
