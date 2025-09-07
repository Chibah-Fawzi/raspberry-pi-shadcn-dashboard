import os from "os";
import { exec } from "child_process";
import { promisify } from "util";
import fs from "fs";

const execAsync = promisify(exec);

function getCpuUsage() {
  const cpus = os.cpus();
  return cpus.map((cpu) => {
    const total = Object.values(cpu.times).reduce((acc, tv) => acc + tv, 0);
    const usage = 100 - (100 * cpu.times.idle) / total;
    return usage.toFixed(1);
  });
}

async function getCpuTemp() {
  const { stdout } = await execAsync("vcgencmd measure_temp");
  // in celsius! OBVIOUSLY!
  return parseFloat(stdout.replace("temp=", "").replace("'C", ""));
}

function bytesToGB(bytes: number) {
  return (bytes / (1024 * 1024 * 1024)).toFixed(2);
}

function bytesToMB(bytes: number) {
  return (bytes / (1024 * 1024)).toFixed(2);
}

async function getStorageInfo() {
  try {
    const { stdout } = await execAsync("df -h /");
    const lines = stdout.trim().split('\n');
    const dataLine = lines[1].split(/\s+/);
    
    return {
      total: dataLine[1],
      used: dataLine[2],
      available: dataLine[3],
      usagePercent: dataLine[4].replace('%', ''),
      mountPoint: dataLine[5]
    };
  } catch (error) {
    return {
      total: "Unknown",
      used: "Unknown", 
      available: "Unknown",
      usagePercent: "0",
      mountPoint: "/"
    };
  }
}

async function getUptime() {
  try {
    const { stdout } = await execAsync("uptime -p");
    return stdout.trim();
  } catch (error) {
    return "Unknown";
  }
}

async function getLoadAverage() {
  try {
    const { stdout } = await execAsync("uptime");
    const loadMatch = stdout.match(/load average: ([\d.]+), ([\d.]+), ([\d.]+)/);
    if (loadMatch) {
      return {
        oneMin: parseFloat(loadMatch[1]),
        fiveMin: parseFloat(loadMatch[2]),
        fifteenMin: parseFloat(loadMatch[3])
      };
    }
  } catch (error) {
    // Fallback to os.loadavg()
  }
  
  const load = os.loadavg();
  return {
    oneMin: load[0],
    fiveMin: load[1], 
    fifteenMin: load[2]
  };
}

export async function getSystemDetails() {
  // Get CPU usage
  const cpuUsage = getCpuUsage();

  // Get memory info
  const totalMem = os.totalmem();
  const freeMem = os.freemem();
  const usedMem = totalMem - freeMem;
 
  const cpuTemp = await getCpuTemp();
  const storageInfo = await getStorageInfo();
  const uptime = await getUptime();
  const loadAverage = await getLoadAverage();

  return {
    cpuTemp,
    cpuUsage,
    memoryUsage: {
      total: parseFloat(bytesToGB(totalMem)),
      used: parseFloat(bytesToGB(usedMem)),
      free: parseFloat(bytesToGB(freeMem)),
    },
    storage: storageInfo,
    uptime,
    loadAverage,
    cpuCount: os.cpus().length,
    platform: os.platform(),
    arch: os.arch(),
    hostname: os.hostname(),
    release: os.release(),
  };
}
