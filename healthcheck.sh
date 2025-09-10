#!/bin/bash

# Health check script for Raspberry Pi Dashboard
# This script checks if the application is responding properly

set -e

# Configuration
HEALTH_URL="http://localhost:3000"
API_URL="http://localhost:3000/api/ws"
TIMEOUT=10

# Function to check HTTP endpoint
check_endpoint() {
    local url=$1
    local description=$2
    
    if curl -f -s --max-time $TIMEOUT "$url" > /dev/null 2>&1; then
        echo "✓ $description is healthy"
        return 0
    else
        echo "✗ $description is not responding"
        return 1
    fi
}

# Function to check if process is running
check_process() {
    if pgrep -f "node.*server.js" > /dev/null; then
        echo "✓ Node.js process is running"
        return 0
    else
        echo "✗ Node.js process is not running"
        return 1
    fi
}

# Function to check system resources
check_resources() {
    # Check memory usage (should be less than 90%)
    local mem_usage=$(free | awk 'NR==2{printf "%.0f", $3*100/$2}')
    if [ "$mem_usage" -lt 90 ]; then
        echo "✓ Memory usage is healthy ($mem_usage%)"
    else
        echo "⚠ Memory usage is high ($mem_usage%)"
    fi
    
    # Check disk space (should have at least 100MB free)
    local disk_free=$(df / | awk 'NR==2 {print $4}')
    if [ "$disk_free" -gt 102400 ]; then  # 100MB in KB
        echo "✓ Disk space is sufficient"
    else
        echo "⚠ Disk space is low"
    fi
}

# Main health check
main() {
    echo "Starting health check for Raspberry Pi Dashboard..."
    echo "Timestamp: $(date)"
    echo "----------------------------------------"
    
    local exit_code=0
    
    # Check if Node.js process is running
    if ! check_process; then
        exit_code=1
    fi
    
    # Check main application endpoint
    if ! check_endpoint "$HEALTH_URL" "Main application"; then
        exit_code=1
    fi
    
    # Check WebSocket API endpoint
    if ! check_endpoint "$API_URL" "WebSocket API"; then
        exit_code=1
    fi
    
    # Check system resources
    check_resources
    
    echo "----------------------------------------"
    if [ $exit_code -eq 0 ]; then
        echo "✓ Overall health check: PASSED"
    else
        echo "✗ Overall health check: FAILED"
    fi
    
    exit $exit_code
}

# Run main function
main "$@"
