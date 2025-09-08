import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ThemeToggle } from "@/components/theme-toggle";
import { RealTimeDashboard } from "@/components/real-time-dashboard";
import { ShutdownButton } from "@/components/shutdown-button";
import { getSystemDetails } from "@/lib/system";

export default async function Home() {
  const systemInfo = await getSystemDetails();

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50 dark:from-gray-900 dark:to-gray-800">
      {/* Header */}
      <header className="border-b bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-red-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">π</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Raspberry Pi Dashboard</h1>
                <p className="text-sm text-gray-600 dark:text-gray-400">System Monitoring & Control</p>
              </div>
            </div>
            <nav className="flex space-x-4">
              <div className="px-4 py-2 bg-green-600 text-white rounded-lg">
                ✓ Live Dashboard
              </div>
              <ThemeToggle />
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <section className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Welcome to Your Raspberry Pi
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-8">
            Monitor your Raspberry Pi's performance, manage services, and explore the endless possibilities
            of your single-board computer.
          </p>

          {/* System Control Panel */}
          <div className="flex justify-center">
            <ShutdownButton />
          </div>
        </section>

        {/* Real-time Dashboard */}
        <RealTimeDashboard initialData={systemInfo} />

        {/* Features Grid */}
        <section className="mb-12">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
            Dashboard Features
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <span className="text-2xl">📊</span>
                  <span>Live System Monitoring</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-400">
                  Real-time monitoring of CPU usage, memory consumption, temperature, and storage.
                </p>
                <span className="inline-block mt-3 text-green-600 text-sm">
                  ✓ Active
                </span>
              </CardContent>
            </Card>

            <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <span className="text-2xl">🌡️</span>
                  <span>Temperature Monitoring</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-400">
                  Track CPU temperature with alerts for overheating protection.
                </p>
                <span className="inline-block mt-3 text-gray-500 text-sm">
                  Coming Soon
                </span>
              </CardContent>
            </Card>

            <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <span className="text-2xl">💾</span>
                  <span>Storage Management</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-400">
                  Monitor disk usage and manage storage space efficiently.
                </p>
                <div className="mt-3 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Used:</span>
                    <span className="font-medium">{systemInfo.storage.used}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Available:</span>
                    <span className="font-medium">{systemInfo.storage.available} / {systemInfo.storage.total} </span>
                  </div>
                  <Progress
                    value={parseFloat(systemInfo.storage.usagePercent)}
                    className={`h-2 mt-2 ${parseFloat(systemInfo.storage.usagePercent) > 90 ? '[&>div]:bg-red-500' :
                      parseFloat(systemInfo.storage.usagePercent) > 70 ? '[&>div]:bg-orange-500' :
                        '[&>div]:bg-green-500'
                      }`}
                  />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <span className="text-2xl">🔧</span>
                  <span>Service Management</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-400">
                  Start, stop, and monitor system services and applications.
                </p>
                <span className="inline-block mt-3 text-gray-500 text-sm">
                  Coming Soon
                </span>
              </CardContent>
            </Card>

            <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <span className="text-2xl">🌐</span>
                  <span>Network Status</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-400">
                  Monitor network connections, bandwidth usage, and connectivity.
                </p>
                <span className="inline-block mt-3 text-gray-500 text-sm">
                  Coming Soon
                </span>
              </CardContent>
            </Card>

            <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <span className="text-2xl">⚡</span>
                  <span>Performance Analytics</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-400">
                  Advanced performance metrics including load averages and system health indicators.
                </p>
                <div className="mt-3 space-y-1">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Load (1m):</span>
                    <span className="font-medium">{systemInfo.loadAverage.oneMin.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Load (5m):</span>
                    <span className="font-medium">{systemInfo.loadAverage.fiveMin.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Load (15m):</span>
                    <span className="font-medium">{systemInfo.loadAverage.fifteenMin.toFixed(2)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>
    </div>
  );
}
