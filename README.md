# 🍓 Raspberry Pi Dashboard

A beautiful, real-time web dashboard for monitoring your Raspberry Pi's system performance, health, and resources. Built with Next.js, TypeScript, and Tailwind CSS.

![Raspberry Pi Dashboard](https://img.shields.io/badge/Raspberry%20Pi-Dashboard-red?style=for-the-badge&logo=raspberry-pi)
![Next.js](https://img.shields.io/badge/Next.js-15.5.2-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-4.0-38B2AC?style=for-the-badge&logo=tailwind-css)

## ✨ Features

### 🔥 Real-Time Monitoring
- **Live system metrics** with WebSocket connections
- **5-second update intervals** for instant data refresh
- **Connection status indicators** with auto-reconnection
- **No page refreshes required** - everything updates automatically

### 📊 System Metrics
- **CPU Usage** - Per-core monitoring with color-coded progress bars
- **CPU Temperature** - Real-time temperature with health indicators
- **Memory Usage** - RAM consumption with percentage and GB values
- **Storage Usage** - Disk space monitoring with usage percentages
- **Load Averages** - 1m, 5m, and 15m system load metrics
- **System Uptime** - How long your Pi has been running

### 🎨 Beautiful Interface
- **Raspberry Pi themed** with red branding and π symbol
- **Dark/Light mode** with smooth theme switching
- **Responsive design** - works on desktop, tablet, and mobile
- **Color-coded alerts** - Green (good), Orange (warning), Red (critical)
- **Glassmorphism effects** with backdrop blur
- **Smooth animations** and transitions

### 🛡️ Health Monitoring
- **Temperature alerts** - Prevents overheating damage
- **Memory warnings** - Alerts when RAM usage is high
- **Storage alerts** - Warns when disk space is low
- **Visual indicators** - Instant status recognition
- **System information** - Hostname, platform, architecture, kernel

## 🚀 Quick Start

### Prerequisites
- Raspberry Pi running Linux
- Node.js 18+ installed
- Git installed

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/raspberry-pi-dashboard.git
   cd raspberry-pi-dashboard
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000` or `http://your-pi-ip:3000`

### Production Deployment

1. **Build the application**
   ```bash
   npm run build
   ```

2. **Start the production server**
   ```bash
   npm start
   ```

3. **Access from any device**
   Open `http://your-pi-ip:3000` from any device on your network

## 🏗️ Architecture

### Tech Stack
- **Frontend**: Next.js 15.5.2 with App Router
- **Styling**: Tailwind CSS 4.0 with custom components
- **Language**: TypeScript for type safety
- **Real-time**: Server-Sent Events (SSE) for live updates
- **Icons**: Lucide React for beautiful icons
- **Theme**: next-themes for dark/light mode

### Project Structure
```
src/
├── app/
│   ├── api/ws/          # WebSocket API endpoint
│   ├── globals.css      # Global styles
│   ├── layout.tsx       # Root layout with theme provider
│   └── page.tsx         # Home page
├── components/
│   ├── ui/              # Reusable UI components
│   ├── real-time-dashboard.tsx  # Main dashboard component
│   ├── theme-provider.tsx       # Theme context provider
│   └── theme-toggle.tsx         # Dark/light mode toggle
├── hooks/
│   └── use-system-data.ts       # WebSocket data hook
└── lib/
    └── system.ts        # System monitoring functions
```

## 🔧 Configuration

### Update Intervals
The dashboard updates every 5 seconds by default. To change this:

1. Edit `src/hooks/use-system-data.ts`
2. Modify the `interval` parameter in `useSystemData(5000)`
3. Update the API endpoint in `src/app/api/ws/route.ts`

### Custom Metrics
Add new system metrics by:

1. Extending the `SystemData` interface in `src/hooks/use-system-data.ts`
2. Adding data collection in `src/lib/system.ts`
3. Updating the dashboard component to display the new metrics

## 📱 Screenshots

### Light Mode
- Clean, modern interface with light theme
- Color-coded system health indicators
- Real-time metrics with progress bars

### Dark Mode
- Sleek dark theme for low-light environments
- Consistent branding with Raspberry Pi colors
- Easy on the eyes for extended monitoring

## 🛠️ Development

### Available Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

### Adding New Features
1. Create new components in `src/components/`
2. Add system monitoring functions in `src/lib/system.ts`
3. Update the WebSocket API to include new data
4. Extend the dashboard component to display new metrics

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

### Development Guidelines
- Use TypeScript for all new code
- Follow the existing code style
- Add proper error handling
- Include responsive design
- Test on actual Raspberry Pi hardware

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Raspberry Pi Foundation** for the amazing single-board computer
- **Next.js team** for the excellent React framework
- **Tailwind CSS** for the utility-first CSS framework
- **Vercel** for the deployment platform

## 📞 Support

If you encounter any issues or have questions:

1. Check the [Issues](https://github.com/yourusername/raspberry-pi-dashboard/issues) page
2. Create a new issue with detailed information
3. Include your Raspberry Pi model and OS version

---

**Built with ❤️ for Raspberry Pi enthusiasts**

*Monitor your Pi, protect your hardware, and enjoy the peace of mind that comes with real-time system monitoring.*